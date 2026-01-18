import React from 'react';
import { CategoryInfo } from '@/data/quizzes';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full ${category.levelClass} text-white rounded-xl p-4 flex items-center justify-between shadow-card hover:shadow-lg transition-all duration-200 active:scale-[0.98]`}
    >
      <div className="text-left">
        <h3 className="text-xl font-bold">{category.name}</h3>
        <p className="text-sm opacity-90">{category.subtitle}</p>
        <p className="text-xs opacity-75 mt-1">{category.quizRange}</p>
      </div>
      <ChevronRight className="w-6 h-6 opacity-80" />
    </button>
  );
};
