// F3 - Satzstruktur mit Auswahl
// Логика: выбор подходящего варианта для предложения

import React from 'react';
import { OptionButton } from '../OptionButton';

interface FormatF3Props {
  question: {
    options: string[];
    correct_answer: string;
  };
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
  showResult: boolean;
}

export const FormatF3: React.FC<FormatF3Props> = ({
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

export default FormatF3;
