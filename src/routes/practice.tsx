import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  LANGUAGES,
  TENSES,
  PERSONS,
  VERBS,
  generateExerciseFromTenses,
  checkAnswer,
  type Exercise,
  type ExerciseMode,
  type LanguageCode,
  type TenseCode,
} from "@/lib/verbs";
import {
  generateParagraphExercise,
  checkParagraphBlank,
  type ParagraphExercise,
} from "@/lib/paragraphs";
import {
  loadStats,
  recordAttempt,
  defaultStats,
  type StatsState,
} from "@/lib/stats";

const TENSE_CODES = ["present", "future", "imperfect", "past_perfect"] as const;

// `tenses` is a comma-separated list in the URL (e.g. "present,future").
const searchSchema = z.object({
  lang: z.enum(["it", "fr", "es"]).catch("it"),
  tenses: z
    .string()
    .catch("present")
    .transform((s) => {
      const parts = s
        .split(",")
        .map((p) => p.trim())
        .filter((p): p is TenseCode =>
          (TENSE_CODES as readonly string[]).includes(p),
        );
      return parts.length > 0 ? parts : (["present"] as TenseCode[]);
    }),
  mode: z.enum(["sentence", "verb", "paragraph"]).catch("sentence"),
});

export const Route = createFileRoute("/practice")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Practice — Lingua" },
      {
        name: "description",
        content:
          "Fill-in-the-blank verb conjugation practice for Italian, French and Spanish — sentences, bare verb forms, or short paragraphs.",
      },
    ],
  }),
  component: Practice,
});

type Status = "idle" | "correct" | "incorrect";
type Search = { lang: LanguageCode; tenses: TenseCode[]; mode: ExerciseMode };

const MODES: { code: ExerciseMode; label: string }[] = [
  { code: "sentence", label: "Sentences" },
  { code: "verb", label: "Verbs only" },
  { code: "paragraph", label: "Paragraph" },
];

