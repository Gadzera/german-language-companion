// Quiz 94 - ZT-2: Präpositionen und Artikel einsetzen
// Формат: F4 - Вставить слова из списка в пропуски
// Задание: Setzen Sie passende Präpositionen und Artikel (wenn nötig) ein!

// Beispiel: Ich fahre zu der ODER zur Universität. Ich gehe in meinen Kurs.
export const quizExample = {
  question: "Ich fahre _____ _____ Universität. Ich gehe _____ meinen Kurs.",
  answer: "Ich fahre <u>zu der</u> ODER <u>zur</u> Universität. Ich gehe <u>in</u> meinen Kurs."
};

export default [
  {
    id: "zt2-94-1",
    quiz_id: 94,
    question_text: "Heute mache ich zusammen _____ _____ Freund ein Abendessen.",
    question_hint: "Setzen Sie Präposition + Artikel ein!",
    format: "F4",
    options: ["mit", "meinem"],
    extra_words: ["zu", "bei", "in", "der", "einem", "dem", "meine", "meiner"],
    correct_answer: "mit meinem",
  },
  {
    id: "zt2-94-2",
    quiz_id: 94,
    question_text: "Wir treffen uns _____ _____ Wohnung von Mario.",
    question_hint: "Setzen Sie Präposition + Artikel ein!",
    format: "F4",
    options: ["in", "der"],
    extra_words: ["bei", "zu", "mit", "dem", "einer", "meinem", "die", "das"],
    correct_answer: "in der",
  },
  {
    id: "zt2-94-3",
    quiz_id: 94,
    question_text: "Die Wohnung ist in der Nähe _____ Rathaus.",
    question_hint: "Setzen Sie Präposition + Artikel ein!",
    format: "F4",
    options: ["des"],
    extra_words: ["vom", "dem", "der", "zum", "im", "am", "beim"],
    correct_answer: "des",
    correct_answers: ["des", "vom"],
  },
  {
    id: "zt2-94-4",
    quiz_id: 94,
    question_text: "Das Essen beginnt um 20 Uhr. _____ _____ Essen, um 19:30 Uhr, kommt Maria.",
    question_hint: "Setzen Sie Präposition + Artikel ein!",
    format: "F4",
    options: ["Vor", "dem"],
    extra_words: ["Nach", "Bei", "Mit", "der", "das", "einen", "die"],
    correct_answer: "Vor dem",
  },
  {
    id: "zt2-94-5",
    quiz_id: 94,
    question_text: "Sie bringt frische Tomaten _____ _____ Garten mit.",
    question_hint: "Setzen Sie Präposition + Artikel ein!",
    format: "F4",
    options: ["aus", "dem"],
    extra_words: ["in", "von", "mit", "der", "einen", "im", "zum", "beim"],
    correct_answer: "aus dem",
  },
];
