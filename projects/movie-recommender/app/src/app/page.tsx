import Link from "next/link";
import { WaitlistForm } from "./components/WaitlistForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-12">
        <section className="flex flex-1 flex-col justify-center gap-10">
          <div className="max-w-3xl space-y-6">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              WatchTonight MVP
            </div>
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Stop scrolling. Get 3 great movies to watch tonight.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              WatchTonight helps you pick something worth watching in under a
              minute, based on your streaming services, your taste, and the kind
              of night you want.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/recommend"
                className="rounded-full bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
              >
                Start recommendations
              </Link>
              <Link
                href="/results?services=Max%2CNetflix&genres=Sci-fi%2CThriller&mood=Thoughtful"
                className="rounded-full border border-white/15 px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/5"
              >
                Preview example results
              </Link>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-2 text-xl font-semibold">Pick your services</h2>
              <p className="text-sm leading-6 text-slate-300">
                Choose the streaming apps you already use so the picks are
                actually available tonight.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-2 text-xl font-semibold">Set your taste</h2>
              <p className="text-sm leading-6 text-slate-300">
                Tell us what you like, what you avoid, and what kind of mood
                you are in.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-2 text-xl font-semibold">Get your top 3</h2>
              <p className="text-sm leading-6 text-slate-300">
                See three strong picks, where to watch them, and one best
                overall option if you want the easy answer.
              </p>
            </div>
          </div>

          <WaitlistForm />
        </section>
      </div>
    </main>
  );
}