function Practice() {
  const { lang, tenses, mode } = Route.useSearch() as Search;
  const navigate = useNavigate({ from: "/practice" });

  const [exercise, setExercise] = useState<Exercise | null>(() =>
    mode === "paragraph" ? null : generateExerciseFromTenses(lang, tenses, mode),
  );
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const [paragraph, setParagraph] = useState<ParagraphExercise | null>(() =>
    mode === "paragraph" ? generateParagraphExercise(lang, tenses) : null,
  );
  const [pInputs, setPInputs] = useState<string[]>(
    paragraph ? new Array(paragraph.template.blanks.length).fill("") : [],
  );
  const [pChecked, setPChecked] = useState(false);
  const [pResults, setPResults] = useState<boolean[]>([]);

  const [stats, setStats] = useState<StatsState>(() => defaultStats());
  useEffect(() => {
    setStats(loadStats());
  }, []);

  const tensesKey = tenses.join(",");

  useEffect(() => {
    if (mode === "paragraph") {
      const p = generateParagraphExercise(lang, tenses);
      setParagraph(p);
      setPInputs(new Array(p.template.blanks.length).fill(""));
      setPChecked(false);
      setPResults([]);
      setExercise(null);
    } else {
      setExercise(generateExerciseFromTenses(lang, tenses, mode));
      setInput("");
      setStatus("idle");
      setParagraph(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, tensesKey, mode]);

  const language = LANGUAGES.find((l) => l.code === lang)!;
  const exerciseTense = exercise
    ? TENSES.find((t) => t.code === exercise.tense)!
    : null;
  const person = exercise
    ? PERSONS.find((p) => p.code === exercise.person)!
    : null;

  const availableVerbs = useMemo(() => VERBS[lang].length, [lang]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!exercise || status !== "idle" || input.trim() === "") return;
    const ok = checkAnswer(exercise, input);
    setStatus(ok ? "correct" : "incorrect");
    setScore((s) => ({
      correct: s.correct + (ok ? 1 : 0),
      total: s.total + 1,
    }));
    setStats(
      recordAttempt({
        language: lang,
        tense: exercise.tense,
        verb: exercise.verb.infinitive,
        correct: ok,
      }),
    );
  }

  function next() {
    setExercise(generateExerciseFromTenses(lang, tenses, mode));
    setInput("");
    setStatus("idle");
  }

  function checkParagraph(e: React.FormEvent) {
    e.preventDefault();
    if (!paragraph || pChecked) return;
    const results = pInputs.map((val, i) => checkParagraphBlank(paragraph, i, val));
    setPResults(results);
    setPChecked(true);
    setScore((s) => ({
      correct: s.correct + results.filter(Boolean).length,
      total: s.total + results.length,
    }));

    let latest = stats;
    paragraph.template.blanks.forEach((b, i) => {
      latest = recordAttempt({
        language: lang,
        tense: b.tense,
        verb: b.infinitive,
        correct: results[i],
      });
    });
    setStats(latest);
  }

  function nextParagraph() {
    const p = generateParagraphExercise(lang, tenses);
    setParagraph(p);
    setPInputs(new Array(p.template.blanks.length).fill(""));
    setPChecked(false);
    setPResults([]);
  }

  function toggleTense(code: TenseCode) {
    const has = tenses.includes(code);
    const nextTenses = has
      ? tenses.filter((t) => t !== code)
      : [...tenses, code];
    if (nextTenses.length === 0) return; // keep at least one selected
    const ordered = TENSES.map((t) => t.code).filter((c) =>
      nextTenses.includes(c),
    );
    navigate({
      search: (s: Search) => ({
        ...s,
        tenses: ordered.join(",") as unknown as TenseCode[],
      }),
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-xl font-semibold">
            Lingua<span className="text-primary">.</span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/stats" className="hover:text-foreground">
              🔥 {stats.streak.current} day streak
            </Link>
            <span>
              Score:{" "}
              <span className="font-medium text-foreground">
                {score.correct}/{score.total}
              </span>
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <section className="grid gap-6 mb-8">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Language
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() =>
                    navigate({
                      search: (s: Search) => ({ ...s, lang: l.code }),
                    })
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
            <div className="flex items-baseline justify-between">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Tenses (select one or more)
              </label>
              <span className="text-xs text-muted-foreground">
                {tenses.length} selected
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {TENSES.map((t) => {
                const active = tenses.includes(t.code);
                return (
                  <button
                    key={t.code}
                    onClick={() => toggleTense(t.code)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Exercise mode
            </label>
            <div className="mt-2 inline-flex rounded-full border border-border bg-card p-1">
              {MODES.map((m) => (
                <button
                  key={m.code}
                  onClick={() =>
                    navigate({
                      search: (s: Search) => ({ ...s, mode: m.code }),
                    })
                  }
                  className={`rounded-full px-4 py-1.5 text-sm transition ${
                    mode === m.code
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {mode === "sentence"
                ? "Fill in the missing verb inside a full sentence."
                : mode === "verb"
                  ? "Just conjugate the verb for the given pronoun — no context."
                  : "Fill in several blanks in a short passage using different verbs."}
            </p>
          </div>
        </section>

        {mode !== "paragraph" && exercise && exerciseTense && person && (
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
                {person.englishPronoun} · {exerciseTense.name}
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
                  placeholder={`Type the ${exerciseTense.name.toLowerCase()} form…`}
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
                  <>
                    Correct!{" "}
                    <span className="font-medium">{exercise.answer}</span> —{" "}
                    {exercise.translation}
                  </>
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
        )}

        {mode === "paragraph" && paragraph && (
          <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="text-sm text-muted-foreground">
              {paragraph.template.title}
            </div>

            <form onSubmit={checkParagraph} className="mt-6">
              <p className="font-display text-xl md:text-2xl leading-relaxed">
                {paragraph.segments.map((seg, i) => (
                  <span key={i}>
                    {seg}
                    {i < paragraph.template.blanks.length && (
                      <input
                        value={pInputs[i] ?? ""}
                        onChange={(e) => {
                          const nextInputs = [...pInputs];
                          nextInputs[i] = e.target.value;
                          setPInputs(nextInputs);
                        }}
                        disabled={pChecked}
                        autoComplete="off"
                        spellCheck={false}
                        className={`mx-1 w-28 rounded-md border px-2 py-1 align-baseline text-base outline-none transition ${
                          pChecked
                            ? pResults[i]
                              ? "border-[oklch(0.6_0.13_155)] bg-[oklch(0.94_0.05_155)] text-[oklch(0.32_0.09_155)]"
                              : "border-destructive bg-[oklch(0.95_0.05_25)] text-destructive"
                            : "border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring/30"
                        }`}
                      />
                    )}
                  </span>
                ))}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {!pChecked ? (
                  <button
                    type="submit"
                    className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
                    disabled={pInputs.some((v) => v.trim() === "")}
                  >
                    Check
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextParagraph}
                    className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90"
                  >
                    Next →
                  </button>
                )}
              </div>
            </form>

            {pChecked && (
              <div className="mt-6 rounded-2xl bg-secondary p-4 text-sm">
                <div className="mb-2 font-medium text-foreground">
                  {pResults.filter(Boolean).length}/{pResults.length} correct
                </div>
                {!pResults.every(Boolean) && (
                  <p className="mb-2 text-muted-foreground">
                    Correct answers: {paragraph.answers.join(", ")}
                  </p>
                )}
                <p className="opacity-80">{paragraph.template.translation}</p>
              </div>
            )}
          </section>
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {availableVerbs} verbs available in {language.name}.
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
      <span
        className={`font-semibold underline decoration-dotted underline-offset-4 ${cls}`}
      >
        {filled}
      </span>
      {parts[1] ?? ""}
    </>
  );
}
