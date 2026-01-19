// ========================================
// СТРУКТУРА ПАПОК ДЛЯ ДАННЫХ УПРАЖНЕНИЙ
// ========================================
// 
// src/data/
// ├── exercises/           <- Отдельные файлы для каждого упражнения (1-108)
// │   ├── quiz-1.ts        <- Упражнение 1
// │   ├── quiz-2.ts        <- Упражнение 2
// │   ├── ...
// │   ├── quiz-94.ts       <- F4 - Вставить слова из списка
// │   ├── quiz-108.ts      <- F10 - Hauptsatz + Nebensatz kombinieren
// │   └── index.ts         <- Экспорт всех упражнений
// │
// ├── quiz-formats/        <- Описания форматов F0-F10 (11 форматов)
// │   └── index.ts         <- Все описания в одном файле
// │
// └── quizzes/             <- Группировка по категориям (fallback)
//     ├── zt1-questions.ts
//     ├── zt2-questions.ts
//     ├── zt3-questions.ts
//     └── index.ts
//
// ========================================
// ФОРМАТЫ ВИКТОРИН (11 файлов логики):
// ========================================
// src/components/quiz/formats/
// ├── FormatF0.tsx   <- Flashcards / Wortschatz
// ├── FormatF1.tsx   <- Einsetzen
// ├── FormatF2.tsx   <- Form / Kasus wählen
// ├── FormatF3.tsx   <- Satzstruktur mit Auswahl
// ├── FormatF4.tsx   <- Einsetzen aus Liste (GapFill)
// ├── FormatF5.tsx   <- Umformen (WordBuilder)
// ├── FormatF6.tsx   <- Richtige Wahl im Kontext
// ├── FormatF7.tsx   <- Komposita bauen
// ├── FormatF8.tsx   <- Zuordnen / Bilden
// ├── FormatF9.tsx   <- Wort passt nicht
// ├── FormatF10.tsx  <- Satz aus Wörtern bauen
// └── index.ts       <- Экспорт всех форматов
//
// ========================================
// КАК ДОБАВИТЬ НОВОЕ УПРАЖНЕНИЕ:
// ========================================
// 
// 1. Создайте файл src/data/exercises/quiz-XXX.ts
// 2. Используйте шаблон из существующего файла (например quiz-108.ts)
// 3. Добавьте импорт и экспорт в этот файл (index.ts)
// 4. Убедитесь, что quiz_id соответствует номеру файла
// 
// ========================================

import { QuizQuestion } from '../quizzes/index';
import quiz1Questions from './quiz-1';
import quiz42Questions from './quiz-42';
import quiz94Questions from './quiz-94';
import quiz108Questions from './quiz-108';

// Маппинг всех упражнений
// Добавляйте новые упражнения сюда после создания файла
const exercisesMap: Record<number, QuizQuestion[]> = {
  1: quiz1Questions as unknown as QuizQuestion[],
  42: quiz42Questions as unknown as QuizQuestion[],
  94: quiz94Questions as unknown as QuizQuestion[],
  108: quiz108Questions as unknown as QuizQuestion[],
  // Добавляйте новые упражнения:
  // 2: quiz2Questions,
  // 3: quiz3Questions,
  // ...
};

// Получить вопросы по ID упражнения
export const getExerciseQuestions = (quizId: number): QuizQuestion[] => {
  return exercisesMap[quizId] || [];
};

// Проверить, есть ли упражнение в отдельном файле
export const hasExerciseFile = (quizId: number): boolean => {
  return quizId in exercisesMap && exercisesMap[quizId].length > 0;
};

// Экспорт всех упражнений
export { quiz1Questions, quiz42Questions, quiz94Questions, quiz108Questions };
