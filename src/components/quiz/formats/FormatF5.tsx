// F5 - Umformen
// Логика: собрать предложение из слов

import React, { useMemo } from 'react';
import { WordBuilder } from '../WordBuilder';

interface FormatF5Props {
  question: {
    options: string[];
    extra_words?: string[];
  };
  onAnswer: (answer: string) => void;
  showResult: boolean;
}

export const FormatF5: React.FC<FormatF5Props> = ({
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

export default FormatF5;
