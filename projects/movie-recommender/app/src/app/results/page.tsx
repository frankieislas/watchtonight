import Link from "next/link";
import { ResultsView } from "./ResultsView";
import { RecommendationInput } from "@/app/lib/recommendation-data";

function parseList(value?: string) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const input: RecommendationInput = {
    services: parseList(typeof params.services === "string" ? params.services : undefined),
    genres: parseList(typeof params.genres === "string" ? params.genres : undefined),
    mood: typeof params.mood === "string" ? params.mood : "Thoughtful",
    avoid: typeof params.avoid === "string" ? params.avoid : "",
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Recommendation Output
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Tonight&apos;s top 3 picks.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300">
            This is now wired to the recommendation input flow, using a simple
            first-pass scoring model to produce results from your selections.
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

        <div className="flex flex-wrap gap-4">
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
      </div>
    </main>
  );
}
