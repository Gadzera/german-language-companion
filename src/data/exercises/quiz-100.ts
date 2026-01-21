// Quiz 100 - ZT-2: Wort passt nicht (Wortschatz)
// Формат: F9 - Wort passt nicht
// Задание: Welches Wort passt nicht in die Reihe? Streichen Sie es durch!

// Beispiel: die Ärztin – das Taxi – die Operation – das Krankenhaus → das Taxi (passt nicht)
export const quizExample = {
  words: ["die Ärztin", "das Taxi", "die Operation", "das Krankenhaus"],
  wrongWord: "das Taxi"
};

export default [
  {
    id: "zt2-100-1",
    quiz_id: 100,
    question_text: "Welches Wort passt nicht?",
    question_hint: "Streichen Sie das Wort durch, das nicht passt!",
    format: "F9",
    options: ["reden", "erledigen", "sprechen", "sich unterhalten"],
    correct_answer: "erledigen",
  },
  {
    id: "zt2-100-2",
    quiz_id: 100,
    question_text: "Welches Wort passt nicht?",
    question_hint: "Streichen Sie das Wort durch, das nicht passt!",
    format: "F9",
    options: ["der Chor", "der Sänger", "die Oper", "das Museum"],
    correct_answer: "das Museum",
  },
  {
    id: "zt2-100-3",
    quiz_id: 100,
    question_text: "Welches Wort passt nicht?",
    question_hint: "Streichen Sie das Wort durch, das nicht passt!",
    format: "F9",
    options: ["backen", "putzen", "braten", "kochen"],
    correct_answer: "putzen",
  },
  {
    id: "zt2-100-4",
    quiz_id: 100,
    question_text: "Welches Wort passt nicht?",
    question_hint: "Streichen Sie das Wort durch, das nicht passt!",
    format: "F9",
    options: ["nett", "gierig", "höflich", "freundlich"],
    correct_answer: "gierig",
  },
];
