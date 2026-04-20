export type WaitlistEntry = {
  email: string;
  name?: string;
  interest?: string;
  premiumInterest?: string;
  createdAt: string;
};

export const waitlistStorageKey = "watchtonight.waitlist";
