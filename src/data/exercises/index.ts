// ========================================
// СТРУКТУРА ПАПОК ДЛЯ ДАННЫХ УПРАЖНЕНИЙ
// ========================================
// 
// src/data/
// ├── exercises/           <- Отдельные файлы для каждого упражнения (1-108)
// │   ├── quiz-001.ts      <- Wortschatz A1 – Nomen mit Artikel
// │   ├── quiz-002.ts      <- Wortschatz A1 – Alle anderen Wörter
// │   ├── ...
// │   ├── quiz-108.ts      <- Hauptsatz + Nebensatz kombinieren
// │   └── index.ts         <- Экспорт всех упражнений
// │
// ├── quiz-formats/        <- Описания форматов F0-F10
// │   └── index.ts
// │
// └── quizzes/             <- Группировка по категориям (legacy)
//     ├── zt1-questions.ts
//     ├── zt2-questions.ts
//     ├── zt3-questions.ts
//     └── index.ts
//
// ========================================
// КАК ДОБАВИТЬ НОВОЕ УПРАЖНЕНИЕ:
// ========================================
// 
// 1. Создайте файл src/data/exercises/quiz-XXX.ts
// 2. Используйте шаблон из существующего файла (например quiz-108.ts)
// 3. Добавьте экспорт в src/data/exercises/index.ts
// 4. Убедитесь, что quiz_id соответствует номеру файла
// 
// ========================================

import { QuizQuestion } from '../quizzes/index';
import quiz108Questions from './quiz-108';

// Маппинг всех упражнений
const exercisesMap: Record<number, QuizQuestion[]> = {
  108: quiz108Questions as unknown as QuizQuestion[],
  // Добавляйте новые упражнения здесь:
  // 1: quiz001Questions,
  // 2: quiz002Questions,
  // ...
};

// Получить вопросы по ID упражнения
export const getExerciseQuestions = (quizId: number): QuizQuestion[] => {
  return exercisesMap[quizId] || [];
};

// Проверить, есть ли упражнение в отдельном файле
export const hasExerciseFile = (quizId: number): boolean => {
  return quizId in exercisesMap;
};

// Экспорт всех упражнений
export { quiz108Questions };
