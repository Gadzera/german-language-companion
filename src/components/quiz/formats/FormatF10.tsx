// F10 - Satz aus Wörtern bauen
// Логика: составить предложение из слов (Nebensatz)
// Особенность: несколько правильных вариантов с разными союзами

import React, { useMemo } from 'react';
import { WordBuilder } from '../WordBuilder';

interface FormatF10Props {
  question: {
    question_text: string;
    options: string[];
    extra_words?: string[];
    correct_answer: string;
    correct_answers?: string[]; // Альтернативные правильные ответы
  };
  onAnswer: (answer: string) => void;
  showResult: boolean;
}

export const FormatF10: React.FC<FormatF10Props> = ({
  question,
  onAnswer,
  showResult,
}) => {
  // Стабильное перемешивание слов
  const shuffledWords = useMemo(() => {
    const allWords = [...question.options, ...(question.extra_words || [])];
    return allWords.sort(() => Math.random() - 0.5);
  }, [question.options, question.extra_words]);

  return (
    <WordBuilder
      availableWords={shuffledWords}
      onSubmit={(sentence) => {
        const normalizedAnswer = sentence.replace(/\s+/g, ' ').trim();
        onAnswer(normalizedAnswer);
      }}
      disabled={showResult}
    />
  );
};

export default FormatF10;
