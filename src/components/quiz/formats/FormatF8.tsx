// F8 - Zuordnen / Bilden
// Логика: соотнесение или образование пар

import React from 'react';
import { OptionButton } from '../OptionButton';

interface FormatF8Props {
  question: {
    options: string[];
    correct_answer: string;
  };
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
  showResult: boolean;
}

export const FormatF8: React.FC<FormatF8Props> = ({
  question,
  selectedAnswer,
  onAnswer,
  showResult,
}) => {
  return (
    <div className="space-y-3">
      {question.options.map((option, index) => {
        const isSelected = selectedAnswer === option;
        const isCorrect = option === question.correct_answer;
        const isWrong = isSelected && !isCorrect;

        return (
          <OptionButton
            key={index}
            label={option}
            index={index}
            isSelected={isSelected}
            isCorrect={showResult && isCorrect}
            isWrong={showResult && isWrong}
            showResult={showResult}
            onClick={() => !showResult && onAnswer(option)}
            disabled={showResult}
          />
        );
      })}
    </div>
  );
};

export default FormatF8;
