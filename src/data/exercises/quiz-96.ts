// Quiz 96 - ZT-2: Artikel im Dativ/Akkusativ (F4 формат - заполнение пробелов)
// Формат: F4 - Заполнение пропусков из большого списка артиклей
// Задание: Setzen Sie die fehlenden Artikel ein!

export const quizExample = {
  instruction: "Karin schenkt _____ Tante einen Blumenstrauß.",
  solution: "der (Dativ, feminin)"
};

// Большой список артиклей для выбора (40+ вариантов для сложности)
const allArticles = [
  // Bestimmte Artikel
  "der", "die", "das", "den", "dem", "des",
  // Unbestimmte Artikel
  "ein", "eine", "einen", "einem", "einer", "eines",
  // Possessivartikel
  "mein", "meine", "meinen", "meinem", "meiner", "meines",
  "dein", "deine", "deinen", "deinem", "deiner", "deines",
  "sein", "seine", "seinen", "seinem", "seiner", "seines",
  "ihr", "ihre", "ihren", "ihrem", "ihrer", "ihres",
  "unser", "unsere", "unseren", "unserem", "unserer", "unseres",
  "euer", "eure", "euren", "eurem", "eurer", "eures",
  // Negativartikel
  "kein", "keine", "keinen", "keinem", "keiner", "keines",
];

export default [
  {
    id: "zt2-96-1",
    quiz_id: 96,
    question_text: "• Karin hat ein nettes Geschenk für ihre Tante: Sie schenkt _____ Tante _____ Blumenstrauß.\n• Ich zeige _____ Lehrer _____ Buch.\n• Die Lehrerin erklärt _____ Schülern und Schülerinnen _____ Übung.",
    question_hint: "Setzen Sie die fehlenden Artikel ein! (6 Lücken)",
    format: "F4",
    options: ["der", "einen", "dem", "das", "den", "die"],
    extra_words: allArticles.filter(a => !["der", "einen", "dem", "das", "den", "die"].includes(a)),
    correct_answer: "der einen dem das den die",
  },
];
