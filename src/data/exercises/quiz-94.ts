// Quiz 94 - ZT-2: Präpositionen und Artikel einsetzen
// Формат: F4 - Вставить слова из списка в пропуски
// Задание: Setzen Sie passende Präpositionen und Artikel (wenn nötig) ein!
// Это одна история с 9 пробелами

// Beispiel: Ich fahre zu der ODER zur Universität. Ich gehe in meinen Kurs.
export const quizExample = {
  question: "Ich fahre _____ _____ Universität. Ich gehe _____ meinen Kurs.",
  answer: "Ich fahre <u>zu der</u> ODER <u>zur</u> Universität. Ich gehe <u>in</u> meinen Kurs."
};

export default [
  {
    id: "zt2-94-1",
    quiz_id: 94,
    question_text: "Heute mache ich zusammen _____ _____ Freund ein Abendessen. Wir treffen uns _____ _____ Wohnung von Mario in der Nähe _____ Rathaus. Das Essen beginnt um 20 Uhr. _____ _____ Essen, um 19:30 Uhr, kommt Maria, um uns zu helfen. Sie bringt frische Tomaten _____ _____ Garten mit.",
    question_hint: "Setzen Sie passende Präpositionen und Artikel (wenn nötig) ein!",
    format: "F4",
    options: ["mit", "meinem", "in", "der", "des", "Vor", "dem", "aus", "dem"],
    extra_words: [
      // Präpositionen
      "zu", "bei", "nach", "von", "für", "über", "unter", "zwischen", "neben", "an", "auf", "hinter", "vor", "gegen", "ohne", "durch", "um", "bis", "seit", "während", "wegen", "trotz",
      // Artikel und Formen
      "die", "das", "den", "einer", "eines", "einem", "einen", "meine", "meiner", "meinen", "sein", "seine", "seinem", "seinen", "ihr", "ihre", "ihrem", "ihren", "unser", "unsere", "unserem", "unseren",
      // Kontraktionen
      "im", "am", "zum", "zur", "vom", "beim", "ins", "ans", "aufs"
    ],
    correct_answer: "mit meinem in der des Vor dem aus dem",
  },
];
