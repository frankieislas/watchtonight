"use client";

import { RankedRecommendation, RecommendationInput } from "@/app/lib/recommendation-data";
import { recommendationOutcomesStorageKey, RecommendationOutcome } from "@/app/lib/recommendation-outcomes";
import { bumpAffinity, defaultTasteMemory, tasteMemoryStorageKey, TasteMemory } from "@/app/lib/taste-memory";

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

function trackOutcome(pick: RankedRecommendation, action: RecommendationOutcome["action"]) {
  if (typeof window === "undefined") return;

  const outcomes = loadOutcomes();
  const timestamp = new Date().toISOString();
  const nextOutcomes = [
    { title: pick.title, service: pick.service, action, timestamp },
    ...outcomes,
  ].slice(0, 120);
  window.localStorage.setItem(recommendationOutcomesStorageKey, JSON.stringify(nextOutcomes));

  const memory = loadTasteMemory();
  const delta = action === "saved" ? 3 : action === "opened" ? 2 : action === "dismissed" ? -3 : 0;

  const nextMemory: TasteMemory = {
    ...memory,
    openedTitles: action === "opened"
      ? [...new Set([pick.title, ...memory.openedTitles])].slice(0, 30)
      : memory.openedTitles,
    savedTitles: action === "saved"
      ? [...new Set([pick.title, ...memory.savedTitles])].slice(0, 30)
      : memory.savedTitles,
    dismissedTitles: action === "dismissed"
      ? [...new Set([pick.title, ...memory.dismissedTitles])].slice(0, 30)
      : memory.dismissedTitles,
    genreAffinity: bumpAffinity(memory.genreAffinity, pick.genres, delta),
    moodAffinity: bumpAffinity(memory.moodAffinity, pick.moods, delta > 0 ? 1 : delta),
    serviceAffinity: bumpAffinity(memory.serviceAffinity, [pick.service], delta > 0 ? 1 : delta),
    lastUpdatedLabel: `Learned from ${action} on ${pick.title}`,
  };

  window.localStorage.setItem(tasteMemoryStorageKey, JSON.stringify(nextMemory));
}

function getDecisionAngle(index: number) {
  if (index === 0) return "Best overall pick";
  if (index === 1) return "Safer backup option";
  return "Wildcard option";
}

function getDecisionSummary(index: number, runtime: number, intensity: string, vibe: string) {
  if (index === 0) {
    return `This is the strongest overall fit tonight, with a ${vibe.toLowerCase()} profile and a ${runtime}-minute runtime.`;
  }

  if (index === 1) {
    return `A more flexible backup if the top pick feels slightly off. Runtime is ${runtime} minutes and the intensity stays ${intensity}.`;
  }

  return "This is the wildcard, picked to give you a meaningfully different flavor instead of a near-duplicate.";
}

export function ResultsView({ input, picks }: { input: RecommendationInput; picks: RankedRecommendation[] }) {

  return (
    <div className="grid gap-5">
      {picks.map((pick, index) => (
        <section
          key={pick.title}
          className="rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                {getDecisionAngle(index)}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                {pick.title} <span className="text-slate-400">({pick.year})</span>
              </h2>
              <p className="mt-1 text-sm text-slate-400">Where to watch: {pick.service}</p>
            </div>
            {index === 0 ? (
              <div className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white">
                Best overall pick tonight
              </div>
            ) : null}
          </div>

          <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100">
            <p className="font-semibold">Decision summary</p>
            <p className="mt-2 text-emerald-100/85">{getDecisionSummary(index, pick.runtime, pick.intensity, pick.vibe)}</p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 md:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">
                Why it fits tonight
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{pick.whyTonight}</p>
              <p className="mt-3 text-sm leading-6 text-slate-200">{pick.friendNote}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                {pick.reasons.map((reason) => (
                  <li key={reason}>• {reason}</li>
                ))}
              </ul>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                <p className="font-semibold text-white">Best when...</p>
                <ul className="mt-2 space-y-2 text-slate-400">
                  {pick.goodFor.map((scenario) => (
                    <li key={scenario}>• {scenario}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => trackOutcome(pick, "saved")}
                  className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-300/20"
                >
                  Save this
                </button>
                <button
                  type="button"
                  onClick={() => trackOutcome(pick, "opened")}
                  className="rounded-full border border-indigo-300/30 bg-indigo-300/10 px-4 py-2 text-sm font-medium text-indigo-100 transition hover:bg-indigo-300/20"
                >
                  Watched / interested
                </button>
                <button
                  type="button"
                  onClick={() => trackOutcome(pick, "dismissed")}
                  className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-100 transition hover:bg-amber-300/20"
                >
                  Not for me
                </button>
              </div>
              {pick.caution ? (
                <p className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
                  {pick.caution}
                </p>
              ) : null}
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">
                Quick read
              </h3>
              <div className="mt-3 space-y-3 text-sm text-slate-300">
                <p>
                  <span className="font-semibold text-white">Vibe:</span> {pick.vibe}
                </p>
                <p>
                  <span className="font-semibold text-white">Runtime:</span> {pick.runtime} min
                </p>
                <p>
                  <span className="font-semibold text-white">Intensity:</span> {pick.intensity}
                </p>
                <p>
                  <span className="font-semibold text-white">Tone:</span> {pick.tone}
                </p>
                <p>
                  <span className="font-semibold text-white">Complexity:</span> {pick.complexity}
                </p>
                <p>
                  <span className="font-semibold text-white">Best for:</span> {pick.bestFor.join(", ")}
                </p>
                <p>
                  <span className="font-semibold text-white">Match score:</span> {pick.score}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
