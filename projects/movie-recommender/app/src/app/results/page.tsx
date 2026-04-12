"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ResultsView } from "./ResultsView";
import { RecommendationInput } from "@/app/lib/recommendation-data";

function parseList(value?: string | null) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function ResultsContent() {
  const searchParams = useSearchParams();

  const input: RecommendationInput = {
    services: parseList(searchParams.get("services")),
    genres: parseList(searchParams.get("genres")),
    mood: searchParams.get("mood") || "Thoughtful",
    avoid: searchParams.get("avoid") || "",
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
          Recommendation Output
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Tonight&apos;s top 3 picks.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-300">
          This output now uses your current setup plus saved taste defaults if
          you reuse them from the recommendation flow.
        </p>
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full bg-white/5 px-3 py-1">
            Services: {input.services.length ? input.services.join(", ") : "Any"}
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1">
            Genres: {input.genres.length ? input.genres.join(", ") : "Mixed"}
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1">
            Mood: {input.mood || "Thoughtful"}
          </span>
        </div>
        {input.avoid ? (
          <p className="mt-4 text-slate-400">Avoid tonight: {input.avoid}</p>
        ) : null}
      </section>

      <ResultsView input={input} />

      <section className="rounded-3xl border border-indigo-400/20 bg-indigo-500/10 p-6 text-sm text-indigo-100">
        <p className="font-semibold">What to do next</p>
        <p className="mt-2 text-indigo-100/85">
          If one of these feels right, go watch it. If not, adjust your inputs
          or leave feedback so the next round gets sharper.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/recommend"
            className="rounded-full border border-white/10 px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/5"
          >
            Adjust my inputs
          </Link>
          <Link
            href="/feedback"
            className="rounded-full bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
          >
            Leave feedback
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <main className="px-6 py-12 text-white">
      <Suspense fallback={<div className="mx-auto max-w-5xl text-sm text-slate-400">Loading results...</div>}>
        <ResultsContent />
      </Suspense>
    </main>
  );
}
