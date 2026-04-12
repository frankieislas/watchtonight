import { Suspense } from "react";
import { ResultsClientPage } from "./ResultsClientPage";

export default function ResultsPage() {
  return (
    <main className="px-6 py-12 text-white">
      <Suspense fallback={<div className="mx-auto max-w-5xl text-sm text-slate-400">Loading results...</div>}>
        <ResultsClientPage />
      </Suspense>
    </main>
  );
}
