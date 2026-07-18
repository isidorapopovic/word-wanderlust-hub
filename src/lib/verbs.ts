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
    { code: "1s", englishPronoun: "I", pronoun: { it: "io", fr: "je", es: "yo" } },
    { code: "2s", englishPronoun: "you", pronoun: { it: "tu", fr: "tu", es: "tú" } },
    { code: "3s", englishPronoun: "he/she", pronoun: { it: "lui", fr: "il", es: "él" } },
    { code: "1p", englishPronoun: "we", pronoun: { it: "noi", fr: "nous", es: "nosotros" } },
    { code: "2p", englishPronoun: "you (pl.)", pronoun: { it: "voi", fr: "vous", es: "vosotros" } },
    { code: "3p", englishPronoun: "they", pronoun: { it: "loro", fr: "ils", es: "ellos" } },
];

// -------------------------- VERB DATABASES --------------------------
// A small, curated starter set per language. Add more entries freely —
// the practice engine picks verbs at random.

const italianVerbs: VerbEntry[] = [
    {
        infinitive: "parlare",
        english: "to speak",
        forms: {
            present: { "1s": "parlo", "2s": "parli", "3s": "parla", "1p": "parliamo", "2p": "parlate", "3p": "parlano" },
            future: { "1s": "parlerò", "2s": "parlerai", "3s": "parlerà", "1p": "parleremo", "2p": "parlerete", "3p": "parleranno" },
            imperfect: { "1s": "parlavo", "2s": "parlavi", "3s": "parlava", "1p": "parlavamo", "2p": "parlavate", "3p": "parlavano" },
            past_perfect: { "1s": "avevo parlato", "2s": "avevi parlato", "3s": "aveva parlato", "1p": "avevamo parlato", "2p": "avevate parlato", "3p": "avevano parlato" },
        },
        sentences: {
            present: [{ person: "3s", template: "Maria {verb} italiano ogni giorno.", translation: "Maria speaks Italian every day." }],
            future: [{ person: "1s", template: "Domani {verb} con il professore.", translation: "Tomorrow I will speak with the professor." }],
            imperfect: [{ person: "3p", template: "Da bambini {verb} sempre in dialetto.", translation: "As children they always spoke in dialect." }],
            past_perfect: [{ person: "1p", template: "Quando è arrivata, noi {verb} già del progetto.", translation: "When she arrived, we had already spoken about the project." }],
        },
    },
    {
        infinitive: "mangiare",
        english: "to eat",
        forms: {
            present: { "1s": "mangio", "2s": "mangi", "3s": "mangia", "1p": "mangiamo", "2p": "mangiate", "3p": "mangiano" },
            future: { "1s": "mangerò", "2s": "mangerai", "3s": "mangerà", "1p": "mangeremo", "2p": "mangerete", "3p": "mangeranno" },
            imperfect: { "1s": "mangiavo", "2s": "mangiavi", "3s": "mangiava", "1p": "mangiavamo", "2p": "mangiavate", "3p": "mangiavano" },
            past_perfect: { "1s": "avevo mangiato", "2s": "avevi mangiato", "3s": "aveva mangiato", "1p": "avevamo mangiato", "2p": "avevate mangiato", "3p": "avevano mangiato" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} la pasta a pranzo.", translation: "I eat pasta for lunch." }],
            future: [{ person: "2s", template: "Stasera tu {verb} al ristorante.", translation: "Tonight you will eat at the restaurant." }],
            imperfect: [{ person: "3s", template: "Da piccolo {verb} sempre gelato.", translation: "As a child he always ate ice cream." }],
            past_perfect: [{ person: "3p", template: "Quando siamo arrivati, loro {verb} già.", translation: "When we arrived, they had already eaten." }],
        },
    },
    {
        infinitive: "essere",
        english: "to be",
        forms: {
            present: { "1s": "sono", "2s": "sei", "3s": "è", "1p": "siamo", "2p": "siete", "3p": "sono" },
            future: { "1s": "sarò", "2s": "sarai", "3s": "sarà", "1p": "saremo", "2p": "sarete", "3p": "saranno" },
            imperfect: { "1s": "ero", "2s": "eri", "3s": "era", "1p": "eravamo", "2p": "eravate", "3p": "erano" },
            past_perfect: { "1s": "ero stato", "2s": "eri stato", "3s": "era stato", "1p": "eravamo stati", "2p": "eravate stati", "3p": "erano stati" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} molto felice oggi.", translation: "I am very happy today." }],
            future: [{ person: "3p", template: "Loro {verb} in vacanza a luglio.", translation: "They will be on vacation in July." }],
            imperfect: [{ person: "2s", template: "Tu {verb} sempre gentile con me.", translation: "You were always kind to me." }],
            past_perfect: [{ person: "3s", template: "Lui {verb} in Italia prima di trasferirsi.", translation: "He had been in Italy before moving." }],
        },
    },
    {
        infinitive: "avere",
        english: "to have",
        forms: {
            present: { "1s": "ho", "2s": "hai", "3s": "ha", "1p": "abbiamo", "2p": "avete", "3p": "hanno" },
            future: { "1s": "avrò", "2s": "avrai", "3s": "avrà", "1p": "avremo", "2p": "avrete", "3p": "avranno" },
            imperfect: { "1s": "avevo", "2s": "avevi", "3s": "aveva", "1p": "avevamo", "2p": "avevate", "3p": "avevano" },
            past_perfect: { "1s": "avevo avuto", "2s": "avevi avuto", "3s": "aveva avuto", "1p": "avevamo avuto", "2p": "avevate avuto", "3p": "avevano avuto" },
        },
        sentences: {
            present: [{ person: "1p", template: "Noi {verb} una casa in campagna.", translation: "We have a house in the countryside." }],
            future: [{ person: "2p", template: "Voi {verb} tempo domani?", translation: "Will you have time tomorrow?" }],
            imperfect: [{ person: "1s", template: "Da bambino io {verb} un cane nero.", translation: "As a child I had a black dog." }],
            past_perfect: [{ person: "3p", template: "Loro {verb} molte difficoltà prima.", translation: "They had had many difficulties before." }],
        },
    },
    {
        infinitive: "fare",
        english: "to do / to make",
        forms: {
            present: { "1s": "faccio", "2s": "fai", "3s": "fa", "1p": "facciamo", "2p": "fate", "3p": "fanno" },
            future: { "1s": "farò", "2s": "farai", "3s": "farà", "1p": "faremo", "2p": "farete", "3p": "faranno" },
            imperfect: { "1s": "facevo", "2s": "facevi", "3s": "faceva", "1p": "facevamo", "2p": "facevate", "3p": "facevano" },
            past_perfect: { "1s": "avevo fatto", "2s": "avevi fatto", "3s": "aveva fatto", "1p": "avevamo fatto", "2p": "avevate fatto", "3p": "avevano fatto" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marco {verb} i compiti ogni sera.", translation: "Marco does his homework every evening." }],
            future: [{ person: "1s", template: "Domani {verb} una torta per la festa.", translation: "Tomorrow I will make a cake for the party." }],
            imperfect: [{ person: "3p", template: "Da bambini {verb} sempre rumore.", translation: "As children they always made noise." }],
            past_perfect: [{ person: "1p", template: "Quando è arrivata, noi {verb} già la spesa.", translation: "When she arrived, we had already done the shopping." }],
        },
    },
    {
        infinitive: "potere",
        english: "to be able to / can",
        forms: {
            present: { "1s": "posso", "2s": "puoi", "3s": "può", "1p": "possiamo", "2p": "potete", "3p": "possono" },
            future: { "1s": "potrò", "2s": "potrai", "3s": "potrà", "1p": "potremo", "2p": "potrete", "3p": "potranno" },
            imperfect: { "1s": "potevo", "2s": "potevi", "3s": "poteva", "1p": "potevamo", "2p": "potevate", "3p": "potevano" },
            past_perfect: { "1s": "avevo potuto", "2s": "avevi potuto", "3s": "aveva potuto", "1p": "avevamo potuto", "2p": "avevate potuto", "3p": "avevano potuto" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io non {verb} venire stasera.", translation: "I cannot come tonight." }],
            future: [{ person: "2s", template: "Domani tu {verb} finalmente riposare.", translation: "Tomorrow you will finally be able to rest." }],
            imperfect: [{ person: "3s", template: "Da giovane {verb} correre per ore.", translation: "As a young man he could run for hours." }],
            past_perfect: [{ person: "3p", template: "Loro non {verb} partire prima delle otto.", translation: "They had not been able to leave before eight." }],
        },
    },
    {
        infinitive: "volere",
        english: "to want",
        forms: {
            present: { "1s": "voglio", "2s": "vuoi", "3s": "vuole", "1p": "vogliamo", "2p": "volete", "3p": "vogliono" },
            future: { "1s": "vorrò", "2s": "vorrai", "3s": "vorrà", "1p": "vorremo", "2p": "vorrete", "3p": "vorranno" },
            imperfect: { "1s": "volevo", "2s": "volevi", "3s": "voleva", "1p": "volevamo", "2p": "volevate", "3p": "volevano" },
            past_perfect: { "1s": "avevo voluto", "2s": "avevi voluto", "3s": "aveva voluto", "1p": "avevamo voluto", "2p": "avevate voluto", "3p": "avevano voluto" },
        },
        sentences: {
            present: [{ person: "1p", template: "Noi {verb} visitare Roma quest'estate.", translation: "We want to visit Rome this summer." }],
            future: [{ person: "3s", template: "Lei {verb} studiare medicina.", translation: "She will want to study medicine." }],
            imperfect: [{ person: "1s", template: "Da piccolo {verb} sempre giocare fuori.", translation: "As a child I always wanted to play outside." }],
            past_perfect: [{ person: "2s", template: "Tu {verb} già partire prima della riunione.", translation: "You had already wanted to leave before the meeting." }],
        },
    },
    {
        infinitive: "dovere",
        english: "to have to / must",
        forms: {
            present: { "1s": "devo", "2s": "devi", "3s": "deve", "1p": "dobbiamo", "2p": "dovete", "3p": "devono" },
            future: { "1s": "dovrò", "2s": "dovrai", "3s": "dovrà", "1p": "dovremo", "2p": "dovrete", "3p": "dovranno" },
            imperfect: { "1s": "dovevo", "2s": "dovevi", "3s": "doveva", "1p": "dovevamo", "2p": "dovevate", "3p": "dovevano" },
            past_perfect: { "1s": "avevo dovuto", "2s": "avevi dovuto", "3s": "aveva dovuto", "1p": "avevamo dovuto", "2p": "avevate dovuto", "3p": "avevano dovuto" },
        },
        sentences: {
            present: [{ person: "2p", template: "Voi {verb} finire il progetto entro venerdì.", translation: "You (pl.) must finish the project by Friday." }],
            future: [{ person: "1s", template: "Domani {verb} alzarmi presto.", translation: "Tomorrow I will have to get up early." }],
            imperfect: [{ person: "3p", template: "Loro {verb} sempre chiedere il permesso.", translation: "They always had to ask permission." }],
            past_perfect: [{ person: "1p", template: "Noi {verb} già pagare il conto.", translation: "We had already had to pay the bill." }],
        },
    },
    {
        infinitive: "sapere",
        english: "to know",
        forms: {
            present: { "1s": "so", "2s": "sai", "3s": "sa", "1p": "sappiamo", "2p": "sapete", "3p": "sanno" },
            future: { "1s": "saprò", "2s": "saprai", "3s": "saprà", "1p": "sapremo", "2p": "saprete", "3p": "sapranno" },
            imperfect: { "1s": "sapevo", "2s": "sapevi", "3s": "sapeva", "1p": "sapevamo", "2p": "sapevate", "3p": "sapevano" },
            past_perfect: { "1s": "avevo saputo", "2s": "avevi saputo", "3s": "aveva saputo", "1p": "avevamo saputo", "2p": "avevate saputo", "3p": "avevano saputo" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marco {verb} parlare tre lingue.", translation: "Marco knows how to speak three languages." }],
            future: [{ person: "1p", template: "Domani {verb} il risultato dell'esame.", translation: "Tomorrow we will know the exam result." }],
            imperfect: [{ person: "1s", template: "Da bambino non {verb} nuotare.", translation: "As a child I didn't know how to swim." }],
            past_perfect: [{ person: "3p", template: "Loro {verb} già la verità prima di noi.", translation: "They had already known the truth before us." }],
        },
    },
    {
        infinitive: "vedere",
        english: "to see",
        forms: {
            present: { "1s": "vedo", "2s": "vedi", "3s": "vede", "1p": "vediamo", "2p": "vedete", "3p": "vedono" },
            future: { "1s": "vedrò", "2s": "vedrai", "3s": "vedrà", "1p": "vedremo", "2p": "vedrete", "3p": "vedranno" },
            imperfect: { "1s": "vedevo", "2s": "vedevi", "3s": "vedeva", "1p": "vedevamo", "2p": "vedevate", "3p": "vedevano" },
            past_perfect: { "1s": "avevo visto", "2s": "avevi visto", "3s": "aveva visto", "1p": "avevamo visto", "2p": "avevate visto", "3p": "avevano visto" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} il mare dalla finestra.", translation: "I see the sea from the window." }],
            future: [{ person: "3p", template: "Domani loro {verb} il nuovo film.", translation: "Tomorrow they will see the new movie." }],
            imperfect: [{ person: "2s", template: "Da lì tu {verb} tutta la città.", translation: "From there you used to see the whole city." }],
            past_perfect: [{ person: "3s", template: "Lei {verb} già quel museo prima del viaggio.", translation: "She had already seen that museum before the trip." }],
        },
    },
    {
        infinitive: "dire",
        english: "to say",
        forms: {
            present: { "1s": "dico", "2s": "dici", "3s": "dice", "1p": "diciamo", "2p": "dite", "3p": "dicono" },
            future: { "1s": "dirò", "2s": "dirai", "3s": "dirà", "1p": "diremo", "2p": "direte", "3p": "diranno" },
            imperfect: { "1s": "dicevo", "2s": "dicevi", "3s": "diceva", "1p": "dicevamo", "2p": "dicevate", "3p": "dicevano" },
            past_perfect: { "1s": "avevo detto", "2s": "avevi detto", "3s": "aveva detto", "1p": "avevamo detto", "2p": "avevate detto", "3p": "avevano detto" },
        },
        sentences: {
            present: [{ person: "3p", template: "Loro {verb} sempre la verità.", translation: "They always tell the truth." }],
            future: [{ person: "1s", template: "Domani {verb} tutto al professore.", translation: "Tomorrow I will tell everything to the professor." }],
            imperfect: [{ person: "1p", template: "Noi {verb} spesso la stessa cosa.", translation: "We often used to say the same thing." }],
            past_perfect: [{ person: "2s", template: "Tu {verb} già la tua opinione prima della riunione.", translation: "You had already said your opinion before the meeting." }],
        },
    },
    {
        infinitive: "credere",
        english: "to believe",
        forms: {
            present: { "1s": "credo", "2s": "credi", "3s": "crede", "1p": "crediamo", "2p": "credete", "3p": "credono" },
            future: { "1s": "crederò", "2s": "crederai", "3s": "crederà", "1p": "crederemo", "2p": "crederete", "3p": "crederanno" },
            imperfect: { "1s": "credevo", "2s": "credevi", "3s": "credeva", "1p": "credevamo", "2p": "credevate", "3p": "credevano" },
            past_perfect: { "1s": "avevo creduto", "2s": "avevi creduto", "3s": "aveva creduto", "1p": "avevamo creduto", "2p": "avevate creduto", "3p": "avevano creduto" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} in questo progetto.", translation: "I believe in this project." }],
            future: [{ person: "3s", template: "Alla fine lei {verb} alla nostra idea.", translation: "In the end she will believe our idea." }],
            imperfect: [{ person: "3p", template: "Loro {verb} in un futuro migliore.", translation: "They used to believe in a better future." }],
            past_perfect: [{ person: "1p", template: "Noi {verb} già a quella storia.", translation: "We had already believed that story." }],
        },
    },
    {
        infinitive: "dormire",
        english: "to sleep",
        forms: {
            present: { "1s": "dormo", "2s": "dormi", "3s": "dorme", "1p": "dormiamo", "2p": "dormite", "3p": "dormono" },
            future: { "1s": "dormirò", "2s": "dormirai", "3s": "dormirà", "1p": "dormiremo", "2p": "dormirete", "3p": "dormiranno" },
            imperfect: { "1s": "dormivo", "2s": "dormivi", "3s": "dormiva", "1p": "dormivamo", "2p": "dormivate", "3p": "dormivano" },
            past_perfect: { "1s": "avevo dormito", "2s": "avevi dormito", "3s": "aveva dormito", "1p": "avevamo dormito", "2p": "avevate dormito", "3p": "avevano dormito" },
        },
        sentences: {
            present: [{ person: "3s", template: "Il bambino {verb} tutta la notte.", translation: "The child sleeps all night." }],
            future: [{ person: "1s", template: "Stasera {verb} presto.", translation: "Tonight I will sleep early." }],
            imperfect: [{ person: "2p", template: "Voi {verb} sempre fino a tardi.", translation: "You (pl.) always used to sleep late." }],
            past_perfect: [{ person: "3p", template: "Loro {verb} già quando siamo arrivati.", translation: "They had already been sleeping when we arrived." }],
        },
    },
    {
        infinitive: "finire",
        english: "to finish",
        forms: {
            present: { "1s": "finisco", "2s": "finisci", "3s": "finisce", "1p": "finiamo", "2p": "finite", "3p": "finiscono" },
            future: { "1s": "finirò", "2s": "finirai", "3s": "finirà", "1p": "finiremo", "2p": "finirete", "3p": "finiranno" },
            imperfect: { "1s": "finivo", "2s": "finivi", "3s": "finiva", "1p": "finivamo", "2p": "finivate", "3p": "finivano" },
            past_perfect: { "1s": "avevo finito", "2s": "avevi finito", "3s": "aveva finito", "1p": "avevamo finito", "2p": "avevate finito", "3p": "avevano finito" },
        },
        sentences: {
            present: [{ person: "1p", template: "Noi {verb} il lavoro alle sei.", translation: "We finish work at six." }],
            future: [{ person: "2s", template: "Domani tu {verb} il libro.", translation: "Tomorrow you will finish the book." }],
            imperfect: [{ person: "3s", template: "Ogni sera lui {verb} tardi.", translation: "Every evening he used to finish late." }],
            past_perfect: [{ person: "1s", template: "Io {verb} già il compito prima di cena.", translation: "I had already finished the homework before dinner." }],
        },
    },
    {
        infinitive: "scrivere",
        english: "to write",
        forms: {
            present: { "1s": "scrivo", "2s": "scrivi", "3s": "scrive", "1p": "scriviamo", "2p": "scrivete", "3p": "scrivono" },
            future: { "1s": "scriverò", "2s": "scriverai", "3s": "scriverà", "1p": "scriveremo", "2p": "scriverete", "3p": "scriveranno" },
            imperfect: { "1s": "scrivevo", "2s": "scrivevi", "3s": "scriveva", "1p": "scrivevamo", "2p": "scrivevate", "3p": "scrivevano" },
            past_perfect: { "1s": "avevo scritto", "2s": "avevi scritto", "3s": "aveva scritto", "1p": "avevamo scritto", "2p": "avevate scritto", "3p": "avevano scritto" },
        },
        sentences: {
            present: [{ person: "3s", template: "Maria {verb} una lettera ogni settimana.", translation: "Maria writes a letter every week." }],
            future: [{ person: "1p", template: "Domani {verb} il rapporto.", translation: "Tomorrow we will write the report." }],
            imperfect: [{ person: "1s", template: "Da studente {verb} poesie.", translation: "As a student I used to write poems." }],
            past_perfect: [{ person: "3p", template: "Loro {verb} già il messaggio prima di partire.", translation: "They had already written the message before leaving." }],
        },
    },
    {
        infinitive: "prendere",
        english: "to take",
        forms: {
            present: { "1s": "prendo", "2s": "prendi", "3s": "prende", "1p": "prendiamo", "2p": "prendete", "3p": "prendono" },
            future: { "1s": "prenderò", "2s": "prenderai", "3s": "prenderà", "1p": "prenderemo", "2p": "prenderete", "3p": "prenderanno" },
            imperfect: { "1s": "prendevo", "2s": "prendevi", "3s": "prendeva", "1p": "prendevamo", "2p": "prendevate", "3p": "prendevano" },
            past_perfect: { "1s": "avevo preso", "2s": "avevi preso", "3s": "aveva preso", "1p": "avevamo preso", "2p": "avevate preso", "3p": "avevano preso" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} il caffè ogni mattina.", translation: "I take coffee every morning." }],
            future: [{ person: "3s", template: "Domani lui {verb} l'autobus delle nove.", translation: "Tomorrow he will take the nine o'clock bus." }],
            imperfect: [{ person: "2p", template: "Voi {verb} sempre la stessa strada per andare a scuola.", translation: "You (pl.) always used to take the same road to school." }],
            past_perfect: [{ person: "3p", template: "Quando siamo arrivati, loro {verb} già una decisione.", translation: "When we arrived, they had already made a decision." }],
        },
    },
    {
        infinitive: "mettere",
        english: "to put",
        forms: {
            present: { "1s": "metto", "2s": "metti", "3s": "mette", "1p": "mettiamo", "2p": "mettete", "3p": "mettono" },
            future: { "1s": "metterò", "2s": "metterai", "3s": "metterà", "1p": "metteremo", "2p": "metterete", "3p": "metteranno" },
            imperfect: { "1s": "mettevo", "2s": "mettevi", "3s": "metteva", "1p": "mettevamo", "2p": "mettevate", "3p": "mettevano" },
            past_perfect: { "1s": "avevo messo", "2s": "avevi messo", "3s": "aveva messo", "1p": "avevamo messo", "2p": "avevate messo", "3p": "avevano messo" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marco {verb} i libri sullo scaffale.", translation: "Marco puts the books on the shelf." }],
            future: [{ person: "2s", template: "Domani tu {verb} la valigia in macchina.", translation: "Tomorrow you will put the suitcase in the car." }],
            imperfect: [{ person: "1s", template: "Da bambino {verb} sempre i giocattoli qui.", translation: "As a child I always used to put my toys here." }],
            past_perfect: [{ person: "1p", template: "Quando è arrivata, noi {verb} già la lettera nella cassetta.", translation: "When she arrived, we had already put the letter in the mailbox." }],
        },
    },
    {
        infinitive: "aspettare",
        english: "to wait",
        forms: {
            present: { "1s": "aspetto", "2s": "aspetti", "3s": "aspetta", "1p": "aspettiamo", "2p": "aspettate", "3p": "aspettano" },
            future: { "1s": "aspetterò", "2s": "aspetterai", "3s": "aspetterà", "1p": "aspetteremo", "2p": "aspetterete", "3p": "aspetteranno" },
            imperfect: { "1s": "aspettavo", "2s": "aspettavi", "3s": "aspettava", "1p": "aspettavamo", "2p": "aspettavate", "3p": "aspettavano" },
            past_perfect: { "1s": "avevo aspettato", "2s": "avevi aspettato", "3s": "aveva aspettato", "1p": "avevamo aspettato", "2p": "avevate aspettato", "3p": "avevano aspettato" },
        },
        sentences: {
            present: [{ person: "3s", template: "Maria {verb} l'autobus ogni mattina.", translation: "Maria waits for the bus every morning." }],
            future: [{ person: "1p", template: "Domani {verb} il suo arrivo.", translation: "Tomorrow we will wait for her arrival." }],
            imperfect: [{ person: "2p", template: "Voi {verb} sempre davanti alla porta.", translation: "You (pl.) always used to wait in front of the door." }],
            past_perfect: [{ person: "3p", template: "Loro {verb} già molto tempo quando lei è arrivata.", translation: "They had already been waiting a long time when she arrived." }],
        },
    },
    {
        infinitive: "vivere",
        english: "to live",
        forms: {
            present: { "1s": "vivo", "2s": "vivi", "3s": "vive", "1p": "viviamo", "2p": "vivete", "3p": "vivono" },
            future: { "1s": "vivrò", "2s": "vivrai", "3s": "vivrà", "1p": "vivremo", "2p": "vivrete", "3p": "vivranno" },
            imperfect: { "1s": "vivevo", "2s": "vivevi", "3s": "viveva", "1p": "vivevamo", "2p": "vivevate", "3p": "vivevano" },
            past_perfect: { "1s": "avevo vissuto", "2s": "avevi vissuto", "3s": "aveva vissuto", "1p": "avevamo vissuto", "2p": "avevate vissuto", "3p": "avevano vissuto" },
        },
        sentences: {
            present: [{ person: "1p", template: "Noi {verb} vicino al mare.", translation: "We live near the sea." }],
            future: [{ person: "3s", template: "Un giorno lui {verb} all'estero.", translation: "Someday he will live abroad." }],
            imperfect: [{ person: "2p", template: "Voi {verb} sempre in campagna.", translation: "You (pl.) always used to live in the countryside." }],
            past_perfect: [{ person: "3p", template: "Loro {verb} già lì prima di trasferirsi.", translation: "They had already lived there before moving." }],
        },
    },
    {
        infinitive: "andare",
        english: "to go",
        forms: {
            present: { "1s": "vado", "2s": "vai", "3s": "va", "1p": "andiamo", "2p": "andate", "3p": "vanno" },
            future: { "1s": "andrò", "2s": "andrai", "3s": "andrà", "1p": "andremo", "2p": "andrete", "3p": "andranno" },
            imperfect: { "1s": "andavo", "2s": "andavi", "3s": "andava", "1p": "andavamo", "2p": "andavate", "3p": "andavano" },
            past_perfect: { "1s": "ero andato", "2s": "eri andato", "3s": "era andato", "1p": "eravamo andati", "2p": "eravate andati", "3p": "erano andati" },
        },
        sentences: {
            present: [{ person: "3s", template: "Maria {verb} al mercato ogni sabato.", translation: "Maria goes to the market every Saturday." }],
            future: [{ person: "1s", template: "Domani {verb} a Roma per lavoro.", translation: "Tomorrow I will go to Rome for work." }],
            imperfect: [{ person: "3p", template: "Da bambini {verb} sempre al parco.", translation: "As children they always used to go to the park." }],
            past_perfect: [{ person: "1p", template: "Quando lei è arrivata, noi {verb} già a casa.", translation: "When she arrived, we had already gone home." }],
        },
    },
    {
        infinitive: "venire",
        english: "to come",
        forms: {
            present: { "1s": "vengo", "2s": "vieni", "3s": "viene", "1p": "veniamo", "2p": "venite", "3p": "vengono" },
            future: { "1s": "verrò", "2s": "verrai", "3s": "verrà", "1p": "verremo", "2p": "verrete", "3p": "verranno" },
            imperfect: { "1s": "venivo", "2s": "venivi", "3s": "veniva", "1p": "venivamo", "2p": "venivate", "3p": "venivano" },
            past_perfect: { "1s": "ero venuto", "2s": "eri venuto", "3s": "era venuto", "1p": "eravamo venuti", "2p": "eravate venuti", "3p": "erano venuti" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marco {verb} a trovarci ogni domenica.", translation: "Marco comes to see us every Sunday." }],
            future: [{ person: "2s", template: "Domani tu {verb} alla festa?", translation: "Will you come to the party tomorrow?" }],
            imperfect: [{ person: "1p", template: "Da giovani {verb} spesso in questa città.", translation: "When we were young we often used to come to this city." }],
            past_perfect: [{ person: "3s", template: "Quando l'abbiamo chiamato, lui {verb} già alla riunione.", translation: "When we called him, he had already come to the meeting." }],
        },
    },
    {
        infinitive: "dare",
        english: "to give",
        forms: {
            present: { "1s": "do", "2s": "dai", "3s": "dà", "1p": "diamo", "2p": "date", "3p": "danno" },
            future: { "1s": "darò", "2s": "darai", "3s": "darà", "1p": "daremo", "2p": "darete", "3p": "daranno" },
            imperfect: { "1s": "davo", "2s": "davi", "3s": "dava", "1p": "davamo", "2p": "davate", "3p": "davano" },
            past_perfect: { "1s": "avevo dato", "2s": "avevi dato", "3s": "aveva dato", "1p": "avevamo dato", "2p": "avevate dato", "3p": "avevano dato" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} un regalo a mia madre ogni anno.", translation: "I give a gift to my mother every year." }],
            future: [{ person: "3p", template: "Domani {verb} una risposta al direttore.", translation: "Tomorrow they will give an answer to the director." }],
            imperfect: [{ person: "2s", template: "Da bambino tu {verb} sempre i tuoi giocattoli agli amici.", translation: "As a child you always used to give your toys to your friends." }],
            past_perfect: [{ person: "1p", template: "Quando è arrivato, noi {verb} già i biglietti.", translation: "When he arrived, we had already given the tickets." }],
        },
    },
    {
        infinitive: "arrivare",
        english: "to arrive",
        forms: {
            present: { "1s": "arrivo", "2s": "arrivi", "3s": "arriva", "1p": "arriviamo", "2p": "arrivate", "3p": "arrivano" },
            future: { "1s": "arriverò", "2s": "arriverai", "3s": "arriverà", "1p": "arriveremo", "2p": "arriverete", "3p": "arriveranno" },
            imperfect: { "1s": "arrivavo", "2s": "arrivavi", "3s": "arrivava", "1p": "arrivavamo", "2p": "arrivavate", "3p": "arrivavano" },
            past_perfect: { "1s": "ero arrivato", "2s": "eri arrivato", "3s": "era arrivato", "1p": "eravamo arrivati", "2p": "eravate arrivati", "3p": "erano arrivati" },
        },
        sentences: {
            present: [{ person: "3s", template: "Il treno {verb} alle otto ogni mattina.", translation: "The train arrives at eight every morning." }],
            future: [{ person: "2p", template: "Domani voi {verb} prima di noi.", translation: "Tomorrow you (pl.) will arrive before us." }],
            imperfect: [{ person: "3p", template: "Ogni estate {verb} in ritardo.", translation: "Every summer they used to arrive late." }],
            past_perfect: [{ person: "3s", template: "Quando abbiamo telefonato, lei {verb} già in ufficio.", translation: "When we called, she had already arrived at the office." }],
        },
    },
    {
        infinitive: "entrare",
        english: "to enter",
        forms: {
            present: { "1s": "entro", "2s": "entri", "3s": "entra", "1p": "entriamo", "2p": "entrate", "3p": "entrano" },
            future: { "1s": "entrerò", "2s": "entrerai", "3s": "entrerà", "1p": "entreremo", "2p": "entrerete", "3p": "entreranno" },
            imperfect: { "1s": "entravo", "2s": "entravi", "3s": "entrava", "1p": "entravamo", "2p": "entravate", "3p": "entravano" },
            past_perfect: { "1s": "ero entrato", "2s": "eri entrato", "3s": "era entrato", "1p": "eravamo entrati", "2p": "eravate entrati", "3p": "erano entrati" },
        },
        sentences: {
            present: [{ person: "3s", template: "Il gatto {verb} in casa dalla finestra.", translation: "The cat enters the house through the window." }],
            future: [{ person: "1s", template: "Domani {verb} in ufficio più tardi.", translation: "Tomorrow I will enter the office later." }],
            imperfect: [{ person: "3p", template: "Ogni sera {verb} senza fare rumore.", translation: "Every evening they used to enter without making noise." }],
            past_perfect: [{ person: "2s", template: "Quando ti abbiamo chiamato, tu {verb} già in classe.", translation: "When we called you, you had already entered the classroom." }],
        },
    },
    {
        infinitive: "partire",
        english: "to leave / to depart",
        forms: {
            present: { "1s": "parto", "2s": "parti", "3s": "parte", "1p": "partiamo", "2p": "partite", "3p": "partono" },
            future: { "1s": "partirò", "2s": "partirai", "3s": "partirà", "1p": "partiremo", "2p": "partirete", "3p": "partiranno" },
            imperfect: { "1s": "partivo", "2s": "partivi", "3s": "partiva", "1p": "partivamo", "2p": "partivate", "3p": "partivano" },
            past_perfect: { "1s": "ero partito", "2s": "eri partito", "3s": "era partito", "1p": "eravamo partiti", "2p": "eravate partiti", "3p": "erano partiti" },
        },
        sentences: {
            present: [{ person: "3s", template: "L'aereo {verb} alle sei di mattina.", translation: "The plane leaves at six in the morning." }],
            future: [{ person: "1p", template: "Domani {verb} per le vacanze.", translation: "Tomorrow we will leave for vacation." }],
            imperfect: [{ person: "2p", template: "Ogni estate voi {verb} presto la mattina.", translation: "Every summer you (pl.) used to leave early in the morning." }],
            past_perfect: [{ person: "3p", template: "Quando siamo arrivati, loro {verb} già.", translation: "When we arrived, they had already left." }],
        },
    },
    {
        infinitive: "tornare",
        english: "to return",
        forms: {
            present: { "1s": "torno", "2s": "torni", "3s": "torna", "1p": "torniamo", "2p": "tornate", "3p": "tornano" },
            future: { "1s": "tornerò", "2s": "tornerai", "3s": "tornerà", "1p": "torneremo", "2p": "tornerete", "3p": "torneranno" },
            imperfect: { "1s": "tornavo", "2s": "tornavi", "3s": "tornava", "1p": "tornavamo", "2p": "tornavate", "3p": "tornavano" },
            past_perfect: { "1s": "ero tornato", "2s": "eri tornato", "3s": "era tornato", "1p": "eravamo tornati", "2p": "eravate tornati", "3p": "erano tornati" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} a casa alle sette ogni sera.", translation: "I return home at seven every evening." }],
            future: [{ person: "3s", template: "Domani lui {verb} dal viaggio.", translation: "Tomorrow he will return from the trip." }],
            imperfect: [{ person: "1p", template: "Da bambini {verb} sempre a piedi da scuola.", translation: "As children we always used to return on foot from school." }],
            past_perfect: [{ person: "3p", template: "Quando li abbiamo cercati, loro {verb} già a casa.", translation: "When we looked for them, they had already returned home." }],
        },
    },
    {
        infinitive: "cercare",
        english: "to search / to look for",
        forms: {
            present: { "1s": "cerco", "2s": "cerchi", "3s": "cerca", "1p": "cerchiamo", "2p": "cercate", "3p": "cercano" },
            future: { "1s": "cercherò", "2s": "cercherai", "3s": "cercherà", "1p": "cercheremo", "2p": "cercherete", "3p": "cercheranno" },
            imperfect: { "1s": "cercavo", "2s": "cercavi", "3s": "cercava", "1p": "cercavamo", "2p": "cercavate", "3p": "cercavano" },
            past_perfect: { "1s": "avevo cercato", "2s": "avevi cercato", "3s": "aveva cercato", "1p": "avevamo cercato", "2p": "avevate cercato", "3p": "avevano cercato" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} le chiavi ogni mattina.", translation: "I look for my keys every morning." }],
            future: [{ person: "3p", template: "Domani {verb} un nuovo appartamento.", translation: "Tomorrow they will look for a new apartment." }],
            imperfect: [{ person: "2s", template: "Da bambino tu {verb} sempre avventure nuove.", translation: "As a child you always used to look for new adventures." }],
            past_perfect: [{ person: "1p", template: "Prima di trovarlo, noi {verb} già ovunque.", translation: "Before finding it, we had already looked everywhere." }],
        },
    },
    {
        infinitive: "trovare",
        english: "to find",
        forms: {
            present: { "1s": "trovo", "2s": "trovi", "3s": "trova", "1p": "troviamo", "2p": "trovate", "3p": "trovano" },
            future: { "1s": "troverò", "2s": "troverai", "3s": "troverà", "1p": "troveremo", "2p": "troverete", "3p": "troveranno" },
            imperfect: { "1s": "trovavo", "2s": "trovavi", "3s": "trovava", "1p": "trovavamo", "2p": "trovavate", "3p": "trovavano" },
            past_perfect: { "1s": "avevo trovato", "2s": "avevi trovato", "3s": "aveva trovato", "1p": "avevamo trovato", "2p": "avevate trovato", "3p": "avevano trovato" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marco {verb} sempre una soluzione.", translation: "Marco always finds a solution." }],
            future: [{ person: "1s", template: "Domani {verb} il tempo per chiamarti.", translation: "Tomorrow I will find the time to call you." }],
            imperfect: [{ person: "3p", template: "Ogni volta {verb} un motivo per litigare.", translation: "Every time they used to find a reason to argue." }],
            past_perfect: [{ person: "1p", template: "Prima della fine, noi {verb} già la risposta.", translation: "Before the end, we had already found the answer." }],
        },
    },
    {
        infinitive: "comprare",
        english: "to buy",
        forms: {
            present: { "1s": "compro", "2s": "compri", "3s": "compra", "1p": "compriamo", "2p": "comprate", "3p": "comprano" },
            future: { "1s": "comprerò", "2s": "comprerai", "3s": "comprerà", "1p": "compreremo", "2p": "comprerete", "3p": "compreranno" },
            imperfect: { "1s": "compravo", "2s": "compravi", "3s": "comprava", "1p": "compravamo", "2p": "compravate", "3p": "compravano" },
            past_perfect: { "1s": "avevo comprato", "2s": "avevi comprato", "3s": "aveva comprato", "1p": "avevamo comprato", "2p": "avevate comprato", "3p": "avevano comprato" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} il pane ogni mattina.", translation: "I buy bread every morning." }],
            future: [{ person: "3s", template: "Domani lei {verb} un nuovo vestito.", translation: "Tomorrow she will buy a new dress." }],
            imperfect: [{ person: "1p", template: "Da giovani {verb} sempre gli stessi vestiti.", translation: "When we were young we always used to buy the same clothes." }],
            past_perfect: [{ person: "3p", template: "Quando siamo arrivati al negozio, loro {verb} già tutto.", translation: "When we arrived at the store, they had already bought everything." }],
        },
    },
    {
        infinitive: "vendere",
        english: "to sell",
        forms: {
            present: { "1s": "vendo", "2s": "vendi", "3s": "vende", "1p": "vendiamo", "2p": "vendete", "3p": "vendono" },
            future: { "1s": "venderò", "2s": "venderai", "3s": "venderà", "1p": "venderemo", "2p": "venderete", "3p": "venderanno" },
            imperfect: { "1s": "vendevo", "2s": "vendevi", "3s": "vendeva", "1p": "vendevamo", "2p": "vendevate", "3p": "vendevano" },
            past_perfect: { "1s": "avevo venduto", "2s": "avevi venduto", "3s": "aveva venduto", "1p": "avevamo venduto", "2p": "avevate venduto", "3p": "avevano venduto" },
        },
        sentences: {
            present: [{ person: "3p", template: "Loro {verb} frutta al mercato.", translation: "They sell fruit at the market." }],
            future: [{ person: "1s", template: "Domani {verb} la mia vecchia bicicletta.", translation: "Tomorrow I will sell my old bike." }],
            imperfect: [{ person: "3s", template: "Il negozio {verb} sempre prodotti freschi.", translation: "The store always used to sell fresh products." }],
            past_perfect: [{ person: "2p", template: "Quando siamo tornati, voi {verb} già la casa.", translation: "When we came back, you (pl.) had already sold the house." }],
        },
    },
    {
        infinitive: "aprire",
        english: "to open",
        forms: {
            present: { "1s": "apro", "2s": "apri", "3s": "apre", "1p": "apriamo", "2p": "aprite", "3p": "aprono" },
            future: { "1s": "aprirò", "2s": "aprirai", "3s": "aprirà", "1p": "apriremo", "2p": "aprirete", "3p": "apriranno" },
            imperfect: { "1s": "aprivo", "2s": "aprivi", "3s": "apriva", "1p": "aprivamo", "2p": "aprivate", "3p": "aprivano" },
            past_perfect: { "1s": "avevo aperto", "2s": "avevi aperto", "3s": "aveva aperto", "1p": "avevamo aperto", "2p": "avevate aperto", "3p": "avevano aperto" },
        },
        sentences: {
            present: [{ person: "3s", template: "Il negozio {verb} alle nove ogni giorno.", translation: "The store opens at nine every day." }],
            future: [{ person: "1s", template: "Domani {verb} un nuovo conto in banca.", translation: "Tomorrow I will open a new bank account." }],
            imperfect: [{ person: "3p", template: "Ogni mattina {verb} le finestre presto.", translation: "Every morning they used to open the windows early." }],
            past_perfect: [{ person: "1p", template: "Quando sono arrivati, noi {verb} già la porta.", translation: "When they arrived, we had already opened the door." }],
        },
    },
    {
        infinitive: "chiudere",
        english: "to close",
        forms: {
            present: { "1s": "chiudo", "2s": "chiudi", "3s": "chiude", "1p": "chiudiamo", "2p": "chiudete", "3p": "chiudono" },
            future: { "1s": "chiuderò", "2s": "chiuderai", "3s": "chiuderà", "1p": "chiuderemo", "2p": "chiuderete", "3p": "chiuderanno" },
            imperfect: { "1s": "chiudevo", "2s": "chiudevi", "3s": "chiudeva", "1p": "chiudevamo", "2p": "chiudevate", "3p": "chiudevano" },
            past_perfect: { "1s": "avevo chiuso", "2s": "avevi chiuso", "3s": "aveva chiuso", "1p": "avevamo chiuso", "2p": "avevate chiuso", "3p": "avevano chiuso" },
        },
        sentences: {
            present: [{ person: "3s", template: "Il museo {verb} alle sei di sera.", translation: "The museum closes at six in the evening." }],
            future: [{ person: "2p", template: "Domani voi {verb} il negozio prima.", translation: "Tomorrow you (pl.) will close the shop earlier." }],
            imperfect: [{ person: "1s", template: "Da bambino {verb} sempre la porta con cura.", translation: "As a child I always used to close the door carefully." }],
            past_perfect: [{ person: "3p", template: "Quando siamo tornati, loro {verb} già le finestre.", translation: "When we came back, they had already closed the windows." }],
        },
    },
    {
        infinitive: "leggere",
        english: "to read",
        forms: {
            present: { "1s": "leggo", "2s": "leggi", "3s": "legge", "1p": "leggiamo", "2p": "leggete", "3p": "leggono" },
            future: { "1s": "leggerò", "2s": "leggerai", "3s": "leggerà", "1p": "leggeremo", "2p": "leggerete", "3p": "leggeranno" },
            imperfect: { "1s": "leggevo", "2s": "leggevi", "3s": "leggeva", "1p": "leggevamo", "2p": "leggevate", "3p": "leggevano" },
            past_perfect: { "1s": "avevo letto", "2s": "avevi letto", "3s": "aveva letto", "1p": "avevamo letto", "2p": "avevate letto", "3p": "avevano letto" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} un libro ogni settimana.", translation: "I read a book every week." }],
            future: [{ person: "3s", template: "Domani lei {verb} il giornale con calma.", translation: "Tomorrow she will read the newspaper calmly." }],
            imperfect: [{ person: "1p", template: "Da bambini {verb} sempre prima di dormire.", translation: "As children we always used to read before sleeping." }],
            past_perfect: [{ person: "3s", template: "Quando è iniziata la lezione, lui {verb} già il capitolo.", translation: "When the class started, he had already read the chapter." }],
        },
    },
    {
        infinitive: "giocare",
        english: "to play",
        forms: {
            present: { "1s": "gioco", "2s": "giochi", "3s": "gioca", "1p": "giochiamo", "2p": "giocate", "3p": "giocano" },
            future: { "1s": "giocherò", "2s": "giocherai", "3s": "giocherà", "1p": "giocheremo", "2p": "giocherete", "3p": "giocheranno" },
            imperfect: { "1s": "giocavo", "2s": "giocavi", "3s": "giocava", "1p": "giocavamo", "2p": "giocavate", "3p": "giocavano" },
            past_perfect: { "1s": "avevo giocato", "2s": "avevi giocato", "3s": "aveva giocato", "1p": "avevamo giocato", "2p": "avevate giocato", "3p": "avevano giocato" },
        },
        sentences: {
            present: [{ person: "3p", template: "I bambini {verb} in giardino ogni pomeriggio.", translation: "The children play in the garden every afternoon." }],
            future: [{ person: "1s", template: "Domani {verb} a calcio con gli amici.", translation: "Tomorrow I will play soccer with friends." }],
            imperfect: [{ person: "2s", template: "Da piccolo tu {verb} sempre fuori.", translation: "As a child you always used to play outside." }],
            past_perfect: [{ person: "1p", template: "Quando è iniziata la pioggia, noi {verb} già a lungo.", translation: "When the rain started, we had already been playing for a long time." }],
        },
    },
    {
        infinitive: "lavorare",
        english: "to work",
        forms: {
            present: { "1s": "lavoro", "2s": "lavori", "3s": "lavora", "1p": "lavoriamo", "2p": "lavorate", "3p": "lavorano" },
            future: { "1s": "lavorerò", "2s": "lavorerai", "3s": "lavorerà", "1p": "lavoreremo", "2p": "lavorerete", "3p": "lavoreranno" },
            imperfect: { "1s": "lavoravo", "2s": "lavoravi", "3s": "lavorava", "1p": "lavoravamo", "2p": "lavoravate", "3p": "lavoravano" },
            past_perfect: { "1s": "avevo lavorato", "2s": "avevi lavorato", "3s": "aveva lavorato", "1p": "avevamo lavorato", "2p": "avevate lavorato", "3p": "avevano lavorato" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marco {verb} in banca da cinque anni.", translation: "Marco has worked at the bank for five years." }],
            future: [{ person: "1p", template: "Domani {verb} insieme sul progetto.", translation: "Tomorrow we will work together on the project." }],
            imperfect: [{ person: "3p", template: "Da giovani {verb} tutta la notte.", translation: "When they were young they used to work all night." }],
            past_perfect: [{ person: "2s", template: "Quando ti abbiamo chiamato, tu {verb} già molto.", translation: "When we called you, you had already worked a lot." }],
        },
    },
    {
        infinitive: "studiare",
        english: "to study",
        forms: {
            present: { "1s": "studio", "2s": "studi", "3s": "studia", "1p": "studiamo", "2p": "studiate", "3p": "studiano" },
            future: { "1s": "studierò", "2s": "studierai", "3s": "studierà", "1p": "studieremo", "2p": "studierete", "3p": "studieranno" },
            imperfect: { "1s": "studiavo", "2s": "studiavi", "3s": "studiava", "1p": "studiavamo", "2p": "studiavate", "3p": "studiavano" },
            past_perfect: { "1s": "avevo studiato", "2s": "avevi studiato", "3s": "aveva studiato", "1p": "avevamo studiato", "2p": "avevate studiato", "3p": "avevano studiato" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} l'italiano ogni sera.", translation: "I study Italian every evening." }],
            future: [{ person: "3s", template: "Domani lei {verb} per l'esame.", translation: "Tomorrow she will study for the exam." }],
            imperfect: [{ person: "1p", template: "Da studenti {verb} sempre in biblioteca.", translation: "As students we always used to study in the library." }],
            past_perfect: [{ person: "3p", template: "Quando è iniziato l'esame, loro {verb} già abbastanza.", translation: "When the exam started, they had already studied enough." }],
        },
    },
    {
        infinitive: "imparare",
        english: "to learn",
        forms: {
            present: { "1s": "imparo", "2s": "impari", "3s": "impara", "1p": "impariamo", "2p": "imparate", "3p": "imparano" },
            future: { "1s": "imparerò", "2s": "imparerai", "3s": "imparerà", "1p": "impareremo", "2p": "imparerete", "3p": "impareranno" },
            imperfect: { "1s": "imparavo", "2s": "imparavi", "3s": "imparava", "1p": "imparavamo", "2p": "imparavate", "3p": "imparavano" },
            past_perfect: { "1s": "avevo imparato", "2s": "avevi imparato", "3s": "aveva imparato", "1p": "avevamo imparato", "2p": "avevate imparato", "3p": "avevano imparato" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marco {verb} una nuova lingua ogni anno.", translation: "Marco learns a new language every year." }],
            future: [{ person: "1p", template: "Domani {verb} a suonare la chitarra.", translation: "Tomorrow we will learn to play the guitar." }],
            imperfect: [{ person: "2s", template: "Da bambino {verb} sempre in fretta.", translation: "As a child you always used to learn quickly." }],
            past_perfect: [{ person: "1s", template: "Quando è iniziato il corso, io {verb} già le basi.", translation: "When the course started, I had already learned the basics." }],
        },
    },
    {
        infinitive: "capire",
        english: "to understand",
        forms: {
            present: { "1s": "capisco", "2s": "capisci", "3s": "capisce", "1p": "capiamo", "2p": "capite", "3p": "capiscono" },
            future: { "1s": "capirò", "2s": "capirai", "3s": "capirà", "1p": "capiremo", "2p": "capirete", "3p": "capiranno" },
            imperfect: { "1s": "capivo", "2s": "capivi", "3s": "capiva", "1p": "capivamo", "2p": "capivate", "3p": "capivano" },
            past_perfect: { "1s": "avevo capito", "2s": "avevi capito", "3s": "aveva capito", "1p": "avevamo capito", "2p": "avevate capito", "3p": "avevano capito" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} il problema adesso.", translation: "I understand the problem now." }],
            future: [{ person: "3p", template: "Domani {verb} la verità.", translation: "Tomorrow they will understand the truth." }],
            imperfect: [{ person: "2p", template: "Da bambini voi non {verb} sempre le regole.", translation: "As children you (pl.) didn't always understand the rules." }],
            past_perfect: [{ person: "3s", template: "Quando gliel'ho spiegato, lui {verb} già tutto.", translation: "When I explained it to him, he had already understood everything." }],
        },
    },
    {
        infinitive: "pensare",
        english: "to think",
        forms: {
            present: { "1s": "penso", "2s": "pensi", "3s": "pensa", "1p": "pensiamo", "2p": "pensate", "3p": "pensano" },
            future: { "1s": "penserò", "2s": "penserai", "3s": "penserà", "1p": "penseremo", "2p": "penserete", "3p": "penseranno" },
            imperfect: { "1s": "pensavo", "2s": "pensavi", "3s": "pensava", "1p": "pensavamo", "2p": "pensavate", "3p": "pensavano" },
            past_perfect: { "1s": "avevo pensato", "2s": "avevi pensato", "3s": "aveva pensato", "1p": "avevamo pensato", "2p": "avevate pensato", "3p": "avevano pensato" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} spesso a quel giorno.", translation: "I often think about that day." }],
            future: [{ person: "3s", template: "Domani lei {verb} a una soluzione.", translation: "Tomorrow she will think of a solution." }],
            imperfect: [{ person: "1p", template: "Da giovani {verb} sempre al futuro.", translation: "When we were young we always used to think about the future." }],
            past_perfect: [{ person: "3p", template: "Prima della riunione, loro {verb} già alla proposta.", translation: "Before the meeting, they had already thought about the proposal." }],
        },
    },
    {
        infinitive: "chiedere",
        english: "to ask",
        forms: {
            present: { "1s": "chiedo", "2s": "chiedi", "3s": "chiede", "1p": "chiediamo", "2p": "chiedete", "3p": "chiedono" },
            future: { "1s": "chiederò", "2s": "chiederai", "3s": "chiederà", "1p": "chiederemo", "2p": "chiederete", "3p": "chiederanno" },
            imperfect: { "1s": "chiedevo", "2s": "chiedevi", "3s": "chiedeva", "1p": "chiedevamo", "2p": "chiedevate", "3p": "chiedevano" },
            past_perfect: { "1s": "avevo chiesto", "2s": "avevi chiesto", "3s": "aveva chiesto", "1p": "avevamo chiesto", "2p": "avevate chiesto", "3p": "avevano chiesto" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marco {verb} sempre il permesso.", translation: "Marco always asks permission." }],
            future: [{ person: "1s", template: "Domani {verb} qualcosa al professore.", translation: "Tomorrow I will ask the teacher something." }],
            imperfect: [{ person: "2p", template: "Da bambini voi {verb} sempre troppe cose.", translation: "As children you (pl.) always used to ask too many things." }],
            past_perfect: [{ person: "3p", template: "Prima della fine, loro {verb} già molte cose.", translation: "Before the end, they had already asked many things." }],
        },
    },
    {
        infinitive: "rispondere",
        english: "to answer",
        forms: {
            present: { "1s": "rispondo", "2s": "rispondi", "3s": "risponde", "1p": "rispondiamo", "2p": "rispondete", "3p": "rispondono" },
            future: { "1s": "risponderò", "2s": "risponderai", "3s": "risponderà", "1p": "risponderemo", "2p": "risponderete", "3p": "risponderanno" },
            imperfect: { "1s": "rispondevo", "2s": "rispondevi", "3s": "rispondeva", "1p": "rispondevamo", "2p": "rispondevate", "3p": "rispondevano" },
            past_perfect: { "1s": "avevo risposto", "2s": "avevi risposto", "3s": "aveva risposto", "1p": "avevamo risposto", "2p": "avevate risposto", "3p": "avevano risposto" },
        },
        sentences: {
            present: [{ person: "3s", template: "Maria {verb} sempre educatamente.", translation: "Maria always answers politely." }],
            future: [{ person: "1p", template: "Domani {verb} a tutte le domande.", translation: "Tomorrow we will answer all the questions." }],
            imperfect: [{ person: "3p", template: "Da bambini {verb} sempre con calma.", translation: "As children they always used to answer calmly." }],
            past_perfect: [{ person: "2s", template: "Quando ti ho scritto, tu {verb} già alla lettera.", translation: "When I wrote to you, you had already answered the letter." }],
        },
    },
    {
        infinitive: "chiamare",
        english: "to call",
        forms: {
            present: { "1s": "chiamo", "2s": "chiami", "3s": "chiama", "1p": "chiamiamo", "2p": "chiamate", "3p": "chiamano" },
            future: { "1s": "chiamerò", "2s": "chiamerai", "3s": "chiamerà", "1p": "chiameremo", "2p": "chiamerete", "3p": "chiameranno" },
            imperfect: { "1s": "chiamavo", "2s": "chiamavi", "3s": "chiamava", "1p": "chiamavamo", "2p": "chiamavate", "3p": "chiamavano" },
            past_perfect: { "1s": "avevo chiamato", "2s": "avevi chiamato", "3s": "aveva chiamato", "1p": "avevamo chiamato", "2p": "avevate chiamato", "3p": "avevano chiamato" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} mia madre ogni domenica.", translation: "I call my mother every Sunday." }],
            future: [{ person: "3s", template: "Domani lui {verb} il dottore.", translation: "Tomorrow he will call the doctor." }],
            imperfect: [{ person: "1p", template: "Da bambini {verb} sempre i nonni la domenica.", translation: "As children we always used to call our grandparents on Sundays." }],
            past_perfect: [{ person: "3p", template: "Prima della cena, loro {verb} già tutti gli invitati.", translation: "Before dinner, they had already called all the guests." }],
        },
    },
    {
        infinitive: "camminare",
        english: "to walk",
        forms: {
            present: { "1s": "cammino", "2s": "cammini", "3s": "cammina", "1p": "camminiamo", "2p": "camminate", "3p": "camminano" },
            future: { "1s": "camminerò", "2s": "camminerai", "3s": "camminerà", "1p": "cammineremo", "2p": "camminerete", "3p": "cammineranno" },
            imperfect: { "1s": "camminavo", "2s": "camminavi", "3s": "camminava", "1p": "camminavamo", "2p": "camminavate", "3p": "camminavano" },
            past_perfect: { "1s": "avevo camminato", "2s": "avevi camminato", "3s": "aveva camminato", "1p": "avevamo camminato", "2p": "avevate camminato", "3p": "avevano camminato" },
        },
        sentences: {
            present: [{ person: "3p", template: "I turisti {verb} per la città tutto il giorno.", translation: "The tourists walk around the city all day." }],
            future: [{ person: "1s", template: "Domani {verb} lungo la spiaggia.", translation: "Tomorrow I will walk along the beach." }],
            imperfect: [{ person: "2s", template: "Da bambino tu {verb} sempre scalzo.", translation: "As a child you always used to walk barefoot." }],
            past_perfect: [{ person: "1p", template: "Prima di fermarci, noi {verb} già per ore.", translation: "Before stopping, we had already been walking for hours." }],
        },
    },
    {
        infinitive: "correre",
        english: "to run",
        forms: {
            present: { "1s": "corro", "2s": "corri", "3s": "corre", "1p": "corriamo", "2p": "correte", "3p": "corrono" },
            future: { "1s": "correrò", "2s": "correrai", "3s": "correrà", "1p": "correremo", "2p": "correrete", "3p": "correranno" },
            imperfect: { "1s": "correvo", "2s": "correvi", "3s": "correva", "1p": "correvamo", "2p": "correvate", "3p": "correvano" },
            past_perfect: { "1s": "avevo corso", "2s": "avevi corso", "3s": "aveva corso", "1p": "avevamo corso", "2p": "avevate corso", "3p": "avevano corso" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marco {verb} nel parco ogni mattina.", translation: "Marco runs in the park every morning." }],
            future: [{ person: "2p", template: "Domani voi {verb} la maratona.", translation: "Tomorrow you (pl.) will run the marathon." }],
            imperfect: [{ person: "3s", template: "Da giovane {verb} per ore senza fermarsi.", translation: "As a young man he used to run for hours without stopping." }],
            past_perfect: [{ person: "1s", template: "Quando sono arrivato, io {verb} già cinque chilometri.", translation: "When I arrived, I had already run five kilometers." }],
        },
    },
    {
        infinitive: "viaggiare",
        english: "to travel",
        forms: {
            present: { "1s": "viaggio", "2s": "viaggi", "3s": "viaggia", "1p": "viaggiamo", "2p": "viaggiate", "3p": "viaggiano" },
            future: { "1s": "viaggerò", "2s": "viaggerai", "3s": "viaggerà", "1p": "viaggeremo", "2p": "viaggerete", "3p": "viaggeranno" },
            imperfect: { "1s": "viaggiavo", "2s": "viaggiavi", "3s": "viaggiava", "1p": "viaggiavamo", "2p": "viaggiavate", "3p": "viaggiavano" },
            past_perfect: { "1s": "avevo viaggiato", "2s": "avevi viaggiato", "3s": "aveva viaggiato", "1p": "avevamo viaggiato", "2p": "avevate viaggiato", "3p": "avevano viaggiato" },
        },
        sentences: {
            present: [{ person: "1p", template: "Noi {verb} in Europa ogni estate.", translation: "We travel around Europe every summer." }],
            future: [{ person: "3s", template: "L'anno prossimo lei {verb} in Asia.", translation: "Next year she will travel to Asia." }],
            imperfect: [{ person: "3p", template: "Da giovani {verb} spesso da soli.", translation: "When they were young they often used to travel alone." }],
            past_perfect: [{ person: "2s", template: "Prima di stabilirti qui, tu {verb} già molto.", translation: "Before settling here, you had already traveled a lot." }],
        },
    },
    {
        infinitive: "cantare",
        english: "to sing",
        forms: {
            present: { "1s": "canto", "2s": "canti", "3s": "canta", "1p": "cantiamo", "2p": "cantate", "3p": "cantano" },
            future: { "1s": "canterò", "2s": "canterai", "3s": "canterà", "1p": "canteremo", "2p": "canterete", "3p": "canteranno" },
            imperfect: { "1s": "cantavo", "2s": "cantavi", "3s": "cantava", "1p": "cantavamo", "2p": "cantavate", "3p": "cantavano" },
            past_perfect: { "1s": "avevo cantato", "2s": "avevi cantato", "3s": "aveva cantato", "1p": "avevamo cantato", "2p": "avevate cantato", "3p": "avevano cantato" },
        },
        sentences: {
            present: [{ person: "3s", template: "Maria {verb} ogni mattina sotto la doccia.", translation: "Maria sings every morning in the shower." }],
            future: [{ person: "1s", template: "Domani {verb} al concerto della scuola.", translation: "Tomorrow I will sing at the school concert." }],
            imperfect: [{ person: "1p", template: "Da bambini {verb} sempre in coro.", translation: "As children we always used to sing in the choir." }],
            past_perfect: [{ person: "3p", template: "Prima della fine dello spettacolo, loro {verb} già tre canzoni.", translation: "Before the end of the show, they had already sung three songs." }],
        },
    },
    {
        infinitive: "aiutare",
        english: "to help",
        forms: {
            present: { "1s": "aiuto", "2s": "aiuti", "3s": "aiuta", "1p": "aiutiamo", "2p": "aiutate", "3p": "aiutano" },
            future: { "1s": "aiuterò", "2s": "aiuterai", "3s": "aiuterà", "1p": "aiuteremo", "2p": "aiuterete", "3p": "aiuteranno" },
            imperfect: { "1s": "aiutavo", "2s": "aiutavi", "3s": "aiutava", "1p": "aiutavamo", "2p": "aiutavate", "3p": "aiutavano" },
            past_perfect: { "1s": "avevo aiutato", "2s": "avevi aiutato", "3s": "aveva aiutato", "1p": "avevamo aiutato", "2p": "avevate aiutato", "3p": "avevano aiutato" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} mio fratello con i compiti.", translation: "I help my brother with homework." }],
            future: [{ person: "3s", template: "Domani lei {verb} i nuovi studenti.", translation: "Tomorrow she will help the new students." }],
            imperfect: [{ person: "2p", template: "Da giovani voi {verb} sempre i vicini.", translation: "When you (pl.) were young you always used to help the neighbors." }],
            past_perfect: [{ person: "1p", template: "Prima della gara, noi {verb} già molti atleti.", translation: "Before the race, we had already helped many athletes." }],
        },
    },
    {
        infinitive: "amare",
        english: "to love",
        forms: {
            present: { "1s": "amo", "2s": "ami", "3s": "ama", "1p": "amiamo", "2p": "amate", "3p": "amano" },
            future: { "1s": "amerò", "2s": "amerai", "3s": "amerà", "1p": "ameremo", "2p": "amerete", "3p": "ameranno" },
            imperfect: { "1s": "amavo", "2s": "amavi", "3s": "amava", "1p": "amavamo", "2p": "amavate", "3p": "amavano" },
            past_perfect: { "1s": "avevo amato", "2s": "avevi amato", "3s": "aveva amato", "1p": "avevamo amato", "2p": "avevate amato", "3p": "avevano amato" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marco {verb} la sua famiglia sopra ogni cosa.", translation: "Marco loves his family above all else." }],
            future: [{ person: "1s", template: "Per sempre {verb} questa città.", translation: "I will love this city forever." }],
            imperfect: [{ person: "3p", template: "Da giovani {verb} molto la loro terra natale.", translation: "When they were young they loved their homeland very much." }],
            past_perfect: [{ person: "1p", template: "Prima di conoscerlo, noi {verb} già quel posto.", translation: "Before knowing him, we had already loved that place." }],
        },
    },
    {
        infinitive: "dimenticare",
        english: "to forget",
        forms: {
            present: { "1s": "dimentico", "2s": "dimentichi", "3s": "dimentica", "1p": "dimentichiamo", "2p": "dimenticate", "3p": "dimenticano" },
            future: { "1s": "dimenticherò", "2s": "dimenticherai", "3s": "dimenticherà", "1p": "dimenticheremo", "2p": "dimenticherete", "3p": "dimenticheranno" },
            imperfect: { "1s": "dimenticavo", "2s": "dimenticavi", "3s": "dimenticava", "1p": "dimenticavamo", "2p": "dimenticavate", "3p": "dimenticavano" },
            past_perfect: { "1s": "avevo dimenticato", "2s": "avevi dimenticato", "3s": "aveva dimenticato", "1p": "avevamo dimenticato", "2p": "avevate dimenticato", "3p": "avevano dimenticato" },
        },
        sentences: {
            present: [{ person: "1s", template: "Io {verb} spesso le chiavi di casa.", translation: "I often forget my house keys." }],
            future: [{ person: "3s", template: "Non {verb} mai quel giorno.", translation: "He will never forget that day." }],
            imperfect: [{ person: "2p", template: "Da bambini voi {verb} sempre i compiti.", translation: "As children you (pl.) always used to forget your homework." }],
            past_perfect: [{ person: "3p", template: "Prima della fine del viaggio, loro {verb} già il problema.", translation: "Before the end of the trip, they had already forgotten the problem." }],
        },
    },
    {
        infinitive: "cominciare",
        english: "to begin",
        forms: {
            present: { "1s": "comincio", "2s": "cominci", "3s": "comincia", "1p": "cominciamo", "2p": "cominciate", "3p": "cominciano" },
            future: { "1s": "comincerò", "2s": "comincerai", "3s": "comincerà", "1p": "cominceremo", "2p": "comincerete", "3p": "cominceranno" },
            imperfect: { "1s": "cominciavo", "2s": "cominciavi", "3s": "cominciava", "1p": "cominciavamo", "2p": "cominciavate", "3p": "cominciavano" },
            past_perfect: { "1s": "avevo cominciato", "2s": "avevi cominciato", "3s": "aveva cominciato", "1p": "avevamo cominciato", "2p": "avevate cominciato", "3p": "avevano cominciato" },
        },
        sentences: {
            present: [{ person: "3s", template: "Il film {verb} alle nove di sera.", translation: "The movie begins at nine in the evening." }],
            future: [{ person: "1p", template: "Domani {verb} un nuovo progetto.", translation: "Tomorrow we will begin a new project." }],
            imperfect: [{ person: "3p", template: "Ogni giorno {verb} a lavorare presto.", translation: "Every day they used to begin working early." }],
            past_perfect: [{ person: "1s", template: "Quando sono arrivato, io {verb} già il lavoro.", translation: "When I arrived, I had already begun the work." }],
        },
    },
];

const frenchVerbs: VerbEntry[] = [
    {
        infinitive: "parler",
        english: "to speak",
        forms: {
            present: { "1s": "parle", "2s": "parles", "3s": "parle", "1p": "parlons", "2p": "parlez", "3p": "parlent" },
            future: { "1s": "parlerai", "2s": "parleras", "3s": "parlera", "1p": "parlerons", "2p": "parlerez", "3p": "parleront" },
            imperfect: { "1s": "parlais", "2s": "parlais", "3s": "parlait", "1p": "parlions", "2p": "parliez", "3p": "parlaient" },
            past_perfect: { "1s": "avais parlé", "2s": "avais parlé", "3s": "avait parlé", "1p": "avions parlé", "2p": "aviez parlé", "3p": "avaient parlé" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marie {verb} français couramment.", translation: "Marie speaks French fluently." }],
            future: [{ person: "1s", template: "Demain je {verb} au directeur.", translation: "Tomorrow I will speak to the director." }],
            imperfect: [{ person: "3p", template: "Ils {verb} toujours de politique.", translation: "They were always talking about politics." }],
            past_perfect: [{ person: "1p", template: "Nous {verb} déjà avant son arrivée.", translation: "We had already spoken before his arrival." }],
        },
    },
    {
        infinitive: "manger",
        english: "to eat",
        forms: {
            present: { "1s": "mange", "2s": "manges", "3s": "mange", "1p": "mangeons", "2p": "mangez", "3p": "mangent" },
            future: { "1s": "mangerai", "2s": "mangeras", "3s": "mangera", "1p": "mangerons", "2p": "mangerez", "3p": "mangeront" },
            imperfect: { "1s": "mangeais", "2s": "mangeais", "3s": "mangeait", "1p": "mangions", "2p": "mangiez", "3p": "mangeaient" },
            past_perfect: { "1s": "avais mangé", "2s": "avais mangé", "3s": "avait mangé", "1p": "avions mangé", "2p": "aviez mangé", "3p": "avaient mangé" },
        },
        sentences: {
            present: [{ person: "1s", template: "Je {verb} une pomme chaque matin.", translation: "I eat an apple every morning." }],
            future: [{ person: "2s", template: "Ce soir tu {verb} au restaurant.", translation: "Tonight you will eat at the restaurant." }],
            imperfect: [{ person: "3s", template: "Enfant, il {verb} toujours des bonbons.", translation: "As a child, he always ate candy." }],
            past_perfect: [{ person: "3p", template: "Quand nous sommes arrivés, ils {verb} déjà.", translation: "When we arrived, they had already eaten." }],
        },
    },
    {
        infinitive: "être",
        english: "to be",
        forms: {
            present: { "1s": "suis", "2s": "es", "3s": "est", "1p": "sommes", "2p": "êtes", "3p": "sont" },
            future: { "1s": "serai", "2s": "seras", "3s": "sera", "1p": "serons", "2p": "serez", "3p": "seront" },
            imperfect: { "1s": "étais", "2s": "étais", "3s": "était", "1p": "étions", "2p": "étiez", "3p": "étaient" },
            past_perfect: { "1s": "avais été", "2s": "avais été", "3s": "avait été", "1p": "avions été", "2p": "aviez été", "3p": "avaient été" },
        },
        sentences: {
            present: [{ person: "1s", template: "Je {verb} très content aujourd'hui.", translation: "I am very happy today." }],
            future: [{ person: "3p", template: "Ils {verb} en vacances en juillet.", translation: "They will be on vacation in July." }],
            imperfect: [{ person: "2s", template: "Tu {verb} toujours gentil avec moi.", translation: "You were always kind to me." }],
            past_perfect: [{ person: "3s", template: "Il {verb} malade avant de partir.", translation: "He had been sick before leaving." }],
        },
    },
    {
        infinitive: "avoir",
        english: "to have",
        forms: {
            present: { "1s": "ai", "2s": "as", "3s": "a", "1p": "avons", "2p": "avez", "3p": "ont" },
            future: { "1s": "aurai", "2s": "auras", "3s": "aura", "1p": "aurons", "2p": "aurez", "3p": "auront" },
            imperfect: { "1s": "avais", "2s": "avais", "3s": "avait", "1p": "avions", "2p": "aviez", "3p": "avaient" },
            past_perfect: { "1s": "avais eu", "2s": "avais eu", "3s": "avait eu", "1p": "avions eu", "2p": "aviez eu", "3p": "avaient eu" },
        },
        sentences: {
            present: [{ person: "1p", template: "Nous {verb} une maison à la campagne.", translation: "We have a house in the countryside." }],
            future: [{ person: "2p", template: "Vous {verb} du temps demain?", translation: "Will you have time tomorrow?" }],
            imperfect: [{ person: "1s", template: "Enfant, j'{verb} un chien noir.", translation: "As a child, I had a black dog." }],
            past_perfect: [{ person: "3p", template: "Ils {verb} beaucoup de difficultés avant.", translation: "They had had many difficulties before." }],
        },
    },
    {
        infinitive: "faire",
        english: "to do / to make",
        forms: {
            present: { "1s": "fais", "2s": "fais", "3s": "fait", "1p": "faisons", "2p": "faites", "3p": "font" },
            future: { "1s": "ferai", "2s": "feras", "3s": "fera", "1p": "ferons", "2p": "ferez", "3p": "feront" },
            imperfect: { "1s": "faisais", "2s": "faisais", "3s": "faisait", "1p": "faisions", "2p": "faisiez", "3p": "faisaient" },
            past_perfect: { "1s": "avais fait", "2s": "avais fait", "3s": "avait fait", "1p": "avions fait", "2p": "aviez fait", "3p": "avaient fait" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marie {verb} ses devoirs chaque soir.", translation: "Marie does her homework every evening." }],
            future: [{ person: "1s", template: "Demain je {verb} un gâteau pour la fête.", translation: "Tomorrow I will make a cake for the party." }],
            imperfect: [{ person: "3p", template: "Enfants, ils {verb} toujours du bruit.", translation: "As children they always made noise." }],
            past_perfect: [{ person: "1p", template: "Quand elle est arrivée, nous {verb} déjà les courses.", translation: "When she arrived, we had already done the shopping." }],
        },
    },
    {
        infinitive: "pouvoir",
        english: "to be able to / can",
        forms: {
            present: { "1s": "peux", "2s": "peux", "3s": "peut", "1p": "pouvons", "2p": "pouvez", "3p": "peuvent" },
            future: { "1s": "pourrai", "2s": "pourras", "3s": "pourra", "1p": "pourrons", "2p": "pourrez", "3p": "pourront" },
            imperfect: { "1s": "pouvais", "2s": "pouvais", "3s": "pouvait", "1p": "pouvions", "2p": "pouviez", "3p": "pouvaient" },
            past_perfect: { "1s": "avais pu", "2s": "avais pu", "3s": "avait pu", "1p": "avions pu", "2p": "aviez pu", "3p": "avaient pu" },
        },
        sentences: {
            present: [{ person: "1s", template: "Je ne {verb} pas venir ce soir.", translation: "I cannot come tonight." }],
            future: [{ person: "2s", template: "Demain tu {verb} enfin te reposer.", translation: "Tomorrow you will finally be able to rest." }],
            imperfect: [{ person: "3s", template: "Jeune, il {verb} courir pendant des heures.", translation: "As a young man he could run for hours." }],
            past_perfect: [{ person: "3p", template: "Ils ne {verb} pas partir avant huit heures.", translation: "They had not been able to leave before eight." }],
        },
    },
    {
        infinitive: "vouloir",
        english: "to want",
        forms: {
            present: { "1s": "veux", "2s": "veux", "3s": "veut", "1p": "voulons", "2p": "voulez", "3p": "veulent" },
            future: { "1s": "voudrai", "2s": "voudras", "3s": "voudra", "1p": "voudrons", "2p": "voudrez", "3p": "voudront" },
            imperfect: { "1s": "voulais", "2s": "voulais", "3s": "voulait", "1p": "voulions", "2p": "vouliez", "3p": "voulaient" },
            past_perfect: { "1s": "avais voulu", "2s": "avais voulu", "3s": "avait voulu", "1p": "avions voulu", "2p": "aviez voulu", "3p": "avaient voulu" },
        },
        sentences: {
            present: [{ person: "1p", template: "Nous {verb} visiter Rome cet été.", translation: "We want to visit Rome this summer." }],
            future: [{ person: "3s", template: "Elle {verb} étudier la médecine.", translation: "She will want to study medicine." }],
            imperfect: [{ person: "1s", template: "Enfant, je {verb} toujours jouer dehors.", translation: "As a child I always wanted to play outside." }],
            past_perfect: [{ person: "2s", template: "Tu {verb} déjà partir avant la réunion.", translation: "You had already wanted to leave before the meeting." }],
        },
    },
    {
        infinitive: "devoir",
        english: "to have to / must",
        forms: {
            present: { "1s": "dois", "2s": "dois", "3s": "doit", "1p": "devons", "2p": "devez", "3p": "doivent" },
            future: { "1s": "devrai", "2s": "devras", "3s": "devra", "1p": "devrons", "2p": "devrez", "3p": "devront" },
            imperfect: { "1s": "devais", "2s": "devais", "3s": "devait", "1p": "devions", "2p": "deviez", "3p": "devaient" },
            past_perfect: { "1s": "avais dû", "2s": "avais dû", "3s": "avait dû", "1p": "avions dû", "2p": "aviez dû", "3p": "avaient dû" },
        },
        sentences: {
            present: [{ person: "2p", template: "Vous {verb} finir le projet avant vendredi.", translation: "You (pl.) must finish the project by Friday." }],
            future: [{ person: "1s", template: "Demain je {verb} me lever tôt.", translation: "Tomorrow I will have to get up early." }],
            imperfect: [{ person: "3p", template: "Ils {verb} toujours demander la permission.", translation: "They always had to ask permission." }],
            past_perfect: [{ person: "1p", template: "Nous {verb} déjà payer l'addition.", translation: "We had already had to pay the bill." }],
        },
    },
    {
        infinitive: "savoir",
        english: "to know",
        forms: {
            present: { "1s": "sais", "2s": "sais", "3s": "sait", "1p": "savons", "2p": "savez", "3p": "savent" },
            future: { "1s": "saurai", "2s": "sauras", "3s": "saura", "1p": "saurons", "2p": "saurez", "3p": "sauront" },
            imperfect: { "1s": "savais", "2s": "savais", "3s": "savait", "1p": "savions", "2p": "saviez", "3p": "savaient" },
            past_perfect: { "1s": "avais su", "2s": "avais su", "3s": "avait su", "1p": "avions su", "2p": "aviez su", "3p": "avaient su" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marc {verb} parler trois langues.", translation: "Marc knows how to speak three languages." }],
            future: [{ person: "1p", template: "Demain nous {verb} le résultat de l'examen.", translation: "Tomorrow we will know the exam result." }],
            imperfect: [{ person: "1s", template: "Enfant, je ne {verb} pas nager.", translation: "As a child I didn't know how to swim." }],
            past_perfect: [{ person: "3p", template: "Ils {verb} déjà la vérité avant nous.", translation: "They had already known the truth before us." }],
        },
    },
    {
        infinitive: "voir",
        english: "to see",
        forms: {
            present: { "1s": "vois", "2s": "vois", "3s": "voit", "1p": "voyons", "2p": "voyez", "3p": "voient" },
            future: { "1s": "verrai", "2s": "verras", "3s": "verra", "1p": "verrons", "2p": "verrez", "3p": "verront" },
            imperfect: { "1s": "voyais", "2s": "voyais", "3s": "voyait", "1p": "voyions", "2p": "voyiez", "3p": "voyaient" },
            past_perfect: { "1s": "avais vu", "2s": "avais vu", "3s": "avait vu", "1p": "avions vu", "2p": "aviez vu", "3p": "avaient vu" },
        },
        sentences: {
            present: [{ person: "1s", template: "Je {verb} la mer depuis la fenêtre.", translation: "I see the sea from the window." }],
            future: [{ person: "3p", template: "Demain ils {verb} le nouveau film.", translation: "Tomorrow they will see the new movie." }],
            imperfect: [{ person: "2s", template: "De là, tu {verb} toute la ville.", translation: "From there, you used to see the whole city." }],
            past_perfect: [{ person: "3s", template: "Elle {verb} déjà ce musée avant le voyage.", translation: "She had already seen that museum before the trip." }],
        },
    },
    {
        infinitive: "dire",
        english: "to say",
        forms: {
            present: { "1s": "dis", "2s": "dis", "3s": "dit", "1p": "disons", "2p": "dites", "3p": "disent" },
            future: { "1s": "dirai", "2s": "diras", "3s": "dira", "1p": "dirons", "2p": "direz", "3p": "diront" },
            imperfect: { "1s": "disais", "2s": "disais", "3s": "disait", "1p": "disions", "2p": "disiez", "3p": "disaient" },
            past_perfect: { "1s": "avais dit", "2s": "avais dit", "3s": "avait dit", "1p": "avions dit", "2p": "aviez dit", "3p": "avaient dit" },
        },
        sentences: {
            present: [{ person: "3p", template: "Ils {verb} toujours la vérité.", translation: "They always tell the truth." }],
            future: [{ person: "1s", template: "Demain je {verb} tout au professeur.", translation: "Tomorrow I will tell everything to the professor." }],
            imperfect: [{ person: "1p", template: "Nous {verb} souvent la même chose.", translation: "We often used to say the same thing." }],
            past_perfect: [{ person: "2s", template: "Tu {verb} déjà ton avis avant la réunion.", translation: "You had already said your opinion before the meeting." }],
        },
    },
    {
        infinitive: "prendre",
        english: "to take",
        forms: {
            present: { "1s": "prends", "2s": "prends", "3s": "prend", "1p": "prenons", "2p": "prenez", "3p": "prennent" },
            future: { "1s": "prendrai", "2s": "prendras", "3s": "prendra", "1p": "prendrons", "2p": "prendrez", "3p": "prendront" },
            imperfect: { "1s": "prenais", "2s": "prenais", "3s": "prenait", "1p": "prenions", "2p": "preniez", "3p": "prenaient" },
            past_perfect: { "1s": "avais pris", "2s": "avais pris", "3s": "avait pris", "1p": "avions pris", "2p": "aviez pris", "3p": "avaient pris" },
        },
        sentences: {
            present: [{ person: "1s", template: "Je {verb} le train tous les matins.", translation: "I take the train every morning." }],
            future: [{ person: "3s", template: "Demain il {verb} l'avion.", translation: "Tomorrow he will take the plane." }],
            imperfect: [{ person: "1p", template: "Nous {verb} toujours le même chemin.", translation: "We always used to take the same path." }],
            past_perfect: [{ person: "3p", template: "Ils {verb} déjà leur décision avant la réunion.", translation: "They had already made their decision before the meeting." }],
        },
    },
    {
        infinitive: "mettre",
        english: "to put",
        forms: {
            present: { "1s": "mets", "2s": "mets", "3s": "met", "1p": "mettons", "2p": "mettez", "3p": "mettent" },
            future: { "1s": "mettrai", "2s": "mettras", "3s": "mettra", "1p": "mettrons", "2p": "mettrez", "3p": "mettront" },
            imperfect: { "1s": "mettais", "2s": "mettais", "3s": "mettait", "1p": "mettions", "2p": "mettiez", "3p": "mettaient" },
            past_perfect: { "1s": "avais mis", "2s": "avais mis", "3s": "avait mis", "1p": "avions mis", "2p": "aviez mis", "3p": "avaient mis" },
        },
        sentences: {
            present: [{ person: "3s", template: "Elle {verb} la table tous les soirs.", translation: "She sets the table every evening." }],
            future: [{ person: "2p", template: "Demain vous {verb} vos manteaux.", translation: "Tomorrow you (pl.) will put on your coats." }],
            imperfect: [{ person: "1s", template: "Enfant, je {verb} toujours mes jouets ici.", translation: "As a child I always used to put my toys here." }],
            past_perfect: [{ person: "1p", template: "Nous {verb} déjà la lettre à la poste.", translation: "We had already put the letter in the mail." }],
        },
    },
    {
        infinitive: "finir",
        english: "to finish",
        forms: {
            present: { "1s": "finis", "2s": "finis", "3s": "finit", "1p": "finissons", "2p": "finissez", "3p": "finissent" },
            future: { "1s": "finirai", "2s": "finiras", "3s": "finira", "1p": "finirons", "2p": "finirez", "3p": "finiront" },
            imperfect: { "1s": "finissais", "2s": "finissais", "3s": "finissait", "1p": "finissions", "2p": "finissiez", "3p": "finissaient" },
            past_perfect: { "1s": "avais fini", "2s": "avais fini", "3s": "avait fini", "1p": "avions fini", "2p": "aviez fini", "3p": "avaient fini" },
        },
        sentences: {
            present: [{ person: "1p", template: "Nous {verb} le travail à six heures.", translation: "We finish work at six." }],
            future: [{ person: "2s", template: "Demain tu {verb} le livre.", translation: "Tomorrow you will finish the book." }],
            imperfect: [{ person: "3s", template: "Chaque soir il {verb} tard.", translation: "Every evening he used to finish late." }],
            past_perfect: [{ person: "1s", template: "J'{verb} déjà le devoir avant le dîner.", translation: "I had already finished the homework before dinner." }],
        },
    },
    {
        infinitive: "attendre",
        english: "to wait",
        forms: {
            present: { "1s": "attends", "2s": "attends", "3s": "attend", "1p": "attendons", "2p": "attendez", "3p": "attendent" },
            future: { "1s": "attendrai", "2s": "attendras", "3s": "attendra", "1p": "attendrons", "2p": "attendrez", "3p": "attendront" },
            imperfect: { "1s": "attendais", "2s": "attendais", "3s": "attendait", "1p": "attendions", "2p": "attendiez", "3p": "attendaient" },
            past_perfect: { "1s": "avais attendu", "2s": "avais attendu", "3s": "avait attendu", "1p": "avions attendu", "2p": "aviez attendu", "3p": "avaient attendu" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marie {verb} le bus chaque matin.", translation: "Marie waits for the bus every morning." }],
            future: [{ person: "1p", template: "Demain nous {verb} son arrivée.", translation: "Tomorrow we will wait for her arrival." }],
            imperfect: [{ person: "2p", template: "Vous {verb} toujours devant la porte.", translation: "You (pl.) always used to wait in front of the door." }],
            past_perfect: [{ person: "3p", template: "Ils {verb} déjà longtemps quand elle est arrivée.", translation: "They had already been waiting a long time when she arrived." }],
        },
    },
    {
        infinitive: "croire",
        english: "to believe",
        forms: {
            present: { "1s": "crois", "2s": "crois", "3s": "croit", "1p": "croyons", "2p": "croyez", "3p": "croient" },
            future: { "1s": "croirai", "2s": "croiras", "3s": "croira", "1p": "croirons", "2p": "croirez", "3p": "croiront" },
            imperfect: { "1s": "croyais", "2s": "croyais", "3s": "croyait", "1p": "croyions", "2p": "croyiez", "3p": "croyaient" },
            past_perfect: { "1s": "avais cru", "2s": "avais cru", "3s": "avait cru", "1p": "avions cru", "2p": "aviez cru", "3p": "avaient cru" },
        },
        sentences: {
            present: [{ person: "1s", template: "Je {verb} en ce projet.", translation: "I believe in this project." }],
            future: [{ person: "3s", template: "À la fin elle {verb} à notre idée.", translation: "In the end she will believe our idea." }],
            imperfect: [{ person: "3p", template: "Ils {verb} en un avenir meilleur.", translation: "They used to believe in a better future." }],
            past_perfect: [{ person: "1p", template: "Nous {verb} déjà à cette histoire.", translation: "We had already believed that story." }],
        },
    },
    {
        infinitive: "dormir",
        english: "to sleep",
        forms: {
            present: { "1s": "dors", "2s": "dors", "3s": "dort", "1p": "dormons", "2p": "dormez", "3p": "dorment" },
            future: { "1s": "dormirai", "2s": "dormiras", "3s": "dormira", "1p": "dormirons", "2p": "dormirez", "3p": "dormiront" },
            imperfect: { "1s": "dormais", "2s": "dormais", "3s": "dormait", "1p": "dormions", "2p": "dormiez", "3p": "dormaient" },
            past_perfect: { "1s": "avais dormi", "2s": "avais dormi", "3s": "avait dormi", "1p": "avions dormi", "2p": "aviez dormi", "3p": "avaient dormi" },
        },
        sentences: {
            present: [{ person: "3s", template: "L'enfant {verb} toute la nuit.", translation: "The child sleeps all night." }],
            future: [{ person: "1s", template: "Ce soir je {verb} tôt.", translation: "Tonight I will sleep early." }],
            imperfect: [{ person: "2p", template: "Vous {verb} toujours jusqu'à tard.", translation: "You (pl.) always used to sleep late." }],
            past_perfect: [{ person: "3p", template: "Ils {verb} déjà quand nous sommes arrivés.", translation: "They had already been sleeping when we arrived." }],
        },
    },
    {
        infinitive: "écrire",
        english: "to write",
        forms: {
            present: { "1s": "écris", "2s": "écris", "3s": "écrit", "1p": "écrivons", "2p": "écrivez", "3p": "écrivent" },
            future: { "1s": "écrirai", "2s": "écriras", "3s": "écrira", "1p": "écrirons", "2p": "écrirez", "3p": "écriront" },
            imperfect: { "1s": "écrivais", "2s": "écrivais", "3s": "écrivait", "1p": "écrivions", "2p": "écriviez", "3p": "écrivaient" },
            past_perfect: { "1s": "avais écrit", "2s": "avais écrit", "3s": "avait écrit", "1p": "avions écrit", "2p": "aviez écrit", "3p": "avaient écrit" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marie {verb} une lettre chaque semaine.", translation: "Marie writes a letter every week." }],
            future: [{ person: "1p", template: "Demain nous {verb} le rapport.", translation: "Tomorrow we will write the report." }],
            imperfect: [{ person: "1s", template: "Étudiant, j'{verb} des poèmes.", translation: "As a student I used to write poems." }],
            past_perfect: [{ person: "3p", template: "Ils {verb} déjà le message avant de partir.", translation: "They had already written the message before leaving." }],
        },
    },
    {
        infinitive: "vivre",
        english: "to live",
        forms: {
            present: { "1s": "vis", "2s": "vis", "3s": "vit", "1p": "vivons", "2p": "vivez", "3p": "vivent" },
            future: { "1s": "vivrai", "2s": "vivras", "3s": "vivra", "1p": "vivrons", "2p": "vivrez", "3p": "vivront" },
            imperfect: { "1s": "vivais", "2s": "vivais", "3s": "vivait", "1p": "vivions", "2p": "viviez", "3p": "vivaient" },
            past_perfect: { "1s": "avais vécu", "2s": "avais vécu", "3s": "avait vécu", "1p": "avions vécu", "2p": "aviez vécu", "3p": "avaient vécu" },
        },
        sentences: {
            present: [{ person: "1p", template: "Nous {verb} près de la mer.", translation: "We live near the sea." }],
            future: [{ person: "3s", template: "Un jour il {verb} à l'étranger.", translation: "Someday he will live abroad." }],
            imperfect: [{ person: "2p", template: "Vous {verb} toujours à la campagne.", translation: "You (pl.) always used to live in the countryside." }],
            past_perfect: [{ person: "3p", template: "Ils {verb} déjà là avant de déménager.", translation: "They had already lived there before moving." }],
        },
    },
    {
        infinitive: "aller",
        english: "to go",
        forms: {
            present: { "1s": "vais", "2s": "vas", "3s": "va", "1p": "allons", "2p": "allez", "3p": "vont" },
            future: { "1s": "irai", "2s": "iras", "3s": "ira", "1p": "irons", "2p": "irez", "3p": "iront" },
            imperfect: { "1s": "allais", "2s": "allais", "3s": "allait", "1p": "allions", "2p": "alliez", "3p": "allaient" },
            past_perfect: { "1s": "étais allé", "2s": "étais allé", "3s": "était allé", "1p": "étions allés", "2p": "étiez allés", "3p": "étaient allés" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marie {verb} au marché chaque samedi.", translation: "Marie goes to the market every Saturday." }],
            future: [{ person: "1s", template: "Demain j'{verb} à Rome pour le travail.", translation: "Tomorrow I will go to Rome for work." }],
            imperfect: [{ person: "3p", template: "Enfants, ils {verb} toujours au parc.", translation: "As children they always used to go to the park." }],
            past_perfect: [{ person: "1p", template: "Quand elle est arrivée, nous {verb} déjà à la maison.", translation: "When she arrived, we had already gone home." }],
        },
    },
    {
        infinitive: "venir",
        english: "to come",
        forms: {
            present: { "1s": "viens", "2s": "viens", "3s": "vient", "1p": "venons", "2p": "venez", "3p": "viennent" },
            future: { "1s": "viendrai", "2s": "viendras", "3s": "viendra", "1p": "viendrons", "2p": "viendrez", "3p": "viendront" },
            imperfect: { "1s": "venais", "2s": "venais", "3s": "venait", "1p": "venions", "2p": "veniez", "3p": "venaient" },
            past_perfect: { "1s": "étais venu", "2s": "étais venu", "3s": "était venu", "1p": "étions venus", "2p": "étiez venus", "3p": "étaient venus" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marc {verb} nous voir chaque dimanche.", translation: "Marco comes to see us every Sunday." }],
            future: [{ person: "2s", template: "Demain tu {verb} à la fête ?", translation: "Will you come to the party tomorrow?" }],
            imperfect: [{ person: "1p", template: "Jeunes, nous {verb} souvent dans cette ville.", translation: "When we were young we often used to come to this city." }],
            past_perfect: [{ person: "3s", template: "Quand nous l'avons appelé, il {verb} déjà à la réunion.", translation: "When we called him, he had already come to the meeting." }],
        },
    },
    {
        infinitive: "donner",
        english: "to give",
        forms: {
            present: { "1s": "donne", "2s": "donnes", "3s": "donne", "1p": "donnons", "2p": "donnez", "3p": "donnent" },
            future: { "1s": "donnerai", "2s": "donneras", "3s": "donnera", "1p": "donnerons", "2p": "donnerez", "3p": "donneront" },
            imperfect: { "1s": "donnais", "2s": "donnais", "3s": "donnait", "1p": "donnions", "2p": "donniez", "3p": "donnaient" },
            past_perfect: { "1s": "avais donné", "2s": "avais donné", "3s": "avait donné", "1p": "avions donné", "2p": "aviez donné", "3p": "avaient donné" },
        },
        sentences: {
            present: [{ person: "1s", template: "Je {verb} un cadeau à ma mère chaque année.", translation: "I give a gift to my mother every year." }],
            future: [{ person: "3p", template: "Demain ils {verb} une réponse au directeur.", translation: "Tomorrow they will give an answer to the director." }],
            imperfect: [{ person: "2s", template: "Enfant, tu {verb} toujours tes jouets à tes amis.", translation: "As a child you always used to give your toys to your friends." }],
            past_perfect: [{ person: "1p", template: "Quand il est arrivé, nous {verb} déjà les billets.", translation: "When he arrived, we had already given the tickets." }],
        },
    },
    {
        infinitive: "arriver",
        english: "to arrive",
        forms: {
            present: { "1s": "arrive", "2s": "arrives", "3s": "arrive", "1p": "arrivons", "2p": "arrivez", "3p": "arrivent" },
            future: { "1s": "arriverai", "2s": "arriveras", "3s": "arrivera", "1p": "arriverons", "2p": "arriverez", "3p": "arriveront" },
            imperfect: { "1s": "arrivais", "2s": "arrivais", "3s": "arrivait", "1p": "arrivions", "2p": "arriviez", "3p": "arrivaient" },
            past_perfect: { "1s": "étais arrivé", "2s": "étais arrivé", "3s": "était arrivé", "1p": "étions arrivés", "2p": "étiez arrivés", "3p": "étaient arrivés" },
        },
        sentences: {
            present: [{ person: "3s", template: "Le train {verb} à huit heures chaque matin.", translation: "The train arrives at eight every morning." }],
            future: [{ person: "2p", template: "Demain vous {verb} avant nous.", translation: "Tomorrow you (pl.) will arrive before us." }],
            imperfect: [{ person: "3p", template: "Chaque été ils {verb} en retard.", translation: "Every summer they used to arrive late." }],
            past_perfect: [{ person: "3s", template: "Quand nous avons téléphoné, elle {verb} déjà au bureau.", translation: "When we called, she had already arrived at the office." }],
        },
    },
    {
        infinitive: "entrer",
        english: "to enter",
        forms: {
            present: { "1s": "entre", "2s": "entres", "3s": "entre", "1p": "entrons", "2p": "entrez", "3p": "entrent" },
            future: { "1s": "entrerai", "2s": "entreras", "3s": "entrera", "1p": "entrerons", "2p": "entrerez", "3p": "entreront" },
            imperfect: { "1s": "entrais", "2s": "entrais", "3s": "entrait", "1p": "entrions", "2p": "entriez", "3p": "entraient" },
            past_perfect: { "1s": "étais entré", "2s": "étais entré", "3s": "était entré", "1p": "étions entrés", "2p": "étiez entrés", "3p": "étaient entrés" },
        },
        sentences: {
            present: [{ person: "3s", template: "Le chat {verb} dans la maison par la fenêtre.", translation: "The cat enters the house through the window." }],
            future: [{ person: "1s", template: "Demain j'{verb} au bureau plus tard.", translation: "Tomorrow I will enter the office later." }],
            imperfect: [{ person: "3p", template: "Chaque soir ils {verb} sans faire de bruit.", translation: "Every evening they used to enter without making noise." }],
            past_perfect: [{ person: "2s", template: "Quand nous t'avons appelé, tu {verb} déjà en classe.", translation: "When we called you, you had already entered the classroom." }],
        },
    },
    {
        infinitive: "partir",
        english: "to leave / to depart",
        forms: {
            present: { "1s": "pars", "2s": "pars", "3s": "part", "1p": "partons", "2p": "partez", "3p": "partent" },
            future: { "1s": "partirai", "2s": "partiras", "3s": "partira", "1p": "partirons", "2p": "partirez", "3p": "partiront" },
            imperfect: { "1s": "partais", "2s": "partais", "3s": "partait", "1p": "partions", "2p": "partiez", "3p": "partaient" },
            past_perfect: { "1s": "étais parti", "2s": "étais parti", "3s": "était parti", "1p": "étions partis", "2p": "étiez partis", "3p": "étaient partis" },
        },
        sentences: {
            present: [{ person: "3s", template: "L'avion {verb} à six heures du matin.", translation: "The plane leaves at six in the morning." }],
            future: [{ person: "1p", template: "Demain nous {verb} en vacances.", translation: "Tomorrow we will leave for vacation." }],
            imperfect: [{ person: "2p", template: "Chaque été vous {verb} tôt le matin.", translation: "Every summer you (pl.) used to leave early in the morning." }],
            past_perfect: [{ person: "3p", template: "Quand nous sommes arrivés, ils {verb} déjà.", translation: "When we arrived, they had already left." }],
        },
    },
    {
        infinitive: "retourner",
        english: "to return",
        forms: {
            present: { "1s": "retourne", "2s": "retournes", "3s": "retourne", "1p": "retournons", "2p": "retournez", "3p": "retournent" },
            future: { "1s": "retournerai", "2s": "retourneras", "3s": "retournera", "1p": "retournerons", "2p": "retournerez", "3p": "retourneront" },
            imperfect: { "1s": "retournais", "2s": "retournais", "3s": "retournait", "1p": "retournions", "2p": "retourniez", "3p": "retournaient" },
            past_perfect: { "1s": "étais retourné", "2s": "étais retourné", "3s": "était retourné", "1p": "étions retournés", "2p": "étiez retournés", "3p": "étaient retournés" },
        },
        sentences: {
            present: [{ person: "1s", template: "Je {verb} à la maison à sept heures chaque soir.", translation: "I return home at seven every evening." }],
            future: [{ person: "3s", template: "Demain il {verb} de voyage.", translation: "Tomorrow he will return from the trip." }],
            imperfect: [{ person: "1p", template: "Enfants, nous {verb} toujours à pied de l'école.", translation: "As children we always used to return on foot from school." }],
            past_perfect: [{ person: "3p", template: "Quand nous les avons cherchés, ils {verb} déjà à la maison.", translation: "When we looked for them, they had already returned home." }],
        },
    },
    {
        infinitive: "chercher",
        english: "to search / to look for",
        forms: {
            present: { "1s": "cherche", "2s": "cherches", "3s": "cherche", "1p": "cherchons", "2p": "cherchez", "3p": "cherchent" },
            future: { "1s": "chercherai", "2s": "chercheras", "3s": "cherchera", "1p": "chercherons", "2p": "chercherez", "3p": "chercheront" },
            imperfect: { "1s": "cherchais", "2s": "cherchais", "3s": "cherchait", "1p": "cherchions", "2p": "cherchiez", "3p": "cherchaient" },
            past_perfect: { "1s": "avais cherché", "2s": "avais cherché", "3s": "avait cherché", "1p": "avions cherché", "2p": "aviez cherché", "3p": "avaient cherché" },
        },
        sentences: {
            present: [{ person: "1s", template: "Je {verb} les clés chaque matin.", translation: "I look for my keys every morning." }],
            future: [{ person: "3p", template: "Demain ils {verb} un nouvel appartement.", translation: "Tomorrow they will look for a new apartment." }],
            imperfect: [{ person: "2s", template: "Enfant, tu {verb} toujours de nouvelles aventures.", translation: "As a child you always used to look for new adventures." }],
            past_perfect: [{ person: "1p", template: "Avant de le trouver, nous {verb} déjà partout.", translation: "Before finding it, we had already looked everywhere." }],
        },
    },
    {
        infinitive: "trouver",
        english: "to find",
        forms: {
            present: { "1s": "trouve", "2s": "trouves", "3s": "trouve", "1p": "trouvons", "2p": "trouvez", "3p": "trouvent" },
            future: { "1s": "trouverai", "2s": "trouveras", "3s": "trouvera", "1p": "trouverons", "2p": "trouverez", "3p": "trouveront" },
            imperfect: { "1s": "trouvais", "2s": "trouvais", "3s": "trouvait", "1p": "trouvions", "2p": "trouviez", "3p": "trouvaient" },
            past_perfect: { "1s": "avais trouvé", "2s": "avais trouvé", "3s": "avait trouvé", "1p": "avions trouvé", "2p": "aviez trouvé", "3p": "avaient trouvé" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marc {verb} toujours une solution.", translation: "Marco always finds a solution." }],
            future: [{ person: "1s", template: "Demain je {verb} le temps de t'appeler.", translation: "Tomorrow I will find the time to call you." }],
            imperfect: [{ person: "3p", template: "Chaque fois ils {verb} une raison de se disputer.", translation: "Every time they used to find a reason to argue." }],
            past_perfect: [{ person: "1p", template: "Avant la fin, nous {verb} déjà la réponse.", translation: "Before the end, we had already found the answer." }],
        },
    },
    {
        infinitive: "acheter",
        english: "to buy",
        forms: {
            present: { "1s": "achète", "2s": "achètes", "3s": "achète", "1p": "achetons", "2p": "achetez", "3p": "achètent" },
            future: { "1s": "achèterai", "2s": "achèteras", "3s": "achètera", "1p": "achèterons", "2p": "achèterez", "3p": "achèteront" },
            imperfect: { "1s": "achetais", "2s": "achetais", "3s": "achetait", "1p": "achetions", "2p": "achetiez", "3p": "achetaient" },
            past_perfect: { "1s": "avais acheté", "2s": "avais acheté", "3s": "avait acheté", "1p": "avions acheté", "2p": "aviez acheté", "3p": "avaient acheté" },
        },
        sentences: {
            present: [{ person: "1s", template: "J'{verb} le pain chaque matin.", translation: "I buy bread every morning." }],
            future: [{ person: "3s", template: "Demain elle {verb} une nouvelle robe.", translation: "Tomorrow she will buy a new dress." }],
            imperfect: [{ person: "1p", template: "Jeunes, nous {verb} toujours les mêmes vêtements.", translation: "When we were young we always used to buy the same clothes." }],
            past_perfect: [{ person: "3p", template: "Quand nous sommes arrivés au magasin, ils {verb} déjà tout.", translation: "When we arrived at the store, they had already bought everything." }],
        },
    },
    {
        infinitive: "vendre",
        english: "to sell",
        forms: {
            present: { "1s": "vends", "2s": "vends", "3s": "vend", "1p": "vendons", "2p": "vendez", "3p": "vendent" },
            future: { "1s": "vendrai", "2s": "vendras", "3s": "vendra", "1p": "vendrons", "2p": "vendrez", "3p": "vendront" },
            imperfect: { "1s": "vendais", "2s": "vendais", "3s": "vendait", "1p": "vendions", "2p": "vendiez", "3p": "vendaient" },
            past_perfect: { "1s": "avais vendu", "2s": "avais vendu", "3s": "avait vendu", "1p": "avions vendu", "2p": "aviez vendu", "3p": "avaient vendu" },
        },
        sentences: {
            present: [{ person: "3p", template: "Ils {verb} des fruits au marché.", translation: "They sell fruit at the market." }],
            future: [{ person: "1s", template: "Demain je {verb} mon vieux vélo.", translation: "Tomorrow I will sell my old bike." }],
            imperfect: [{ person: "3s", template: "Le magasin {verb} toujours des produits frais.", translation: "The store always used to sell fresh products." }],
            past_perfect: [{ person: "2p", template: "Quand nous sommes revenus, vous {verb} déjà la maison.", translation: "When we came back, you (pl.) had already sold the house." }],
        },
    },
    {
        infinitive: "ouvrir",
        english: "to open",
        forms: {
            present: { "1s": "ouvre", "2s": "ouvres", "3s": "ouvre", "1p": "ouvrons", "2p": "ouvrez", "3p": "ouvrent" },
            future: { "1s": "ouvrirai", "2s": "ouvriras", "3s": "ouvrira", "1p": "ouvrirons", "2p": "ouvrirez", "3p": "ouvriront" },
            imperfect: { "1s": "ouvrais", "2s": "ouvrais", "3s": "ouvrait", "1p": "ouvrions", "2p": "ouvriez", "3p": "ouvraient" },
            past_perfect: { "1s": "avais ouvert", "2s": "avais ouvert", "3s": "avait ouvert", "1p": "avions ouvert", "2p": "aviez ouvert", "3p": "avaient ouvert" },
        },
        sentences: {
            present: [{ person: "3s", template: "Le magasin {verb} à neuf heures chaque jour.", translation: "The store opens at nine every day." }],
            future: [{ person: "1s", template: "Demain j'{verb} un nouveau compte en banque.", translation: "Tomorrow I will open a new bank account." }],
            imperfect: [{ person: "3p", template: "Chaque matin ils {verb} les fenêtres tôt.", translation: "Every morning they used to open the windows early." }],
            past_perfect: [{ person: "1p", template: "Quand ils sont arrivés, nous {verb} déjà la porte.", translation: "When they arrived, we had already opened the door." }],
        },
    },
    {
        infinitive: "fermer",
        english: "to close",
        forms: {
            present: { "1s": "ferme", "2s": "fermes", "3s": "ferme", "1p": "fermons", "2p": "fermez", "3p": "ferment" },
            future: { "1s": "fermerai", "2s": "fermeras", "3s": "fermera", "1p": "fermerons", "2p": "fermerez", "3p": "fermeront" },
            imperfect: { "1s": "fermais", "2s": "fermais", "3s": "fermait", "1p": "fermions", "2p": "fermiez", "3p": "fermaient" },
            past_perfect: { "1s": "avais fermé", "2s": "avais fermé", "3s": "avait fermé", "1p": "avions fermé", "2p": "aviez fermé", "3p": "avaient fermé" },
        },
        sentences: {
            present: [{ person: "3s", template: "Le musée {verb} à six heures du soir.", translation: "The museum closes at six in the evening." }],
            future: [{ person: "2p", template: "Demain vous {verb} le magasin plus tôt.", translation: "Tomorrow you (pl.) will close the shop earlier." }],
            imperfect: [{ person: "1s", template: "Enfant, je {verb} toujours la porte avec soin.", translation: "As a child I always used to close the door carefully." }],
            past_perfect: [{ person: "3p", template: "Quand nous sommes revenus, ils {verb} déjà les fenêtres.", translation: "When we came back, they had already closed the windows." }],
        },
    },
    {
        infinitive: "lire",
        english: "to read",
        forms: {
            present: { "1s": "lis", "2s": "lis", "3s": "lit", "1p": "lisons", "2p": "lisez", "3p": "lisent" },
            future: { "1s": "lirai", "2s": "liras", "3s": "lira", "1p": "lirons", "2p": "lirez", "3p": "liront" },
            imperfect: { "1s": "lisais", "2s": "lisais", "3s": "lisait", "1p": "lisions", "2p": "lisiez", "3p": "lisaient" },
            past_perfect: { "1s": "avais lu", "2s": "avais lu", "3s": "avait lu", "1p": "avions lu", "2p": "aviez lu", "3p": "avaient lu" },
        },
        sentences: {
            present: [{ person: "1s", template: "Je {verb} un livre chaque semaine.", translation: "I read a book every week." }],
            future: [{ person: "3s", template: "Demain elle {verb} le journal tranquillement.", translation: "Tomorrow she will read the newspaper calmly." }],
            imperfect: [{ person: "1p", template: "Enfants, nous {verb} toujours avant de dormir.", translation: "As children we always used to read before sleeping." }],
            past_perfect: [{ person: "3s", template: "Quand le cours a commencé, il {verb} déjà le chapitre.", translation: "When the class started, he had already read the chapter." }],
        },
    },
    {
        infinitive: "jouer",
        english: "to play",
        forms: {
            present: { "1s": "joue", "2s": "joues", "3s": "joue", "1p": "jouons", "2p": "jouez", "3p": "jouent" },
            future: { "1s": "jouerai", "2s": "joueras", "3s": "jouera", "1p": "jouerons", "2p": "jouerez", "3p": "joueront" },
            imperfect: { "1s": "jouais", "2s": "jouais", "3s": "jouait", "1p": "jouions", "2p": "jouiez", "3p": "jouaient" },
            past_perfect: { "1s": "avais joué", "2s": "avais joué", "3s": "avait joué", "1p": "avions joué", "2p": "aviez joué", "3p": "avaient joué" },
        },
        sentences: {
            present: [{ person: "3p", template: "Les enfants {verb} dans le jardin chaque après-midi.", translation: "The children play in the garden every afternoon." }],
            future: [{ person: "1s", template: "Demain je {verb} au football avec des amis.", translation: "Tomorrow I will play soccer with friends." }],
            imperfect: [{ person: "2s", template: "Petit, tu {verb} toujours dehors.", translation: "As a child you always used to play outside." }],
            past_perfect: [{ person: "1p", template: "Quand la pluie a commencé, nous {verb} déjà longtemps.", translation: "When the rain started, we had already been playing for a long time." }],
        },
    },
    {
        infinitive: "travailler",
        english: "to work",
        forms: {
            present: { "1s": "travaille", "2s": "travailles", "3s": "travaille", "1p": "travaillons", "2p": "travaillez", "3p": "travaillent" },
            future: { "1s": "travaillerai", "2s": "travailleras", "3s": "travaillera", "1p": "travaillerons", "2p": "travaillerez", "3p": "travailleront" },
            imperfect: { "1s": "travaillais", "2s": "travaillais", "3s": "travaillait", "1p": "travaillions", "2p": "travailliez", "3p": "travaillaient" },
            past_perfect: { "1s": "avais travaillé", "2s": "avais travaillé", "3s": "avait travaillé", "1p": "avions travaillé", "2p": "aviez travaillé", "3p": "avaient travaillé" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marc {verb} à la banque depuis cinq ans.", translation: "Marco has worked at the bank for five years." }],
            future: [{ person: "1p", template: "Demain nous {verb} ensemble sur le projet.", translation: "Tomorrow we will work together on the project." }],
            imperfect: [{ person: "3p", template: "Jeunes, ils {verb} toute la nuit.", translation: "When they were young they used to work all night." }],
            past_perfect: [{ person: "2s", template: "Quand nous t'avons appelé, tu {verb} déjà beaucoup.", translation: "When we called you, you had already worked a lot." }],
        },
    },
    {
        infinitive: "étudier",
        english: "to study",
        forms: {
            present: { "1s": "étudie", "2s": "étudies", "3s": "étudie", "1p": "étudions", "2p": "étudiez", "3p": "étudient" },
            future: { "1s": "étudierai", "2s": "étudieras", "3s": "étudiera", "1p": "étudierons", "2p": "étudierez", "3p": "étudieront" },
            imperfect: { "1s": "étudiais", "2s": "étudiais", "3s": "étudiait", "1p": "étudiions", "2p": "étudiiez", "3p": "étudiaient" },
            past_perfect: { "1s": "avais étudié", "2s": "avais étudié", "3s": "avait étudié", "1p": "avions étudié", "2p": "aviez étudié", "3p": "avaient étudié" },
        },
        sentences: {
            present: [{ person: "1s", template: "J'{verb} l'italien chaque soir.", translation: "I study Italian every evening." }],
            future: [{ person: "3s", template: "Demain elle {verb} pour l'examen.", translation: "Tomorrow she will study for the exam." }],
            imperfect: [{ person: "1p", template: "Étudiants, nous {verb} toujours à la bibliothèque.", translation: "As students we always used to study in the library." }],
            past_perfect: [{ person: "3p", template: "Quand l'examen a commencé, ils {verb} déjà assez.", translation: "When the exam started, they had already studied enough." }],
        },
    },
    {
        infinitive: "apprendre",
        english: "to learn",
        forms: {
            present: { "1s": "apprends", "2s": "apprends", "3s": "apprend", "1p": "apprenons", "2p": "apprenez", "3p": "apprennent" },
            future: { "1s": "apprendrai", "2s": "apprendras", "3s": "apprendra", "1p": "apprendrons", "2p": "apprendrez", "3p": "apprendront" },
            imperfect: { "1s": "apprenais", "2s": "apprenais", "3s": "apprenait", "1p": "apprenions", "2p": "appreniez", "3p": "apprenaient" },
            past_perfect: { "1s": "avais appris", "2s": "avais appris", "3s": "avait appris", "1p": "avions appris", "2p": "aviez appris", "3p": "avaient appris" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marc {verb} une nouvelle langue chaque année.", translation: "Marco learns a new language every year." }],
            future: [{ person: "1p", template: "Demain nous {verb} à jouer de la guitare.", translation: "Tomorrow we will learn to play the guitar." }],
            imperfect: [{ person: "2s", template: "Enfant, tu {verb} toujours vite.", translation: "As a child you always used to learn quickly." }],
            past_perfect: [{ person: "1s", template: "Quand le cours a commencé, j'{verb} déjà les bases.", translation: "When the course started, I had already learned the basics." }],
        },
    },
    {
        infinitive: "comprendre",
        english: "to understand",
        forms: {
            present: { "1s": "comprends", "2s": "comprends", "3s": "comprend", "1p": "comprenons", "2p": "comprenez", "3p": "comprennent" },
            future: { "1s": "comprendrai", "2s": "comprendras", "3s": "comprendra", "1p": "comprendrons", "2p": "comprendrez", "3p": "comprendront" },
            imperfect: { "1s": "comprenais", "2s": "comprenais", "3s": "comprenait", "1p": "comprenions", "2p": "compreniez", "3p": "comprenaient" },
            past_perfect: { "1s": "avais compris", "2s": "avais compris", "3s": "avait compris", "1p": "avions compris", "2p": "aviez compris", "3p": "avaient compris" },
        },
        sentences: {
            present: [{ person: "1s", template: "Je {verb} le problème maintenant.", translation: "I understand the problem now." }],
            future: [{ person: "3p", template: "Demain ils {verb} la vérité.", translation: "Tomorrow they will understand the truth." }],
            imperfect: [{ person: "2p", template: "Enfants, vous ne {verb} pas toujours les règles.", translation: "As children you (pl.) didn't always understand the rules." }],
            past_perfect: [{ person: "3s", template: "Quand je le lui ai expliqué, il {verb} déjà tout.", translation: "When I explained it to him, he had already understood everything." }],
        },
    },
    {
        infinitive: "penser",
        english: "to think",
        forms: {
            present: { "1s": "pense", "2s": "penses", "3s": "pense", "1p": "pensons", "2p": "pensez", "3p": "pensent" },
            future: { "1s": "penserai", "2s": "penseras", "3s": "pensera", "1p": "penserons", "2p": "penserez", "3p": "penseront" },
            imperfect: { "1s": "pensais", "2s": "pensais", "3s": "pensait", "1p": "pensions", "2p": "pensiez", "3p": "pensaient" },
            past_perfect: { "1s": "avais pensé", "2s": "avais pensé", "3s": "avait pensé", "1p": "avions pensé", "2p": "aviez pensé", "3p": "avaient pensé" },
        },
        sentences: {
            present: [{ person: "1s", template: "Je {verb} souvent à ce jour-là.", translation: "I often think about that day." }],
            future: [{ person: "3s", template: "Demain elle {verb} à une solution.", translation: "Tomorrow she will think of a solution." }],
            imperfect: [{ person: "1p", template: "Jeunes, nous {verb} toujours à l'avenir.", translation: "When we were young we always used to think about the future." }],
            past_perfect: [{ person: "3p", template: "Avant la réunion, ils {verb} déjà à la proposition.", translation: "Before the meeting, they had already thought about the proposal." }],
        },
    },
    {
        infinitive: "demander",
        english: "to ask",
        forms: {
            present: { "1s": "demande", "2s": "demandes", "3s": "demande", "1p": "demandons", "2p": "demandez", "3p": "demandent" },
            future: { "1s": "demanderai", "2s": "demanderas", "3s": "demandera", "1p": "demanderons", "2p": "demanderez", "3p": "demanderont" },
            imperfect: { "1s": "demandais", "2s": "demandais", "3s": "demandait", "1p": "demandions", "2p": "demandiez", "3p": "demandaient" },
            past_perfect: { "1s": "avais demandé", "2s": "avais demandé", "3s": "avait demandé", "1p": "avions demandé", "2p": "aviez demandé", "3p": "avaient demandé" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marc {verb} toujours la permission.", translation: "Marco always asks permission." }],
            future: [{ person: "1s", template: "Demain je {verb} quelque chose au professeur.", translation: "Tomorrow I will ask the teacher something." }],
            imperfect: [{ person: "2p", template: "Enfants, vous {verb} toujours trop de choses.", translation: "As children you (pl.) always used to ask too many things." }],
            past_perfect: [{ person: "3p", template: "Avant la fin, ils {verb} déjà beaucoup de choses.", translation: "Before the end, they had already asked many things." }],
        },
    },
    {
        infinitive: "répondre",
        english: "to answer",
        forms: {
            present: { "1s": "réponds", "2s": "réponds", "3s": "répond", "1p": "répondons", "2p": "répondez", "3p": "répondent" },
            future: { "1s": "répondrai", "2s": "répondras", "3s": "répondra", "1p": "répondrons", "2p": "répondrez", "3p": "répondront" },
            imperfect: { "1s": "répondais", "2s": "répondais", "3s": "répondait", "1p": "répondions", "2p": "répondiez", "3p": "répondaient" },
            past_perfect: { "1s": "avais répondu", "2s": "avais répondu", "3s": "avait répondu", "1p": "avions répondu", "2p": "aviez répondu", "3p": "avaient répondu" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marie {verb} toujours poliment.", translation: "Maria always answers politely." }],
            future: [{ person: "1p", template: "Demain nous {verb} à toutes les questions.", translation: "Tomorrow we will answer all the questions." }],
            imperfect: [{ person: "3p", template: "Enfants, ils {verb} toujours calmement.", translation: "As children they always used to answer calmly." }],
            past_perfect: [{ person: "2s", template: "Quand je t'ai écrit, tu {verb} déjà à la lettre.", translation: "When I wrote to you, you had already answered the letter." }],
        },
    },
    {
        infinitive: "appeler",
        english: "to call",
        forms: {
            present: { "1s": "appelle", "2s": "appelles", "3s": "appelle", "1p": "appelons", "2p": "appelez", "3p": "appellent" },
            future: { "1s": "appellerai", "2s": "appelleras", "3s": "appellera", "1p": "appellerons", "2p": "appellerez", "3p": "appelleront" },
            imperfect: { "1s": "appelais", "2s": "appelais", "3s": "appelait", "1p": "appelions", "2p": "appeliez", "3p": "appelaient" },
            past_perfect: { "1s": "avais appelé", "2s": "avais appelé", "3s": "avait appelé", "1p": "avions appelé", "2p": "aviez appelé", "3p": "avaient appelé" },
        },
        sentences: {
            present: [{ person: "1s", template: "J'{verb} ma mère chaque dimanche.", translation: "I call my mother every Sunday." }],
            future: [{ person: "3s", template: "Demain il {verb} le médecin.", translation: "Tomorrow he will call the doctor." }],
            imperfect: [{ person: "1p", template: "Enfants, nous {verb} toujours nos grands-parents le dimanche.", translation: "As children we always used to call our grandparents on Sundays." }],
            past_perfect: [{ person: "3p", template: "Avant le dîner, ils {verb} déjà tous les invités.", translation: "Before dinner, they had already called all the guests." }],
        },
    },
    {
        infinitive: "marcher",
        english: "to walk",
        forms: {
            present: { "1s": "marche", "2s": "marches", "3s": "marche", "1p": "marchons", "2p": "marchez", "3p": "marchent" },
            future: { "1s": "marcherai", "2s": "marcheras", "3s": "marchera", "1p": "marcherons", "2p": "marcherez", "3p": "marcheront" },
            imperfect: { "1s": "marchais", "2s": "marchais", "3s": "marchait", "1p": "marchions", "2p": "marchiez", "3p": "marchaient" },
            past_perfect: { "1s": "avais marché", "2s": "avais marché", "3s": "avait marché", "1p": "avions marché", "2p": "aviez marché", "3p": "avaient marché" },
        },
        sentences: {
            present: [{ person: "3p", template: "Les touristes {verb} dans la ville toute la journée.", translation: "The tourists walk around the city all day." }],
            future: [{ person: "1s", template: "Demain je {verb} le long de la plage.", translation: "Tomorrow I will walk along the beach." }],
            imperfect: [{ person: "2s", template: "Enfant, tu {verb} toujours pieds nus.", translation: "As a child you always used to walk barefoot." }],
            past_perfect: [{ person: "1p", template: "Avant de nous arrêter, nous {verb} déjà pendant des heures.", translation: "Before stopping, we had already been walking for hours." }],
        },
    },
    {
        infinitive: "courir",
        english: "to run",
        forms: {
            present: { "1s": "cours", "2s": "cours", "3s": "court", "1p": "courons", "2p": "courez", "3p": "courent" },
            future: { "1s": "courrai", "2s": "courras", "3s": "courra", "1p": "courrons", "2p": "courrez", "3p": "courront" },
            imperfect: { "1s": "courais", "2s": "courais", "3s": "courait", "1p": "courions", "2p": "couriez", "3p": "couraient" },
            past_perfect: { "1s": "avais couru", "2s": "avais couru", "3s": "avait couru", "1p": "avions couru", "2p": "aviez couru", "3p": "avaient couru" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marc {verb} dans le parc chaque matin.", translation: "Marco runs in the park every morning." }],
            future: [{ person: "2p", template: "Demain vous {verb} le marathon.", translation: "Tomorrow you (pl.) will run the marathon." }],
            imperfect: [{ person: "3s", template: "Jeune, il {verb} pendant des heures sans s'arrêter.", translation: "As a young man he used to run for hours without stopping." }],
            past_perfect: [{ person: "1s", template: "Quand je suis arrivé, j'{verb} déjà cinq kilomètres.", translation: "When I arrived, I had already run five kilometers." }],
        },
    },
    {
        infinitive: "voyager",
        english: "to travel",
        forms: {
            present: { "1s": "voyage", "2s": "voyages", "3s": "voyage", "1p": "voyageons", "2p": "voyagez", "3p": "voyagent" },
            future: { "1s": "voyagerai", "2s": "voyageras", "3s": "voyagera", "1p": "voyagerons", "2p": "voyagerez", "3p": "voyageront" },
            imperfect: { "1s": "voyageais", "2s": "voyageais", "3s": "voyageait", "1p": "voyagions", "2p": "voyagiez", "3p": "voyageaient" },
            past_perfect: { "1s": "avais voyagé", "2s": "avais voyagé", "3s": "avait voyagé", "1p": "avions voyagé", "2p": "aviez voyagé", "3p": "avaient voyagé" },
        },
        sentences: {
            present: [{ person: "1p", template: "Nous {verb} en Europe chaque été.", translation: "We travel around Europe every summer." }],
            future: [{ person: "3s", template: "L'année prochaine elle {verb} en Asie.", translation: "Next year she will travel to Asia." }],
            imperfect: [{ person: "3p", template: "Jeunes, ils {verb} souvent seuls.", translation: "When they were young they often used to travel alone." }],
            past_perfect: [{ person: "2s", template: "Avant de t'installer ici, tu {verb} déjà beaucoup.", translation: "Before settling here, you had already traveled a lot." }],
        },
    },
    {
        infinitive: "chanter",
        english: "to sing",
        forms: {
            present: { "1s": "chante", "2s": "chantes", "3s": "chante", "1p": "chantons", "2p": "chantez", "3p": "chantent" },
            future: { "1s": "chanterai", "2s": "chanteras", "3s": "chantera", "1p": "chanterons", "2p": "chanterez", "3p": "chanteront" },
            imperfect: { "1s": "chantais", "2s": "chantais", "3s": "chantait", "1p": "chantions", "2p": "chantiez", "3p": "chantaient" },
            past_perfect: { "1s": "avais chanté", "2s": "avais chanté", "3s": "avait chanté", "1p": "avions chanté", "2p": "aviez chanté", "3p": "avaient chanté" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marie {verb} chaque matin sous la douche.", translation: "Maria sings every morning in the shower." }],
            future: [{ person: "1s", template: "Demain je {verb} au concert de l'école.", translation: "Tomorrow I will sing at the school concert." }],
            imperfect: [{ person: "1p", template: "Enfants, nous {verb} toujours en chœur.", translation: "As children we always used to sing in the choir." }],
            past_perfect: [{ person: "3p", template: "Avant la fin du spectacle, ils {verb} déjà trois chansons.", translation: "Before the end of the show, they had already sung three songs." }],
        },
    },
    {
        infinitive: "aider",
        english: "to help",
        forms: {
            present: { "1s": "aide", "2s": "aides", "3s": "aide", "1p": "aidons", "2p": "aidez", "3p": "aident" },
            future: { "1s": "aiderai", "2s": "aideras", "3s": "aidera", "1p": "aiderons", "2p": "aiderez", "3p": "aideront" },
            imperfect: { "1s": "aidais", "2s": "aidais", "3s": "aidait", "1p": "aidions", "2p": "aidiez", "3p": "aidaient" },
            past_perfect: { "1s": "avais aidé", "2s": "avais aidé", "3s": "avait aidé", "1p": "avions aidé", "2p": "aviez aidé", "3p": "avaient aidé" },
        },
        sentences: {
            present: [{ person: "1s", template: "J'{verb} mon frère avec ses devoirs.", translation: "I help my brother with homework." }],
            future: [{ person: "3s", template: "Demain elle {verb} les nouveaux étudiants.", translation: "Tomorrow she will help the new students." }],
            imperfect: [{ person: "2p", template: "Jeunes, vous {verb} toujours les voisins.", translation: "When you (pl.) were young you always used to help the neighbors." }],
            past_perfect: [{ person: "1p", template: "Avant la course, nous {verb} déjà beaucoup d'athlètes.", translation: "Before the race, we had already helped many athletes." }],
        },
    },
    {
        infinitive: "aimer",
        english: "to love",
        forms: {
            present: { "1s": "aime", "2s": "aimes", "3s": "aime", "1p": "aimons", "2p": "aimez", "3p": "aiment" },
            future: { "1s": "aimerai", "2s": "aimeras", "3s": "aimera", "1p": "aimerons", "2p": "aimerez", "3p": "aimeront" },
            imperfect: { "1s": "aimais", "2s": "aimais", "3s": "aimait", "1p": "aimions", "2p": "aimiez", "3p": "aimaient" },
            past_perfect: { "1s": "avais aimé", "2s": "avais aimé", "3s": "avait aimé", "1p": "avions aimé", "2p": "aviez aimé", "3p": "avaient aimé" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marc {verb} sa famille par-dessus tout.", translation: "Marco loves his family above all else." }],
            future: [{ person: "1s", template: "Pour toujours j'{verb} cette ville.", translation: "I will love this city forever." }],
            imperfect: [{ person: "3p", template: "Jeunes, ils {verb} beaucoup leur pays natal.", translation: "When they were young they loved their homeland very much." }],
            past_perfect: [{ person: "1p", template: "Avant de le connaître, nous {verb} déjà cet endroit.", translation: "Before knowing him, we had already loved that place." }],
        },
    },
    {
        infinitive: "oublier",
        english: "to forget",
        forms: {
            present: { "1s": "oublie", "2s": "oublies", "3s": "oublie", "1p": "oublions", "2p": "oubliez", "3p": "oublient" },
            future: { "1s": "oublierai", "2s": "oublieras", "3s": "oubliera", "1p": "oublierons", "2p": "oublierez", "3p": "oublieront" },
            imperfect: { "1s": "oubliais", "2s": "oubliais", "3s": "oubliait", "1p": "oubliions", "2p": "oubliiez", "3p": "oubliaient" },
            past_perfect: { "1s": "avais oublié", "2s": "avais oublié", "3s": "avait oublié", "1p": "avions oublié", "2p": "aviez oublié", "3p": "avaient oublié" },
        },
        sentences: {
            present: [{ person: "1s", template: "J'{verb} souvent les clés de la maison.", translation: "I often forget my house keys." }],
            future: [{ person: "3s", template: "Il n'{verb} jamais ce jour-là.", translation: "He will never forget that day." }],
            imperfect: [{ person: "2p", template: "Enfants, vous {verb} toujours vos devoirs.", translation: "As children you (pl.) always used to forget your homework." }],
            past_perfect: [{ person: "3p", template: "Avant la fin du voyage, ils {verb} déjà le problème.", translation: "Before the end of the trip, they had already forgotten the problem." }],
        },
    },
    {
        infinitive: "commencer",
        english: "to begin",
        forms: {
            present: { "1s": "commence", "2s": "commences", "3s": "commence", "1p": "commençons", "2p": "commencez", "3p": "commencent" },
            future: { "1s": "commencerai", "2s": "commenceras", "3s": "commencera", "1p": "commencerons", "2p": "commencerez", "3p": "commenceront" },
            imperfect: { "1s": "commençais", "2s": "commençais", "3s": "commençait", "1p": "commencions", "2p": "commenciez", "3p": "commençaient" },
            past_perfect: { "1s": "avais commencé", "2s": "avais commencé", "3s": "avait commencé", "1p": "avions commencé", "2p": "aviez commencé", "3p": "avaient commencé" },
        },
        sentences: {
            present: [{ person: "3s", template: "Le film {verb} à neuf heures du soir.", translation: "The movie begins at nine in the evening." }],
            future: [{ person: "1p", template: "Demain nous {verb} un nouveau projet.", translation: "Tomorrow we will begin a new project." }],
            imperfect: [{ person: "3p", template: "Chaque jour ils {verb} à travailler tôt.", translation: "Every day they used to begin working early." }],
            past_perfect: [{ person: "1s", template: "Quand je suis arrivé, j'{verb} déjà le travail.", translation: "When I arrived, I had already begun the work." }],
        },
    },
];

const spanishVerbs: VerbEntry[] = [
    {
        infinitive: "hablar",
        english: "to speak",
        forms: {
            present: { "1s": "hablo", "2s": "hablas", "3s": "habla", "1p": "hablamos", "2p": "habláis", "3p": "hablan" },
            future: { "1s": "hablaré", "2s": "hablarás", "3s": "hablará", "1p": "hablaremos", "2p": "hablaréis", "3p": "hablarán" },
            imperfect: { "1s": "hablaba", "2s": "hablabas", "3s": "hablaba", "1p": "hablábamos", "2p": "hablabais", "3p": "hablaban" },
            past_perfect: { "1s": "había hablado", "2s": "habías hablado", "3s": "había hablado", "1p": "habíamos hablado", "2p": "habíais hablado", "3p": "habían hablado" },
        },
        sentences: {
            present: [{ person: "3s", template: "María {verb} español todos los días.", translation: "Maria speaks Spanish every day." }],
            future: [{ person: "1s", template: "Mañana {verb} con el profesor.", translation: "Tomorrow I will speak with the professor." }],
            imperfect: [{ person: "3p", template: "De niños siempre {verb} en dialecto.", translation: "As children they always spoke in dialect." }],
            past_perfect: [{ person: "1p", template: "Cuando llegó, ya {verb} del proyecto.", translation: "When she arrived, we had already spoken about the project." }],
        },
    },
    {
        infinitive: "comer",
        english: "to eat",
        forms: {
            present: { "1s": "como", "2s": "comes", "3s": "come", "1p": "comemos", "2p": "coméis", "3p": "comen" },
            future: { "1s": "comeré", "2s": "comerás", "3s": "comerá", "1p": "comeremos", "2p": "comeréis", "3p": "comerán" },
            imperfect: { "1s": "comía", "2s": "comías", "3s": "comía", "1p": "comíamos", "2p": "comíais", "3p": "comían" },
            past_perfect: { "1s": "había comido", "2s": "habías comido", "3s": "había comido", "1p": "habíamos comido", "2p": "habíais comido", "3p": "habían comido" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} pasta en el almuerzo.", translation: "I eat pasta for lunch." }],
            future: [{ person: "2s", template: "Esta noche tú {verb} en el restaurante.", translation: "Tonight you will eat at the restaurant." }],
            imperfect: [{ person: "3s", template: "De pequeño siempre {verb} helado.", translation: "As a child he always ate ice cream." }],
            past_perfect: [{ person: "3p", template: "Cuando llegamos, ellos ya {verb}.", translation: "When we arrived, they had already eaten." }],
        },
    },
    {
        infinitive: "ser",
        english: "to be",
        forms: {
            present: { "1s": "soy", "2s": "eres", "3s": "es", "1p": "somos", "2p": "sois", "3p": "son" },
            future: { "1s": "seré", "2s": "serás", "3s": "será", "1p": "seremos", "2p": "seréis", "3p": "serán" },
            imperfect: { "1s": "era", "2s": "eras", "3s": "era", "1p": "éramos", "2p": "erais", "3p": "eran" },
            past_perfect: { "1s": "había sido", "2s": "habías sido", "3s": "había sido", "1p": "habíamos sido", "2p": "habíais sido", "3p": "habían sido" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} muy feliz hoy.", translation: "I am very happy today." }],
            future: [{ person: "3p", template: "Ellos {verb} muy famosos algún día.", translation: "They will be very famous someday." }],
            imperfect: [{ person: "2s", template: "Tú siempre {verb} amable conmigo.", translation: "You were always kind to me." }],
            past_perfect: [{ person: "3s", template: "Él {verb} profesor antes de jubilarse.", translation: "He had been a teacher before retiring." }],
        },
    },
    {
        infinitive: "tener",
        english: "to have",
        forms: {
            present: { "1s": "tengo", "2s": "tienes", "3s": "tiene", "1p": "tenemos", "2p": "tenéis", "3p": "tienen" },
            future: { "1s": "tendré", "2s": "tendrás", "3s": "tendrá", "1p": "tendremos", "2p": "tendréis", "3p": "tendrán" },
            imperfect: { "1s": "tenía", "2s": "tenías", "3s": "tenía", "1p": "teníamos", "2p": "teníais", "3p": "tenían" },
            past_perfect: { "1s": "había tenido", "2s": "habías tenido", "3s": "había tenido", "1p": "habíamos tenido", "2p": "habíais tenido", "3p": "habían tenido" },
        },
        sentences: {
            present: [{ person: "1p", template: "Nosotros {verb} una casa en el campo.", translation: "We have a house in the countryside." }],
            future: [{ person: "2p", template: "¿Vosotros {verb} tiempo mañana?", translation: "Will you have time tomorrow?" }],
            imperfect: [{ person: "1s", template: "De niño yo {verb} un perro negro.", translation: "As a child I had a black dog." }],
            past_perfect: [{ person: "3p", template: "Ellos {verb} muchas dificultades antes.", translation: "They had had many difficulties before." }],
        },
    },
    {
        infinitive: "hacer",
        english: "to do / to make",
        forms: {
            present: { "1s": "hago", "2s": "haces", "3s": "hace", "1p": "hacemos", "2p": "hacéis", "3p": "hacen" },
            future: { "1s": "haré", "2s": "harás", "3s": "hará", "1p": "haremos", "2p": "haréis", "3p": "harán" },
            imperfect: { "1s": "hacía", "2s": "hacías", "3s": "hacía", "1p": "hacíamos", "2p": "hacíais", "3p": "hacían" },
            past_perfect: { "1s": "había hecho", "2s": "habías hecho", "3s": "había hecho", "1p": "habíamos hecho", "2p": "habíais hecho", "3p": "habían hecho" },
        },
        sentences: {
            present: [{ person: "3s", template: "María {verb} la tarea cada noche.", translation: "Maria does her homework every night." }],
            future: [{ person: "1s", template: "Mañana {verb} un pastel para la fiesta.", translation: "Tomorrow I will make a cake for the party." }],
            imperfect: [{ person: "3p", template: "De niños {verb} siempre ruido.", translation: "As children they always made noise." }],
            past_perfect: [{ person: "1p", template: "Cuando ella llegó, nosotros ya {verb} la compra.", translation: "When she arrived, we had already done the shopping." }],
        },
    },
    {
        infinitive: "poder",
        english: "to be able to / can",
        forms: {
            present: { "1s": "puedo", "2s": "puedes", "3s": "puede", "1p": "podemos", "2p": "podéis", "3p": "pueden" },
            future: { "1s": "podré", "2s": "podrás", "3s": "podrá", "1p": "podremos", "2p": "podréis", "3p": "podrán" },
            imperfect: { "1s": "podía", "2s": "podías", "3s": "podía", "1p": "podíamos", "2p": "podíais", "3p": "podían" },
            past_perfect: { "1s": "había podido", "2s": "habías podido", "3s": "había podido", "1p": "habíamos podido", "2p": "habíais podido", "3p": "habían podido" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo no {verb} venir esta noche.", translation: "I cannot come tonight." }],
            future: [{ person: "2s", template: "Mañana tú {verb} descansar por fin.", translation: "Tomorrow you will finally be able to rest." }],
            imperfect: [{ person: "3s", template: "De joven él {verb} correr durante horas.", translation: "As a young man he could run for hours." }],
            past_perfect: [{ person: "3p", template: "Ellos no {verb} salir antes de las ocho.", translation: "They had not been able to leave before eight." }],
        },
    },
    {
        infinitive: "querer",
        english: "to want",
        forms: {
            present: { "1s": "quiero", "2s": "quieres", "3s": "quiere", "1p": "queremos", "2p": "queréis", "3p": "quieren" },
            future: { "1s": "querré", "2s": "querrás", "3s": "querrá", "1p": "querremos", "2p": "querréis", "3p": "querrán" },
            imperfect: { "1s": "quería", "2s": "querías", "3s": "quería", "1p": "queríamos", "2p": "queríais", "3p": "querían" },
            past_perfect: { "1s": "había querido", "2s": "habías querido", "3s": "había querido", "1p": "habíamos querido", "2p": "habíais querido", "3p": "habían querido" },
        },
        sentences: {
            present: [{ person: "1p", template: "Nosotros {verb} visitar Roma este verano.", translation: "We want to visit Rome this summer." }],
            future: [{ person: "3s", template: "Ella {verb} estudiar medicina.", translation: "She will want to study medicine." }],
            imperfect: [{ person: "1s", template: "De niño siempre {verb} jugar afuera.", translation: "As a child I always wanted to play outside." }],
            past_perfect: [{ person: "2s", template: "Tú ya {verb} irte antes de la reunión.", translation: "You had already wanted to leave before the meeting." }],
        },
    },
    {
        infinitive: "deber",
        english: "to have to / must",
        forms: {
            present: { "1s": "debo", "2s": "debes", "3s": "debe", "1p": "debemos", "2p": "debéis", "3p": "deben" },
            future: { "1s": "deberé", "2s": "deberás", "3s": "deberá", "1p": "deberemos", "2p": "deberéis", "3p": "deberán" },
            imperfect: { "1s": "debía", "2s": "debías", "3s": "debía", "1p": "debíamos", "2p": "debíais", "3p": "debían" },
            past_perfect: { "1s": "había debido", "2s": "habías debido", "3s": "había debido", "1p": "habíamos debido", "2p": "habíais debido", "3p": "habían debido" },
        },
        sentences: {
            present: [{ person: "2p", template: "Vosotros {verb} terminar el proyecto antes del viernes.", translation: "You (pl.) must finish the project by Friday." }],
            future: [{ person: "1s", template: "Mañana {verb} levantarme temprano.", translation: "Tomorrow I will have to get up early." }],
            imperfect: [{ person: "3p", template: "Ellos siempre {verb} pedir permiso.", translation: "They always had to ask permission." }],
            past_perfect: [{ person: "1p", template: "Nosotros ya {verb} pagar la cuenta.", translation: "We had already had to pay the bill." }],
        },
    },
    {
        infinitive: "saber",
        english: "to know",
        forms: {
            present: { "1s": "sé", "2s": "sabes", "3s": "sabe", "1p": "sabemos", "2p": "sabéis", "3p": "saben" },
            future: { "1s": "sabré", "2s": "sabrás", "3s": "sabrá", "1p": "sabremos", "2p": "sabréis", "3p": "sabrán" },
            imperfect: { "1s": "sabía", "2s": "sabías", "3s": "sabía", "1p": "sabíamos", "2p": "sabíais", "3p": "sabían" },
            past_perfect: { "1s": "había sabido", "2s": "habías sabido", "3s": "había sabido", "1p": "habíamos sabido", "2p": "habíais sabido", "3p": "habían sabido" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marcos {verb} hablar tres idiomas.", translation: "Marcos knows how to speak three languages." }],
            future: [{ person: "1p", template: "Mañana {verb} el resultado del examen.", translation: "Tomorrow we will know the exam result." }],
            imperfect: [{ person: "1s", template: "De niño no {verb} nadar.", translation: "As a child I didn't know how to swim." }],
            past_perfect: [{ person: "3p", template: "Ellos ya {verb} la verdad antes que nosotros.", translation: "They had already known the truth before us." }],
        },
    },
    {
        infinitive: "ver",
        english: "to see",
        forms: {
            present: { "1s": "veo", "2s": "ves", "3s": "ve", "1p": "vemos", "2p": "veis", "3p": "ven" },
            future: { "1s": "veré", "2s": "verás", "3s": "verá", "1p": "veremos", "2p": "veréis", "3p": "verán" },
            imperfect: { "1s": "veía", "2s": "veías", "3s": "veía", "1p": "veíamos", "2p": "veíais", "3p": "veían" },
            past_perfect: { "1s": "había visto", "2s": "habías visto", "3s": "había visto", "1p": "habíamos visto", "2p": "habíais visto", "3p": "habían visto" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} el mar desde la ventana.", translation: "I see the sea from the window." }],
            future: [{ person: "3p", template: "Mañana ellos {verb} la nueva película.", translation: "Tomorrow they will see the new movie." }],
            imperfect: [{ person: "2s", template: "Desde allí tú {verb} toda la ciudad.", translation: "From there you used to see the whole city." }],
            past_perfect: [{ person: "3s", template: "Ella ya {verb} ese museo antes del viaje.", translation: "She had already seen that museum before the trip." }],
        },
    },
    {
        infinitive: "decir",
        english: "to say",
        forms: {
            present: { "1s": "digo", "2s": "dices", "3s": "dice", "1p": "decimos", "2p": "decís", "3p": "dicen" },
            future: { "1s": "diré", "2s": "dirás", "3s": "dirá", "1p": "diremos", "2p": "diréis", "3p": "dirán" },
            imperfect: { "1s": "decía", "2s": "decías", "3s": "decía", "1p": "decíamos", "2p": "decíais", "3p": "decían" },
            past_perfect: { "1s": "había dicho", "2s": "habías dicho", "3s": "había dicho", "1p": "habíamos dicho", "2p": "habíais dicho", "3p": "habían dicho" },
        },
        sentences: {
            present: [{ person: "3p", template: "Ellos siempre {verb} la verdad.", translation: "They always tell the truth." }],
            future: [{ person: "1s", template: "Mañana {verb} todo al profesor.", translation: "Tomorrow I will tell everything to the professor." }],
            imperfect: [{ person: "1p", template: "Nosotros {verb} a menudo lo mismo.", translation: "We often used to say the same thing." }],
            past_perfect: [{ person: "2s", template: "Tú ya {verb} tu opinión antes de la reunión.", translation: "You had already said your opinion before the meeting." }],
        },
    },
    {
        infinitive: "tomar",
        english: "to take",
        forms: {
            present: { "1s": "tomo", "2s": "tomas", "3s": "toma", "1p": "tomamos", "2p": "tomáis", "3p": "toman" },
            future: { "1s": "tomaré", "2s": "tomarás", "3s": "tomará", "1p": "tomaremos", "2p": "tomaréis", "3p": "tomarán" },
            imperfect: { "1s": "tomaba", "2s": "tomabas", "3s": "tomaba", "1p": "tomábamos", "2p": "tomabais", "3p": "tomaban" },
            past_perfect: { "1s": "había tomado", "2s": "habías tomado", "3s": "había tomado", "1p": "habíamos tomado", "2p": "habíais tomado", "3p": "habían tomado" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} el tren todas las mañanas.", translation: "I take the train every morning." }],
            future: [{ person: "3s", template: "Mañana él {verb} el avión.", translation: "Tomorrow he will take the plane." }],
            imperfect: [{ person: "1p", template: "Nosotros siempre {verb} el mismo camino.", translation: "We always used to take the same path." }],
            past_perfect: [{ person: "3p", template: "Ellos ya {verb} su decisión antes de la reunión.", translation: "They had already made their decision before the meeting." }],
        },
    },
    {
        infinitive: "poner",
        english: "to put",
        forms: {
            present: { "1s": "pongo", "2s": "pones", "3s": "pone", "1p": "ponemos", "2p": "ponéis", "3p": "ponen" },
            future: { "1s": "pondré", "2s": "pondrás", "3s": "pondrá", "1p": "pondremos", "2p": "pondréis", "3p": "pondrán" },
            imperfect: { "1s": "ponía", "2s": "ponías", "3s": "ponía", "1p": "poníamos", "2p": "poníais", "3p": "ponían" },
            past_perfect: { "1s": "había puesto", "2s": "habías puesto", "3s": "había puesto", "1p": "habíamos puesto", "2p": "habíais puesto", "3p": "habían puesto" },
        },
        sentences: {
            present: [{ person: "3s", template: "Ella {verb} la mesa cada noche.", translation: "She sets the table every evening." }],
            future: [{ person: "2p", template: "Mañana vosotros {verb} los abrigos.", translation: "Tomorrow you (pl.) will put on your coats." }],
            imperfect: [{ person: "1s", template: "De niño siempre {verb} mis juguetes aquí.", translation: "As a child I always used to put my toys here." }],
            past_perfect: [{ person: "1p", template: "Nosotros ya {verb} la carta en el correo.", translation: "We had already put the letter in the mail." }],
        },
    },
    {
        infinitive: "vivir",
        english: "to live",
        forms: {
            present: { "1s": "vivo", "2s": "vives", "3s": "vive", "1p": "vivimos", "2p": "vivís", "3p": "viven" },
            future: { "1s": "viviré", "2s": "vivirás", "3s": "vivirá", "1p": "viviremos", "2p": "viviréis", "3p": "vivirán" },
            imperfect: { "1s": "vivía", "2s": "vivías", "3s": "vivía", "1p": "vivíamos", "2p": "vivíais", "3p": "vivían" },
            past_perfect: { "1s": "había vivido", "2s": "habías vivido", "3s": "había vivido", "1p": "habíamos vivido", "2p": "habíais vivido", "3p": "habían vivido" },
        },
        sentences: {
            present: [{ person: "1p", template: "Nosotros {verb} cerca del mar.", translation: "We live near the sea." }],
            future: [{ person: "3s", template: "Algún día él {verb} en el extranjero.", translation: "Someday he will live abroad." }],
            imperfect: [{ person: "2p", template: "Vosotros {verb} siempre en el campo.", translation: "You (pl.) always used to live in the countryside." }],
            past_perfect: [{ person: "3p", template: "Ellos ya {verb} allí antes de mudarse.", translation: "They had already lived there before moving." }],
        },
    },
    {
        infinitive: "esperar",
        english: "to wait",
        forms: {
            present: { "1s": "espero", "2s": "esperas", "3s": "espera", "1p": "esperamos", "2p": "esperáis", "3p": "esperan" },
            future: { "1s": "esperaré", "2s": "esperarás", "3s": "esperará", "1p": "esperaremos", "2p": "esperaréis", "3p": "esperarán" },
            imperfect: { "1s": "esperaba", "2s": "esperabas", "3s": "esperaba", "1p": "esperábamos", "2p": "esperabais", "3p": "esperaban" },
            past_perfect: { "1s": "había esperado", "2s": "habías esperado", "3s": "había esperado", "1p": "habíamos esperado", "2p": "habíais esperado", "3p": "habían esperado" },
        },
        sentences: {
            present: [{ person: "3s", template: "María {verb} el autobús cada mañana.", translation: "Maria waits for the bus every morning." }],
            future: [{ person: "1p", template: "Mañana {verb} su llegada.", translation: "Tomorrow we will wait for her arrival." }],
            imperfect: [{ person: "2p", template: "Vosotros siempre {verb} delante de la puerta.", translation: "You (pl.) always used to wait in front of the door." }],
            past_perfect: [{ person: "3p", template: "Ellos ya {verb} mucho tiempo cuando ella llegó.", translation: "They had already been waiting a long time when she arrived." }],
        },
    },
    {
        infinitive: "creer",
        english: "to believe",
        forms: {
            present: { "1s": "creo", "2s": "crees", "3s": "cree", "1p": "creemos", "2p": "creéis", "3p": "creen" },
            future: { "1s": "creeré", "2s": "creerás", "3s": "creerá", "1p": "creeremos", "2p": "creeréis", "3p": "creerán" },
            imperfect: { "1s": "creía", "2s": "creías", "3s": "creía", "1p": "creíamos", "2p": "creíais", "3p": "creían" },
            past_perfect: { "1s": "había creído", "2s": "habías creído", "3s": "había creído", "1p": "habíamos creído", "2p": "habíais creído", "3p": "habían creído" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} en este proyecto.", translation: "I believe in this project." }],
            future: [{ person: "3s", template: "Al final ella {verb} en nuestra idea.", translation: "In the end she will believe our idea." }],
            imperfect: [{ person: "3p", template: "Ellos {verb} en un futuro mejor.", translation: "They used to believe in a better future." }],
            past_perfect: [{ person: "1p", template: "Nosotros ya {verb} esa historia.", translation: "We had already believed that story." }],
        },
    },
    {
        infinitive: "dormir",
        english: "to sleep",
        forms: {
            present: { "1s": "duermo", "2s": "duermes", "3s": "duerme", "1p": "dormimos", "2p": "dormís", "3p": "duermen" },
            future: { "1s": "dormiré", "2s": "dormirás", "3s": "dormirá", "1p": "dormiremos", "2p": "dormiréis", "3p": "dormirán" },
            imperfect: { "1s": "dormía", "2s": "dormías", "3s": "dormía", "1p": "dormíamos", "2p": "dormíais", "3p": "dormían" },
            past_perfect: { "1s": "había dormido", "2s": "habías dormido", "3s": "había dormido", "1p": "habíamos dormido", "2p": "habíais dormido", "3p": "habían dormido" },
        },
        sentences: {
            present: [{ person: "3s", template: "El niño {verb} toda la noche.", translation: "The child sleeps all night." }],
            future: [{ person: "1s", template: "Esta noche {verb} temprano.", translation: "Tonight I will sleep early." }],
            imperfect: [{ person: "2p", template: "Vosotros siempre {verb} hasta tarde.", translation: "You (pl.) always used to sleep late." }],
            past_perfect: [{ person: "3p", template: "Ellos ya {verb} cuando llegamos.", translation: "They had already been sleeping when we arrived." }],
        },
    },
    {
        infinitive: "terminar",
        english: "to finish",
        forms: {
            present: { "1s": "termino", "2s": "terminas", "3s": "termina", "1p": "terminamos", "2p": "termináis", "3p": "terminan" },
            future: { "1s": "terminaré", "2s": "terminarás", "3s": "terminará", "1p": "terminaremos", "2p": "terminaréis", "3p": "terminarán" },
            imperfect: { "1s": "terminaba", "2s": "terminabas", "3s": "terminaba", "1p": "terminábamos", "2p": "terminabais", "3p": "terminaban" },
            past_perfect: { "1s": "había terminado", "2s": "habías terminado", "3s": "había terminado", "1p": "habíamos terminado", "2p": "habíais terminado", "3p": "habían terminado" },
        },
        sentences: {
            present: [{ person: "1p", template: "Nosotros {verb} el trabajo a las seis.", translation: "We finish work at six." }],
            future: [{ person: "2s", template: "Mañana tú {verb} el libro.", translation: "Tomorrow you will finish the book." }],
            imperfect: [{ person: "3s", template: "Cada noche él {verb} tarde.", translation: "Every evening he used to finish late." }],
            past_perfect: [{ person: "1s", template: "Yo ya {verb} la tarea antes de la cena.", translation: "I had already finished the homework before dinner." }],
        },
    },
    {
        infinitive: "escribir",
        english: "to write",
        forms: {
            present: { "1s": "escribo", "2s": "escribes", "3s": "escribe", "1p": "escribimos", "2p": "escribís", "3p": "escriben" },
            future: { "1s": "escribiré", "2s": "escribirás", "3s": "escribirá", "1p": "escribiremos", "2p": "escribiréis", "3p": "escribirán" },
            imperfect: { "1s": "escribía", "2s": "escribías", "3s": "escribía", "1p": "escribíamos", "2p": "escribíais", "3p": "escribían" },
            past_perfect: { "1s": "había escrito", "2s": "habías escrito", "3s": "había escrito", "1p": "habíamos escrito", "2p": "habíais escrito", "3p": "habían escrito" },
        },
        sentences: {
            present: [{ person: "3s", template: "María {verb} una carta cada semana.", translation: "Maria writes a letter every week." }],
            future: [{ person: "1p", template: "Mañana {verb} el informe.", translation: "Tomorrow we will write the report." }],
            imperfect: [{ person: "1s", template: "De estudiante yo {verb} poemas.", translation: "As a student I used to write poems." }],
            past_perfect: [{ person: "3p", template: "Ellos ya {verb} el mensaje antes de partir.", translation: "They had already written the message before leaving." }],
        },
    },
    {
        infinitive: "ir",
        english: "to go",
        forms: {
            present: { "1s": "voy", "2s": "vas", "3s": "va", "1p": "vamos", "2p": "vais", "3p": "van" },
            future: { "1s": "iré", "2s": "irás", "3s": "irá", "1p": "iremos", "2p": "iréis", "3p": "irán" },
            imperfect: { "1s": "iba", "2s": "ibas", "3s": "iba", "1p": "íbamos", "2p": "ibais", "3p": "iban" },
            past_perfect: { "1s": "había ido", "2s": "habías ido", "3s": "había ido", "1p": "habíamos ido", "2p": "habíais ido", "3p": "habían ido" },
        },
        sentences: {
            present: [{ person: "3s", template: "María {verb} al mercado todos los sábados.", translation: "Maria goes to the market every Saturday." }],
            future: [{ person: "1s", template: "Mañana {verb} a Roma por trabajo.", translation: "Tomorrow I will go to Rome for work." }],
            imperfect: [{ person: "3p", template: "De niños siempre {verb} al parque.", translation: "As children they always used to go to the park." }],
            past_perfect: [{ person: "1p", template: "Cuando ella llegó, nosotros ya {verb} a casa.", translation: "When she arrived, we had already gone home." }],
        },
    },
    {
        infinitive: "venir",
        english: "to come",
        forms: {
            present: { "1s": "vengo", "2s": "vienes", "3s": "viene", "1p": "venimos", "2p": "venís", "3p": "vienen" },
            future: { "1s": "vendré", "2s": "vendrás", "3s": "vendrá", "1p": "vendremos", "2p": "vendréis", "3p": "vendrán" },
            imperfect: { "1s": "venía", "2s": "venías", "3s": "venía", "1p": "veníamos", "2p": "veníais", "3p": "venían" },
            past_perfect: { "1s": "había venido", "2s": "habías venido", "3s": "había venido", "1p": "habíamos venido", "2p": "habíais venido", "3p": "habían venido" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marcos {verb} a vernos cada domingo.", translation: "Marco comes to see us every Sunday." }],
            future: [{ person: "2s", template: "¿Mañana tú {verb} a la fiesta?", translation: "Will you come to the party tomorrow?" }],
            imperfect: [{ person: "1p", template: "De jóvenes {verb} a menudo a esta ciudad.", translation: "When we were young we often used to come to this city." }],
            past_perfect: [{ person: "3s", template: "Cuando lo llamamos, él ya {verb} a la reunión.", translation: "When we called him, he had already come to the meeting." }],
        },
    },
    {
        infinitive: "dar",
        english: "to give",
        forms: {
            present: { "1s": "doy", "2s": "das", "3s": "da", "1p": "damos", "2p": "dais", "3p": "dan" },
            future: { "1s": "daré", "2s": "darás", "3s": "dará", "1p": "daremos", "2p": "daréis", "3p": "darán" },
            imperfect: { "1s": "daba", "2s": "dabas", "3s": "daba", "1p": "dábamos", "2p": "dabais", "3p": "daban" },
            past_perfect: { "1s": "había dado", "2s": "habías dado", "3s": "había dado", "1p": "habíamos dado", "2p": "habíais dado", "3p": "habían dado" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} un regalo a mi madre cada año.", translation: "I give a gift to my mother every year." }],
            future: [{ person: "3p", template: "Mañana ellos {verb} una respuesta al director.", translation: "Tomorrow they will give an answer to the director." }],
            imperfect: [{ person: "2s", template: "De niño tú siempre {verb} tus juguetes a tus amigos.", translation: "As a child you always used to give your toys to your friends." }],
            past_perfect: [{ person: "1p", template: "Cuando él llegó, nosotros ya {verb} los boletos.", translation: "When he arrived, we had already given the tickets." }],
        },
    },
    {
        infinitive: "llegar",
        english: "to arrive",
        forms: {
            present: { "1s": "llego", "2s": "llegas", "3s": "llega", "1p": "llegamos", "2p": "llegáis", "3p": "llegan" },
            future: { "1s": "llegaré", "2s": "llegarás", "3s": "llegará", "1p": "llegaremos", "2p": "llegaréis", "3p": "llegarán" },
            imperfect: { "1s": "llegaba", "2s": "llegabas", "3s": "llegaba", "1p": "llegábamos", "2p": "llegabais", "3p": "llegaban" },
            past_perfect: { "1s": "había llegado", "2s": "habías llegado", "3s": "había llegado", "1p": "habíamos llegado", "2p": "habíais llegado", "3p": "habían llegado" },
        },
        sentences: {
            present: [{ person: "3s", template: "El tren {verb} a las ocho cada mañana.", translation: "The train arrives at eight every morning." }],
            future: [{ person: "2p", template: "Mañana vosotros {verb} antes que nosotros.", translation: "Tomorrow you (pl.) will arrive before us." }],
            imperfect: [{ person: "3p", template: "Cada verano {verb} tarde.", translation: "Every summer they used to arrive late." }],
            past_perfect: [{ person: "3s", template: "Cuando llamamos, ella ya {verb} a la oficina.", translation: "When we called, she had already arrived at the office." }],
        },
    },
    {
        infinitive: "entrar",
        english: "to enter",
        forms: {
            present: { "1s": "entro", "2s": "entras", "3s": "entra", "1p": "entramos", "2p": "entráis", "3p": "entran" },
            future: { "1s": "entraré", "2s": "entrarás", "3s": "entrará", "1p": "entraremos", "2p": "entraréis", "3p": "entrarán" },
            imperfect: { "1s": "entraba", "2s": "entrabas", "3s": "entraba", "1p": "entrábamos", "2p": "entrabais", "3p": "entraban" },
            past_perfect: { "1s": "había entrado", "2s": "habías entrado", "3s": "había entrado", "1p": "habíamos entrado", "2p": "habíais entrado", "3p": "habían entrado" },
        },
        sentences: {
            present: [{ person: "3s", template: "El gato {verb} en casa por la ventana.", translation: "The cat enters the house through the window." }],
            future: [{ person: "1s", template: "Mañana {verb} a la oficina más tarde.", translation: "Tomorrow I will enter the office later." }],
            imperfect: [{ person: "3p", template: "Cada noche {verb} sin hacer ruido.", translation: "Every evening they used to enter without making noise." }],
            past_perfect: [{ person: "2s", template: "Cuando te llamamos, tú ya {verb} a clase.", translation: "When we called you, you had already entered the classroom." }],
        },
    },
    {
        infinitive: "partir",
        english: "to leave / to depart",
        forms: {
            present: { "1s": "parto", "2s": "partes", "3s": "parte", "1p": "partimos", "2p": "partís", "3p": "parten" },
            future: { "1s": "partiré", "2s": "partirás", "3s": "partirá", "1p": "partiremos", "2p": "partiréis", "3p": "partirán" },
            imperfect: { "1s": "partía", "2s": "partías", "3s": "partía", "1p": "partíamos", "2p": "partíais", "3p": "partían" },
            past_perfect: { "1s": "había partido", "2s": "habías partido", "3s": "había partido", "1p": "habíamos partido", "2p": "habíais partido", "3p": "habían partido" },
        },
        sentences: {
            present: [{ person: "3s", template: "El avión {verb} a las seis de la mañana.", translation: "The plane leaves at six in the morning." }],
            future: [{ person: "1p", template: "Mañana {verb} de vacaciones.", translation: "Tomorrow we will leave for vacation." }],
            imperfect: [{ person: "2p", template: "Cada verano vosotros {verb} temprano por la mañana.", translation: "Every summer you (pl.) used to leave early in the morning." }],
            past_perfect: [{ person: "3p", template: "Cuando llegamos, ellos ya {verb}.", translation: "When we arrived, they had already left." }],
        },
    },
    {
        infinitive: "volver",
        english: "to return",
        forms: {
            present: { "1s": "vuelvo", "2s": "vuelves", "3s": "vuelve", "1p": "volvemos", "2p": "volvéis", "3p": "vuelven" },
            future: { "1s": "volveré", "2s": "volverás", "3s": "volverá", "1p": "volveremos", "2p": "volveréis", "3p": "volverán" },
            imperfect: { "1s": "volvía", "2s": "volvías", "3s": "volvía", "1p": "volvíamos", "2p": "volvíais", "3p": "volvían" },
            past_perfect: { "1s": "había vuelto", "2s": "habías vuelto", "3s": "había vuelto", "1p": "habíamos vuelto", "2p": "habíais vuelto", "3p": "habían vuelto" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} a casa a las siete cada noche.", translation: "I return home at seven every evening." }],
            future: [{ person: "3s", template: "Mañana él {verb} del viaje.", translation: "Tomorrow he will return from the trip." }],
            imperfect: [{ person: "1p", template: "De niños siempre {verb} a pie del colegio.", translation: "As children we always used to return on foot from school." }],
            past_perfect: [{ person: "3p", template: "Cuando los buscamos, ellos ya {verb} a casa.", translation: "When we looked for them, they had already returned home." }],
        },
    },
    {
        infinitive: "buscar",
        english: "to search / to look for",
        forms: {
            present: { "1s": "busco", "2s": "buscas", "3s": "busca", "1p": "buscamos", "2p": "buscáis", "3p": "buscan" },
            future: { "1s": "buscaré", "2s": "buscarás", "3s": "buscará", "1p": "buscaremos", "2p": "buscaréis", "3p": "buscarán" },
            imperfect: { "1s": "buscaba", "2s": "buscabas", "3s": "buscaba", "1p": "buscábamos", "2p": "buscabais", "3p": "buscaban" },
            past_perfect: { "1s": "había buscado", "2s": "habías buscado", "3s": "había buscado", "1p": "habíamos buscado", "2p": "habíais buscado", "3p": "habían buscado" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} las llaves cada mañana.", translation: "I look for my keys every morning." }],
            future: [{ person: "3p", template: "Mañana ellos {verb} un nuevo apartamento.", translation: "Tomorrow they will look for a new apartment." }],
            imperfect: [{ person: "2s", template: "De niño tú siempre {verb} nuevas aventuras.", translation: "As a child you always used to look for new adventures." }],
            past_perfect: [{ person: "1p", template: "Antes de encontrarlo, nosotros ya {verb} por todas partes.", translation: "Before finding it, we had already looked everywhere." }],
        },
    },
    {
        infinitive: "encontrar",
        english: "to find",
        forms: {
            present: { "1s": "encuentro", "2s": "encuentras", "3s": "encuentra", "1p": "encontramos", "2p": "encontráis", "3p": "encuentran" },
            future: { "1s": "encontraré", "2s": "encontrarás", "3s": "encontrará", "1p": "encontraremos", "2p": "encontraréis", "3p": "encontrarán" },
            imperfect: { "1s": "encontraba", "2s": "encontrabas", "3s": "encontraba", "1p": "encontrábamos", "2p": "encontrabais", "3p": "encontraban" },
            past_perfect: { "1s": "había encontrado", "2s": "habías encontrado", "3s": "había encontrado", "1p": "habíamos encontrado", "2p": "habíais encontrado", "3p": "habían encontrado" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marcos siempre {verb} una solución.", translation: "Marco always finds a solution." }],
            future: [{ person: "1s", template: "Mañana {verb} el tiempo para llamarte.", translation: "Tomorrow I will find the time to call you." }],
            imperfect: [{ person: "3p", template: "Cada vez {verb} una razón para pelear.", translation: "Every time they used to find a reason to argue." }],
            past_perfect: [{ person: "1p", template: "Antes del final, nosotros ya {verb} la respuesta.", translation: "Before the end, we had already found the answer." }],
        },
    },
    {
        infinitive: "comprar",
        english: "to buy",
        forms: {
            present: { "1s": "compro", "2s": "compras", "3s": "compra", "1p": "compramos", "2p": "compráis", "3p": "compran" },
            future: { "1s": "compraré", "2s": "comprarás", "3s": "comprará", "1p": "compraremos", "2p": "compraréis", "3p": "comprarán" },
            imperfect: { "1s": "compraba", "2s": "comprabas", "3s": "compraba", "1p": "comprábamos", "2p": "comprabais", "3p": "compraban" },
            past_perfect: { "1s": "había comprado", "2s": "habías comprado", "3s": "había comprado", "1p": "habíamos comprado", "2p": "habíais comprado", "3p": "habían comprado" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} el pan cada mañana.", translation: "I buy bread every morning." }],
            future: [{ person: "3s", template: "Mañana ella {verb} un vestido nuevo.", translation: "Tomorrow she will buy a new dress." }],
            imperfect: [{ person: "1p", template: "De jóvenes siempre {verb} la misma ropa.", translation: "When we were young we always used to buy the same clothes." }],
            past_perfect: [{ person: "3p", template: "Cuando llegamos a la tienda, ellos ya {verb} todo.", translation: "When we arrived at the store, they had already bought everything." }],
        },
    },
    {
        infinitive: "vender",
        english: "to sell",
        forms: {
            present: { "1s": "vendo", "2s": "vendes", "3s": "vende", "1p": "vendemos", "2p": "vendéis", "3p": "venden" },
            future: { "1s": "venderé", "2s": "venderás", "3s": "venderá", "1p": "venderemos", "2p": "venderéis", "3p": "venderán" },
            imperfect: { "1s": "vendía", "2s": "vendías", "3s": "vendía", "1p": "vendíamos", "2p": "vendíais", "3p": "vendían" },
            past_perfect: { "1s": "había vendido", "2s": "habías vendido", "3s": "había vendido", "1p": "habíamos vendido", "2p": "habíais vendido", "3p": "habían vendido" },
        },
        sentences: {
            present: [{ person: "3p", template: "Ellos {verb} fruta en el mercado.", translation: "They sell fruit at the market." }],
            future: [{ person: "1s", template: "Mañana {verb} mi vieja bicicleta.", translation: "Tomorrow I will sell my old bike." }],
            imperfect: [{ person: "3s", template: "La tienda siempre {verb} productos frescos.", translation: "The store always used to sell fresh products." }],
            past_perfect: [{ person: "2p", template: "Cuando volvimos, vosotros ya {verb} la casa.", translation: "When we came back, you (pl.) had already sold the house." }],
        },
    },
    {
        infinitive: "abrir",
        english: "to open",
        forms: {
            present: { "1s": "abro", "2s": "abres", "3s": "abre", "1p": "abrimos", "2p": "abrís", "3p": "abren" },
            future: { "1s": "abriré", "2s": "abrirás", "3s": "abrirá", "1p": "abriremos", "2p": "abriréis", "3p": "abrirán" },
            imperfect: { "1s": "abría", "2s": "abrías", "3s": "abría", "1p": "abríamos", "2p": "abríais", "3p": "abrían" },
            past_perfect: { "1s": "había abierto", "2s": "habías abierto", "3s": "había abierto", "1p": "habíamos abierto", "2p": "habíais abierto", "3p": "habían abierto" },
        },
        sentences: {
            present: [{ person: "3s", template: "La tienda {verb} a las nueve cada día.", translation: "The store opens at nine every day." }],
            future: [{ person: "1s", template: "Mañana {verb} una nueva cuenta bancaria.", translation: "Tomorrow I will open a new bank account." }],
            imperfect: [{ person: "3p", template: "Cada mañana {verb} las ventanas temprano.", translation: "Every morning they used to open the windows early." }],
            past_perfect: [{ person: "1p", template: "Cuando llegaron, nosotros ya {verb} la puerta.", translation: "When they arrived, we had already opened the door." }],
        },
    },
    {
        infinitive: "cerrar",
        english: "to close",
        forms: {
            present: { "1s": "cierro", "2s": "cierras", "3s": "cierra", "1p": "cerramos", "2p": "cerráis", "3p": "cierran" },
            future: { "1s": "cerraré", "2s": "cerrarás", "3s": "cerrará", "1p": "cerraremos", "2p": "cerraréis", "3p": "cerrarán" },
            imperfect: { "1s": "cerraba", "2s": "cerrabas", "3s": "cerraba", "1p": "cerrábamos", "2p": "cerrabais", "3p": "cerraban" },
            past_perfect: { "1s": "había cerrado", "2s": "habías cerrado", "3s": "había cerrado", "1p": "habíamos cerrado", "2p": "habíais cerrado", "3p": "habían cerrado" },
        },
        sentences: {
            present: [{ person: "3s", template: "El museo {verb} a las seis de la tarde.", translation: "The museum closes at six in the evening." }],
            future: [{ person: "2p", template: "Mañana vosotros {verb} la tienda antes.", translation: "Tomorrow you (pl.) will close the shop earlier." }],
            imperfect: [{ person: "1s", template: "De niño yo siempre {verb} la puerta con cuidado.", translation: "As a child I always used to close the door carefully." }],
            past_perfect: [{ person: "3p", template: "Cuando volvimos, ellos ya {verb} las ventanas.", translation: "When we came back, they had already closed the windows." }],
        },
    },
    {
        infinitive: "leer",
        english: "to read",
        forms: {
            present: { "1s": "leo", "2s": "lees", "3s": "lee", "1p": "leemos", "2p": "leéis", "3p": "leen" },
            future: { "1s": "leeré", "2s": "leerás", "3s": "leerá", "1p": "leeremos", "2p": "leeréis", "3p": "leerán" },
            imperfect: { "1s": "leía", "2s": "leías", "3s": "leía", "1p": "leíamos", "2p": "leíais", "3p": "leían" },
            past_perfect: { "1s": "había leído", "2s": "habías leído", "3s": "había leído", "1p": "habíamos leído", "2p": "habíais leído", "3p": "habían leído" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} un libro cada semana.", translation: "I read a book every week." }],
            future: [{ person: "3s", template: "Mañana ella {verb} el periódico con calma.", translation: "Tomorrow she will read the newspaper calmly." }],
            imperfect: [{ person: "1p", template: "De niños siempre {verb} antes de dormir.", translation: "As children we always used to read before sleeping." }],
            past_perfect: [{ person: "3s", template: "Cuando empezó la clase, él ya {verb} el capítulo.", translation: "When the class started, he had already read the chapter." }],
        },
    },
    {
        infinitive: "jugar",
        english: "to play",
        forms: {
            present: { "1s": "juego", "2s": "juegas", "3s": "juega", "1p": "jugamos", "2p": "jugáis", "3p": "juegan" },
            future: { "1s": "jugaré", "2s": "jugarás", "3s": "jugará", "1p": "jugaremos", "2p": "jugaréis", "3p": "jugarán" },
            imperfect: { "1s": "jugaba", "2s": "jugabas", "3s": "jugaba", "1p": "jugábamos", "2p": "jugabais", "3p": "jugaban" },
            past_perfect: { "1s": "había jugado", "2s": "habías jugado", "3s": "había jugado", "1p": "habíamos jugado", "2p": "habíais jugado", "3p": "habían jugado" },
        },
        sentences: {
            present: [{ person: "3p", template: "Los niños {verb} en el jardín cada tarde.", translation: "The children play in the garden every afternoon." }],
            future: [{ person: "1s", template: "Mañana {verb} al fútbol con amigos.", translation: "Tomorrow I will play soccer with friends." }],
            imperfect: [{ person: "2s", template: "De pequeño tú siempre {verb} afuera.", translation: "As a child you always used to play outside." }],
            past_perfect: [{ person: "1p", template: "Cuando empezó la lluvia, nosotros ya {verb} mucho tiempo.", translation: "When the rain started, we had already been playing for a long time." }],
        },
    },
    {
        infinitive: "trabajar",
        english: "to work",
        forms: {
            present: { "1s": "trabajo", "2s": "trabajas", "3s": "trabaja", "1p": "trabajamos", "2p": "trabajáis", "3p": "trabajan" },
            future: { "1s": "trabajaré", "2s": "trabajarás", "3s": "trabajará", "1p": "trabajaremos", "2p": "trabajaréis", "3p": "trabajarán" },
            imperfect: { "1s": "trabajaba", "2s": "trabajabas", "3s": "trabajaba", "1p": "trabajábamos", "2p": "trabajabais", "3p": "trabajaban" },
            past_perfect: { "1s": "había trabajado", "2s": "habías trabajado", "3s": "había trabajado", "1p": "habíamos trabajado", "2p": "habíais trabajado", "3p": "habían trabajado" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marcos {verb} en el banco desde hace cinco años.", translation: "Marco has worked at the bank for five years." }],
            future: [{ person: "1p", template: "Mañana {verb} juntos en el proyecto.", translation: "Tomorrow we will work together on the project." }],
            imperfect: [{ person: "3p", template: "De jóvenes {verb} toda la noche.", translation: "When they were young they used to work all night." }],
            past_perfect: [{ person: "2s", template: "Cuando te llamamos, tú ya {verb} mucho.", translation: "When we called you, you had already worked a lot." }],
        },
    },
    {
        infinitive: "estudiar",
        english: "to study",
        forms: {
            present: { "1s": "estudio", "2s": "estudias", "3s": "estudia", "1p": "estudiamos", "2p": "estudiáis", "3p": "estudian" },
            future: { "1s": "estudiaré", "2s": "estudiarás", "3s": "estudiará", "1p": "estudiaremos", "2p": "estudiaréis", "3p": "estudiarán" },
            imperfect: { "1s": "estudiaba", "2s": "estudiabas", "3s": "estudiaba", "1p": "estudiábamos", "2p": "estudiabais", "3p": "estudiaban" },
            past_perfect: { "1s": "había estudiado", "2s": "habías estudiado", "3s": "había estudiado", "1p": "habíamos estudiado", "2p": "habíais estudiado", "3p": "habían estudiado" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} italiano cada noche.", translation: "I study Italian every evening." }],
            future: [{ person: "3s", template: "Mañana ella {verb} para el examen.", translation: "Tomorrow she will study for the exam." }],
            imperfect: [{ person: "1p", template: "De estudiantes siempre {verb} en la biblioteca.", translation: "As students we always used to study in the library." }],
            past_perfect: [{ person: "3p", template: "Cuando empezó el examen, ellos ya {verb} bastante.", translation: "When the exam started, they had already studied enough." }],
        },
    },
    {
        infinitive: "aprender",
        english: "to learn",
        forms: {
            present: { "1s": "aprendo", "2s": "aprendes", "3s": "aprende", "1p": "aprendemos", "2p": "aprendéis", "3p": "aprenden" },
            future: { "1s": "aprenderé", "2s": "aprenderás", "3s": "aprenderá", "1p": "aprenderemos", "2p": "aprenderéis", "3p": "aprenderán" },
            imperfect: { "1s": "aprendía", "2s": "aprendías", "3s": "aprendía", "1p": "aprendíamos", "2p": "aprendíais", "3p": "aprendían" },
            past_perfect: { "1s": "había aprendido", "2s": "habías aprendido", "3s": "había aprendido", "1p": "habíamos aprendido", "2p": "habíais aprendido", "3p": "habían aprendido" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marcos {verb} un idioma nuevo cada año.", translation: "Marco learns a new language every year." }],
            future: [{ person: "1p", template: "Mañana {verb} a tocar la guitarra.", translation: "Tomorrow we will learn to play the guitar." }],
            imperfect: [{ person: "2s", template: "De niño tú siempre {verb} rápido.", translation: "As a child you always used to learn quickly." }],
            past_perfect: [{ person: "1s", template: "Cuando empezó el curso, yo ya {verb} las bases.", translation: "When the course started, I had already learned the basics." }],
        },
    },
    {
        infinitive: "entender",
        english: "to understand",
        forms: {
            present: { "1s": "entiendo", "2s": "entiendes", "3s": "entiende", "1p": "entendemos", "2p": "entendéis", "3p": "entienden" },
            future: { "1s": "entenderé", "2s": "entenderás", "3s": "entenderá", "1p": "entenderemos", "2p": "entenderéis", "3p": "entenderán" },
            imperfect: { "1s": "entendía", "2s": "entendías", "3s": "entendía", "1p": "entendíamos", "2p": "entendíais", "3p": "entendían" },
            past_perfect: { "1s": "había entendido", "2s": "habías entendido", "3s": "había entendido", "1p": "habíamos entendido", "2p": "habíais entendido", "3p": "habían entendido" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} el problema ahora.", translation: "I understand the problem now." }],
            future: [{ person: "3p", template: "Mañana ellos {verb} la verdad.", translation: "Tomorrow they will understand the truth." }],
            imperfect: [{ person: "2p", template: "De niños vosotros no siempre {verb} las reglas.", translation: "As children you (pl.) didn't always understand the rules." }],
            past_perfect: [{ person: "3s", template: "Cuando se lo expliqué, él ya {verb} todo.", translation: "When I explained it to him, he had already understood everything." }],
        },
    },
    {
        infinitive: "pensar",
        english: "to think",
        forms: {
            present: { "1s": "pienso", "2s": "piensas", "3s": "piensa", "1p": "pensamos", "2p": "pensáis", "3p": "piensan" },
            future: { "1s": "pensaré", "2s": "pensarás", "3s": "pensará", "1p": "pensaremos", "2p": "pensaréis", "3p": "pensarán" },
            imperfect: { "1s": "pensaba", "2s": "pensabas", "3s": "pensaba", "1p": "pensábamos", "2p": "pensabais", "3p": "pensaban" },
            past_perfect: { "1s": "había pensado", "2s": "habías pensado", "3s": "había pensado", "1p": "habíamos pensado", "2p": "habíais pensado", "3p": "habían pensado" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} a menudo en ese día.", translation: "I often think about that day." }],
            future: [{ person: "3s", template: "Mañana ella {verb} en una solución.", translation: "Tomorrow she will think of a solution." }],
            imperfect: [{ person: "1p", template: "De jóvenes siempre {verb} en el futuro.", translation: "When we were young we always used to think about the future." }],
            past_perfect: [{ person: "3p", template: "Antes de la reunión, ellos ya {verb} en la propuesta.", translation: "Before the meeting, they had already thought about the proposal." }],
        },
    },
    {
        infinitive: "preguntar",
        english: "to ask",
        forms: {
            present: { "1s": "pregunto", "2s": "preguntas", "3s": "pregunta", "1p": "preguntamos", "2p": "preguntáis", "3p": "preguntan" },
            future: { "1s": "preguntaré", "2s": "preguntarás", "3s": "preguntará", "1p": "preguntaremos", "2p": "preguntaréis", "3p": "preguntarán" },
            imperfect: { "1s": "preguntaba", "2s": "preguntabas", "3s": "preguntaba", "1p": "preguntábamos", "2p": "preguntabais", "3p": "preguntaban" },
            past_perfect: { "1s": "había preguntado", "2s": "habías preguntado", "3s": "había preguntado", "1p": "habíamos preguntado", "2p": "habíais preguntado", "3p": "habían preguntado" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marcos siempre {verb} el permiso.", translation: "Marco always asks permission." }],
            future: [{ person: "1s", template: "Mañana {verb} algo al profesor.", translation: "Tomorrow I will ask the teacher something." }],
            imperfect: [{ person: "2p", template: "De niños vosotros siempre {verb} demasiadas cosas.", translation: "As children you (pl.) always used to ask too many things." }],
            past_perfect: [{ person: "3p", template: "Antes del final, ellos ya {verb} muchas cosas.", translation: "Before the end, they had already asked many things." }],
        },
    },
    {
        infinitive: "responder",
        english: "to answer",
        forms: {
            present: { "1s": "respondo", "2s": "respondes", "3s": "responde", "1p": "respondemos", "2p": "respondéis", "3p": "responden" },
            future: { "1s": "responderé", "2s": "responderás", "3s": "responderá", "1p": "responderemos", "2p": "responderéis", "3p": "responderán" },
            imperfect: { "1s": "respondía", "2s": "respondías", "3s": "respondía", "1p": "respondíamos", "2p": "respondíais", "3p": "respondían" },
            past_perfect: { "1s": "había respondido", "2s": "habías respondido", "3s": "había respondido", "1p": "habíamos respondido", "2p": "habíais respondido", "3p": "habían respondido" },
        },
        sentences: {
            present: [{ person: "3s", template: "María siempre {verb} educadamente.", translation: "Maria always answers politely." }],
            future: [{ person: "1p", template: "Mañana {verb} a todas las preguntas.", translation: "Tomorrow we will answer all the questions." }],
            imperfect: [{ person: "3p", template: "De niños siempre {verb} con calma.", translation: "As children they always used to answer calmly." }],
            past_perfect: [{ person: "2s", template: "Cuando te escribí, tú ya {verb} a la carta.", translation: "When I wrote to you, you had already answered the letter." }],
        },
    },
    {
        infinitive: "llamar",
        english: "to call",
        forms: {
            present: { "1s": "llamo", "2s": "llamas", "3s": "llama", "1p": "llamamos", "2p": "llamáis", "3p": "llaman" },
            future: { "1s": "llamaré", "2s": "llamarás", "3s": "llamará", "1p": "llamaremos", "2p": "llamaréis", "3p": "llamarán" },
            imperfect: { "1s": "llamaba", "2s": "llamabas", "3s": "llamaba", "1p": "llamábamos", "2p": "llamabais", "3p": "llamaban" },
            past_perfect: { "1s": "había llamado", "2s": "habías llamado", "3s": "había llamado", "1p": "habíamos llamado", "2p": "habíais llamado", "3p": "habían llamado" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} a mi madre cada domingo.", translation: "I call my mother every Sunday." }],
            future: [{ person: "3s", template: "Mañana él {verb} al médico.", translation: "Tomorrow he will call the doctor." }],
            imperfect: [{ person: "1p", template: "De niños siempre {verb} a los abuelos los domingos.", translation: "As children we always used to call our grandparents on Sundays." }],
            past_perfect: [{ person: "3p", template: "Antes de la cena, ellos ya {verb} a todos los invitados.", translation: "Before dinner, they had already called all the guests." }],
        },
    },
    {
        infinitive: "caminar",
        english: "to walk",
        forms: {
            present: { "1s": "camino", "2s": "caminas", "3s": "camina", "1p": "caminamos", "2p": "camináis", "3p": "caminan" },
            future: { "1s": "caminaré", "2s": "caminarás", "3s": "caminará", "1p": "caminaremos", "2p": "caminaréis", "3p": "caminarán" },
            imperfect: { "1s": "caminaba", "2s": "caminabas", "3s": "caminaba", "1p": "caminábamos", "2p": "caminabais", "3p": "caminaban" },
            past_perfect: { "1s": "había caminado", "2s": "habías caminado", "3s": "había caminado", "1p": "habíamos caminado", "2p": "habíais caminado", "3p": "habían caminado" },
        },
        sentences: {
            present: [{ person: "3p", template: "Los turistas {verb} por la ciudad todo el día.", translation: "The tourists walk around the city all day." }],
            future: [{ person: "1s", template: "Mañana {verb} por la playa.", translation: "Tomorrow I will walk along the beach." }],
            imperfect: [{ person: "2s", template: "De niño tú siempre {verb} descalzo.", translation: "As a child you always used to walk barefoot." }],
            past_perfect: [{ person: "1p", template: "Antes de parar, nosotros ya {verb} durante horas.", translation: "Before stopping, we had already been walking for hours." }],
        },
    },
    {
        infinitive: "correr",
        english: "to run",
        forms: {
            present: { "1s": "corro", "2s": "corres", "3s": "corre", "1p": "corremos", "2p": "corréis", "3p": "corren" },
            future: { "1s": "correré", "2s": "correrás", "3s": "correrá", "1p": "correremos", "2p": "correréis", "3p": "correrán" },
            imperfect: { "1s": "corría", "2s": "corrías", "3s": "corría", "1p": "corríamos", "2p": "corríais", "3p": "corrían" },
            past_perfect: { "1s": "había corrido", "2s": "habías corrido", "3s": "había corrido", "1p": "habíamos corrido", "2p": "habíais corrido", "3p": "habían corrido" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marcos {verb} en el parque cada mañana.", translation: "Marco runs in the park every morning." }],
            future: [{ person: "2p", template: "Mañana vosotros {verb} el maratón.", translation: "Tomorrow you (pl.) will run the marathon." }],
            imperfect: [{ person: "3s", template: "De joven él {verb} durante horas sin parar.", translation: "As a young man he used to run for hours without stopping." }],
            past_perfect: [{ person: "1s", template: "Cuando llegué, yo ya {verb} cinco kilómetros.", translation: "When I arrived, I had already run five kilometers." }],
        },
    },
    {
        infinitive: "viajar",
        english: "to travel",
        forms: {
            present: { "1s": "viajo", "2s": "viajas", "3s": "viaja", "1p": "viajamos", "2p": "viajáis", "3p": "viajan" },
            future: { "1s": "viajaré", "2s": "viajarás", "3s": "viajará", "1p": "viajaremos", "2p": "viajaréis", "3p": "viajarán" },
            imperfect: { "1s": "viajaba", "2s": "viajabas", "3s": "viajaba", "1p": "viajábamos", "2p": "viajabais", "3p": "viajaban" },
            past_perfect: { "1s": "había viajado", "2s": "habías viajado", "3s": "había viajado", "1p": "habíamos viajado", "2p": "habíais viajado", "3p": "habían viajado" },
        },
        sentences: {
            present: [{ person: "1p", template: "Nosotros {verb} por Europa cada verano.", translation: "We travel around Europe every summer." }],
            future: [{ person: "3s", template: "El próximo año ella {verb} por Asia.", translation: "Next year she will travel to Asia." }],
            imperfect: [{ person: "3p", template: "De jóvenes {verb} a menudo solos.", translation: "When they were young they often used to travel alone." }],
            past_perfect: [{ person: "2s", template: "Antes de establecerte aquí, tú ya {verb} mucho.", translation: "Before settling here, you had already traveled a lot." }],
        },
    },
    {
        infinitive: "cantar",
        english: "to sing",
        forms: {
            present: { "1s": "canto", "2s": "cantas", "3s": "canta", "1p": "cantamos", "2p": "cantáis", "3p": "cantan" },
            future: { "1s": "cantaré", "2s": "cantarás", "3s": "cantará", "1p": "cantaremos", "2p": "cantaréis", "3p": "cantarán" },
            imperfect: { "1s": "cantaba", "2s": "cantabas", "3s": "cantaba", "1p": "cantábamos", "2p": "cantabais", "3p": "cantaban" },
            past_perfect: { "1s": "había cantado", "2s": "habías cantado", "3s": "había cantado", "1p": "habíamos cantado", "2p": "habíais cantado", "3p": "habían cantado" },
        },
        sentences: {
            present: [{ person: "3s", template: "María {verb} cada mañana en la ducha.", translation: "Maria sings every morning in the shower." }],
            future: [{ person: "1s", template: "Mañana {verb} en el concierto de la escuela.", translation: "Tomorrow I will sing at the school concert." }],
            imperfect: [{ person: "1p", template: "De niños siempre {verb} en el coro.", translation: "As children we always used to sing in the choir." }],
            past_perfect: [{ person: "3p", template: "Antes del final del espectáculo, ellos ya {verb} tres canciones.", translation: "Before the end of the show, they had already sung three songs." }],
        },
    },
    {
        infinitive: "ayudar",
        english: "to help",
        forms: {
            present: { "1s": "ayudo", "2s": "ayudas", "3s": "ayuda", "1p": "ayudamos", "2p": "ayudáis", "3p": "ayudan" },
            future: { "1s": "ayudaré", "2s": "ayudarás", "3s": "ayudará", "1p": "ayudaremos", "2p": "ayudaréis", "3p": "ayudarán" },
            imperfect: { "1s": "ayudaba", "2s": "ayudabas", "3s": "ayudaba", "1p": "ayudábamos", "2p": "ayudabais", "3p": "ayudaban" },
            past_perfect: { "1s": "había ayudado", "2s": "habías ayudado", "3s": "había ayudado", "1p": "habíamos ayudado", "2p": "habíais ayudado", "3p": "habían ayudado" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} a mi hermano con la tarea.", translation: "I help my brother with homework." }],
            future: [{ person: "3s", template: "Mañana ella {verb} a los nuevos estudiantes.", translation: "Tomorrow she will help the new students." }],
            imperfect: [{ person: "2p", template: "De jóvenes vosotros siempre {verb} a los vecinos.", translation: "When you (pl.) were young you always used to help the neighbors." }],
            past_perfect: [{ person: "1p", template: "Antes de la carrera, nosotros ya {verb} a muchos atletas.", translation: "Before the race, we had already helped many athletes." }],
        },
    },
    {
        infinitive: "amar",
        english: "to love",
        forms: {
            present: { "1s": "amo", "2s": "amas", "3s": "ama", "1p": "amamos", "2p": "amáis", "3p": "aman" },
            future: { "1s": "amaré", "2s": "amarás", "3s": "amará", "1p": "amaremos", "2p": "amaréis", "3p": "amarán" },
            imperfect: { "1s": "amaba", "2s": "amabas", "3s": "amaba", "1p": "amábamos", "2p": "amabais", "3p": "amaban" },
            past_perfect: { "1s": "había amado", "2s": "habías amado", "3s": "había amado", "1p": "habíamos amado", "2p": "habíais amado", "3p": "habían amado" },
        },
        sentences: {
            present: [{ person: "3s", template: "Marcos {verb} a su familia sobre todo.", translation: "Marco loves his family above all else." }],
            future: [{ person: "1s", template: "Para siempre {verb} esta ciudad.", translation: "I will love this city forever." }],
            imperfect: [{ person: "3p", template: "De jóvenes {verb} mucho su tierra natal.", translation: "When they were young they loved their homeland very much." }],
            past_perfect: [{ person: "1p", template: "Antes de conocerlo, nosotros ya {verb} ese lugar.", translation: "Before knowing him, we had already loved that place." }],
        },
    },
    {
        infinitive: "olvidar",
        english: "to forget",
        forms: {
            present: { "1s": "olvido", "2s": "olvidas", "3s": "olvida", "1p": "olvidamos", "2p": "olvidáis", "3p": "olvidan" },
            future: { "1s": "olvidaré", "2s": "olvidarás", "3s": "olvidará", "1p": "olvidaremos", "2p": "olvidaréis", "3p": "olvidarán" },
            imperfect: { "1s": "olvidaba", "2s": "olvidabas", "3s": "olvidaba", "1p": "olvidábamos", "2p": "olvidabais", "3p": "olvidaban" },
            past_perfect: { "1s": "había olvidado", "2s": "habías olvidado", "3s": "había olvidado", "1p": "habíamos olvidado", "2p": "habíais olvidado", "3p": "habían olvidado" },
        },
        sentences: {
            present: [{ person: "1s", template: "Yo {verb} a menudo las llaves de casa.", translation: "I often forget my house keys." }],
            future: [{ person: "3s", template: "Él nunca {verb} ese día.", translation: "He will never forget that day." }],
            imperfect: [{ person: "2p", template: "De niños vosotros siempre {verb} los deberes.", translation: "As children you (pl.) always used to forget your homework." }],
            past_perfect: [{ person: "3p", template: "Antes del final del viaje, ellos ya {verb} el problema.", translation: "Before the end of the trip, they had already forgotten the problem." }],
        },
    },
    {
        infinitive: "empezar",
        english: "to begin",
        forms: {
            present: { "1s": "empiezo", "2s": "empiezas", "3s": "empieza", "1p": "empezamos", "2p": "empezáis", "3p": "empiezan" },
            future: { "1s": "empezaré", "2s": "empezarás", "3s": "empezará", "1p": "empezaremos", "2p": "empezaréis", "3p": "empezarán" },
            imperfect: { "1s": "empezaba", "2s": "empezabas", "3s": "empezaba", "1p": "empezábamos", "2p": "empezabais", "3p": "empezaban" },
            past_perfect: { "1s": "había empezado", "2s": "habías empezado", "3s": "había empezado", "1p": "habíamos empezado", "2p": "habíais empezado", "3p": "habían empezado" },
        },
        sentences: {
            present: [{ person: "3s", template: "La película {verb} a las nueve de la noche.", translation: "The movie begins at nine in the evening." }],
            future: [{ person: "1p", template: "Mañana {verb} un nuevo proyecto.", translation: "Tomorrow we will begin a new project." }],
            imperfect: [{ person: "3p", template: "Cada día {verb} a trabajar temprano.", translation: "Every day they used to begin working early." }],
            past_perfect: [{ person: "1s", template: "Cuando llegué, yo ya {verb} el trabajo.", translation: "When I arrived, I had already begun the work." }],
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
