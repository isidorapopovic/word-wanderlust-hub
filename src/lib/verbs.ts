// Verb conjugation data for language learning practice.
// Structure is designed to scale: add more verbs, tenses, or languages by
// extending the objects below. All explanations are written in English.

export type LanguageCode = "it" | "fr" | "es";
export type TenseCode = "present" | "future" | "imperfect" | "past_perfect";
export type PersonCode = "1s" | "2s" | "3s" | "1p" | "2p" | "3p";

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export interface TenseInfo {
  code: TenseCode;
  name: string;
  description: string;
}

export interface PersonInfo {
  code: PersonCode;
  // Pronoun label per language for prompt display.
  pronoun: Record<LanguageCode, string>;
  englishPronoun: string;
}

// Each verb carries its infinitive, English meaning, and a full conjugation
// table keyed by tense and person.
export interface VerbEntry {
  infinitive: string;
  english: string;
  forms: Record<TenseCode, Record<PersonCode, string>>;
  // Optional example sentences per tense that use the person "3s" (he/she) —
  // kept simple so the same template works across languages.
  sentences?: Partial<Record<TenseCode, SentenceTemplate[]>>;
}

// A sentence template. The blank is where the conjugated verb goes.
// Use {verb} as the placeholder; translation is the English gloss.
export interface SentenceTemplate {
  person: PersonCode;
  // Text with {verb} placeholder in the target language.
  template: string;
  // English translation of the full sentence for context.
  translation: string;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
];

export const TENSES: TenseInfo[] = [
  {
    code: "present",
    name: "Present",
    description:
      "Describes actions happening right now or general facts and habits.",
  },
  {
    code: "future",
    name: "Future",
    description: "Describes actions that will happen at a later time.",
  },
  {
    code: "imperfect",
    name: "Imperfect",
    description:
      "Describes ongoing, repeated, or background actions in the past.",
  },
  {
    code: "past_perfect",
    name: "Past Perfect",
    description:
      "Describes an action that had been completed before another past action.",
  },
];

export const PERSONS: PersonInfo[] = [
  { code: "1s", englishPronoun: "I",         pronoun: { it: "io",   fr: "je",    es: "yo" } },
  { code: "2s", englishPronoun: "you",       pronoun: { it: "tu",   fr: "tu",    es: "tú" } },
  { code: "3s", englishPronoun: "he/she",    pronoun: { it: "lui",  fr: "il",    es: "él" } },
  { code: "1p", englishPronoun: "we",        pronoun: { it: "noi",  fr: "nous",  es: "nosotros" } },
  { code: "2p", englishPronoun: "you (pl.)", pronoun: { it: "voi",  fr: "vous",  es: "vosotros" } },
  { code: "3p", englishPronoun: "they",      pronoun: { it: "loro", fr: "ils",   es: "ellos" } },
];

// -------------------------- VERB DATABASES --------------------------
// A small, curated starter set per language. Add more entries freely —
// the practice engine picks verbs at random.

