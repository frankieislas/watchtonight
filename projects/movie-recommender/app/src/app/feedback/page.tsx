const watched = [
  {
    title: "Ex Machina",
    service: "Max",
    why: "Sharp sci-fi with real atmosphere and a high-confidence recommendation profile.",
  },
  {
    title: "Palm Springs",
    service: "Hulu",
    why: "A high-utility choice when the user wants something fun, easy, and still genuinely good.",
  },
];

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Feedback Loop
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Help WatchTonight get smarter.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300">
            This MVP page is the memory layer. It captures what you watched,
            what worked, and what to avoid next time.
          </p>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-xl font-semibold">Recently recommended</h2>
          <div className="space-y-4">
            {watched.map((movie) => (
              <div
                key={movie.title}
                className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                    <p className="text-sm text-slate-400">{movie.service}</p>
                  </div>
                  <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                    Watched feedback
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{movie.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-xl font-semibold">Quick feedback</h2>
          <div className="grid gap-5">
            <input
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none"
              placeholder="Movie title"
            />
            <input
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none"
              placeholder="Rating (1-10)"
            />
            <textarea
              className="min-h-28 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none"
              placeholder="What did you like?"
            />
            <textarea
              className="min-h-28 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none"
              placeholder="What did not work for you?"
            />
            <button className="w-fit rounded-full bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400">
              Save feedback
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
