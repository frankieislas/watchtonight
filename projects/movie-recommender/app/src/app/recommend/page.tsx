const services = [
  "Netflix",
  "Hulu",
  "Max",
  "Prime Video",
  "Disney+",
  "Apple TV+",
  "Peacock",
  "Paramount+",
];

const genres = [
  "Sci-fi",
  "Thriller",
  "Comedy",
  "Drama",
  "Action",
  "Romance",
  "Horror",
  "Crime",
];

const moods = ["Easy watch", "Thoughtful", "Dark", "Fun", "Tense"];

export default function RecommendPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Recommendation Input
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Tell WatchTonight what kind of night this is.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300">
            This is the first MVP input screen. The goal is to keep setup fast
            enough that it still beats browsing for twenty minutes.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-semibold">1. Streaming services</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <label
                  key={service}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200"
                >
                  <input type="checkbox" className="h-4 w-4" />
                  {service}
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-semibold">2. Tonight&apos;s mood</h2>
            <div className="flex flex-wrap gap-3">
              {moods.map((mood) => (
                <button
                  key={mood}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                >
                  {mood}
                </button>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-xl font-semibold">3. Taste profile</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-medium text-slate-300">
                Genres you usually like
              </p>
              <div className="flex flex-wrap gap-3">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-slate-300">
                Anything you want to avoid tonight?
              </p>
              <textarea
                className="min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none"
                placeholder="Examples: too slow, too depressing, too long, too intense"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-full bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400">
              See my top 3 picks
            </button>
            <button className="rounded-full border border-white/10 px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/5">
              Skip and use defaults
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