const italianVerbs: VerbEntry[] = [
  {
    infinitive: "parlare",
    english: "to speak",
    forms: {
      present:      { "1s": "parlo",    "2s": "parli",    "3s": "parla",    "1p": "parliamo",  "2p": "parlate",   "3p": "parlano" },
      future:       { "1s": "parlerò",  "2s": "parlerai", "3s": "parlerà",  "1p": "parleremo", "2p": "parlerete", "3p": "parleranno" },
      imperfect:    { "1s": "parlavo",  "2s": "parlavi",  "3s": "parlava",  "1p": "parlavamo", "2p": "parlavate", "3p": "parlavano" },
      past_perfect: { "1s": "avevo parlato", "2s": "avevi parlato", "3s": "aveva parlato", "1p": "avevamo parlato", "2p": "avevate parlato", "3p": "avevano parlato" },
    },
    sentences: {
      present:      [{ person: "3s", template: "Maria {verb} italiano ogni giorno.", translation: "Maria speaks Italian every day." }],
      future:       [{ person: "1s", template: "Domani {verb} con il professore.", translation: "Tomorrow I will speak with the professor." }],
      imperfect:    [{ person: "3p", template: "Da bambini {verb} sempre in dialetto.", translation: "As children they always spoke in dialect." }],
      past_perfect: [{ person: "1p", template: "Quando è arrivata, noi {verb} già del progetto.", translation: "When she arrived, we had already spoken about the project." }],
    },
  },
  {
    infinitive: "mangiare",
    english: "to eat",
    forms: {
      present:      { "1s": "mangio",    "2s": "mangi",    "3s": "mangia",   "1p": "mangiamo",  "2p": "mangiate",  "3p": "mangiano" },
      future:       { "1s": "mangerò",   "2s": "mangerai", "3s": "mangerà",  "1p": "mangeremo", "2p": "mangerete", "3p": "mangeranno" },
      imperfect:    { "1s": "mangiavo",  "2s": "mangiavi", "3s": "mangiava", "1p": "mangiavamo","2p": "mangiavate","3p": "mangiavano" },
      past_perfect: { "1s": "avevo mangiato", "2s": "avevi mangiato", "3s": "aveva mangiato", "1p": "avevamo mangiato", "2p": "avevate mangiato", "3p": "avevano mangiato" },
    },
    sentences: {
      present:      [{ person: "1s", template: "Io {verb} la pasta a pranzo.", translation: "I eat pasta for lunch." }],
      future:       [{ person: "2s", template: "Stasera tu {verb} al ristorante.", translation: "Tonight you will eat at the restaurant." }],
      imperfect:    [{ person: "3s", template: "Da piccolo {verb} sempre gelato.", translation: "As a child he always ate ice cream." }],
      past_perfect: [{ person: "3p", template: "Quando siamo arrivati, loro {verb} già.", translation: "When we arrived, they had already eaten." }],
    },
  },
  {
    infinitive: "essere",
    english: "to be",
    forms: {
      present:      { "1s": "sono",    "2s": "sei",    "3s": "è",       "1p": "siamo",  "2p": "siete",   "3p": "sono" },
      future:       { "1s": "sarò",    "2s": "sarai",  "3s": "sarà",    "1p": "saremo", "2p": "sarete",  "3p": "saranno" },
      imperfect:    { "1s": "ero",     "2s": "eri",    "3s": "era",     "1p": "eravamo","2p": "eravate", "3p": "erano" },
      past_perfect: { "1s": "ero stato", "2s": "eri stato", "3s": "era stato", "1p": "eravamo stati", "2p": "eravate stati", "3p": "erano stati" },
    },
    sentences: {
      present:      [{ person: "1s", template: "Io {verb} molto felice oggi.", translation: "I am very happy today." }],
      future:       [{ person: "3p", template: "Loro {verb} in vacanza a luglio.", translation: "They will be on vacation in July." }],
      imperfect:    [{ person: "2s", template: "Tu {verb} sempre gentile con me.", translation: "You were always kind to me." }],
      past_perfect: [{ person: "3s", template: "Lui {verb} in Italia prima di trasferirsi.", translation: "He had been in Italy before moving." }],
    },
  },
  {
    infinitive: "avere",
    english: "to have",
    forms: {
      present:      { "1s": "ho",       "2s": "hai",     "3s": "ha",      "1p": "abbiamo",  "2p": "avete",    "3p": "hanno" },
      future:       { "1s": "avrò",     "2s": "avrai",   "3s": "avrà",    "1p": "avremo",   "2p": "avrete",   "3p": "avranno" },
      imperfect:    { "1s": "avevo",    "2s": "avevi",   "3s": "aveva",   "1p": "avevamo",  "2p": "avevate",  "3p": "avevano" },
      past_perfect: { "1s": "avevo avuto","2s": "avevi avuto","3s": "aveva avuto","1p": "avevamo avuto","2p": "avevate avuto","3p": "avevano avuto" },
    },
    sentences: {
      present:      [{ person: "1p", template: "Noi {verb} una casa in campagna.", translation: "We have a house in the countryside." }],
      future:       [{ person: "2p", template: "Voi {verb} tempo domani?", translation: "Will you have time tomorrow?" }],
      imperfect:    [{ person: "1s", template: "Da bambino io {verb} un cane nero.", translation: "As a child I had a black dog." }],
      past_perfect: [{ person: "3p", template: "Loro {verb} molte difficoltà prima.", translation: "They had had many difficulties before." }],
    },
  },
];

