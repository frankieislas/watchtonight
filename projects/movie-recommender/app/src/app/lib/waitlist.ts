export type WaitlistEntry = {
  email: string;
  name?: string;
  interest?: string;
  premiumInterest?: string;
  createdAt: string;
};

export const waitlistStorageKey = "watchtonight.waitlist";

export type WaitlistWriteResult = {
  ok: boolean;
  destination: "supabase" | "local-fallback";
  error?: string;
};

function normalizeEntry(entry: Partial<WaitlistEntry>): WaitlistEntry {
  return {
    email: String(entry.email || "").trim(),
    name: String(entry.name || "").trim(),
    interest: String(entry.interest || "").trim(),
    premiumInterest: String(entry.premiumInterest || "").trim(),
    createdAt: entry.createdAt || new Date().toISOString(),
  };
}

async function writeToSupabase(entry: WaitlistEntry): Promise<WaitlistWriteResult> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      ok: false,
      destination: "supabase",
      error: "Missing SUPABASE_URL or SUPABASE_ANON_KEY.",
    };
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/waitlist_signups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email: entry.email,
      name: entry.name,
      interest: entry.interest,
      premium_interest: entry.premiumInterest,
      created_at: entry.createdAt,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown Supabase error.");
    return {
      ok: false,
      destination: "supabase",
      error: errorText,
    };
  }

  return { ok: true, destination: "supabase" };
}

export async function persistWaitlistEntry(rawEntry: Partial<WaitlistEntry>): Promise<WaitlistWriteResult> {
  const entry = normalizeEntry(rawEntry);

  if (!entry.email) {
    return {
      ok: false,
      destination: "local-fallback",
      error: "Email is required.",
    };
  }

  const supabaseAttempt = await writeToSupabase(entry);

  if (supabaseAttempt.ok) {
    return supabaseAttempt;
  }

  console.error("Waitlist persistence fallback:", supabaseAttempt.error);

  return {
    ok: true,
    destination: "local-fallback",
    error: supabaseAttempt.error,
  };
}
