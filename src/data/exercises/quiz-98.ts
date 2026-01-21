// Quiz 98 - ZT-2: Imperativ bilden
// Формат: F10 - Sätze bilden
// Задание: Schreiben Sie die Sätze im Imperativ!

// Beispiel: Paul soll die Hausübung machen. → Sein Vater sagt: "Mach die Hausübung!"
export const quizExample = {
  situation: "Paul soll die Hausübung machen.",
  speaker: "Sein Vater sagt:",
  solution: '"Mach die Hausübung!"'
};

export default [
  {
    id: "zt2-98-1",
    quiz_id: 98,
    question_text: "Herr Gruber soll nicht so viel rauchen. Die Ärztin sagt: ...",
    question_hint: "Schreiben Sie im Imperativ (Sie-Form)!",
    format: "F10",
    options: ["Rauchen", "Sie", "nicht", "so", "viel", "!"],
    extra_words: ["du", "ihr", "rauch", "rauche", "sollst", "muss", "bitte"],
    correct_answer: "Rauchen Sie nicht so viel!",
    correct_answers: ["Rauchen Sie nicht so viel!", "Rauchen Sie bitte nicht so viel!"],
  },
  {
    id: "zt2-98-2",
    quiz_id: 98,
    question_text: "Paul soll den Fernseher ausschalten. Sein Bruder sagt: ...",
    question_hint: "Schreiben Sie im Imperativ (du-Form)!",
    format: "F10",
    options: ["Schalt", "den", "Fernseher", "aus", "!"],
    extra_words: ["du", "Sie", "schalte", "schalten", "sollst", "muss", "bitte"],
    correct_answer: "Schalt den Fernseher aus!",
    correct_answers: ["Schalt den Fernseher aus!", "Schalte den Fernseher aus!"],
  },
  {
    id: "zt2-98-3",
    quiz_id: 98,
    question_text: "Paul und Pia sollen einkaufen gehen. Ihr Vater sagt: ...",
    question_hint: "Schreiben Sie im Imperativ (ihr-Form)!",
    format: "F10",
    options: ["Geht", "einkaufen", "!"],
    extra_words: ["du", "Sie", "ihr", "geh", "gehen", "sollst", "müsst", "bitte"],
    correct_answer: "Geht einkaufen!",
    correct_answers: ["Geht einkaufen!", "Geht bitte einkaufen!"],
  },
];
