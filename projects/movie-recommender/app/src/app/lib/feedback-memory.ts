export type FeedbackMemoryEntry = {
  title: string;
  rating: string;
  liked: string;
  disliked: string;
  updatedAt: string;
};

export const feedbackMemoryStorageKey = "watchtonight.feedback-memory";
