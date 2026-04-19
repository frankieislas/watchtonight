export type TasteMemory = {
  favoriteGenres: string[];
  dislikedGenres: string[];
  defaultServices: string[];
  preferredMood: string;
  avoidPhrases: string[];
  preferredEnergy?: "Low" | "Medium" | "High" | "";
  preferredCompany?: "Solo" | "Date night" | "Group" | "";
  maxRuntimePreference?: string;
  likedTitles: string[];
  dislikedTitles: string[];
  shownTitles: string[];
  openedTitles: string[];
  savedTitles: string[];
  dismissedTitles: string[];
  genreAffinity: Record<string, number>;
  moodAffinity: Record<string, number>;
  serviceAffinity: Record<string, number>;
  lastUpdatedLabel: string;
};

export const defaultTasteMemory: TasteMemory = {
  favoriteGenres: ["Sci-fi", "Thriller"],
  dislikedGenres: [],
  defaultServices: ["Netflix", "Max"],
  preferredMood: "Thoughtful",
  avoidPhrases: ["too depressing"],
  preferredEnergy: "",
  preferredCompany: "",
  maxRuntimePreference: "120",
  likedTitles: [],
  dislikedTitles: [],
  shownTitles: [],
  openedTitles: [],
  savedTitles: [],
  dismissedTitles: [],
  genreAffinity: {},
  moodAffinity: {},
  serviceAffinity: {},
  lastUpdatedLabel: "Seed profile",
};

export const tasteMemoryStorageKey = "watchtonight.taste-memory";

export function bumpAffinity(map: Record<string, number>, keys: string[], amount: number) {
  const next = { ...map };
  for (const key of keys) {
    if (!key) continue;
    next[key] = (next[key] || 0) + amount;
  }
  return next;
}
