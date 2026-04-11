const picks = [
  {
    title: "Ex Machina",
    service: "Max",
    fit: "Best fit for someone who wants thoughtful sci-fi, tension, and strong atmosphere.",
    vibe: "Smart, tense, sleek",
  },
  {
    title: "Palm Springs",
    service: "Hulu",
    fit: "A strong option if tonight calls for something lighter, clever, and easy to say yes to.",
    vibe: "Funny, romantic, low-friction",
  },
  {
    title: "Michael Clayton",
    service: "Prime Video",
    fit: "Best for a serious, high-quality drama night with strong dialogue and adult tension.",
    vibe: "Sharp, adult, gripping",
  },
];

export default function ResultsPage() {
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
            This is the core MVP output. The product should make the decision
            feel clearer than opening three different streaming apps.
          </p>
        </div>

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
                  <h2 className="mt-2 text-2xl font-semibold">{pick.title}</h2>
                  <p className="mt-1 text-sm text-slate-400">Where to watch: {pick.service}</p>
                </div>
                {index === 0 ? (
                  <div className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white">
                    Best overall pick tonight
                  </div>
                ) : null}
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">
                    Why it fits
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{pick.fit}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">
                    Vibe
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{pick.vibe}</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
