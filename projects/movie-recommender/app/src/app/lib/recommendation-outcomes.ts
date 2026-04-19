export type RecommendationOutcome = {
  title: string;
  service: string;
  action: "shown" | "opened" | "saved" | "dismissed";
  timestamp: string;
};

export const recommendationOutcomesStorageKey = "watchtonight.recommendation-outcomes";
