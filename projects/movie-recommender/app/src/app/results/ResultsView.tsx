import { getRecommendations, RecommendationInput } from "@/app/lib/recommendation-data";

export function ResultsView({ input }: { input: RecommendationInput }) {
  const picks = getRecommendations(input);

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
                Pick {index + 1}
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

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 md:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">
                Why it fits
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{pick.whyTonight}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                {pick.reasons.map((reason) => (
                  <li key={reason}>• {reason}</li>
                ))}
              </ul>
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
