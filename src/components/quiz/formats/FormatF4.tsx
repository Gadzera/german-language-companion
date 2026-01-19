// F4 - Einsetzen aus Liste
// Логика: вставить слова из списка в пропуски

import React from 'react';
import { GapFill } from '../GapFill';

interface FormatF4Props {
  question: {
    question_text: string;
    options: string[];
    extra_words?: string[];
  };
  onAnswer: (answer: string) => void;
  showResult: boolean;
}

export const FormatF4: React.FC<FormatF4Props> = ({
  question,
  onAnswer,
  showResult,
}) => {
  const allWords = [...question.options, ...(question.extra_words || [])];

  return (
    <GapFill
      words={allWords}
      fullText={question.question_text}
      onSubmit={(answers) => {
        const answer = Object.values(answers).join(' ');
        onAnswer(answer);
      }}
      disabled={showResult}
    />
  );
};

export default FormatF4;
