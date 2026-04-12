import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/recommend", label: "Recommend" },
  { href: "/results?services=Netflix%2CMax&genres=Sci-fi%2CThriller&mood=Thoughtful", label: "Results" },
  { href: "/feedback", label: "Feedback" },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight text-white">
            WatchTonight
          </Link>
          <nav className="flex flex-wrap gap-2 text-sm text-slate-300">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div>{children}</div>
    </div>
  );
}
