// Quiz 95 - ZT-2: Reflexive Verben einsetzen
// Формат: F4 - Вставить слова из списка в пропуски
// Задание: Fügen Sie die angegebenen reflexiven Verben in die Sätze ein!
// sich unterhalten – sich langweilen – sich treffen – sich freuen

// Beispiel из PDF: Нет специального примера
export const quizExample = null;

// Единый связный текст с множественными пропусками
// Все возвратные глаголы в полной форме (sich + Verb) в списке слов
export default [
  {
    id: "zt2-95-full",
    quiz_id: 95,
    question_text: 'Ich möchte _____ in meiner Freizeit nicht _____, deshalb _____ ich _____ oft mit meinen Freund*innen. Wir _____ _____ über verschiedene Themen und sind sehr aktiv. Nach unseren Treffen fragt uns Sabine immer: „_____ ihr _____ schon auf unser nächstes Treffen?" Wir sagen natürlich alle „Ja!"',
    question_hint: "Setzen Sie die reflexiven Verben ein.",
    format: "F4",
    // Правильные слова для пропусков (в порядке появления)
    options: ["mich", "langweilen", "treffe", "mich", "unterhalten", "uns", "Freut", "euch"],
    // Полные возвратные формы глаголов + дополнительные отвлекающие слова
    extra_words: ["sich langweilen", "sich treffen", "sich unterhalten", "sich freuen", "sich", "dir", "uns", "euch", "mich"],
    correct_answer: "mich langweilen treffe mich unterhalten uns Freut euch",
  },
];
