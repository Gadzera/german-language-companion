// Quiz 42 - Упражнение 42
// Формат: F1 (Einsetzen - вставить один элемент)
// Уровень: A2
//
// ======= ИНСТРУКЦИЯ ДЛЯ ДОБАВЛЕНИЯ ВОПРОСОВ =======
// 1. question_text: текст с пропуском _____ 
// 2. options: варианты ответа (3-4 варианта)
// 3. correct_answer: правильный ответ
// 4. correct_answer_full: полное предложение с ответом
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

export const quiz42Questions: QuizQuestion[] = [
  // Добавьте вопросы ниже по образцу
  // {
  //   id: 'q42-1',
  //   quiz_id: 42,
  //   format: 'F1',
  //   question_text: 'Er _____ gern Musik.',
  //   options: ['hört', 'höre', 'hören', 'hörst'],
  //   correct_answer: 'hört',
  //   correct_answer_full: 'Er hört gern Musik.',
  // }
];

export default quiz42Questions;