const frenchVerbs: VerbEntry[] = [
  {
    infinitive: "parler",
    english: "to speak",
    forms: {
      present:      { "1s": "parle",    "2s": "parles",   "3s": "parle",    "1p": "parlons",   "2p": "parlez",    "3p": "parlent" },
      future:       { "1s": "parlerai", "2s": "parleras", "3s": "parlera",  "1p": "parlerons", "2p": "parlerez",  "3p": "parleront" },
      imperfect:    { "1s": "parlais",  "2s": "parlais",  "3s": "parlait",  "1p": "parlions",  "2p": "parliez",   "3p": "parlaient" },
      past_perfect: { "1s": "avais parlé", "2s": "avais parlé", "3s": "avait parlé", "1p": "avions parlé", "2p": "aviez parlé", "3p": "avaient parlé" },
    },
    sentences: {
      present:      [{ person: "3s", template: "Marie {verb} français couramment.", translation: "Marie speaks French fluently." }],
      future:       [{ person: "1s", template: "Demain je {verb} au directeur.", translation: "Tomorrow I will speak to the director." }],
      imperfect:    [{ person: "3p", template: "Ils {verb} toujours de politique.", translation: "They were always talking about politics." }],
      past_perfect: [{ person: "1p", template: "Nous {verb} déjà avant son arrivée.", translation: "We had already spoken before his arrival." }],
    },
  },
  {
    infinitive: "manger",
    english: "to eat",
    forms: {
      present:      { "1s": "mange",    "2s": "manges",   "3s": "mange",    "1p": "mangeons",  "2p": "mangez",    "3p": "mangent" },
      future:       { "1s": "mangerai", "2s": "mangeras", "3s": "mangera",  "1p": "mangerons", "2p": "mangerez",  "3p": "mangeront" },
      imperfect:    { "1s": "mangeais", "2s": "mangeais", "3s": "mangeait", "1p": "mangions",  "2p": "mangiez",   "3p": "mangeaient" },
      past_perfect: { "1s": "avais mangé","2s": "avais mangé","3s": "avait mangé","1p": "avions mangé","2p": "aviez mangé","3p": "avaient mangé" },
    },
    sentences: {
      present:      [{ person: "1s", template: "Je {verb} une pomme chaque matin.", translation: "I eat an apple every morning." }],
      future:       [{ person: "2s", template: "Ce soir tu {verb} au restaurant.", translation: "Tonight you will eat at the restaurant." }],
      imperfect:    [{ person: "3s", template: "Enfant, il {verb} toujours des bonbons.", translation: "As a child, he always ate candy." }],
      past_perfect: [{ person: "3p", template: "Quand nous sommes arrivés, ils {verb} déjà.", translation: "When we arrived, they had already eaten." }],
    },
  },
  {
    infinitive: "être",
    english: "to be",
    forms: {
      present:      { "1s": "suis",     "2s": "es",       "3s": "est",      "1p": "sommes",    "2p": "êtes",      "3p": "sont" },
      future:       { "1s": "serai",    "2s": "seras",    "3s": "sera",     "1p": "serons",    "2p": "serez",     "3p": "seront" },
      imperfect:    { "1s": "étais",    "2s": "étais",    "3s": "était",    "1p": "étions",    "2p": "étiez",     "3p": "étaient" },
      past_perfect: { "1s": "avais été","2s": "avais été","3s": "avait été","1p": "avions été","2p": "aviez été", "3p": "avaient été" },
    },
    sentences: {
      present:      [{ person: "1s", template: "Je {verb} très content aujourd'hui.", translation: "I am very happy today." }],
      future:       [{ person: "3p", template: "Ils {verb} en vacances en juillet.", translation: "They will be on vacation in July." }],
      imperfect:    [{ person: "2s", template: "Tu {verb} toujours gentil avec moi.", translation: "You were always kind to me." }],
      past_perfect: [{ person: "3s", template: "Il {verb} malade avant de partir.", translation: "He had been sick before leaving." }],
    },
  },
  {
    infinitive: "avoir",
    english: "to have",
    forms: {
      present:      { "1s": "ai",       "2s": "as",       "3s": "a",        "1p": "avons",     "2p": "avez",      "3p": "ont" },
      future:       { "1s": "aurai",    "2s": "auras",    "3s": "aura",     "1p": "aurons",    "2p": "aurez",     "3p": "auront" },
      imperfect:    { "1s": "avais",    "2s": "avais",    "3s": "avait",    "1p": "avions",    "2p": "aviez",     "3p": "avaient" },
      past_perfect: { "1s": "avais eu", "2s": "avais eu", "3s": "avait eu", "1p": "avions eu", "2p": "aviez eu",  "3p": "avaient eu" },
    },
    sentences: {
      present:      [{ person: "1p", template: "Nous {verb} une maison à la campagne.", translation: "We have a house in the countryside." }],
      future:       [{ person: "2p", template: "Vous {verb} du temps demain?", translation: "Will you have time tomorrow?" }],
      imperfect:    [{ person: "1s", template: "Enfant, j'{verb} un chien noir.", translation: "As a child, I had a black dog." }],
      past_perfect: [{ person: "3p", template: "Ils {verb} beaucoup de difficultés avant.", translation: "They had had many difficulties before." }],
    },
  },
];

