import React from 'react';

interface OptionButtonProps {
  label: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  showResult?: boolean;
  onClick: () => void;
  index: number;
  disabled?: boolean;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  label,
  isSelected,
  isCorrect,
  isWrong,
  showResult,
  onClick,
  index,
  disabled,
}) => {
  const letter = String.fromCharCode(65 + index);
  
  let className = 'w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ';
  
  if (showResult) {
    if (isCorrect) {
      className += 'border-success bg-success/20 text-success';
    } else if (isWrong) {
      className += 'border-destructive bg-destructive/20 text-destructive';
    } else {
      className += 'border-border bg-card opacity-50';
    }
  } else if (isSelected) {
    className += 'border-primary bg-primary/10';
  } else {
    className += 'border-border bg-card hover:border-primary/50';
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || showResult}
      className={className}
    >
      <span className="font-medium">
        {letter}. {label}
      </span>
    </button>
  );
};
