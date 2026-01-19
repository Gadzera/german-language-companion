// Quiz 94 - Упражнение 94
// Формат: F4 (Einsetzen aus Liste - вставить слова из списка в пропуски)
// Уровень: A2
//
// ======= ИНСТРУКЦИЯ ДЛЯ ДОБАВЛЕНИЯ ВОПРОСОВ =======
// 1. question_text: текст с пропусками _____ (несколько)
// 2. options: слова для вставки (по одному на каждый пропуск)
// 3. extra_words: дополнительные слова-отвлекатели
// 4. correct_answer: правильные ответы через пробел
//
// Важно: количество слов в options = количество пропусков
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

export const quiz94Questions: QuizQuestion[] = [
  {
    id: 'q94-1',
    quiz_id: 94,
    format: 'F4',
    question_text: 'Morgens _____ ich _____ und _____ mich.',
    question_hint: 'Tagesablauf beschreiben',
    options: ['stehe', 'auf', 'dusche'],
    extra_words: ['lege', 'mich', 'frühstücke', 'an'],
    correct_answer: 'stehe auf dusche',
  },
  {
    id: 'q94-2',
    quiz_id: 94,
    format: 'F4',
    question_text: 'Ich _____ um 7 Uhr _____ und _____ Kaffee.',
    question_hint: 'Morgenroutine',
    options: ['wache', 'auf', 'trinke'],
    extra_words: ['stehe', 'esse', 'schlafe', 'mich'],
    correct_answer: 'wache auf trinke',
  },
  {
    id: 'q94-3',
    quiz_id: 94,
    format: 'F4',
    question_text: 'Nach der Arbeit _____ ich _____ und _____ fern.',
    question_hint: 'Abendaktivitäten',
    options: ['komme', 'heim', 'sehe'],
    extra_words: ['gehe', 'lese', 'höre', 'aus'],
    correct_answer: 'komme heim sehe',
  },
];

export default quiz94Questions;
