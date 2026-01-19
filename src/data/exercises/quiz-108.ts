// ========================================
// УПРАЖНЕНИЕ 108: Hauptsatz + Nebensatz kombinieren
// Формат: F10 - Составление предложений с придаточными
// ========================================
// 
// ИНСТРУКЦИЯ ДЛЯ ДОБАВЛЕНИЯ ВОПРОСОВ:
// 1. Каждый вопрос должен иметь уникальный id (формат: "zt3-108-N")
// 2. quiz_id всегда = 108
// 3. format всегда = "F10"
// 4. question_text - начало предложения (Hauptsatz)
// 5. options - слова для продолжения предложения
// 6. extra_words - дополнительные слова (включая союзы: wenn, weil, ob, dass, warum)
// 7. correct_answers - массив всех правильных вариантов (минимум 3)
// 
// ВАЖНО: Слов должно быть достаточно для составления предложения с ЛЮБЫМ из 5 союзов!
// ========================================

export interface Quiz108Question {
  id: string;
  quiz_id: 108;
  question_text: string;
  question_hint?: string;
  format: 'F10';
  options: string[];
  extra_words: string[];
  correct_answer: string;
  correct_answers: string[]; // Все правильные варианты
}

export const quiz108Questions: Quiz108Question[] = [
  {
    id: "zt3-108-1",
    quiz_id: 108,
    question_text: "Ich bleibe zu Hause, ...",
    format: "F10",
    options: ["weil", "ich", "krank", "bin"],
    extra_words: [
      // Союзы
      "wenn", "dass", "ob", "warum",
      // Глаголы
      "ist", "bist", "sind", "war", "habe", "hat",
      // Местоимения
      "er", "sie", "du", "wir", "es",
      // Прилагательные
      "müde", "gesund", "traurig",
      // Другие слова
      "heute", "morgen", "nicht", "sehr"
    ],
    correct_answer: "weil ich krank bin",
    correct_answers: [
      "weil ich krank bin",
      "weil ich müde bin",
      "weil ich traurig bin",
      "wenn ich krank bin",
      "wenn ich müde bin",
      "ob ich krank bin",
      "dass ich krank bin"
    ]
  },
  {
    id: "zt3-108-2",
    quiz_id: 108,
    question_text: "Er weiß, ...",
    format: "F10",
    options: ["dass", "sie", "morgen", "kommt"],
    extra_words: [
      // Союзы
      "weil", "wenn", "ob", "warum",
      // Глаголы
      "kommen", "kommst", "kam", "geht", "arbeitet", "bleibt",
      // Местоимения
      "er", "wir", "ich", "du", "es",
      // Наречия
      "heute", "später", "nicht", "immer", "bald",
      // Другие
      "nach", "Hause", "hier"
    ],
    correct_answer: "dass sie morgen kommt",
    correct_answers: [
      "dass sie morgen kommt",
      "dass sie heute kommt",
      "dass sie später kommt",
      "ob sie morgen kommt",
      "ob sie heute kommt",
      "wann sie morgen kommt",
      "warum sie morgen kommt"
    ]
  },
  {
    id: "zt3-108-3",
    quiz_id: 108,
    question_text: "Ich frage mich, ...",
    format: "F10",
    options: ["ob", "das", "richtig", "ist"],
    extra_words: [
      // Союзы
      "weil", "wenn", "dass", "warum",
      // Глаголы
      "war", "sind", "bist", "funktioniert", "klappt", "stimmt",
      // Прилагательные
      "falsch", "gut", "wichtig", "möglich", "wahr",
      // Местоимения
      "er", "sie", "es", "wir",
      // Другие
      "wirklich", "heute", "noch", "so"
    ],
    correct_answer: "ob das richtig ist",
    correct_answers: [
      "ob das richtig ist",
      "ob das wahr ist",
      "ob das wichtig ist",
      "ob das möglich ist",
      "warum das richtig ist",
      "warum das wichtig ist",
      "dass das richtig ist"
    ]
  },
  {
    id: "zt3-108-4",
    quiz_id: 108,
    question_text: "Sie lernt Deutsch, ...",
    format: "F10",
    options: ["weil", "sie", "in", "Deutschland", "arbeiten", "will"],
    extra_words: [
      // Союзы
      "wenn", "dass", "ob", "warum",
      // Глаголы
      "möchte", "kann", "muss", "soll", "wohnen", "leben", "studieren",
      // Местоимения
      "er", "ich", "wir", "du",
      // Наречия
      "gern", "bald", "später", "dort",
      // Существительные
      "Österreich", "Wien", "Berlin"
    ],
    correct_answer: "weil sie in Deutschland arbeiten will",
    correct_answers: [
      "weil sie in Deutschland arbeiten will",
      "weil sie in Deutschland wohnen will",
      "weil sie in Deutschland leben will",
      "weil sie in Deutschland studieren will",
      "wenn sie in Deutschland arbeiten will",
      "ob sie in Deutschland arbeiten will",
      "dass sie in Deutschland arbeiten will"
    ]
  },
  {
    id: "zt3-108-5",
    quiz_id: 108,
    question_text: "Wir gehen spazieren, ...",
    format: "F10",
    options: ["wenn", "das", "Wetter", "schön", "ist"],
    extra_words: [
      // Союзы
      "weil", "dass", "ob", "warum",
      // Глаголы
      "war", "wird", "bleibt", "scheint",
      // Прилагательные
      "gut", "warm", "sonnig", "kalt", "regnerisch",
      // Существительные
      "die", "Sonne", "der", "Tag",
      // Местоимения
      "es", "er",
      // Другие
      "heute", "morgen", "draußen"
    ],
    correct_answer: "wenn das Wetter schön ist",
    correct_answers: [
      "wenn das Wetter schön ist",
      "wenn das Wetter gut ist",
      "wenn das Wetter warm ist",
      "wenn die Sonne scheint",
      "weil das Wetter schön ist",
      "weil das Wetter gut ist",
      "ob das Wetter schön ist"
    ]
  },
  {
    id: "zt3-108-6",
    quiz_id: 108,
    question_text: "Er ist müde, ...",
    format: "F10",
    options: ["weil", "er", "nicht", "geschlafen", "hat"],
    extra_words: [
      // Союзы
      "wenn", "dass", "ob", "warum",
      // Глаголы
      "schläft", "schlafe", "habe", "arbeitet", "gearbeitet", "gelaufen", "ist",
      // Наречия
      "gut", "lange", "viel", "wenig", "genug", "heute", "gestern",
      // Местоимения
      "sie", "ich", "wir",
      // Другие
      "zu", "sehr"
    ],
    correct_answer: "weil er nicht geschlafen hat",
    correct_answers: [
      "weil er nicht geschlafen hat",
      "weil er nicht gut geschlafen hat",
      "weil er viel gearbeitet hat",
      "weil er lange gearbeitet hat",
      "wenn er nicht geschlafen hat",
      "ob er gut geschlafen hat",
      "dass er nicht geschlafen hat"
    ]
  },
  {
    id: "zt3-108-7",
    quiz_id: 108,
    question_text: "Ich freue mich, ...",
    format: "F10",
    options: ["dass", "du", "kommst"],
    extra_words: [
      // Союзы
      "weil", "wenn", "ob", "warum",
      // Глаголы
      "kommt", "kommen", "besuchst", "besucht", "anrufst", "schreibst", "hilfst", "bist", "da",
      // Местоимения
      "er", "sie", "ihr", "wir",
      // Наречия
      "heute", "morgen", "bald", "endlich", "wieder",
      // Другие
      "mich", "uns", "hier"
    ],
    correct_answer: "dass du kommst",
    correct_answers: [
      "dass du kommst",
      "dass du da bist",
      "dass du mich besuchst",
      "weil du kommst",
      "weil du da bist",
      "wenn du kommst",
      "ob du kommst"
    ]
  },
  {
    id: "zt3-108-8",
    quiz_id: 108,
    question_text: "Sie sagt, ...",
    format: "F10",
    options: ["dass", "sie", "später", "kommt"],
    extra_words: [
      // Союзы
      "weil", "wenn", "ob", "warum",
      // Глаголы
      "kommen", "kam", "geht", "arbeitet", "bleibt", "kann", "muss", "will",
      // Наречия
      "heute", "morgen", "nicht", "bald", "gleich", "jetzt",
      // Местоимения
      "er", "ich", "wir", "du",
      // Другие
      "nach", "Hause", "zur", "Arbeit"
    ],
    correct_answer: "dass sie später kommt",
    correct_answers: [
      "dass sie später kommt",
      "dass sie morgen kommt",
      "dass sie nicht kommen kann",
      "dass sie zur Arbeit geht",
      "ob sie später kommt",
      "warum sie später kommt",
      "weil sie arbeiten muss"
    ]
  },
  {
    id: "zt3-108-9",
    quiz_id: 108,
    question_text: "Ich weiß nicht, ...",
    format: "F10",
    options: ["warum", "er", "nicht", "antwortet"],
    extra_words: [
      // Союзы
      "weil", "wenn", "dass", "ob",
      // Глаголы
      "antworten", "kommt", "kam", "schreibt", "anruft", "reagiert", "spricht",
      // Наречия
      "heute", "immer", "nie", "mehr", "noch",
      // Местоимения
      "sie", "du", "wir", "ich",
      // Другие
      "mir", "uns", "auf", "die", "Nachricht"
    ],
    correct_answer: "warum er nicht antwortet",
    correct_answers: [
      "warum er nicht antwortet",
      "warum er nicht kommt",
      "warum er nicht schreibt",
      "ob er kommt",
      "ob er antwortet",
      "dass er nicht antwortet",
      "weil er nicht antwortet"
    ]
  },
  {
    id: "zt3-108-10",
    quiz_id: 108,
    question_text: "Du sollst anrufen, ...",
    format: "F10",
    options: ["wenn", "du", "Zeit", "hast"],
    extra_words: [
      // Союзы
      "weil", "dass", "ob", "warum",
      // Глаголы
      "haben", "hatte", "hattest", "kommst", "kannst", "willst", "bist", "fertig",
      // Наречия
      "heute", "morgen", "später", "bald", "wieder", "endlich",
      // Местоимения
      "er", "sie", "ich", "wir",
      // Другие
      "zu", "Hause", "frei", "da"
    ],
    correct_answer: "wenn du Zeit hast",
    correct_answers: [
      "wenn du Zeit hast",
      "wenn du zu Hause bist",
      "wenn du fertig bist",
      "wenn du kannst",
      "weil du Zeit hast",
      "ob du Zeit hast",
      "dass du Zeit hast"
    ]
  },
];

export default quiz108Questions;
