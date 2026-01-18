import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories, getQuizzesByCategory, QuizCategory } from '@/data/quizzes';
import { Header } from '@/components/Header';
import { QuizListItem } from '@/components/QuizListItem';
import { BottomNav } from '@/components/BottomNav';
import { Badge } from '@/components/ui/badge';

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const category = categories.find(c => c.id === categoryId);
  const quizzes = getQuizzesByCategory(categoryId as QuizCategory);

  if (!category) {
    return <div>Category not found</div>;
  }

  // Get unique levels from quizzes
  const levels = Array.from(new Set(quizzes.map(q => q.level)));

  const filteredQuizzes = activeFilter === 'all' 
    ? quizzes 
    : quizzes.filter(q => q.level === activeFilter);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header 
        title={category.name} 
        subtitle={category.subtitle}
        showBack 
      />

      {/* Filters */}
      <div className="max-w-md mx-auto px-4 py-3 border-b border-border">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <Badge
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setActiveFilter('all')}
          >
            Alle
          </Badge>
          {levels.map(level => (
            <Badge
              key={level}
              variant={activeFilter === level ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setActiveFilter(level)}
            >
              {level}
            </Badge>
          ))}
        </div>
      </div>

      {/* Quiz List */}
      <main className="max-w-md mx-auto px-4 py-4">
        <div className="space-y-3">
          {filteredQuizzes.map((quiz, index) => (
            <div 
              key={quiz.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <QuizListItem
                quiz={quiz}
                onClick={() => navigate(`/quiz/${quiz.id}`)}
              />
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
