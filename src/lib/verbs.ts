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
  {
    infinitive: "fare",
    english: "to do / to make",
    forms: {
      present:      { "1s": "faccio",   "2s": "fai",      "3s": "fa",       "1p": "facciamo", "2p": "fate",     "3p": "fanno" },
      future:       { "1s": "farò",     "2s": "farai",    "3s": "farà",     "1p": "faremo",   "2p": "farete",   "3p": "faranno" },
      imperfect:    { "1s": "facevo",   "2s": "facevi",   "3s": "faceva",   "1p": "facevamo", "2p": "facevate", "3p": "facevano" },
      past_perfect: { "1s": "avevo fatto", "2s": "avevi fatto", "3s": "aveva fatto", "1p": "avevamo fatto", "2p": "avevate fatto", "3p": "avevano fatto" },
    },
    sentences: {
      present:      [{ person: "3s", template: "Marco {verb} i compiti ogni sera.", translation: "Marco does his homework every evening." }],
      future:       [{ person: "1s", template: "Domani {verb} una torta per la festa.", translation: "Tomorrow I will make a cake for the party." }],
      imperfect:    [{ person: "3p", template: "Da bambini {verb} sempre rumore.", translation: "As children they always made noise." }],
      past_perfect: [{ person: "1p", template: "Quando è arrivata, noi {verb} già la spesa.", translation: "When she arrived, we had already done the shopping." }],
    },
  },
  {
    infinitive: "potere",
    english: "to be able to / can",
    forms: {
      present:      { "1s": "posso",    "2s": "puoi",     "3s": "può",      "1p": "possiamo", "2p": "potete",   "3p": "possono" },
      future:       { "1s": "potrò",    "2s": "potrai",   "3s": "potrà",    "1p": "potremo",  "2p": "potrete",  "3p": "potranno" },
      imperfect:    { "1s": "potevo",   "2s": "potevi",   "3s": "poteva",   "1p": "potevamo", "2p": "potevate", "3p": "potevano" },
      past_perfect: { "1s": "avevo potuto", "2s": "avevi potuto", "3s": "aveva potuto", "1p": "avevamo potuto", "2p": "avevate potuto", "3p": "avevano potuto" },
    },
    sentences: {
      present:      [{ person: "1s", template: "Io non {verb} venire stasera.", translation: "I cannot come tonight." }],
      future:       [{ person: "2s", template: "Domani tu {verb} finalmente riposare.", translation: "Tomorrow you will finally be able to rest." }],
      imperfect:    [{ person: "3s", template: "Da giovane {verb} correre per ore.", translation: "As a young man he could run for hours." }],
      past_perfect: [{ person: "3p", template: "Loro non {verb} partire prima delle otto.", translation: "They had not been able to leave before eight." }],
    },
  },
  {
    infinitive: "volere",
    english: "to want",
    forms: {
      present:      { "1s": "voglio",   "2s": "vuoi",     "3s": "vuole",    "1p": "vogliamo", "2p": "volete",   "3p": "vogliono" },
      future:       { "1s": "vorrò",    "2s": "vorrai",   "3s": "vorrà",    "1p": "vorremo",  "2p": "vorrete",  "3p": "vorranno" },
      imperfect:    { "1s": "volevo",   "2s": "volevi",   "3s": "voleva",   "1p": "volevamo", "2p": "volevate", "3p": "volevano" },
      past_perfect: { "1s": "avevo voluto", "2s": "avevi voluto", "3s": "aveva voluto", "1p": "avevamo voluto", "2p": "avevate voluto", "3p": "avevano voluto" },
    },
    sentences: {
      present:      [{ person: "1p", template: "Noi {verb} visitare Roma quest'estate.", translation: "We want to visit Rome this summer." }],
      future:       [{ person: "3s", template: "Lei {verb} studiare medicina.", translation: "She will want to study medicine." }],
      imperfect:    [{ person: "1s", template: "Da piccolo {verb} sempre giocare fuori.", translation: "As a child I always wanted to play outside." }],
      past_perfect: [{ person: "2s", template: "Tu {verb} già partire prima della riunione.", translation: "You had already wanted to leave before the meeting." }],
    },
  },
  {
    infinitive: "dovere",
    english: "to have to / must",
    forms: {
      present:      { "1s": "devo",     "2s": "devi",     "3s": "deve",     "1p": "dobbiamo", "2p": "dovete",   "3p": "devono" },
      future:       { "1s": "dovrò",    "2s": "dovrai",   "3s": "dovrà",    "1p": "dovremo",  "2p": "dovrete",  "3p": "dovranno" },
      imperfect:    { "1s": "dovevo",   "2s": "dovevi",   "3s": "doveva",   "1p": "dovevamo", "2p": "dovevate", "3p": "dovevano" },
      past_perfect: { "1s": "avevo dovuto", "2s": "avevi dovuto", "3s": "aveva dovuto", "1p": "avevamo dovuto", "2p": "avevate dovuto", "3p": "avevano dovuto" },
    },
    sentences: {
      present:      [{ person: "2p", template: "Voi {verb} finire il progetto entro venerdì.", translation: "You (pl.) must finish the project by Friday." }],
      future:       [{ person: "1s", template: "Domani {verb} alzarmi presto.", translation: "Tomorrow I will have to get up early." }],
      imperfect:    [{ person: "3p", template: "Loro {verb} sempre chiedere il permesso.", translation: "They always had to ask permission." }],
      past_perfect: [{ person: "1p", template: "Noi {verb} già pagare il conto.", translation: "We had already had to pay the bill." }],
    },
  },
  {
    infinitive: "sapere",
    english: "to know",
    forms: {
      present:      { "1s": "so",       "2s": "sai",      "3s": "sa",       "1p": "sappiamo", "2p": "sapete",   "3p": "sanno" },
      future:       { "1s": "saprò",    "2s": "saprai",   "3s": "saprà",    "1p": "sapremo",  "2p": "saprete",  "3p": "sapranno" },
      imperfect:    { "1s": "sapevo",   "2s": "sapevi",   "3s": "sapeva",   "1p": "sapevamo", "2p": "sapevate", "3p": "sapevano" },
      past_perfect: { "1s": "avevo saputo", "2s": "avevi saputo", "3s": "aveva saputo", "1p": "avevamo saputo", "2p": "avevate saputo", "3p": "avevano saputo" },
    },
    sentences: {
      present:      [{ person: "3s", template: "Marco {verb} parlare tre lingue.", translation: "Marco knows how to speak three languages." }],
      future:       [{ person: "1p", template: "Domani {verb} il risultato dell'esame.", translation: "Tomorrow we will know the exam result." }],
      imperfect:    [{ person: "1s", template: "Da bambino non {verb} nuotare.", translation: "As a child I didn't know how to swim." }],
      past_perfect: [{ person: "3p", template: "Loro {verb} già la verità prima di noi.", translation: "They had already known the truth before us." }],
    },
  },
  {
    infinitive: "vedere",
    english: "to see",
    forms: {
      present:      { "1s": "vedo",     "2s": "vedi",     "3s": "vede",     "1p": "vediamo",  "2p": "vedete",   "3p": "vedono" },
      future:       { "1s": "vedrò",    "2s": "vedrai",   "3s": "vedrà",    "1p": "vedremo",  "2p": "vedrete",  "3p": "vedranno" },
      imperfect:    { "1s": "vedevo",   "2s": "vedevi",   "3s": "vedeva",   "1p": "vedevamo", "2p": "vedevate", "3p": "vedevano" },
      past_perfect: { "1s": "avevo visto", "2s": "avevi visto", "3s": "aveva visto", "1p": "avevamo visto", "2p": "avevate visto", "3p": "avevano visto" },
    },
    sentences: {
      present:      [{ person: "1s", template: "Io {verb} il mare dalla finestra.", translation: "I see the sea from the window." }],
      future:       [{ person: "3p", template: "Domani loro {verb} il nuovo film.", translation: "Tomorrow they will see the new movie." }],
      imperfect:    [{ person: "2s", template: "Da lì tu {verb} tutta la città.", translation: "From there you used to see the whole city." }],
      past_perfect: [{ person: "3s", template: "Lei {verb} già quel museo prima del viaggio.", translation: "She had already seen that museum before the trip." }],
    },
  },
  {
    infinitive: "dire",
    english: "to say",
    forms: {
      present:      { "1s": "dico",     "2s": "dici",     "3s": "dice",     "1p": "diciamo",  "2p": "dite",     "3p": "dicono" },
      future:       { "1s": "dirò",     "2s": "dirai",    "3s": "dirà",     "1p": "diremo",   "2p": "direte",   "3p": "diranno" },
      imperfect:    { "1s": "dicevo",   "2s": "dicevi",   "3s": "diceva",   "1p": "dicevamo", "2p": "dicevate", "3p": "dicevano" },
      past_perfect: { "1s": "avevo detto", "2s": "avevi detto", "3s": "aveva detto", "1p": "avevamo detto", "2p": "avevate detto", "3p": "avevano detto" },
    },
    sentences: {
      present:      [{ person: "3p", template: "Loro {verb} sempre la verità.", translation: "They always tell the truth." }],
      future:       [{ person: "1s", template: "Domani {verb} tutto al professore.", translation: "Tomorrow I will tell everything to the professor." }],
      imperfect:    [{ person: "1p", template: "Noi {verb} spesso la stessa cosa.", translation: "We often used to say the same thing." }],
      past_perfect: [{ person: "2s", template: "Tu {verb} già la tua opinione prima della riunione.", translation: "You had already said your opinion before the meeting." }],
    },
  },
  {
    infinitive: "credere",
    english: "to believe",
    forms: {
      present:      { "1s": "credo",    "2s": "credi",    "3s": "crede",    "1p": "crediamo",   "2p": "credete",   "3p": "credono" },
      future:       { "1s": "crederò",  "2s": "crederai", "3s": "crederà",  "1p": "crederemo",  "2p": "crederete", "3p": "crederanno" },
      imperfect:    { "1s": "credevo",  "2s": "credevi",  "3s": "credeva",  "1p": "credevamo",  "2p": "credevate", "3p": "credevano" },
      past_perfect: { "1s": "avevo creduto", "2s": "avevi creduto", "3s": "aveva creduto", "1p": "avevamo creduto", "2p": "avevate creduto", "3p": "avevano creduto" },
    },
    sentences: {
      present:      [{ person: "1s", template: "Io {verb} in questo progetto.", translation: "I believe in this project." }],
      future:       [{ person: "3s", template: "Alla fine lei {verb} alla nostra idea.", translation: "In the end she will believe our idea." }],
      imperfect:    [{ person: "3p", template: "Loro {verb} in un futuro migliore.", translation: "They used to believe in a better future." }],
      past_perfect: [{ person: "1p", template: "Noi {verb} già a quella storia.", translation: "We had already believed that story." }],
    },
  },
  {
    infinitive: "dormire",
    english: "to sleep",
    forms: {
      present:      { "1s": "dormo",    "2s": "dormi",    "3s": "dorme",    "1p": "dormiamo",   "2p": "dormite",   "3p": "dormono" },
      future:       { "1s": "dormirò",  "2s": "dormirai", "3s": "dormirà",  "1p": "dormiremo",  "2p": "dormirete", "3p": "dormiranno" },
      imperfect:    { "1s": "dormivo",  "2s": "dormivi",  "3s": "dormiva",  "1p": "dormivamo",  "2p": "dormivate", "3p": "dormivano" },
      past_perfect: { "1s": "avevo dormito", "2s": "avevi dormito", "3s": "aveva dormito", "1p": "avevamo dormito", "2p": "avevate dormito", "3p": "avevano dormito" },
    },
    sentences: {
      present:      [{ person: "3s", template: "Il bambino {verb} tutta la notte.", translation: "The child sleeps all night." }],
      future:       [{ person: "1s", template: "Stasera {verb} presto.", translation: "Tonight I will sleep early." }],
      imperfect:    [{ person: "2p", template: "Voi {verb} sempre fino a tardi.", translation: "You (pl.) always used to sleep late." }],
      past_perfect: [{ person: "3p", template: "Loro {verb} già quando siamo arrivati.", translation: "They had already been sleeping when we arrived." }],
    },
  },
  {
    infinitive: "finire",
    english: "to finish",
    forms: {
      present:      { "1s": "finisco",  "2s": "finisci",  "3s": "finisce",  "1p": "finiamo",    "2p": "finite",    "3p": "finiscono" },
      future:       { "1s": "finirò",   "2s": "finirai",  "3s": "finirà",   "1p": "finiremo",   "2p": "finirete",  "3p": "finiranno" },
      imperfect:    { "1s": "finivo",   "2s": "finivi",   "3s": "finiva",   "1p": "finivamo",   "2p": "finivate",  "3p": "finivano" },
      past_perfect: { "1s": "avevo finito", "2s": "avevi finito", "3s": "aveva finito", "1p": "avevamo finito", "2p": "avevate finito", "3p": "avevano finito" },
    },
    sentences: {
      present:      [{ person: "1p", template: "Noi {verb} il lavoro alle sei.", translation: "We finish work at six." }],
      future:       [{ person: "2s", template: "Domani tu {verb} il libro.", translation: "Tomorrow you will finish the book." }],
      imperfect:    [{ person: "3s", template: "Ogni sera lui {verb} tardi.", translation: "Every evening he used to finish late." }],
      past_perfect: [{ person: "1s", template: "Io {verb} già il compito prima di cena.", translation: "I had already finished the homework before dinner." }],
    },
  },
  {
    infinitive: "scrivere",
    english: "to write",
    forms: {
      present:      { "1s": "scrivo",   "2s": "scrivi",   "3s": "scrive",   "1p": "scriviamo",   "2p": "scrivete",   "3p": "scrivono" },
      future:       { "1s": "scriverò", "2s": "scriverai","3s": "scriverà", "1p": "scriveremo",  "2p": "scriverete", "3p": "scriveranno" },
      imperfect:    { "1s": "scrivevo", "2s": "scrivevi", "3s": "scriveva", "1p": "scrivevamo",  "2p": "scrivevate", "3p": "scrivevano" },
      past_perfect: { "1s": "avevo scritto", "2s": "avevi scritto", "3s": "aveva scritto", "1p": "avevamo scritto", "2p": "avevate scritto", "3p": "avevano scritto" },
    },
    sentences: {
      present:      [{ person: "3s", template: "Maria {verb} una lettera ogni settimana.", translation: "Maria writes a letter every week." }],
      future:       [{ person: "1p", template: "Domani {verb} il rapporto.", translation: "Tomorrow we will write the report." }],
      imperfect:    [{ person: "1s", template: "Da studente {verb} poesie.", translation: "As a student I used to write poems." }],
      past_perfect: [{ person: "3p", template: "Loro {verb} già il messaggio prima di partire.", translation: "They had already written the message before leaving." }],
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
  {
    infinitive: "faire",
    english: "to do / to make",
    forms: {
      present:      { "1s": "fais",     "2s": "fais",     "3s": "fait",     "1p": "faisons",   "2p": "faites",    "3p": "font" },
      future:       { "1s": "ferai",    "2s": "feras",    "3s": "fera",     "1p": "ferons",    "2p": "ferez",     "3p": "feront" },
      imperfect:    { "1s": "faisais",  "2s": "faisais",  "3s": "faisait",  "1p": "faisions",  "2p": "faisiez",   "3p": "faisaient" },
      past_perfect: { "1s": "avais fait", "2s": "avais fait", "3s": "avait fait", "1p": "avions fait", "2p": "aviez fait", "3p": "avaient fait" },
    },
    sentences: {
      present:      [{ person: "3s", template: "Marie {verb} ses devoirs chaque soir.", translation: "Marie does her homework every evening." }],
      future:       [{ person: "1s", template: "Demain je {verb} un gâteau pour la fête.", translation: "Tomorrow I will make a cake for the party." }],
      imperfect:    [{ person: "3p", template: "Enfants, ils {verb} toujours du bruit.", translation: "As children they always made noise." }],
      past_perfect: [{ person: "1p", template: "Quand elle est arrivée, nous {verb} déjà les courses.", translation: "When she arrived, we had already done the shopping." }],
    },
  },
  {
    infinitive: "pouvoir",
    english: "to be able to / can",
    forms: {
      present:      { "1s": "peux",     "2s": "peux",     "3s": "peut",     "1p": "pouvons",   "2p": "pouvez",    "3p": "peuvent" },
      future:       { "1s": "pourrai",  "2s": "pourras",  "3s": "pourra",   "1p": "pourrons",  "2p": "pourrez",   "3p": "pourront" },
      imperfect:    { "1s": "pouvais",  "2s": "pouvais",  "3s": "pouvait",  "1p": "pouvions",  "2p": "pouviez",   "3p": "pouvaient" },
      past_perfect: { "1s": "avais pu", "2s": "avais pu", "3s": "avait pu", "1p": "avions pu", "2p": "aviez pu",  "3p": "avaient pu" },
    },
    sentences: {
      present:      [{ person: "1s", template: "Je ne {verb} pas venir ce soir.", translation: "I cannot come tonight." }],
      future:       [{ person: "2s", template: "Demain tu {verb} enfin te reposer.", translation: "Tomorrow you will finally be able to rest." }],
      imperfect:    [{ person: "3s", template: "Jeune, il {verb} courir pendant des heures.", translation: "As a young man he could run for hours." }],
      past_perfect: [{ person: "3p", template: "Ils ne {verb} pas partir avant huit heures.", translation: "They had not been able to leave before eight." }],
    },
  },
  {
    infinitive: "vouloir",
    english: "to want",
    forms: {
      present:      { "1s": "veux",     "2s": "veux",     "3s": "veut",     "1p": "voulons",   "2p": "voulez",    "3p": "veulent" },
      future:       { "1s": "voudrai",  "2s": "voudras",  "3s": "voudra",   "1p": "voudrons",  "2p": "voudrez",   "3p": "voudront" },
      imperfect:    { "1s": "voulais",  "2s": "voulais",  "3s": "voulait",  "1p": "voulions",  "2p": "vouliez",   "3p": "voulaient" },
      past_perfect: { "1s": "avais voulu", "2s": "avais voulu", "3s": "avait voulu", "1p": "avions voulu", "2p": "aviez voulu", "3p": "avaient voulu" },
    },
    sentences: {
      present:      [{ person: "1p", template: "Nous {verb} visiter Rome cet été.", translation: "We want to visit Rome this summer." }],
      future:       [{ person: "3s", template: "Elle {verb} étudier la médecine.", translation: "She will want to study medicine." }],
      imperfect:    [{ person: "1s", template: "Enfant, je {verb} toujours jouer dehors.", translation: "As a child I always wanted to play outside." }],
      past_perfect: [{ person: "2s", template: "Tu {verb} déjà partir avant la réunion.", translation: "You had already wanted to leave before the meeting." }],
    },
  },
  {
    infinitive: "devoir",
    english: "to have to / must",
    forms: {
      present:      { "1s": "dois",     "2s": "dois",     "3s": "doit",     "1p": "devons",    "2p": "devez",     "3p": "doivent" },
      future:       { "1s": "devrai",   "2s": "devras",   "3s": "devra",    "1p": "devrons",   "2p": "devrez",    "3p": "devront" },
      imperfect:    { "1s": "devais",   "2s": "devais",   "3s": "devait",   "1p": "devions",   "2p": "deviez",    "3p": "devaient" },
      past_perfect: { "1s": "avais dû", "2s": "avais dû", "3s": "avait dû", "1p": "avions dû", "2p": "aviez dû",  "3p": "avaient dû" },
    },
    sentences: {
      present:      [{ person: "2p", template: "Vous {verb} finir le projet avant vendredi.", translation: "You (pl.) must finish the project by Friday." }],
      future:       [{ person: "1s", template: "Demain je {verb} me lever tôt.", translation: "Tomorrow I will have to get up early." }],
      imperfect:    [{ person: "3p", template: "Ils {verb} toujours demander la permission.", translation: "They always had to ask permission." }],
      past_perfect: [{ person: "1p", template: "Nous {verb} déjà payer l'addition.", translation: "We had already had to pay the bill." }],
    },
  },
  {
    infinitive: "savoir",
    english: "to know",
    forms: {
      present:      { "1s": "sais",     "2s": "sais",     "3s": "sait",     "1p": "savons",    "2p": "savez",     "3p": "savent" },
      future:       { "1s": "saurai",   "2s": "sauras",   "3s": "saura",    "1p": "saurons",   "2p": "saurez",    "3p": "sauront" },
      imperfect:    { "1s": "savais",   "2s": "savais",   "3s": "savait",   "1p": "savions",   "2p": "saviez",    "3p": "savaient" },
      past_perfect: { "1s": "avais su", "2s": "avais su", "3s": "avait su", "1p": "avions su", "2p": "aviez su",  "3p": "avaient su" },
    },
    sentences: {
      present:      [{ person: "3s", template: "Marc {verb} parler trois langues.", translation: "Marc knows how to speak three languages." }],
      future:       [{ person: "1p", template: "Demain nous {verb} le résultat de l'examen.", translation: "Tomorrow we will know the exam result." }],
      imperfect:    [{ person: "1s", template: "Enfant, je ne {verb} pas nager.", translation: "As a child I didn't know how to swim." }],
      past_perfect: [{ person: "3p", template: "Ils {verb} déjà la vérité avant nous.", translation: "They had already known the truth before us." }],
    },
  },
  {
    infinitive: "voir",
    english: "to see",
    forms: {
      present:      { "1s": "vois",     "2s": "vois",     "3s": "voit",     "1p": "voyons",    "2p": "voyez",     "3p": "voient" },
      future:       { "1s": "verrai",   "2s": "verras",   "3s": "verra",    "1p": "verrons",   "2p": "verrez",    "3p": "verront" },
      imperfect:    { "1s": "voyais",   "2s": "voyais",   "3s": "voyait",   "1p": "voyions",   "2p": "voyiez",    "3p": "voyaient" },
      past_perfect: { "1s": "avais vu", "2s": "avais vu", "3s": "avait vu", "1p": "avions vu", "2p": "aviez vu",  "3p": "avaient vu" },
    },
    sentences: {
      present:      [{ person: "1s", template: "Je {verb} la mer depuis la fenêtre.", translation: "I see the sea from the window." }],
      future:       [{ person: "3p", template: "Demain ils {verb} le nouveau film.", translation: "Tomorrow they will see the new movie." }],
      imperfect:    [{ person: "2s", template: "De là, tu {verb} toute la ville.", translation: "From there, you used to see the whole city." }],
      past_perfect: [{ person: "3s", template: "Elle {verb} déjà ce musée avant le voyage.", translation: "She had already seen that museum before the trip." }],
    },
  },
  {
    infinitive: "dire",
    english: "to say",
    forms: {
      present:      { "1s": "dis",      "2s": "dis",      "3s": "dit",      "1p": "disons",    "2p": "dites",     "3p": "disent" },
      future:       { "1s": "dirai",    "2s": "diras",    "3s": "dira",     "1p": "dirons",    "2p": "direz",     "3p": "diront" },
      imperfect:    { "1s": "disais",   "2s": "disais",   "3s": "disait",   "1p": "disions",   "2p": "disiez",    "3p": "disaient" },
      past_perfect: { "1s": "avais dit", "2s": "avais dit", "3s": "avait dit", "1p": "avions dit", "2p": "aviez dit", "3p": "avaient dit" },
    },
    sentences: {
      present:      [{ person: "3p", template: "Ils {verb} toujours la vérité.", translation: "They always tell the truth." }],
      future:       [{ person: "1s", template: "Demain je {verb} tout au professeur.", translation: "Tomorrow I will tell everything to the professor." }],
      imperfect:    [{ person: "1p", template: "Nous {verb} souvent la même chose.", translation: "We often used to say the same thing." }],
      past_perfect: [{ person: "2s", template: "Tu {verb} déjà ton avis avant la réunion.", translation: "You had already said your opinion before the meeting." }],
    },
  },
  {
    infinitive: "prendre",
    english: "to take",
    forms: {
      present:      { "1s": "prends",   "2s": "prends",   "3s": "prend",    "1p": "prenons",   "2p": "prenez",    "3p": "prennent" },
      future:       { "1s": "prendrai", "2s": "prendras", "3s": "prendra",  "1p": "prendrons", "2p": "prendrez",  "3p": "prendront" },
      imperfect:    { "1s": "prenais",  "2s": "prenais",  "3s": "prenait",  "1p": "prenions",  "2p": "preniez",   "3p": "prenaient" },
      past_perfect: { "1s": "avais pris", "2s": "avais pris", "3s": "avait pris", "1p": "avions pris", "2p": "aviez pris", "3p": "avaient pris" },
    },
    sentences: {
      present:      [{ person: "1s", template: "Je {verb} le train tous les matins.", translation: "I take the train every morning." }],
      future:       [{ person: "3s", template: "Demain il {verb} l'avion.", translation: "Tomorrow he will take the plane." }],
      imperfect:    [{ person: "1p", template: "Nous {verb} toujours le même chemin.", translation: "We always used to take the same path." }],
      past_perfect: [{ person: "3p", template: "Ils {verb} déjà leur décision avant la réunion.", translation: "They had already made their decision before the meeting." }],
    },
  },
  {
    infinitive: "mettre",
    english: "to put",
    forms: {
      present:      { "1s": "mets",     "2s": "mets",     "3s": "met",      "1p": "mettons",   "2p": "mettez",    "3p": "mettent" },
      future:       { "1s": "mettrai",  "2s": "mettras",  "3s": "mettra",   "1p": "mettrons",  "2p": "mettrez",   "3p": "mettront" },
      imperfect:    { "1s": "mettais",  "2s": "mettais",  "3s": "mettait",  "1p": "mettions",  "2p": "mettiez",   "3p": "mettaient" },
      past_perfect: { "1s": "avais mis", "2s": "avais mis", "3s": "avait mis", "1p": "avions mis", "2p": "aviez mis", "3p": "avaient mis" },
    },
    sentences: {
      present:      [{ person: "3s", template: "Elle {verb} la table tous les soirs.", translation: "She sets the table every evening." }],
      future:       [{ person: "2p", template: "Demain vous {verb} vos manteaux.", translation: "Tomorrow you (pl.) will put on your coats." }],
      imperfect:    [{ person: "1s", template: "Enfant, je {verb} toujours mes jouets ici.", translation: "As a child I always used to put my toys here." }],
      past_perfect: [{ person: "1p", template: "Nous {verb} déjà la lettre à la poste.", translation: "We had already put the letter in the mail." }],
    },
  },
  {
    infinitive: "finir",
    english: "to finish",
    forms: {
      present:      { "1s": "finis",    "2s": "finis",    "3s": "finit",    "1p": "finissons", "2p": "finissez",  "3p": "finissent" },
      future:       { "1s": "finirai",  "2s": "finiras",  "3s": "finira",   "1p": "finirons",  "2p": "finirez",   "3p": "finiront" },
      imperfect:    { "1s": "finissais","2s": "finissais","3s": "finissait","1p": "finissions","2p": "finissiez", "3p": "finissaient" },
      past_perfect: { "1s": "avais fini", "2s": "avais fini", "3s": "avait fini", "1p": "avions fini", "2p": "aviez fini", "3p": "avaient fini" },
    },
    sentences: {
      present:      [{ person: "1p", template: "Nous {verb} le travail à six heures.", translation: "We finish work at six." }],
      future:       [{ person: "2s", template: "Demain tu {verb} le livre.", translation: "Tomorrow you will finish the book." }],
      imperfect:    [{ person: "3s", template: "Chaque soir il {verb} tard.", translation: "Every evening he used to finish late." }],
      past_perfect: [{ person: "1s", template: "J'{verb} déjà le devoir avant le dîner.", translation: "I had already finished the homework before dinner." }],
    },
  },
  {
    infinitive: "attendre",
    english: "to wait",
    forms: {
      present:      { "1s": "attends",  "2s": "attends",  "3s": "attend",   "1p": "attendons", "2p": "attendez",  "3p": "attendent" },
      future:       { "1s": "attendrai","2s": "attendras","3s": "attendra", "1p": "attendrons","2p": "attendrez", "3p": "attendront" },
      imperfect:    { "1s": "attendais","2s": "attendais","3s": "attendait","1p": "attendions","2p": "attendiez", "3p": "attendaient" },
      past_perfect: { "1s": "avais attendu", "2s": "avais attendu", "3s": "avait attendu", "1p": "avions attendu", "2p": "aviez attendu", "3p": "avaient attendu" },
    },
    sentences: {
      present:      [{ person: "3s", template: "Marie {verb} le bus chaque matin.", translation: "Marie waits for the bus every morning." }],
      future:       [{ person: "1p", template: "Demain nous {verb} son arrivée.", translation: "Tomorrow we will wait for her arrival." }],
      imperfect:    [{ person: "2p", template: "Vous {verb} toujours devant la porte.", translation: "You (pl.) always used to wait in front of the door." }],
      past_perfect: [{ person: "3p", template: "Ils {verb} déjà longtemps quand elle est arrivée.", translation: "They had already been waiting a long time when she arrived." }],
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
  {
    infinitive: "hacer",
    english: "to do / to make",
    forms: {
      present:      { "1s": "hago",     "2s": "haces",    "3s": "hace",     "1p": "hacemos",   "2p": "hacéis",    "3p": "hacen" },
      future:       { "1s": "haré",     "2s": "harás",    "3s": "hará",     "1p": "haremos",   "2p": "haréis",    "3p": "harán" },
      imperfect:    { "1s": "hacía",    "2s": "hacías",   "3s": "hacía",    "1p": "hacíamos",  "2p": "hacíais",   "3p": "hacían" },
      past_perfect: { "1s": "había hecho","2s": "habías hecho","3s": "había hecho","1p": "habíamos hecho","2p": "habíais hecho","3p": "habían hecho" },
    },
    sentences: {
      present:      [{ person: "3s", template: "María {verb} la tarea cada noche.", translation: "Maria does her homework every night." }],
      future:       [{ person: "1s", template: "Mañana {verb} un pastel para la fiesta.", translation: "Tomorrow I will make a cake for the party." }],
      imperfect:    [{ person: "3p", template: "De niños {verb} siempre ruido.", translation: "As children they always made noise." }],
      past_perfect: [{ person: "1p", template: "Cuando ella llegó, nosotros ya {verb} la compra.", translation: "When she arrived, we had already done the shopping." }],
    },
  },
  {
    infinitive: "poder",
    english: "to be able to / can",
    forms: {
      present:      { "1s": "puedo",    "2s": "puedes",   "3s": "puede",    "1p": "podemos",   "2p": "podéis",    "3p": "pueden" },
      future:       { "1s": "podré",    "2s": "podrás",   "3s": "podrá",    "1p": "podremos",  "2p": "podréis",   "3p": "podrán" },
      imperfect:    { "1s": "podía",    "2s": "podías",   "3s": "podía",    "1p": "podíamos",  "2p": "podíais",   "3p": "podían" },
      past_perfect: { "1s": "había podido","2s": "habías podido","3s": "había podido","1p": "habíamos podido","2p": "habíais podido","3p": "habían podido" },
    },
    sentences: {
      present:      [{ person: "1s", template: "Yo no {verb} venir esta noche.", translation: "I cannot come tonight." }],
      future:       [{ person: "2s", template: "Mañana tú {verb} descansar por fin.", translation: "Tomorrow you will finally be able to rest." }],
      imperfect:    [{ person: "3s", template: "De joven él {verb} correr durante horas.", translation: "As a young man he could run for hours." }],
      past_perfect: [{ person: "3p", template: "Ellos no {verb} salir antes de las ocho.", translation: "They had not been able to leave before eight." }],
    },
  },
  {
    infinitive: "querer",
    english: "to want",
    forms: {
      present:      { "1s": "quiero",   "2s": "quieres",  "3s": "quiere",   "1p": "queremos",  "2p": "queréis",   "3p": "quieren" },
      future:       { "1s": "querré",   "2s": "querrás",  "3s": "querrá",   "1p": "querremos", "2p": "querréis",  "3p": "querrán" },
      imperfect:    { "1s": "quería",   "2s": "querías",  "3s": "quería",   "1p": "queríamos", "2p": "queríais",  "3p": "querían" },
      past_perfect: { "1s": "había querido","2s": "habías querido","3s": "había querido","1p": "habíamos querido","2p": "habíais querido","3p": "habían querido" },
    },
    sentences: {
      present:      [{ person: "1p", template: "Nosotros {verb} visitar Roma este verano.", translation: "We want to visit Rome this summer." }],
      future:       [{ person: "3s", template: "Ella {verb} estudiar medicina.", translation: "She will want to study medicine." }],
      imperfect:    [{ person: "1s", template: "De niño siempre {verb} jugar afuera.", translation: "As a child I always wanted to play outside." }],
      past_perfect: [{ person: "2s", template: "Tú ya {verb} irte antes de la reunión.", translation: "You had already wanted to leave before the meeting." }],
    },
  },
  {
    infinitive: "deber",
    english: "to have to / must",
    forms: {
      present:      { "1s": "debo",     "2s": "debes",    "3s": "debe",     "1p": "debemos",   "2p": "debéis",    "3p": "deben" },
      future:       { "1s": "deberé",   "2s": "deberás",  "3s": "deberá",   "1p": "deberemos", "2p": "deberéis",  "3p": "deberán" },
      imperfect:    { "1s": "debía",    "2s": "debías",   "3s": "debía",    "1p": "debíamos",  "2p": "debíais",   "3p": "debían" },
      past_perfect: { "1s": "había debido","2s": "habías debido","3s": "había debido","1p": "habíamos debido","2p": "habíais debido","3p": "habían debido" },
    },
    sentences: {
      present:      [{ person: "2p", template: "Vosotros {verb} terminar el proyecto antes del viernes.", translation: "You (pl.) must finish the project by Friday." }],
      future:       [{ person: "1s", template: "Mañana {verb} levantarme temprano.", translation: "Tomorrow I will have to get up early." }],
      imperfect:    [{ person: "3p", template: "Ellos siempre {verb} pedir permiso.", translation: "They always had to ask permission." }],
      past_perfect: [{ person: "1p", template: "Nosotros ya {verb} pagar la cuenta.", translation: "We had already had to pay the bill." }],
    },
  },
  {
    infinitive: "saber",
    english: "to know",
    forms: {
      present:      { "1s": "sé",       "2s": "sabes",    "3s": "sabe",     "1p": "sabemos",   "2p": "sabéis",    "3p": "saben" },
      future:       { "1s": "sabré",    "2s": "sabrás",   "3s": "sabrá",    "1p": "sabremos",  "2p": "sabréis",   "3p": "sabrán" },
      imperfect:    { "1s": "sabía",    "2s": "sabías",   "3s": "sabía",    "1p": "sabíamos",  "2p": "sabíais",   "3p": "sabían" },
      past_perfect: { "1s": "había sabido","2s": "habías sabido","3s": "había sabido","1p": "habíamos sabido","2p": "habíais sabido","3p": "habían sabido" },
    },
    sentences: {
      present:      [{ person: "3s", template: "Marcos {verb} hablar tres idiomas.", translation: "Marcos knows how to speak three languages." }],
      future:       [{ person: "1p", template: "Mañana {verb} el resultado del examen.", translation: "Tomorrow we will know the exam result." }],
      imperfect:    [{ person: "1s", template: "De niño no {verb} nadar.", translation: "As a child I didn't know how to swim." }],
      past_perfect: [{ person: "3p", template: "Ellos ya {verb} la verdad antes que nosotros.", translation: "They had already known the truth before us." }],
    },
  },
  {
    infinitive: "ver",
    english: "to see",
    forms: {
      present:      { "1s": "veo",      "2s": "ves",      "3s": "ve",       "1p": "vemos",     "2p": "veis",      "3p": "ven" },
      future:       { "1s": "veré",     "2s": "verás",    "3s": "verá",     "1p": "veremos",   "2p": "veréis",    "3p": "verán" },
      imperfect:    { "1s": "veía",     "2s": "veías",    "3s": "veía",     "1p": "veíamos",   "2p": "veíais",    "3p": "veían" },
      past_perfect: { "1s": "había visto","2s": "habías visto","3s": "había visto","1p": "habíamos visto","2p": "habíais visto","3p": "habían visto" },
    },
    sentences: {
      present:      [{ person: "1s", template: "Yo {verb} el mar desde la ventana.", translation: "I see the sea from the window." }],
      future:       [{ person: "3p", template: "Mañana ellos {verb} la nueva película.", translation: "Tomorrow they will see the new movie." }],
      imperfect:    [{ person: "2s", template: "Desde allí tú {verb} toda la ciudad.", translation: "From there you used to see the whole city." }],
      past_perfect: [{ person: "3s", template: "Ella ya {verb} ese museo antes del viaje.", translation: "She had already seen that museum before the trip." }],
    },
  },
  {
    infinitive: "decir",
    english: "to say",
    forms: {
      present:      { "1s": "digo",     "2s": "dices",    "3s": "dice",     "1p": "decimos",   "2p": "decís",     "3p": "dicen" },
      future:       { "1s": "diré",     "2s": "dirás",    "3s": "dirá",     "1p": "diremos",   "2p": "diréis",    "3p": "dirán" },
      imperfect:    { "1s": "decía",    "2s": "decías",   "3s": "decía",    "1p": "decíamos",  "2p": "decíais",   "3p": "decían" },
      past_perfect: { "1s": "había dicho","2s": "habías dicho","3s": "había dicho","1p": "habíamos dicho","2p": "habíais dicho","3p": "habían dicho" },
    },
    sentences: {
      present:      [{ person: "3p", template: "Ellos siempre {verb} la verdad.", translation: "They always tell the truth." }],
      future:       [{ person: "1s", template: "Mañana {verb} todo al profesor.", translation: "Tomorrow I will tell everything to the professor." }],
      imperfect:    [{ person: "1p", template: "Nosotros {verb} a menudo lo mismo.", translation: "We often used to say the same thing." }],
      past_perfect: [{ person: "2s", template: "Tú ya {verb} tu opinión antes de la reunión.", translation: "You had already said your opinion before the meeting." }],
    },
  },
  {
    infinitive: "tomar",
    english: "to take",
    forms: {
      present:      { "1s": "tomo",     "2s": "tomas",    "3s": "toma",     "1p": "tomamos",   "2p": "tomáis",    "3p": "toman" },
      future:       { "1s": "tomaré",   "2s": "tomarás",  "3s": "tomará",   "1p": "tomaremos", "2p": "tomaréis",  "3p": "tomarán" },
      imperfect:    { "1s": "tomaba",   "2s": "tomabas",  "3s": "tomaba",   "1p": "tomábamos", "2p": "tomabais",  "3p": "tomaban" },
      past_perfect: { "1s": "había tomado","2s": "habías tomado","3s": "había tomado","1p": "habíamos tomado","2p": "habíais tomado","3p": "habían tomado" },
    },
    sentences: {
      present:      [{ person: "1s", template: "Yo {verb} el tren todas las mañanas.", translation: "I take the train every morning." }],
      future:       [{ person: "3s", template: "Mañana él {verb} el avión.", translation: "Tomorrow he will take the plane." }],
      imperfect:    [{ person: "1p", template: "Nosotros siempre {verb} el mismo camino.", translation: "We always used to take the same path." }],
      past_perfect: [{ person: "3p", template: "Ellos ya {verb} su decisión antes de la reunión.", translation: "They had already made their decision before the meeting." }],
    },
  },
  {
    infinitive: "poner",
    english: "to put",
    forms: {
      present:      { "1s": "pongo",    "2s": "pones",    "3s": "pone",     "1p": "ponemos",   "2p": "ponéis",    "3p": "ponen" },
      future:       { "1s": "pondré",   "2s": "pondrás",  "3s": "pondrá",   "1p": "pondremos", "2p": "pondréis",  "3p": "pondrán" },
      imperfect:    { "1s": "ponía",    "2s": "ponías",   "3s": "ponía",    "1p": "poníamos",  "2p": "poníais",   "3p": "ponían" },
      past_perfect: { "1s": "había puesto","2s": "habías puesto","3s": "había puesto","1p": "habíamos puesto","2p": "habíais puesto","3p": "habían puesto" },
    },
    sentences: {
      present:      [{ person: "3s", template: "Ella {verb} la mesa cada noche.", translation: "She sets the table every evening." }],
      future:       [{ person: "2p", template: "Mañana vosotros {verb} los abrigos.", translation: "Tomorrow you (pl.) will put on your coats." }],
      imperfect:    [{ person: "1s", template: "De niño siempre {verb} mis juguetes aquí.", translation: "As a child I always used to put my toys here." }],
      past_perfect: [{ person: "1p", template: "Nosotros ya {verb} la carta en el correo.", translation: "We had already put the letter in the mail." }],
    },
  },
  {
    infinitive: "vivir",
    english: "to live",
    forms: {
      present:      { "1s": "vivo",     "2s": "vives",    "3s": "vive",     "1p": "vivimos",   "2p": "vivís",     "3p": "viven" },
      future:       { "1s": "viviré",   "2s": "vivirás",  "3s": "vivirá",   "1p": "viviremos", "2p": "viviréis",  "3p": "vivirán" },
      imperfect:    { "1s": "vivía",    "2s": "vivías",   "3s": "vivía",    "1p": "vivíamos",  "2p": "vivíais",   "3p": "vivían" },
      past_perfect: { "1s": "había vivido","2s": "habías vivido","3s": "había vivido","1p": "habíamos vivido","2p": "habíais vivido","3p": "habían vivido" },
    },
    sentences: {
      present:      [{ person: "1p", template: "Nosotros {verb} cerca del mar.", translation: "We live near the sea." }],
      future:       [{ person: "3s", template: "Algún día él {verb} en el extranjero.", translation: "Someday he will live abroad." }],
      imperfect:    [{ person: "2p", template: "Vosotros {verb} siempre en el campo.", translation: "You (pl.) always used to live in the countryside." }],
      past_perfect: [{ person: "3p", template: "Ellos ya {verb} allí antes de mudarse.", translation: "They had already lived there before moving." }],
    },
  },
  {
    infinitive: "esperar",
    english: "to wait / to hope",
    forms: {
      present:      { "1s": "espero",   "2s": "esperas",  "3s": "espera",   "1p": "esperamos", "2p": "esperáis",  "3p": "esperan" },
      future:       { "1s": "esperaré", "2s": "esperarás","3s": "esperará", "1p": "esperaremos","2p": "esperaréis","3p": "esperarán" },
      imperfect:    { "1s": "esperaba", "2s": "esperabas","3s": "esperaba", "1p": "esperábamos","2p": "esperabais","3p": "esperaban" },
      past_perfect: { "1s": "había esperado","2s": "habías esperado","3s": "había esperado","1p": "habíamos esperado","2p": "habíais esperado","3p": "habían esperado" },
    },
    sentences: {
      present:      [{ person: "3s", template: "María {verb} el autobús cada mañana.", translation: "Maria waits for the bus every morning." }],
      future:       [{ person: "1p", template: "Mañana {verb} su llegada.", translation: "Tomorrow we will wait for her arrival." }],
      imperfect:    [{ person: "2p", template: "Vosotros siempre {verb} delante de la puerta.", translation: "You (pl.) always used to wait in front of the door." }],
      past_perfect: [{ person: "3p", template: "Ellos ya {verb} mucho tiempo cuando ella llegó.", translation: "They had already been waiting a long time when she arrived." }],
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

export type ExerciseMode = "sentence" | "verb" | "paragraph";

export function generateExercise(
  language: LanguageCode,
  tense: TenseCode,
  mode: ExerciseMode = "sentence",
): Exercise {
  const verb = pick(VERBS[language]);

  if (mode === "verb") {
    const person = pick(PERSONS).code;
    const answer = verb.forms[tense][person];
    const pron = PERSONS.find((p) => p.code === person)!.pronoun[language];
    const prompt = `${pron.charAt(0).toUpperCase() + pron.slice(1)} _____`;
    return {
      language,
      tense,
      verb,
      person,
      prompt,
      translation: `${PERSONS.find((p) => p.code === person)!.englishPronoun} — ${verb.english}`,
      answer,
      accepted: [normalizeAnswer(answer)],
    };
  }

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

export function generateExerciseFromTenses(
  language: LanguageCode,
  tenses: TenseCode[],
  mode: ExerciseMode = "sentence",
): Exercise {
  const tense = tenses.length > 0 ? pick(tenses) : "present";
  return generateExercise(language, tense, mode);
}

export function checkAnswer(exercise: Exercise, input: string): boolean {
  return exercise.accepted.includes(normalizeAnswer(input));
}
