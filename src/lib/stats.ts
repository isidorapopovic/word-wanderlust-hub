// Local, per-browser progress tracking: streaks, overall accuracy, and
// per-tense / per-verb accuracy. Persisted to localStorage; no backend.

import type { LanguageCode, TenseCode } from "@/lib/verbs";

const STORAGE_KEY = "lingua.stats.v1";

export interface Tally {
  correct: number;
  total: number;
}

export interface StreakState {
  current: number;
  longest: number;
  // Local YYYY-MM-DD of the last recorded attempt, or null if none yet.
  lastDate: string | null;
}

export interface StatsState {
  version: 1;
  totals: Tally;
  byTense: Partial<Record<TenseCode, Tally>>;
  // Keyed by `${language}:${infinitive}`.
  byVerb: Record<string, Tally>;
  streak: StreakState;
}

export function defaultStats(): StatsState {
  return {
    version: 1,
    totals: { correct: 0, total: 0 },
    byTense: {},
    byVerb: {},
    streak: { current: 0, longest: 0, lastDate: null },
  };
}

function bump(tally: Tally, correct: boolean): Tally {
  return { correct: tally.correct + (correct ? 1 : 0), total: tally.total + 1 };
}

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function yesterdayKey(today: string): string {
  const d = new Date(`${today}T00:00:00`);
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function loadStats(): StatsState {
  if (typeof window === "undefined") return defaultStats();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStats();
    const parsed = JSON.parse(raw);
    if (parsed?.version !== 1) return defaultStats();
    return parsed as StatsState;
  } catch {
    return defaultStats();
  }
}

function saveStats(state: StatsState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function recordAttempt(input: {
  language: LanguageCode;
  tense: TenseCode;
  verb: string;
  correct: boolean;
}): StatsState {
  const state = loadStats();

  state.totals = bump(state.totals, input.correct);
  state.byTense[input.tense] = bump(
    state.byTense[input.tense] ?? { correct: 0, total: 0 },
    input.correct,
  );
  const verbKey = `${input.language}:${input.verb}`;
  state.byVerb[verbKey] = bump(
    state.byVerb[verbKey] ?? { correct: 0, total: 0 },
    input.correct,
  );

  const today = todayKey();
  if (state.streak.lastDate !== today) {
    state.streak.current =
      state.streak.lastDate === yesterdayKey(today) ? state.streak.current + 1 : 1;
    state.streak.longest = Math.max(state.streak.longest, state.streak.current);
    state.streak.lastDate = today;
  }

  saveStats(state);
  return state;
}

export function resetStats(): StatsState {
  const state = defaultStats();
  saveStats(state);
  return state;
}
