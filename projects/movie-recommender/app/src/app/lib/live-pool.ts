import {
  movieCatalog,
  MoviePick,
} from "@/app/lib/recommendation-data";
import {
  LivePoolQuery,
  LivePoolResult,
  ProviderMovieCandidate,
} from "@/app/lib/live-recommendation-types";

function getLiveApiKey() {
  return process.env.WATCHMODE_API_KEY || process.env.STREAMING_AVAILABILITY_API_KEY || "";
}

function hasLiveApiKey() {
  return Boolean(getLiveApiKey());
}

const serviceMap: Record<string, number> = {
  "Netflix": 203,
  "Hulu": 157,
  "Max": 387,
  "Prime Video": 26,
  "Disney+": 372,
  "Apple TV+": 371,
  "Peacock": 386,
  "Paramount+": 388,
};

const genreMap: Record<string, string> = {
  comedy: "Comedy",
  drama: "Drama",
  thriller: "Thriller",
  action: "Action",
  romance: "Romance",
  horror: "Horror",
  crime: "Crime",
  scifi: "Sci-fi",
  "science fiction": "Sci-fi",
  mystery: "Crime",
  animation: "Comedy",
  adventure: "Action",
  fantasy: "Sci-fi",
};

function normalizeGenres(rawGenres: unknown): string[] {
  if (!Array.isArray(rawGenres)) return ["Drama"];

  const normalized = rawGenres
    .map((genre) => String(genre).toLowerCase().trim())
    .map((genre) => genreMap[genre] || genreMap[genre.replace(/[^a-z ]/g, "")] || null)
    .filter(Boolean) as string[];

  return normalized.length ? [...new Set(normalized)] : ["Drama"];
}

function inferMoods(genres: string[], overview: string, runtime: number) {
  const moods = new Set<string>();
  const lowerOverview = overview.toLowerCase();

  if (genres.includes("Comedy") || runtime <= 100) moods.add("Easy watch");
  if (genres.includes("Comedy") || genres.includes("Action")) moods.add("Fun");
  if (genres.includes("Thriller") || genres.includes("Horror") || genres.includes("Crime")) moods.add("Tense");
  if (genres.includes("Horror") || lowerOverview.includes("dark")) moods.add("Dark");
  if (genres.includes("Drama") || genres.includes("Sci-fi") || genres.includes("Crime")) moods.add("Thoughtful");

  if (!moods.size) moods.add("Thoughtful");
  return [...moods];
}

function inferIntensity(genres: string[], runtime: number): "low" | "medium" | "high" {
  if (genres.includes("Horror") || genres.includes("Thriller") || runtime >= 140) return "high";
  if (genres.includes("Action") || genres.includes("Crime") || runtime >= 115) return "medium";
  return "low";
}

function inferEnergy(genres: string[], runtime: number): "Low" | "Medium" | "High" {
  if (genres.includes("Action") || genres.includes("Comedy")) return "High";
  if (runtime <= 105) return "Medium";
  return "Low";
}

function inferTone(genres: string[]): "light" | "balanced" | "dark" {
  if (genres.includes("Horror") || genres.includes("Thriller")) return "dark";
  if (genres.includes("Comedy") || genres.includes("Romance")) return "light";
  return "balanced";
}

function inferComplexity(genres: string[], runtime: number): "easy" | "moderate" | "demanding" {
  if (runtime >= 145 || genres.includes("Drama")) return "moderate";
  if (genres.includes("Sci-fi") && runtime >= 120) return "demanding";
  return "easy";
}

function inferBestFor(genres: string[], moods: string[]) {
  const bestFor: MoviePick["bestFor"] = ["Solo"];
  if (moods.includes("Fun") || genres.includes("Comedy") || genres.includes("Action")) bestFor.push("Group");
  if (genres.includes("Romance") || moods.includes("Easy watch")) bestFor.push("Date night");
  return [...new Set(bestFor)] as MoviePick["bestFor"];
}

function looksLowQuality(title: string, overview: string, year?: number) {
  const lowerTitle = title.toLowerCase();
  const lowerOverview = overview.toLowerCase();

  if (title.length < 2) return true;
  if (/[\u0400-\u04FF\u0600-\u06FF\u0900-\u097F]/.test(title) && !/[a-zA-Z]/.test(title)) return true;
  if (lowerTitle.includes("season ") || lowerTitle.includes("episode ")) return true;
  if (lowerOverview.includes("reality") || lowerOverview.includes("documentary series")) return true;
  if (!overview || overview.trim().length < 40) return true;
  if (year && year > new Date().getFullYear() + 1) return true;
  if (/^[a-z0-9\s]+$/i.test(title) === false && title.length < 5) return true;
  return false;
}

