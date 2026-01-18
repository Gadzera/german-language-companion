import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '@/data/quizzes';
import { CategoryCard } from '@/components/CategoryCard';
import { LanguageSelector } from '@/components/LanguageSelector';
import { BottomNav } from '@/components/BottomNav';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇩🇪</span>
              <div>
                <h1 className="text-xl font-bold text-foreground">Deutsch Quiz</h1>
                <p className="text-xs text-muted-foreground">A1 – B1 | ZT-1 · ZT-2 · 3</p>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Categories */}
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-3 animate-fade-in">
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CategoryCard
                category={category}
                onClick={() => navigate(`/category/${category.id}`)}
              />
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
