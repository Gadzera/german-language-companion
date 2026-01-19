// F7 - Komposita bauen
// Логика: составить сложное слово из частей

import React from 'react';
import { CompositaBuilder } from '../CompositaBuilder';

interface FormatF7Props {
  question: {
    options: string[];
    correct_answer: string;
  };
  onAnswer: (answer: string) => void;
  showResult: boolean;
}

export const FormatF7: React.FC<FormatF7Props> = ({
  question,
  onAnswer,
  showResult,
}) => {
  return (
    <CompositaBuilder
      parts={question.options}
      correctAnswer={question.correct_answer}
      onSubmit={onAnswer}
      disabled={showResult}
    />
  );
};

export default FormatF7;
