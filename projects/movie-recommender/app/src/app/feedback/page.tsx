"use client";

import { useMemo, useState } from "react";
import { defaultTasteMemory, tasteMemoryStorageKey, TasteMemory } from "@/app/lib/taste-memory";
import { feedbackMemoryStorageKey, FeedbackMemoryEntry } from "@/app/lib/feedback-memory";

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

function loadStoredFeedback(): FeedbackMemoryEntry[] {
  if (typeof window === "undefined") return [];

  const stored = window.localStorage.getItem(feedbackMemoryStorageKey);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as FeedbackMemoryEntry[];
  } catch {
    return [];
  }
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

export default function FeedbackPage() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [liked, setLiked] = useState("");
  const [disliked, setDisliked] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [entries, setEntries] = useState<FeedbackMemoryEntry[]>(() => loadStoredFeedback());

  const feedbackCount = useMemo(() => entries.length, [entries.length]);

  const saveFeedback = () => {
    const nextEntry: FeedbackMemoryEntry = {
      title: title || "Untitled movie",
      rating,
      liked,
      disliked,
      updatedAt: "Saved from feedback screen",
    };

    const nextEntries = [nextEntry, ...entries].slice(0, 8);
    window.localStorage.setItem(feedbackMemoryStorageKey, JSON.stringify(nextEntries));
    setEntries(nextEntries);

    const tasteMemory = loadTasteMemory();
    const nextAvoidPhrases = [...new Set([
      ...tasteMemory.avoidPhrases,
      ...disliked
        .split(",")
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean),
    ])];

    const nextTasteMemory: TasteMemory = {
      ...tasteMemory,
      avoidPhrases: nextAvoidPhrases,
      lastUpdatedLabel: `Learned from feedback on ${nextEntry.title}`,
    };

    window.localStorage.setItem(tasteMemoryStorageKey, JSON.stringify(nextTasteMemory));

    setSavedMessage("Feedback saved. Taste memory updated for future recommendations.");
    setTitle("");
    setRating("");
    setLiked("");
    setDisliked("");
    window.setTimeout(() => setSavedMessage(""), 2500);
  };

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
            This page now saves feedback locally and pushes disliked notes into
            taste memory so future recommendations can avoid repeating bad fits.
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
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Quick feedback</h2>
            <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
              Stored entries: {feedbackCount}
            </div>
          </div>
          <div className="grid gap-5">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none"
              placeholder="Movie title"
            />
            <input
              value={rating}
              onChange={(event) => setRating(event.target.value)}
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none"
              placeholder="Rating (1-10)"
            />
            <textarea
              value={liked}
              onChange={(event) => setLiked(event.target.value)}
              className="min-h-28 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none"
              placeholder="What did you like?"
            />
            <textarea
              value={disliked}
              onChange={(event) => setDisliked(event.target.value)}
              className="min-h-28 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none"
              placeholder="What did not work for you? Use short phrases like too slow, too dark, too long"
            />
            <button
              type="button"
              onClick={saveFeedback}
              className="w-fit rounded-full bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
            >
              Save feedback
            </button>
            {savedMessage ? <p className="text-sm text-emerald-300">{savedMessage}</p> : null}
          </div>
        </section>

        {entries.length ? (
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-semibold">Saved feedback memory</h2>
            <div className="space-y-4">
              {entries.map((entry) => (
                <div
                  key={`${entry.title}-${entry.updatedAt}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold">{entry.title}</h3>
                    <div className="text-xs text-slate-400">{entry.updatedAt}</div>
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-slate-300">
                    <p><span className="font-semibold text-white">Rating:</span> {entry.rating || "n/a"}</p>
                    <p><span className="font-semibold text-white">Liked:</span> {entry.liked || "n/a"}</p>
                    <p><span className="font-semibold text-white">Didn&apos;t work:</span> {entry.disliked || "n/a"}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
