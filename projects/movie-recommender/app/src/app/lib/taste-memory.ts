export type TasteMemory = {
  favoriteGenres: string[];
  dislikedGenres: string[];
  defaultServices: string[];
  preferredMood: string;
  avoidPhrases: string[];
  lastUpdatedLabel: string;
};

export const defaultTasteMemory: TasteMemory = {
  favoriteGenres: ["Sci-fi", "Thriller"],
  dislikedGenres: [],
  defaultServices: ["Netflix", "Max"],
  preferredMood: "Thoughtful",
  avoidPhrases: ["too depressing"],
  lastUpdatedLabel: "Seed profile",
};

export const tasteMemoryStorageKey = "watchtonight.taste-memory";
