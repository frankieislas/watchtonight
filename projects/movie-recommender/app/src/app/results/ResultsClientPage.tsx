"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ResultsView } from "./ResultsView";
import { getRecommendations, RecommendationInput } from "@/app/lib/recommendation-data";
import { defaultTasteMemory, tasteMemoryStorageKey, TasteMemory, bumpAffinity } from "@/app/lib/taste-memory";
import { recommendationOutcomesStorageKey, RecommendationOutcome } from "@/app/lib/recommendation-outcomes";

function parseList(value?: string | null) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function loadTasteMemory(): TasteMemory {
  if (typeof window === "undefined") return defaultTasteMemory;

  const stored = window.localStorage.getItem(tasteMemoryStorageKey);
  if (!stored) return defaultTasteMemory;

  try {
    return JSON.parse(stored) as TasteMemory;
  } catch {
    return defaultTasteMemory;
  }
}

function loadOutcomes(): RecommendationOutcome[] {
  if (typeof window === "undefined") return [];
  const stored = window.localStorage.getItem(recommendationOutcomesStorageKey);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as RecommendationOutcome[];
  } catch {
    return [];
  }
}

export function ResultsClientPage() {
  const searchParams = useSearchParams();

  const memory = loadTasteMemory();

  const input: RecommendationInput = {
    services: parseList(searchParams.get("services")),
    genres: parseList(searchParams.get("genres")),
    mood: searchParams.get("mood") || "Thoughtful",
    avoid: searchParams.get("avoid") || "",
    energy: (searchParams.get("energy") as RecommendationInput["energy"]) || "",
    company: (searchParams.get("company") as RecommendationInput["company"]) || "",
    maxRuntime: searchParams.get("maxRuntime") || "120",
    memorySignals: {
      likedTitles: memory.likedTitles,
      dislikedTitles: memory.dislikedTitles,
      shownTitles: memory.shownTitles,
      openedTitles: memory.openedTitles,
      savedTitles: memory.savedTitles,
      dismissedTitles: memory.dismissedTitles,
      genreAffinity: memory.genreAffinity,
      moodAffinity: memory.moodAffinity,
      serviceAffinity: memory.serviceAffinity,
    },
  };

  const picks = getRecommendations(input);

  useEffect(() => {
    const outcomes = loadOutcomes();
    const timestamp = new Date().toISOString();

    const nextOutcomes = [
      ...picks.map((pick) => ({
        title: pick.title,
        service: pick.service,
        action: "shown" as const,
        timestamp,
      })),
      ...outcomes,
    ].slice(0, 80);

    window.localStorage.setItem(recommendationOutcomesStorageKey, JSON.stringify(nextOutcomes));

    const nextMemory: TasteMemory = {
      ...memory,
      shownTitles: [...new Set([...picks.map((pick) => pick.title), ...memory.shownTitles])].slice(0, 40),
      genreAffinity: bumpAffinity(memory.genreAffinity, input.genres, 0.3),
      moodAffinity: input.mood ? bumpAffinity(memory.moodAffinity, [input.mood], 0.3) : memory.moodAffinity,
      serviceAffinity: bumpAffinity(memory.serviceAffinity, input.services, 0.2),
      lastUpdatedLabel: "Learned from recommendation outcomes",
    };

    window.localStorage.setItem(tasteMemoryStorageKey, JSON.stringify(nextMemory));
  }, []);

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
          This page now reads your current selections again in the deployed MVP,
          so different inputs can produce different recommendations.
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
          <span className="rounded-full bg-white/5 px-3 py-1">
            Energy: {input.energy || "Any"}
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1">
            Company: {input.company || "Any"}
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1">
            Max runtime: {input.maxRuntime === "Any" ? "Any" : `${input.maxRuntime} min`}
          </span>
        </div>
        {input.avoid ? (
          <p className="mt-4 text-slate-400">Avoid tonight: {input.avoid}</p>
        ) : null}
      </section>

      <ResultsView input={input} picks={picks} />

      <section className="rounded-3xl border border-indigo-400/20 bg-indigo-500/10 p-6 text-sm text-indigo-100">
        <p className="font-semibold">What to do next</p>
        <p className="mt-2 text-indigo-100/85">
          If one of these feels right, go watch it. If not, head back to the
          recommendation page or leave feedback for the next product pass.
        </p>
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 p-4 text-indigo-50">
          <p className="font-semibold">Would you pay for a smarter version of this?</p>
          <p className="mt-2 text-sm text-indigo-100/85">
            We are testing whether people want a premium version with better personalization,
            stronger movie memory, and faster movie-night decisions.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/recommend"
            className="rounded-full border border-white/10 px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/5"
          >
            Back to recommend
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
