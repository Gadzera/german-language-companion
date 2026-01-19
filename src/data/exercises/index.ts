// ========================================
// СТРУКТУРА ФАЙЛОВ УПРАЖНЕНИЙ (108 файлов)
// ========================================
// 
// src/data/exercises/
// ├── quiz-1.ts   ... quiz-9.ts    <- F0: Flashcards
// ├── quiz-10.ts  ... quiz-18.ts   <- F1: Einsetzen
// ├── quiz-19.ts  ... quiz-27.ts   <- F2: Kasus wählen
// ├── quiz-28.ts  ... quiz-36.ts   <- F3: Satzstruktur
// ├── quiz-37.ts  ... quiz-45.ts   <- F4: GapFill
// ├── quiz-46.ts  ... quiz-54.ts   <- F5: WordBuilder
// ├── quiz-55.ts  ... quiz-63.ts   <- F6: Richtige Wahl
// ├── quiz-64.ts  ... quiz-72.ts   <- F7: Komposita
// ├── quiz-73.ts  ... quiz-81.ts   <- F8: Zuordnen
// ├── quiz-82.ts  ... quiz-90.ts   <- F9: Wort passt nicht
// ├── quiz-91.ts  ... quiz-108.ts  <- F10: Nebensatz bauen
// └── index.ts
//
// ========================================

import { QuizQuestion } from '../quizzes/index';

// F0 - Flashcards (1-9)
import quiz1Questions from './quiz-1';
import quiz2Questions from './quiz-2';
import quiz3Questions from './quiz-3';
import quiz4Questions from './quiz-4';
import quiz5Questions from './quiz-5';
import quiz6Questions from './quiz-6';
import quiz7Questions from './quiz-7';
import quiz8Questions from './quiz-8';
import quiz9Questions from './quiz-9';

// F1 - Einsetzen (10-18)
import quiz10Questions from './quiz-10';
import quiz11Questions from './quiz-11';
import quiz12Questions from './quiz-12';
import quiz13Questions from './quiz-13';
import quiz14Questions from './quiz-14';
import quiz15Questions from './quiz-15';
import quiz16Questions from './quiz-16';
import quiz17Questions from './quiz-17';
import quiz18Questions from './quiz-18';

// F2 - Kasus wählen (19-27)
import quiz19Questions from './quiz-19';
import quiz20Questions from './quiz-20';
import quiz21Questions from './quiz-21';
import quiz22Questions from './quiz-22';
import quiz23Questions from './quiz-23';
import quiz24Questions from './quiz-24';
import quiz25Questions from './quiz-25';
import quiz26Questions from './quiz-26';
import quiz27Questions from './quiz-27';

// F3 - Satzstruktur (28-36)
import quiz28Questions from './quiz-28';
import quiz29Questions from './quiz-29';
import quiz30Questions from './quiz-30';
import quiz31Questions from './quiz-31';
import quiz32Questions from './quiz-32';
import quiz33Questions from './quiz-33';
import quiz34Questions from './quiz-34';
import quiz35Questions from './quiz-35';
import quiz36Questions from './quiz-36';

// F4 - GapFill (37-45)
import quiz37Questions from './quiz-37';
import quiz38Questions from './quiz-38';
import quiz39Questions from './quiz-39';
import quiz40Questions from './quiz-40';
import quiz41Questions from './quiz-41';
import quiz42Questions from './quiz-42';
import quiz43Questions from './quiz-43';
import quiz44Questions from './quiz-44';
import quiz45Questions from './quiz-45';

// F5 - WordBuilder (46-54)
import quiz46Questions from './quiz-46';
import quiz47Questions from './quiz-47';
import quiz48Questions from './quiz-48';
import quiz49Questions from './quiz-49';
import quiz50Questions from './quiz-50';
import quiz51Questions from './quiz-51';
import quiz52Questions from './quiz-52';
import quiz53Questions from './quiz-53';
import quiz54Questions from './quiz-54';

// F6 - Richtige Wahl (55-63)
import quiz55Questions from './quiz-55';
import quiz56Questions from './quiz-56';
import quiz57Questions from './quiz-57';
import quiz58Questions from './quiz-58';
import quiz59Questions from './quiz-59';
import quiz60Questions from './quiz-60';
import quiz61Questions from './quiz-61';
import quiz62Questions from './quiz-62';
import quiz63Questions from './quiz-63';

// F7 - Komposita (64-72)
import quiz64Questions from './quiz-64';
import quiz65Questions from './quiz-65';
import quiz66Questions from './quiz-66';
import quiz67Questions from './quiz-67';
import quiz68Questions from './quiz-68';
import quiz69Questions from './quiz-69';
import quiz70Questions from './quiz-70';
import quiz71Questions from './quiz-71';
import quiz72Questions from './quiz-72';

// F8 - Zuordnen (73-81)
import quiz73Questions from './quiz-73';
import quiz74Questions from './quiz-74';
import quiz75Questions from './quiz-75';
import quiz76Questions from './quiz-76';
import quiz77Questions from './quiz-77';
import quiz78Questions from './quiz-78';
import quiz79Questions from './quiz-79';
import quiz80Questions from './quiz-80';
import quiz81Questions from './quiz-81';

