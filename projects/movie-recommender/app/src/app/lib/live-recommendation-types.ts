import { CompanyType, EnergyLevel, MoviePick, RecommendationInput } from "@/app/lib/recommendation-data";

export type LivePoolQuery = {
  services: string[];
  genres: string[];
  mood: string;
  avoid: string;
  energy: EnergyLevel | "";
  company: CompanyType | "";
  maxRuntime: string;
  country?: string;
};

export type ProviderMovieCandidate = Partial<MoviePick> & {
  title: string;
  year?: number;
  service?: string;
  genres?: string[];
  runtime?: number;
  overview?: string;
  imageUrl?: string;
};

export type LivePoolResult = {
  source: "curated-fallback" | "streaming-availability-api";
  movies: MoviePick[];
  liveCatalogReady: boolean;
  note?: string;
};

export function recommendationInputToLiveQuery(input: RecommendationInput): LivePoolQuery {
  return {
    services: input.services,
    genres: input.genres,
    mood: input.mood,
    avoid: input.avoid,
    energy: input.energy,
    company: input.company,
    maxRuntime: input.maxRuntime,
    country: "us",
  };
}
