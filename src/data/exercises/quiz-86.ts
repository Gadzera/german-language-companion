// Quiz 86 - ZT-1: Fragen mit Fragepronomen bilden
// Формат: F10 - Построение предложений из слов
// Задание: Bilden Sie Fragen mit Fragepronomen!

// Beispiel показывается в UI отдельно
// Подчёркнутый текст в question_text обозначается через <u>...</u>
export const quizExample = {
  context: "Julia kommt <u>aus Linz</u>. Und du?",
  solution: "Woher kommst du?",
  highlight: "aus Linz" // Подчёркнутая часть - на что обращать внимание
};

export default [
  {
    id: "zt1-86-1",
    quiz_id: 86,
    question_text: "Maria studiert <u>seit einem Jahr</u> in Wien. Und du?",
    question_hint: "",
    format: "F10",
    options: ["Seit", "wann", "studierst", "du", "in", "Wien", "?"],
    extra_words: ["was", "wo", "woher", "ich", "wir", "sind", "haben", "bist"],
    correct_answer: "Seit wann studierst du in Wien?",
    correct_answers: ["Seit wann studierst du in Wien?", "Wie lange studierst du in Wien?"],
  },
  {
    id: "zt1-86-2",
    quiz_id: 86,
    question_text: "Josef arbeitet <u>als Mechaniker</u>. Und du?",
    question_hint: "",
    format: "F10",
    options: ["Als", "was", "arbeitest", "du", "?"],
    extra_words: ["wie", "wo", "wer", "ich", "wir", "bin", "ist", "haben"],
    correct_answer: "Als was arbeitest du?",
    correct_answers: ["Als was arbeitest du?", "Was arbeitest du?"],
  },
  {
    id: "zt1-86-3",
    quiz_id: 86,
    question_text: "Marios Telefonnummer ist <u>01 567 39 91</u>. Und deine?",
    question_hint: "",
    format: "F10",
    options: ["Wie", "ist", "deine", "Telefonnummer", "?"],
    extra_words: ["was", "wo", "wer", "meine", "seine", "haben", "bist"],
    correct_answer: "Wie ist deine Telefonnummer?",
  },
  {
    id: "zt1-86-4",
    quiz_id: 86,
    question_text: "Sandra mag gern <u>Wiener Schnitzel</u>. Und du?",
    question_hint: "",
    format: "F10",
    options: ["Was", "magst", "du", "gern", "?"],
    extra_words: ["wie", "wo", "wer", "ich", "sie", "ist", "haben", "isst"],
    correct_answer: "Was magst du gern?",
  },
  {
    id: "zt1-86-5",
    quiz_id: 86,
    question_text: "Anna geht es heute <u>nicht so gut</u>. Und dir?",
    question_hint: "",
    format: "F10",
    options: ["Wie", "geht", "es", "dir", "?"],
    extra_words: ["was", "wo", "wer", "mir", "ihm", "ist", "haben", "bist"],
    correct_answer: "Wie geht es dir?",
  },
];
