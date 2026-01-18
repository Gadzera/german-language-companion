import React from 'react';
import { Quiz } from '@/data/quizzes';
import { Check, Circle, Loader2 } from 'lucide-react';

interface QuizListItemProps {
  quiz: Quiz;
  onClick: () => void;
}

export const QuizListItem: React.FC<QuizListItemProps> = ({ quiz, onClick }) => {
  const getStatusIcon = () => {
    if (quiz.completed) {
      return (
        <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
          <Check className="w-4 h-4 text-success-foreground" />
        </div>
      );
    }
    if (quiz.inProgress) {
      return (
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
        </div>
      );
    }
    return <Circle className="w-6 h-6 text-muted-foreground" />;
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-xl p-4 flex items-center gap-4 shadow-card hover:shadow-md transition-all duration-200 active:scale-[0.99] border border-border"
    >
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-foreground">
            {quiz.id} · {quiz.title}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{quiz.duration}</span>
          <span>·</span>
          <span>{quiz.level}</span>
        </div>
      </div>
      {getStatusIcon()}
    </button>
  );
};
