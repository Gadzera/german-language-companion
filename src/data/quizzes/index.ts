// Индексный файл для всех данных викторин
import { getZT1Questions } from './zt1-questions';
import { getZT2Questions } from './zt2-questions';
import { getZT3Questions } from './zt3-questions';
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
// Приоритет: 1) отдельный файл упражнения, 2) групповой файл
export const getLocalQuestions = (quizId: number): QuizQuestion[] => {
  // Сначала проверяем отдельный файл упражнения
  if (hasExerciseFile(quizId)) {
    return getExerciseQuestions(quizId);
  }
  
  // ZT1: 85-92
  if (quizId >= 85 && quizId <= 92) {
    return getZT1Questions(quizId);
  }
  // ZT2: 93-98
  if (quizId >= 93 && quizId <= 98) {
    return getZT2Questions(quizId);
  }
  // ZT3: 99-108
  if (quizId >= 99 && quizId <= 108) {
    return getZT3Questions(quizId);
  }
  return [];
};

export { getZT1Questions, getZT2Questions, getZT3Questions };
