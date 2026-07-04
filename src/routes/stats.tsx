import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LANGUAGES, TENSES, VERBS, type LanguageCode } from "@/lib/verbs";
import {
  loadStats,
  resetStats,
  defaultStats,
  type StatsState,
  type Tally,
} from "@/lib/stats";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Your progress — Lingua" },
      {
        name: "description",
        content:
          "Track your streak, accuracy, and weakest verbs across Italian, French and Spanish practice.",
      },
    ],
  }),
  component: Stats,
});

function pct(t: Tally): number {
  return t.total === 0 ? 0 : Math.round((t.correct / t.total) * 100);
}

interface WeakVerb extends Tally {
  language: LanguageCode;
  infinitive: string;
  english: string;
}

function Stats() {
  const [stats, setStats] = useState<StatsState>(() => defaultStats());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setStats(loadStats());
    setLoaded(true);
  }, []);

  function handleReset() {
    if (!window.confirm("Reset all saved progress? This can't be undone.")) return;
    setStats(resetStats());
  }

  const weakVerbs: WeakVerb[] = Object.entries(stats.byVerb)
    .map(([key, tally]) => {
      const [language, infinitive] = key.split(":") as [LanguageCode, string];
      const entry = VERBS[language]?.find((v) => v.infinitive === infinitive);
      return {
        language,
        infinitive,
        english: entry?.english ?? infinitive,
        correct: tally.correct,
        total: tally.total,
      };
    })
    .filter((v) => v.total >= 3)
    .sort((a, b) => pct(a) - pct(b))
    .slice(0, 8);

  const hasData = loaded && stats.totals.total > 0;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-xl font-semibold">
            Lingua<span className="text-primary">.</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              to="/practice"
              search={{ lang: "it", tenses: "present", mode: "sentence" }}
              className="text-muted-foreground hover:text-foreground"
            >
              Practice
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="font-display text-3xl md:text-4xl">Your progress</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Saved locally in this browser — no account needed.
        </p>

        {!hasData ? (
          <div className="mt-8 rounded-3xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              Practice a bit to see your stats here.
            </p>
            <Link
              to="/practice"
              search={{ lang: "it", tenses: "present", mode: "sentence" }}
              className="mt-4 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Start practicing
            </Link>
          </div>
        ) : (
          <>
            <section className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Current streak
                </div>
                <div className="mt-2 font-display text-3xl">
                  🔥 {stats.streak.current}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Longest streak
                </div>
                <div className="mt-2 font-display text-3xl">
                  {stats.streak.longest}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Overall accuracy
                </div>
                <div className="mt-2 font-display text-3xl">
                  {pct(stats.totals)}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {stats.totals.correct}/{stats.totals.total} correct
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="font-display text-xl mb-4">Accuracy by tense</h2>
              <div className="grid gap-3">
                {TENSES.map((t) => {
                  const tally = stats.byTense[t.code] ?? { correct: 0, total: 0 };
                  const p = pct(tally);
                  return (
                    <div
                      key={t.code}
                      className="rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{t.name}</span>
                        <span className="text-muted-foreground">
                          {tally.total > 0
                            ? `${p}% · ${tally.correct}/${tally.total}`
                            : "No attempts yet"}
                        </span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-secondary">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${p}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {weakVerbs.length > 0 && (
              <section className="mt-8">
                <h2 className="font-display text-xl mb-4">Verbs to review</h2>
                <div className="overflow-hidden rounded-2xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary text-left text-xs uppercase tracking-widest text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3">Verb</th>
                        <th className="px-4 py-3">English</th>
                        <th className="px-4 py-3 text-right">Accuracy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weakVerbs.map((v) => (
                        <tr
                          key={`${v.language}:${v.infinitive}`}
                          className="border-t border-border"
                        >
                          <td className="px-4 py-3">
                            <span className="mr-1.5">
                              {LANGUAGES.find((l) => l.code === v.language)?.flag}
                            </span>
                            {v.infinitive}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {v.english}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {pct(v)}%{" "}
                            <span className="text-muted-foreground">
                              ({v.correct}/{v.total})
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <div className="mt-10">
              <button
                onClick={handleReset}
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm text-muted-foreground transition hover:border-destructive hover:text-destructive"
              >
                Reset stats
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
