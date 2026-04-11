import { RecommendationForm } from "./RecommendationForm";

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
            Pick your streaming services, choose a mood, set your taste, and get
            three strong recommendations without the usual scrolling spiral.
          </p>
        </div>

        <RecommendationForm />
      </div>
    </main>
  );
}
