// Quiz 87 - ZT-1: Negation (nicht/kein)
// Формат: F10 - Построение отрицательных предложений
// Задание: Schreiben Sie eine negative Antwort zu den Sätzen!

// Beispiel: Spielst du gern Fußball? → Nein, ich spiele nicht gern Fußball.
export const quizExample = {
  question: "Spielst du gern Fußball?",
  answer: "Nein, ich spiele nicht gern Fußball."
};

export default [
  {
    id: "zt1-87-1",
    quiz_id: 87,
    question_text: "Hast du ein Haustier? Nein, ...",
    question_hint: "Schreiben Sie eine negative Antwort!",
    format: "F10",
    options: ["ich", "habe", "kein", "Haustier"],
    extra_words: ["nicht", "keine", "keinen", "hat", "bin", "mein", "dein", "ein"],
    correct_answer: "ich habe kein Haustier",
    correct_answers: ["ich habe kein Haustier"],
  },
  {
    id: "zt1-87-2",
    quiz_id: 87,
    question_text: "Möchtest du noch ein Eis? Nein, ...",
    question_hint: "Schreiben Sie eine negative Antwort!",
    format: "F10",
    options: ["ich", "möchte", "kein", "Eis", "mehr"],
    extra_words: ["nicht", "keine", "keinen", "will", "mag", "noch", "ein"],
    correct_answer: "ich möchte kein Eis mehr",
    correct_answers: ["ich möchte kein Eis mehr", "ich möchte kein Eis", "ich will kein Eis mehr"],
  },
  {
    id: "zt1-87-3",
    quiz_id: 87,
    question_text: "Spielst du ein Instrument? Nein, ...",
    question_hint: "Schreiben Sie eine negative Antwort!",
    format: "F10",
    options: ["ich", "spiele", "kein", "Instrument"],
    extra_words: ["nicht", "keine", "keinen", "spielst", "hat", "mein", "dein", "ein"],
    correct_answer: "ich spiele kein Instrument",
    correct_answers: ["ich spiele kein Instrument"],
  },
  {
    id: "zt1-87-4",
    quiz_id: 87,
    question_text: "Hörst du gern Rockmusik? Nein, ...",
    question_hint: "Schreiben Sie eine negative Antwort!",
    format: "F10",
    options: ["ich", "höre", "nicht", "gern", "Rockmusik"],
    extra_words: ["kein", "keine", "keinen", "hörst", "mag", "meine", "deine"],
    correct_answer: "ich höre nicht gern Rockmusik",
    correct_answers: ["ich höre nicht gern Rockmusik"],
  },
];