function normalizeCandidate(candidate: ProviderMovieCandidate, fallbackService?: string): MoviePick {
  const overview = candidate.overview?.trim() || "Picked from live streaming inventory to match your filters.";
  const genres = normalizeGenres(candidate.genres);
  const runtime = candidate.runtime ?? 110;
  const moods = inferMoods(genres, overview, runtime);

  return {
    title: candidate.title,
    year: candidate.year ?? 2024,
    service: candidate.service ?? fallbackService ?? "Unknown",
    fit: overview,
    vibe: `${inferTone(genres)}, live-catalog pick`,
    whyTonight: overview,
    fallbackReason: "Live-catalog fallback matched from current streaming availability.",
    intensity: inferIntensity(genres, runtime),
    runtime,
    genres,
    moods,
    avoidTags: [],
    energy: inferEnergy(genres, runtime),
    tone: inferTone(genres),
    complexity: inferComplexity(genres, runtime),
    bestFor: inferBestFor(genres, moods),
    rewatchable: !genres.includes("Horror"),
    conversationStarter: genres.includes("Drama") || genres.includes("Sci-fi") || genres.includes("Crime"),
    goodFor: ["live inventory expansion", "broader streaming pool"],
  };
}

function scoreLiveCandidateQuality(candidate: ProviderMovieCandidate) {
  let score = 0;
  const overview = candidate.overview?.trim() || "";

  if (candidate.title.length >= 4) score += 2;
  if (overview.length >= 80) score += 3;
  if (candidate.runtime && candidate.runtime >= 80 && candidate.runtime <= 180) score += 2;
  if (candidate.year && candidate.year >= 1980 && candidate.year <= new Date().getFullYear() + 1) score += 1;
  if (candidate.genres && candidate.genres.length > 0) score += 2;

  return score;
}

async function fetchStreamingAvailabilityCandidates(query: LivePoolQuery): Promise<ProviderMovieCandidate[]> {
  const apiKey = getLiveApiKey();
  if (!apiKey) {
    return [];
  }

  const sourceIds = query.services
    .map((service) => serviceMap[service])
    .filter(Boolean)
    .join(",");

  const url = new URL("https://api.watchmode.com/v1/list-titles/");
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("types", "movie");
  url.searchParams.set("regions", (query.country || "us").toUpperCase());
  url.searchParams.set("limit", "50");
  url.searchParams.set("sort_by", "popularity_desc");
  if (sourceIds) url.searchParams.set("source_ids", sourceIds);

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) return [];

  const data = await response.json();
  const titles = Array.isArray(data.titles)
    ? data.titles
    : Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
        ? data.results
        : [];

  return titles
    .filter((title: any) => title?.title)
    .map((title: any) => ({
      title: title.title,
      year: title.year,
      service: query.services[0],
      genres: Array.isArray(title.genre_names)
        ? title.genre_names
        : Array.isArray(title.genre_ids)
          ? title.genre_ids.map(String)
          : [],
      runtime: title.runtime_minutes || title.runtime,
      overview: typeof title.plot_overview === "string"
        ? title.plot_overview
        : typeof title.overview === "string"
          ? title.overview
          : undefined,
    }))
    .filter((candidate: ProviderMovieCandidate) => !looksLowQuality(candidate.title, candidate.overview || "", candidate.year))
    .filter((candidate: ProviderMovieCandidate) => scoreLiveCandidateQuality(candidate) >= 6);
}

function curatedAnchorsForServices(services: string[]) {
  if (!services.length) return movieCatalog.slice(0, 12);
  return movieCatalog.filter((movie) => services.includes(movie.service));
}

export async function getLivePool(query: LivePoolQuery): Promise<LivePoolResult> {
  const candidates = await fetchStreamingAvailabilityCandidates(query);
  const normalizedLive = candidates.map((candidate) => normalizeCandidate(candidate, query.services[0]));
  const anchors = curatedAnchorsForServices(query.services);

  const merged = [...anchors];
  for (const liveMovie of normalizedLive) {
    if (!merged.some((movie) => movie.title.toLowerCase() === liveMovie.title.toLowerCase())) {
      merged.push(liveMovie);
    }
  }

  if (merged.length > 0) {
    return {
      source: "streaming-availability-api",
      movies: merged,
      liveCatalogReady: true,
      note: `Using live provider inventory with ${candidates.length} live titles before ranking, plus ${anchors.length} curated anchors.`,
    };
  }

  const filteredFallback = movieCatalog.filter((movie) => {
    if (query.services.length && !query.services.includes(movie.service)) {
      return false;
    }
    return true;
  });

  return {
    source: "curated-fallback",
    movies: filteredFallback.length ? filteredFallback : movieCatalog,
    liveCatalogReady: false,
    note: hasLiveApiKey()
      ? "API key detected, but live provider fetch returned no usable titles."
      : "API key needed to unlock live streaming inventory.",
  };
}