const spanishVerbs: VerbEntry[] = [
  {
    infinitive: "hablar",
    english: "to speak",
    forms: {
      present:      { "1s": "hablo",    "2s": "hablas",   "3s": "habla",    "1p": "hablamos",  "2p": "habláis",   "3p": "hablan" },
      future:       { "1s": "hablaré",  "2s": "hablarás", "3s": "hablará",  "1p": "hablaremos","2p": "hablaréis", "3p": "hablarán" },
      imperfect:    { "1s": "hablaba",  "2s": "hablabas", "3s": "hablaba",  "1p": "hablábamos","2p": "hablabais", "3p": "hablaban" },
      past_perfect: { "1s": "había hablado","2s": "habías hablado","3s": "había hablado","1p": "habíamos hablado","2p": "habíais hablado","3p": "habían hablado" },
    },
    sentences: {
      present:      [{ person: "3s", template: "María {verb} español todos los días.", translation: "Maria speaks Spanish every day." }],
      future:       [{ person: "1s", template: "Mañana {verb} con el profesor.", translation: "Tomorrow I will speak with the professor." }],
      imperfect:    [{ person: "3p", template: "De niños siempre {verb} en dialecto.", translation: "As children they always spoke in dialect." }],
      past_perfect: [{ person: "1p", template: "Cuando llegó, ya {verb} del proyecto.", translation: "When she arrived, we had already spoken about the project." }],
    },
  },
  {
    infinitive: "comer",
    english: "to eat",
    forms: {
      present:      { "1s": "como",     "2s": "comes",    "3s": "come",     "1p": "comemos",   "2p": "coméis",    "3p": "comen" },
      future:       { "1s": "comeré",   "2s": "comerás",  "3s": "comerá",   "1p": "comeremos", "2p": "comeréis",  "3p": "comerán" },
      imperfect:    { "1s": "comía",    "2s": "comías",   "3s": "comía",    "1p": "comíamos",  "2p": "comíais",   "3p": "comían" },
      past_perfect: { "1s": "había comido","2s": "habías comido","3s": "había comido","1p": "habíamos comido","2p": "habíais comido","3p": "habían comido" },
    },
    sentences: {
      present:      [{ person: "1s", template: "Yo {verb} pasta en el almuerzo.", translation: "I eat pasta for lunch." }],
      future:       [{ person: "2s", template: "Esta noche tú {verb} en el restaurante.", translation: "Tonight you will eat at the restaurant." }],
      imperfect:    [{ person: "3s", template: "De pequeño siempre {verb} helado.", translation: "As a child he always ate ice cream." }],
      past_perfect: [{ person: "3p", template: "Cuando llegamos, ellos ya {verb}.", translation: "When we arrived, they had already eaten." }],
    },
  },
  {
    infinitive: "ser",
    english: "to be",
    forms: {
      present:      { "1s": "soy",      "2s": "eres",     "3s": "es",       "1p": "somos",     "2p": "sois",      "3p": "son" },
      future:       { "1s": "seré",     "2s": "serás",    "3s": "será",     "1p": "seremos",   "2p": "seréis",    "3p": "serán" },
      imperfect:    { "1s": "era",      "2s": "eras",     "3s": "era",      "1p": "éramos",    "2p": "erais",     "3p": "eran" },
      past_perfect: { "1s": "había sido","2s": "habías sido","3s": "había sido","1p": "habíamos sido","2p": "habíais sido","3p": "habían sido" },
    },
    sentences: {
      present:      [{ person: "1s", template: "Yo {verb} muy feliz hoy.", translation: "I am very happy today." }],
      future:       [{ person: "3p", template: "Ellos {verb} muy famosos algún día.", translation: "They will be very famous someday." }],
      imperfect:    [{ person: "2s", template: "Tú siempre {verb} amable conmigo.", translation: "You were always kind to me." }],
      past_perfect: [{ person: "3s", template: "Él {verb} profesor antes de jubilarse.", translation: "He had been a teacher before retiring." }],
    },
  },
  {
    infinitive: "tener",
    english: "to have",
    forms: {
      present:      { "1s": "tengo",    "2s": "tienes",   "3s": "tiene",    "1p": "tenemos",   "2p": "tenéis",    "3p": "tienen" },
      future:       { "1s": "tendré",   "2s": "tendrás",  "3s": "tendrá",   "1p": "tendremos", "2p": "tendréis",  "3p": "tendrán" },
      imperfect:    { "1s": "tenía",    "2s": "tenías",   "3s": "tenía",    "1p": "teníamos",  "2p": "teníais",   "3p": "tenían" },
      past_perfect: { "1s": "había tenido","2s": "habías tenido","3s": "había tenido","1p": "habíamos tenido","2p": "habíais tenido","3p": "habían tenido" },
    },
    sentences: {
      present:      [{ person: "1p", template: "Nosotros {verb} una casa en el campo.", translation: "We have a house in the countryside." }],
      future:       [{ person: "2p", template: "¿Vosotros {verb} tiempo mañana?", translation: "Will you have time tomorrow?" }],
      imperfect:    [{ person: "1s", template: "De niño yo {verb} un perro negro.", translation: "As a child I had a black dog." }],
      past_perfect: [{ person: "3p", template: "Ellos {verb} muchas dificultades antes.", translation: "They had had many difficulties before." }],
    },
  },
];

