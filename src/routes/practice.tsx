import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  LANGUAGES,
  TENSES,
  PERSONS,
  VERBS,
  generateExercise,
  checkAnswer,
  type Exercise,
  type LanguageCode,
  type TenseCode,
} from "@/lib/verbs";

const searchSchema = z.object({
  lang: z.enum(["it", "fr", "es"]).catch("it"),
  tense: z
    .enum(["present", "future", "imperfect", "past_perfect"])
    .catch("present"),
});

export const Route = createFileRoute("/practice")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Practice — Lingua" },
      {
        name: "description",
        content:
          "Fill-in-the-blank verb conjugation practice for Italian, French and Spanish.",
      },
    ],
  }),
  component: Practice,
});

type Status = "idle" | "correct" | "incorrect";

function Practice() {
  const { lang, tense } = Route.useSearch() as { lang: LanguageCode; tense: TenseCode };
  const navigate = useNavigate({ from: "/practice" });
  type Search = { lang: LanguageCode; tense: TenseCode };

  const [exercise, setExercise] = useState<Exercise>(() =>
    generateExercise(lang, tense),
  );
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Regenerate whenever language/tense changes.
  useEffect(() => {
    setExercise(generateExercise(lang, tense));
    setInput("");
    setStatus("idle");
  }, [lang, tense]);

  const language = LANGUAGES.find((l) => l.code === lang)!;
  const tenseInfo = TENSES.find((t) => t.code === tense)!;
  const person = PERSONS.find((p) => p.code === exercise.person)!;

  const availableVerbs = useMemo(() => VERBS[lang].length, [lang]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status !== "idle" || input.trim() === "") return;
    const ok = checkAnswer(exercise, input);
    setStatus(ok ? "correct" : "incorrect");
    setScore((s) => ({ correct: s.correct + (ok ? 1 : 0), total: s.total + 1 }));
  }

  function next() {
    setExercise(generateExercise(lang, tense));
    setInput("");
    setStatus("idle");
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-xl font-semibold">
            Lingua<span className="text-primary">.</span>
          </Link>
          <div className="text-sm text-muted-foreground">
            Score:{" "}
            <span className="font-medium text-foreground">
              {score.correct}/{score.total}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        {/* Controls */}
        <section className="grid gap-6 md:grid-cols-2 mb-10">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Language
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() =>
                    navigate({ search: (s: Search) => ({ ...s, lang: l.code }) })
                  }
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    l.code === lang
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <span className="mr-1.5">{l.flag}</span>
                  {l.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Tense
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {TENSES.map((t) => (
                <button
                  key={t.code}
                  onClick={() =>
                    navigate({ search: (s: Search) => ({ ...s, tense: t.code }) })
                  }
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    t.code === tense
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tense description */}
        <div className="mb-8 rounded-2xl bg-secondary/60 p-5 text-sm text-secondary-foreground">
          <span className="font-medium">{tenseInfo.name} in {language.name}:</span>{" "}
          {tenseInfo.description}
        </div>

        {/* Exercise card */}
        <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm text-muted-foreground">
            <div>
              Conjugate{" "}
              <span className="font-display text-xl italic text-foreground">
                {exercise.verb.infinitive}
              </span>{" "}
              <span className="text-muted-foreground">
                ({exercise.verb.english})
              </span>
            </div>
            <div>
              {person.englishPronoun} · {tenseInfo.name}
            </div>
          </div>

          <form onSubmit={submit} className="mt-6">
            <p className="font-display text-2xl md:text-3xl leading-snug">
              {renderPromptWithBlank(exercise.prompt, input, status)}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <input
                autoFocus
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder={`Type the ${tenseInfo.name.toLowerCase()} form…`}
                className="flex-1 min-w-[220px] rounded-full border border-input bg-background px-5 py-3 font-sans text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
                disabled={status !== "idle"}
                autoComplete="off"
                spellCheck={false}
              />
              {status === "idle" ? (
                <button
                  type="submit"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
                  disabled={input.trim() === ""}
                >
                  Check
                </button>
              ) : (
                <button
                  type="button"
                  onClick={next}
                  className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90"
                >
                  Next →
                </button>
              )}
            </div>
          </form>

          {status !== "idle" && (
            <div
              className={`mt-6 rounded-2xl p-4 text-sm ${
                status === "correct"
                  ? "bg-[oklch(0.94_0.05_155)] text-[oklch(0.32_0.09_155)]"
                  : "bg-[oklch(0.95_0.05_25)] text-[oklch(0.35_0.13_25)]"
              }`}
            >
              {status === "correct" ? (
                <>Correct! <span className="font-medium">{exercise.answer}</span> — {exercise.translation}</>
              ) : (
                <>
                  Not quite. The answer is{" "}
                  <span className="font-medium">{exercise.answer}</span>.<br />
                  <span className="opacity-80">{exercise.translation}</span>
                </>
              )}
            </div>
          )}
        </section>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {availableVerbs} verbs available in {language.name}. More coming soon.
        </p>
      </main>
    </div>
  );
}

function renderPromptWithBlank(
  prompt: string,
  input: string,
  status: Status,
) {
  const parts = prompt.split("_____");
  const filled = input.trim() === "" ? "_____" : input;
  const cls =
    status === "correct"
      ? "text-[oklch(0.5_0.13_155)]"
      : status === "incorrect"
        ? "text-destructive"
        : "text-primary";
  return (
    <>
      {parts[0]}
      <span className={`font-semibold underline decoration-dotted underline-offset-4 ${cls}`}>
        {filled}
      </span>
      {parts[1] ?? ""}
    </>
  );
}
