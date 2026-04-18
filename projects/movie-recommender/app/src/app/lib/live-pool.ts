import {
  movieCatalog,
  MoviePick,
} from "@/app/lib/recommendation-data";
import {
  LivePoolQuery,
  LivePoolResult,
  ProviderMovieCandidate,
} from "@/app/lib/live-recommendation-types";

function hasLiveApiKey() {
  return Boolean(process.env.STREAMING_AVAILABILITY_API_KEY);
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

async function fetchStreamingAvailabilityCandidates(_query: LivePoolQuery): Promise<ProviderMovieCandidate[]> {
  if (!hasLiveApiKey()) {
    return [];
  }

  // Integration scaffold only for now. When the API key is available,
  // this function becomes the single place to wire the provider request.
  return [];
}

export async function getLivePool(query: LivePoolQuery): Promise<LivePoolResult> {
  const candidates = await fetchStreamingAvailabilityCandidates(query);

  if (candidates.length > 0) {
    return {
      source: "streaming-availability-api",
      movies: candidates.map((candidate) => normalizeCandidate(candidate, query.services[0])),
      liveCatalogReady: true,
      note: "Using live streaming-availability inventory.",
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
      ? "Live adapter scaffold exists, but provider fetching is not wired yet."
      : "API key needed to unlock live streaming inventory.",
  };
}