// F9 - Wort passt nicht (82-90)
import quiz82Questions from './quiz-82';
import quiz83Questions from './quiz-83';
import quiz84Questions from './quiz-84';
import quiz85Questions from './quiz-85';
import quiz86Questions from './quiz-86';
import quiz87Questions from './quiz-87';
import quiz88Questions from './quiz-88';
import quiz89Questions from './quiz-89';
import quiz90Questions from './quiz-90';

// F10 - Nebensatz bauen (91-108)
import quiz91Questions from './quiz-91';
import quiz92Questions from './quiz-92';
import quiz93Questions from './quiz-93';
import quiz94Questions from './quiz-94';
import quiz95Questions from './quiz-95';
import quiz96Questions from './quiz-96';
import quiz97Questions from './quiz-97';
import quiz98Questions from './quiz-98';
import quiz99Questions from './quiz-99';
import quiz100Questions from './quiz-100';
import quiz101Questions from './quiz-101';
import quiz102Questions from './quiz-102';
import quiz103Questions from './quiz-103';
import quiz104Questions from './quiz-104';
import quiz105Questions from './quiz-105';
import quiz106Questions from './quiz-106';
import quiz107Questions from './quiz-107';
import quiz108Questions from './quiz-108';

// Маппинг всех 108 упражнений
const exercisesMap: Record<number, QuizQuestion[]> = {
  // F0 - Flashcards (1-9)
  1: quiz1Questions as unknown as QuizQuestion[],
  2: quiz2Questions as unknown as QuizQuestion[],
  3: quiz3Questions as unknown as QuizQuestion[],
  4: quiz4Questions as unknown as QuizQuestion[],
  5: quiz5Questions as unknown as QuizQuestion[],
  6: quiz6Questions as unknown as QuizQuestion[],
  7: quiz7Questions as unknown as QuizQuestion[],
  8: quiz8Questions as unknown as QuizQuestion[],
  9: quiz9Questions as unknown as QuizQuestion[],
  
  // F1 - Einsetzen (10-18)
  10: quiz10Questions as unknown as QuizQuestion[],
  11: quiz11Questions as unknown as QuizQuestion[],
  12: quiz12Questions as unknown as QuizQuestion[],
  13: quiz13Questions as unknown as QuizQuestion[],
  14: quiz14Questions as unknown as QuizQuestion[],
  15: quiz15Questions as unknown as QuizQuestion[],
  16: quiz16Questions as unknown as QuizQuestion[],
  17: quiz17Questions as unknown as QuizQuestion[],
  18: quiz18Questions as unknown as QuizQuestion[],
  
  // F2 - Kasus wählen (19-27)
  19: quiz19Questions as unknown as QuizQuestion[],
  20: quiz20Questions as unknown as QuizQuestion[],
  21: quiz21Questions as unknown as QuizQuestion[],
  22: quiz22Questions as unknown as QuizQuestion[],
  23: quiz23Questions as unknown as QuizQuestion[],
  24: quiz24Questions as unknown as QuizQuestion[],
  25: quiz25Questions as unknown as QuizQuestion[],
  26: quiz26Questions as unknown as QuizQuestion[],
  27: quiz27Questions as unknown as QuizQuestion[],
  
  // F3 - Satzstruktur (28-36)
  28: quiz28Questions as unknown as QuizQuestion[],
  29: quiz29Questions as unknown as QuizQuestion[],
  30: quiz30Questions as unknown as QuizQuestion[],
  31: quiz31Questions as unknown as QuizQuestion[],
  32: quiz32Questions as unknown as QuizQuestion[],
  33: quiz33Questions as unknown as QuizQuestion[],
  34: quiz34Questions as unknown as QuizQuestion[],
  35: quiz35Questions as unknown as QuizQuestion[],
  36: quiz36Questions as unknown as QuizQuestion[],
  
  // F4 - GapFill (37-45)
  37: quiz37Questions as unknown as QuizQuestion[],
  38: quiz38Questions as unknown as QuizQuestion[],
  39: quiz39Questions as unknown as QuizQuestion[],
  40: quiz40Questions as unknown as QuizQuestion[],
  41: quiz41Questions as unknown as QuizQuestion[],
  42: quiz42Questions as unknown as QuizQuestion[],
  43: quiz43Questions as unknown as QuizQuestion[],
  44: quiz44Questions as unknown as QuizQuestion[],
  45: quiz45Questions as unknown as QuizQuestion[],
  
  // F5 - WordBuilder (46-54)
  46: quiz46Questions as unknown as QuizQuestion[],
  47: quiz47Questions as unknown as QuizQuestion[],
  48: quiz48Questions as unknown as QuizQuestion[],
  49: quiz49Questions as unknown as QuizQuestion[],
  50: quiz50Questions as unknown as QuizQuestion[],
  51: quiz51Questions as unknown as QuizQuestion[],
  52: quiz52Questions as unknown as QuizQuestion[],
  53: quiz53Questions as unknown as QuizQuestion[],
  54: quiz54Questions as unknown as QuizQuestion[],
  
  // F6 - Richtige Wahl (55-63)
  55: quiz55Questions as unknown as QuizQuestion[],
  56: quiz56Questions as unknown as QuizQuestion[],
  57: quiz57Questions as unknown as QuizQuestion[],
  58: quiz58Questions as unknown as QuizQuestion[],
  59: quiz59Questions as unknown as QuizQuestion[],
  60: quiz60Questions as unknown as QuizQuestion[],
  61: quiz61Questions as unknown as QuizQuestion[],
  62: quiz62Questions as unknown as QuizQuestion[],
  63: quiz63Questions as unknown as QuizQuestion[],
  
  // F7 - Komposita (64-72)
  64: quiz64Questions as unknown as QuizQuestion[],
  65: quiz65Questions as unknown as QuizQuestion[],
  66: quiz66Questions as unknown as QuizQuestion[],
  67: quiz67Questions as unknown as QuizQuestion[],
  68: quiz68Questions as unknown as QuizQuestion[],
  69: quiz69Questions as unknown as QuizQuestion[],
  70: quiz70Questions as unknown as QuizQuestion[],
  71: quiz71Questions as unknown as QuizQuestion[],
  72: quiz72Questions as unknown as QuizQuestion[],
  
  // F8 - Zuordnen (73-81)
  73: quiz73Questions as unknown as QuizQuestion[],
  74: quiz74Questions as unknown as QuizQuestion[],
  75: quiz75Questions as unknown as QuizQuestion[],
  76: quiz76Questions as unknown as QuizQuestion[],
  77: quiz77Questions as unknown as QuizQuestion[],
  78: quiz78Questions as unknown as QuizQuestion[],
  79: quiz79Questions as unknown as QuizQuestion[],
  80: quiz80Questions as unknown as QuizQuestion[],
  81: quiz81Questions as unknown as QuizQuestion[],
  
  // F9 - Wort passt nicht (82-90)
  82: quiz82Questions as unknown as QuizQuestion[],
  83: quiz83Questions as unknown as QuizQuestion[],
  84: quiz84Questions as unknown as QuizQuestion[],
  85: quiz85Questions as unknown as QuizQuestion[],
  86: quiz86Questions as unknown as QuizQuestion[],
  87: quiz87Questions as unknown as QuizQuestion[],
  88: quiz88Questions as unknown as QuizQuestion[],
  89: quiz89Questions as unknown as QuizQuestion[],
  90: quiz90Questions as unknown as QuizQuestion[],
  
  // F10 - Nebensatz bauen (91-108)
  91: quiz91Questions as unknown as QuizQuestion[],
  92: quiz92Questions as unknown as QuizQuestion[],
  93: quiz93Questions as unknown as QuizQuestion[],
  94: quiz94Questions as unknown as QuizQuestion[],
  95: quiz95Questions as unknown as QuizQuestion[],
  96: quiz96Questions as unknown as QuizQuestion[],
  97: quiz97Questions as unknown as QuizQuestion[],
  98: quiz98Questions as unknown as QuizQuestion[],
  99: quiz99Questions as unknown as QuizQuestion[],
  100: quiz100Questions as unknown as QuizQuestion[],
  101: quiz101Questions as unknown as QuizQuestion[],
  102: quiz102Questions as unknown as QuizQuestion[],
  103: quiz103Questions as unknown as QuizQuestion[],
  104: quiz104Questions as unknown as QuizQuestion[],
  105: quiz105Questions as unknown as QuizQuestion[],
  106: quiz106Questions as unknown as QuizQuestion[],
  107: quiz107Questions as unknown as QuizQuestion[],
  108: quiz108Questions as unknown as QuizQuestion[],
};

// Получить вопросы по ID упражнения
export const getExerciseQuestions = (quizId: number): QuizQuestion[] => {
  return exercisesMap[quizId] || [];
};

// Проверить, есть ли упражнение в отдельном файле
export const hasExerciseFile = (quizId: number): boolean => {
  return quizId in exercisesMap && exercisesMap[quizId].length > 0;
};

// Получить формат по номеру упражнения
export const getFormatByQuizId = (quizId: number): string => {
  if (quizId >= 1 && quizId <= 9) return 'F0';
  if (quizId >= 10 && quizId <= 18) return 'F1';
  if (quizId >= 19 && quizId <= 27) return 'F2';
  if (quizId >= 28 && quizId <= 36) return 'F3';
  if (quizId >= 37 && quizId <= 45) return 'F4';
  if (quizId >= 46 && quizId <= 54) return 'F5';
  if (quizId >= 55 && quizId <= 63) return 'F6';
  if (quizId >= 64 && quizId <= 72) return 'F7';
  if (quizId >= 73 && quizId <= 81) return 'F8';
  if (quizId >= 82 && quizId <= 90) return 'F9';
  if (quizId >= 91 && quizId <= 108) return 'F10';
  return 'F1';
};