export const VERBS: Record<LanguageCode, VerbEntry[]> = {
  it: italianVerbs,
  fr: frenchVerbs,
  es: spanishVerbs,
};

// -------------------------- Exercise generation --------------------------

export interface Exercise {
  language: LanguageCode;
  tense: TenseCode;
  verb: VerbEntry;
  person: PersonCode;
  // The sentence with a blank marker `___` where the answer goes.
  prompt: string;
  translation: string;
  // Correct conjugated form.
  answer: string;
  // Alternate accepted answers (e.g. without diacritics) — normalized.
  accepted: string[];
}

function stripAccents(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function normalizeAnswer(s: string): string {
  return stripAccents(s.trim().toLowerCase()).replace(/\s+/g, " ");
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Fallback template if a verb has no example sentences for this tense.
function fallbackTemplate(
  language: LanguageCode,
  person: PersonCode,
): SentenceTemplate {
  const pron = PERSONS.find((p) => p.code === person)!.pronoun[language];
  return {
    person,
    template: `${pron.charAt(0).toUpperCase() + pron.slice(1)} {verb}.`,
    translation: `${PERSONS.find((p) => p.code === person)!.englishPronoun} ___.`,
  };
}

export function generateExercise(
  language: LanguageCode,
  tense: TenseCode,
): Exercise {
  const verb = pick(VERBS[language]);
  const templates = verb.sentences?.[tense];
  const template =
    templates && templates.length > 0
      ? pick(templates)
      : fallbackTemplate(language, pick(PERSONS).code);

  const answer = verb.forms[tense][template.person];
  const prompt = template.template.replace("{verb}", "_____");

  return {
    language,
    tense,
    verb,
    person: template.person,
    prompt,
    translation: template.translation.replace("{verb}", answer),
    answer,
    accepted: [normalizeAnswer(answer)],
  };
}

export function checkAnswer(exercise: Exercise, input: string): boolean {
  return exercise.accepted.includes(normalizeAnswer(input));
}
