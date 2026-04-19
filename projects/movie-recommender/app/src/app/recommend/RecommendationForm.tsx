"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  buildRecommendationQuery,
  companyOptions,
  energyOptions,
  maxRuntimeOptions,
  moodOptions,
  streamingServices,
  tasteGenres,
} from "@/app/lib/recommendation-data";
import {
  defaultTasteMemory,
  TasteMemory,
  tasteMemoryStorageKey,
} from "@/app/lib/taste-memory";

function loadInitialMemory(): TasteMemory {
  if (typeof window === "undefined") {
    return defaultTasteMemory;
  }

  const stored = window.localStorage.getItem(tasteMemoryStorageKey);
  if (!stored) {
    return defaultTasteMemory;
  }

  try {
    return JSON.parse(stored) as TasteMemory;
  } catch {
    return defaultTasteMemory;
  }
}

export function RecommendationForm() {
  const router = useRouter();
  const [memorySaved, setMemorySaved] = useState(false);
  const [memory, setMemory] = useState<TasteMemory>(() => loadInitialMemory());
  const [selectedServices, setSelectedServices] = useState<string[]>(() => memory.defaultServices);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(() => memory.favoriteGenres);
  const [selectedMood, setSelectedMood] = useState<string>(() => memory.preferredMood);
  const [avoid, setAvoid] = useState(() => memory.avoidPhrases.join(", "));
  const [selectedEnergy, setSelectedEnergy] = useState<"" | "Low" | "Medium" | "High">("");
  const [selectedCompany, setSelectedCompany] = useState<"" | "Solo" | "Date night" | "Group">("");
  const [selectedMaxRuntime, setSelectedMaxRuntime] = useState("120");

  const canSubmit = useMemo(
    () =>
      selectedServices.length > 0 ||
      selectedGenres.length > 0 ||
      Boolean(selectedMood) ||
      Boolean(selectedEnergy) ||
      Boolean(selectedCompany),
    [selectedCompany, selectedEnergy, selectedGenres.length, selectedMood, selectedServices.length],
  );

  const toggleValue = (
    value: string,
    selected: string[],
    setter: (next: string[]) => void,
  ) => {
    setter(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  };

  const saveProfile = () => {
    const nextMemory: TasteMemory = {
      favoriteGenres: selectedGenres,
      dislikedGenres: memory.dislikedGenres || [],
      defaultServices: selectedServices,
      preferredMood: selectedMood,
      avoidPhrases: avoid
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      preferredEnergy: selectedEnergy,
      preferredCompany: selectedCompany,
      maxRuntimePreference: selectedMaxRuntime,
      likedTitles: memory.likedTitles || [],
      dislikedTitles: memory.dislikedTitles || [],
      genreAffinity: memory.genreAffinity || {},
      moodAffinity: memory.moodAffinity || {},
      serviceAffinity: memory.serviceAffinity || {},
      lastUpdatedLabel: "Saved from recommendation setup",
    };

    window.localStorage.setItem(tasteMemoryStorageKey, JSON.stringify(nextMemory));
    setMemory(nextMemory);
    setMemorySaved(true);
    window.setTimeout(() => setMemorySaved(false), 2000);
  };

  const onSubmit = () => {
    const query = buildRecommendationQuery({
      services: selectedServices,
      genres: selectedGenres,
      mood: selectedMood,
      avoid,
      energy: selectedEnergy,
      company: selectedCompany,
      maxRuntime: selectedMaxRuntime,
    });

    router.push(`/results?${query}`);
  };

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-5 text-sm text-emerald-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Taste memory active</p>
            <p className="mt-1 text-emerald-100/80">
              WatchTonight is preloading your saved services, genres, mood, and avoid notes.
            </p>
          </div>
          <div className="rounded-full bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.15em]">
            {memory.lastUpdatedLabel}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-xl font-semibold">1. Streaming services</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {streamingServices.map((service) => {
              const active = selectedServices.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleValue(service, selectedServices, setSelectedServices)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    active
                      ? "border-indigo-400 bg-indigo-500/20 text-white"
                      : "border-white/10 text-slate-200 hover:bg-white/5"
                  }`}
                >
                  {service}
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-xl font-semibold">2. Tonight&apos;s mood</h2>
          <div className="flex flex-wrap gap-3">
            {moodOptions.map((mood) => {
              const active = selectedMood === mood;
              return (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setSelectedMood(mood)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    active
                      ? "border-emerald-300 bg-emerald-300/15 text-white"
                      : "border-white/10 text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {mood}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-xl font-semibold">3. Night setup</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <p className="mb-3 text-sm font-medium text-slate-300">Energy level</p>
            <div className="flex flex-wrap gap-3">
              {energyOptions.map((energy) => {
                const active = selectedEnergy === energy;
                return (
                  <button
                    key={energy}
                    type="button"
                    onClick={() => setSelectedEnergy(energy)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? "border-emerald-300 bg-emerald-300/15 text-white"
                        : "border-white/10 text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    {energy}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium text-slate-300">Who is this for?</p>
            <div className="flex flex-wrap gap-3">
              {companyOptions.map((company) => {
                const active = selectedCompany === company;
                return (
                  <button
                    key={company}
                    type="button"
                    onClick={() => setSelectedCompany(company)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? "border-indigo-400 bg-indigo-500/20 text-white"
                        : "border-white/10 text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    {company}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium text-slate-300">Max runtime</p>
            <div className="flex flex-wrap gap-3">
              {maxRuntimeOptions.map((runtime) => {
                const active = selectedMaxRuntime === runtime;
                return (
                  <button
                    key={runtime}
                    type="button"
                    onClick={() => setSelectedMaxRuntime(runtime)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? "border-indigo-400 bg-indigo-500/20 text-white"
                        : "border-white/10 text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    {runtime === "Any" ? "Any length" : `${runtime} min max`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-xl font-semibold">4. Taste profile</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium text-slate-300">
              Genres you usually like
            </p>
            <div className="flex flex-wrap gap-3">
              {tasteGenres.map((genre) => {
                const active = selectedGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleValue(genre, selectedGenres, setSelectedGenres)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? "border-indigo-400 bg-indigo-500/20 text-white"
                        : "border-white/10 text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    {genre}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium text-slate-300">
              Anything you want to avoid tonight?
            </p>
            <textarea
              value={avoid}
              onChange={(event) => setAvoid(event.target.value)}
              className="min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none"
              placeholder="Examples: too slow, too depressing, too long, too intense"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={onSubmit}
            className="rounded-full bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            See my top 3 picks
          </button>
          <button
            type="button"
            onClick={saveProfile}
            className="rounded-full border border-white/10 px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/5"
          >
            Save my taste profile
          </button>
          {memorySaved ? (
            <div className="self-center text-sm text-emerald-300">Taste profile saved locally.</div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
