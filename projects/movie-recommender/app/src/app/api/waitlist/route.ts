import { NextRequest, NextResponse } from "next/server";
import { persistWaitlistEntry } from "@/app/lib/waitlist";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body?.email || typeof body.email !== "string") {
    return NextResponse.json({ ok: false, error: "Email is required." }, { status: 400 });
  }

  const entry = {
    email: body.email,
    name: body.name || "",
    interest: body.interest || "",
    premiumInterest: body.premiumInterest || "",
    createdAt: new Date().toISOString(),
  };

  const result = await persistWaitlistEntry(entry);

  return NextResponse.json({
    ok: true,
    message: "Waitlist capture received.",
    entry,
    destination: result.destination,
    note:
      result.destination === "supabase"
        ? "Waitlist signup stored in Supabase."
        : "Waitlist signup accepted, but Supabase is not configured yet. Add SUPABASE_URL and SUPABASE_ANON_KEY to make storage durable.",
    warning: result.error || undefined,
  });
}
