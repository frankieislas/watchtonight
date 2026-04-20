"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("I want smarter movie recommendations.");
  const [premiumInterest, setPremiumInterest] = useState("Yes, if it gets noticeably smarter over time.");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function submitWaitlist() {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, interest, premiumInterest }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Something went wrong.");
      } else {
        setMessage("You’re on the early list. We’ll reach out when the smarter version is ready.");
        setEmail("");
        setName("");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-6 text-white">
      <div className="max-w-2xl space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Early access
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Want the smarter version when it launches?</h2>
          <p className="mt-2 text-sm leading-6 text-emerald-100/85">
            Join the early list for better personalization, stronger memory, and faster movie-night decisions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none"
            placeholder="Name (optional)"
          />
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none"
            placeholder="Email"
          />
        </div>

        <textarea
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
          className="min-h-24 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none"
          placeholder="What would make this valuable for you?"
        />

        <textarea
          value={premiumInterest}
          onChange={(event) => setPremiumInterest(event.target.value)}
          className="min-h-20 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none"
          placeholder="Would you pay for a smarter premium version?"
        />

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={submitWaitlist}
            disabled={!email || saving}
            className="rounded-full bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Joining..." : "Join early access"}
          </button>
          {message ? <p className="text-sm text-emerald-100">{message}</p> : null}
        </div>
      </div>
    </section>
  );
}
