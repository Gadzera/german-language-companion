// Quiz 1 - Упражнение 1
// Формат: F1 (Einsetzen - вставить один элемент)
// Уровень: A1
//
// ======= ИНСТРУКЦИЯ ДЛЯ ДОБАВЛЕНИЯ ВОПРОСОВ =======
// 1. Каждый вопрос - объект в массиве questions
// 2. question_text: текст с пропуском _____ 
// 3. options: варианты ответа (3-4 варианта)
// 4. correct_answer: правильный ответ
// 5. correct_answer_full: полное предложение с ответом (опционально)
//
// Пример добавления нового вопроса:
// {
//   id: 'q1-2',
//   quiz_id: 1,
//   format: 'F1',
//   question_text: 'Ich _____ Deutsch.',
//   options: ['lerne', 'lernt', 'lernen', 'lernst'],
//   correct_answer: 'lerne',
//   correct_answer_full: 'Ich lerne Deutsch.',
// }
// ==================================================

export interface QuizQuestion {
  id: string;
  quiz_id: number;
  format: string;
  question_text: string;
  question_hint?: string;
  options: string[];
  correct_answer: string;
  correct_answer_full?: string;
  correct_answers?: string[];
  word_de?: string;
  article?: string;
  word_translation?: Record<string, string>;
  extra_words?: string[];
}

export const quiz1Questions: QuizQuestion[] = [
  // Добавьте вопросы ниже по образцу выше
];

export default quiz1Questions;
