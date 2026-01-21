// Quiz 87 - ZT-1: Negation (nicht/kein)
// Формат: F3 - Выбор правильного варианта
// Задание: Schreiben Sie eine negative Antwort!

// Beispiel: Spielst du gern Fußball? Nein, ich spiele nicht gern Fußball.
export const quizExample = {
  question: "Spielst du gern Fußball?",
  answer: "Nein, ich spiele nicht gern Fußball."
};

export default [
  {
    id: "zt1-87-1",
    quiz_id: 87,
    question_text: "Hast du ein Haustier? Nein, ich habe _____ Haustier.",
    question_hint: "Wählen Sie: nicht oder kein(e)?",
    format: "F3",
    options: ["kein", "nicht", "keine", "keinen"],
    correct_answer: "kein",
  },
  {
    id: "zt1-87-2",
    quiz_id: 87,
    question_text: "Möchtest du noch ein Eis? Nein, ich möchte _____ Eis mehr.",
    question_hint: "Wählen Sie: nicht oder kein(e)?",
    format: "F3",
    options: ["kein", "nicht", "keine", "keinen"],
    correct_answer: "kein",
  },
  {
    id: "zt1-87-3",
    quiz_id: 87,
    question_text: "Spielst du ein Instrument? Nein, ich spiele _____ Instrument.",
    question_hint: "Wählen Sie: nicht oder kein(e)?",
    format: "F3",
    options: ["kein", "nicht", "keine", "keinen"],
    correct_answer: "kein",
  },
  {
    id: "zt1-87-4",
    quiz_id: 87,
    question_text: "Hörst du gern Rockmusik? Nein, ich höre _____ gern Rockmusik.",
    question_hint: "Wählen Sie: nicht oder kein(e)?",
    format: "F3",
    options: ["nicht", "kein", "keine", "keinen"],
    correct_answer: "nicht",
  },
];
