// Quiz 97 - ZT-2: Imperativ bilden
// Формат: F10 - Построение формы
// Задание: Schreiben Sie die Sätze im Imperativ!

// Beispiel: Paul soll die Hausübung machen. → Sein Vater sagt: "Mach die Hausübung!"
export const quizExample = {
  question: "Paul soll die Hausübung machen.",
  answer: 'Sein Vater sagt: „<u>Mach die Hausübung</u>!"'
};

export default [
  {
    id: "zt2-97-1",
    quiz_id: 97,
    question_text: "• Herr Gruber soll nicht so viel rauchen.",
    question_context: 'Die Ärztin sagt: „_____!"',
    question_hint: "Schreiben Sie im Imperativ!",
    format: "F10",
    options: ["Rauchen", "Sie", "nicht", "so", "viel"],
    extra_words: ["raucht", "rauche", "mehr", "weniger", "bitte", "doch", "mal"],
    correct_answer: "Rauchen Sie nicht so viel",
    correct_answers: [
      "Rauchen Sie nicht so viel",
      "Rauchen Sie bitte nicht so viel"
    ]
  },
  {
    id: "zt2-97-2",
    quiz_id: 97,
    question_text: "• Paul soll den Fernseher ausschalten.",
    question_context: 'Sein Bruder sagt: „_____!"',
    question_hint: "Schreiben Sie im Imperativ!",
    format: "F10",
    options: ["Schalt", "den", "Fernseher", "aus"],
    extra_words: ["schalte", "schalten", "ein", "TV", "Gerät", "bitte", "mal", "ab"],
    correct_answer: "Schalt den Fernseher aus",
    correct_answers: [
      "Schalt den Fernseher aus",
      "Schalte den Fernseher aus"
    ]
  },
  {
    id: "zt2-97-3",
    quiz_id: 97,
    question_text: "• Paul und Pia sollen einkaufen gehen.",
    question_context: 'Ihr Vater sagt: „_____!"',
    question_hint: "Schreiben Sie im Imperativ!",
    format: "F10",
    options: ["Geht", "einkaufen"],
    extra_words: ["gehen", "kauft", "kaufen", "ein", "bitte", "mal", "jetzt", "schnell"],
    correct_answer: "Geht einkaufen",
    correct_answers: [
      "Geht einkaufen",
      "Geht bitte einkaufen"
    ]
  },
];
