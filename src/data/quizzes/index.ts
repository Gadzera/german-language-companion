// Индексный файл для всех данных викторин
import { getExerciseQuestions, hasExerciseFile } from '../exercises/index';

export interface QuizQuestion {
  id: string;
  quiz_id: number;
  question_text: string;
  question_hint?: string;
  format: string;
  options: string[];
  correct_answer: string;
  correct_answer_full?: string;
  correct_answers?: string[]; // Альтернативные правильные ответы
  word_de?: string;
  article?: string;
  word_translation?: Record<string, string>;
  extra_words?: string[];
}

// Получить вопросы по ID викторины
// Все упражнения теперь хранятся в отдельных файлах src/data/exercises/quiz-N.ts
export const getLocalQuestions = (quizId: number): QuizQuestion[] => {
  if (hasExerciseFile(quizId)) {
    return getExerciseQuestions(quizId);
  }
  return [];
};
