// Paragraph practice mode: short passages with several blanks, drawing on
// multiple verbs and persons from the verb bank in ./verbs.ts.

import {
  VERBS,
  normalizeAnswer,
  type LanguageCode,
  type PersonCode,
  type TenseCode,
} from "@/lib/verbs";

export interface ParagraphBlank {
  infinitive: string;
  tense: TenseCode;
  person: PersonCode;
}

// Text uses {0}, {1}, ... placeholders, one per entry in `blanks`.
export interface ParagraphTemplate {
  title: string;
  text: string;
  blanks: ParagraphBlank[];
  translation: string;
}

export const PARAGRAPHS: Record<LanguageCode, ParagraphTemplate[]> = {
  it: [
    {
      title: "La giornata di Marco",
      text: "Marco {0} stanco oggi. Lui {1} con il suo capo al telefono. Dopo {2} finire un rapporto importante. Marco {3} che il lavoro non è facile. Ma lui {4} in se stesso.",
      blanks: [
        { infinitive: "essere", tense: "present", person: "3s" },
        { infinitive: "parlare", tense: "present", person: "3s" },
        { infinitive: "dovere", tense: "present", person: "3s" },
        { infinitive: "sapere", tense: "present", person: "3s" },
        { infinitive: "credere", tense: "present", person: "3s" },
      ],
      translation:
        "Marco is tired today. He speaks with his boss on the phone. Afterward he has to finish an important report. Marco knows the work isn't easy. But he believes in himself.",
    },
    {
      title: "L'infanzia di Maria",
      text: "Da bambina, Maria {0} sempre felice. Ogni giorno {1} con le sue amiche al parco. Non {2} ancora scrivere bene. Ma {3} sempre di diventare una scrittrice. I suoi genitori {4} molta pazienza con lei.",
      blanks: [
        { infinitive: "essere", tense: "imperfect", person: "3s" },
        { infinitive: "parlare", tense: "imperfect", person: "3s" },
        { infinitive: "sapere", tense: "imperfect", person: "3s" },
        { infinitive: "credere", tense: "imperfect", person: "3s" },
        { infinitive: "avere", tense: "imperfect", person: "3p" },
      ],
      translation:
        "As a little girl, Maria was always happy. Every day she talked with her friends at the park. She didn't yet know how to write well. But she always believed she'd become a writer. Her parents had a lot of patience with her.",
    },
  ],
  fr: [
    {
      title: "La journée de Marie",
      text: "Marie {0} très occupée aujourd'hui. Elle {1} avec son patron au téléphone. Après, elle {2} finir un rapport important. Marie {3} que le travail n'est pas facile. Elle {4} son collègue au bureau à midi.",
      blanks: [
        { infinitive: "être", tense: "present", person: "3s" },
        { infinitive: "parler", tense: "present", person: "3s" },
        { infinitive: "devoir", tense: "present", person: "3s" },
        { infinitive: "savoir", tense: "present", person: "3s" },
        { infinitive: "voir", tense: "present", person: "3s" },
      ],
      translation:
        "Marie is very busy today. She talks with her boss on the phone. Afterward, she has to finish an important report. Marie knows the work isn't easy. She sees her colleague at the office at noon.",
    },
    {
      title: "L'enfance de Marie",
      text: "Enfant, Marie {0} toujours heureuse. Chaque jour elle {1} avec ses amies au parc. Elle ne {2} pas encore bien écrire. Mais elle {3} toujours attendre son tour patiemment. Ses parents {4} beaucoup de patience avec elle.",
      blanks: [
        { infinitive: "être", tense: "imperfect", person: "3s" },
        { infinitive: "parler", tense: "imperfect", person: "3s" },
        { infinitive: "savoir", tense: "imperfect", person: "3s" },
        { infinitive: "pouvoir", tense: "imperfect", person: "3s" },
        { infinitive: "avoir", tense: "imperfect", person: "3p" },
      ],
      translation:
        "As a child, Marie was always happy. Every day she talked with her friends at the park. She didn't yet know how to write well. But she could always wait her turn patiently. Her parents had a lot of patience with her.",
    },
  ],
  es: [
    {
      title: "El día de María",
      text: "María {0} muy ocupada hoy. Ella {1} con su jefe por teléfono. Después {2} terminar un informe importante. María {3} que el trabajo no es fácil. Ella {4} a su colega en la oficina al mediodía.",
      blanks: [
        { infinitive: "ser", tense: "present", person: "3s" },
        { infinitive: "hablar", tense: "present", person: "3s" },
        { infinitive: "deber", tense: "present", person: "3s" },
        { infinitive: "saber", tense: "present", person: "3s" },
        { infinitive: "ver", tense: "present", person: "3s" },
      ],
      translation:
        "Maria is very busy today. She talks with her boss on the phone. Afterward she has to finish an important report. Maria knows the work isn't easy. She sees her colleague at the office at noon.",
    },
    {
      title: "La infancia de María",
      text: "De niña, María {0} siempre feliz. Cada día {1} con sus amigas en el parque. Todavía no {2} escribir bien. Pero {3} esperar su turno con paciencia. Sus padres {4} mucha paciencia con ella.",
      blanks: [
        { infinitive: "ser", tense: "imperfect", person: "3s" },
        { infinitive: "hablar", tense: "imperfect", person: "3s" },
        { infinitive: "saber", tense: "imperfect", person: "3s" },
        { infinitive: "poder", tense: "imperfect", person: "3s" },
        { infinitive: "tener", tense: "imperfect", person: "3p" },
      ],
      translation:
        "As a little girl, Maria was always happy. Every day she talked with her friends at the park. She still didn't know how to write well. But she could wait her turn patiently. Her parents had a lot of patience with her.",
    },
  ],
};

export interface ParagraphExercise {
  language: LanguageCode;
  template: ParagraphTemplate;
  // Text split around the placeholders; length is always blanks.length + 1.
  segments: string[];
  answers: string[];
  accepted: string[][];
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function splitOnPlaceholders(text: string, count: number): string[] {
  const segments: string[] = [];
  let rest = text;
  for (let i = 0; i < count; i++) {
    const marker = `{${i}}`;
    const idx = rest.indexOf(marker);
    segments.push(rest.slice(0, idx));
    rest = rest.slice(idx + marker.length);
  }
  segments.push(rest);
  return segments;
}

export function generateParagraphExercise(
  language: LanguageCode,
  tenses: TenseCode[],
): ParagraphExercise {
  const all = PARAGRAPHS[language];
  const matching = all.filter((t) =>
    t.blanks.every((b) => tenses.includes(b.tense)),
  );
  const template = pick(matching.length > 0 ? matching : all);

  const verbEntries = VERBS[language];
  const answers = template.blanks.map((b) => {
    const verb = verbEntries.find((v) => v.infinitive === b.infinitive)!;
    return verb.forms[b.tense][b.person];
  });

  return {
    language,
    template,
    segments: splitOnPlaceholders(template.text, template.blanks.length),
    answers,
    accepted: answers.map((a) => [normalizeAnswer(a)]),
  };
}

export function checkParagraphBlank(
  exercise: ParagraphExercise,
  index: number,
  input: string,
): boolean {
  return exercise.accepted[index].includes(normalizeAnswer(input));
}
