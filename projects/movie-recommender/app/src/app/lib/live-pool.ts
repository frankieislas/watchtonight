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

function normalizeCandidate(candidate: ProviderMovieCandidate, fallbackService?: string): MoviePick {
  const genres = candidate.genres?.length ? candidate.genres : ["Drama"];
  const moods = genres.includes("Comedy")
    ? ["Fun", "Easy watch"]
    : genres.includes("Horror")
      ? ["Dark", "Tense"]
      : ["Thoughtful"];

  return {
    title: candidate.title,
    year: candidate.year ?? 2024,
    service: candidate.service ?? fallbackService ?? "Unknown",
    fit: candidate.overview ?? "Live catalog pick tailored from current streaming availability.",
    vibe: "Fresh, live-catalog pick",
    whyTonight: candidate.overview ?? "Picked from a larger live streaming catalog to better match your filters.",
    fallbackReason: "Live-catalog fallback matched from current streaming availability.",
    intensity: moods.includes("Dark") || moods.includes("Tense") ? "medium" : "low",
    runtime: candidate.runtime ?? 110,
    genres,
    moods,
    avoidTags: [],
    energy: moods.includes("Fun") ? "Medium" : "Low",
    tone: moods.includes("Dark") ? "dark" : "balanced",
    complexity: "easy",
    bestFor: ["Solo", "Date night", "Group"],
    rewatchable: true,
    conversationStarter: false,
    goodFor: ["live inventory expansion", "broader streaming pool"],
  };
}

async function fetchStreamingAvailabilityCandidates(query: LivePoolQuery): Promise<ProviderMovieCandidate[]> {
  const apiKey = getLiveApiKey();
  if (!apiKey) {
    return [];
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

  const sourceIds = query.services
    .map((service) => serviceMap[service])
    .filter(Boolean)
    .join(",");

  const url = new URL("https://api.watchmode.com/v1/list-titles/");
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("types", "movie");
  url.searchParams.set("regions", (query.country || "us").toUpperCase());
  url.searchParams.set("limit", "40");
  url.searchParams.set("sort_by", "popularity_desc");
  if (sourceIds) {
    url.searchParams.set("source_ids", sourceIds);
  }

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

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
    }));
}

export async function getLivePool(query: LivePoolQuery): Promise<LivePoolResult> {
  const candidates = await fetchStreamingAvailabilityCandidates(query);

  if (candidates.length > 0) {
    return {
      source: "streaming-availability-api",
      movies: candidates.map((candidate) => normalizeCandidate(candidate, query.services[0])),
      liveCatalogReady: true,
      note: `Using live provider inventory with ${candidates.length} live titles before ranking.`,
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
