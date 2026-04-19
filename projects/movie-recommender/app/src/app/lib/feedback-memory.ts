export type FeedbackMemoryEntry = {
  title: string;
  rating: string;
  liked: string;
  disliked: string;
  service?: string;
  genres?: string[];
  moods?: string[];
  updatedAt: string;
};

export const feedbackMemoryStorageKey = "watchtonight.feedback-memory";
