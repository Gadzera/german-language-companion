import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  subtitle?: string;
  backTo?: string; // Explicit back navigation path
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false, 
  rightElement,
  subtitle,
  backTo
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      // Determine smart back navigation based on current path
      const path = location.pathname;
      
      // If on quiz page, go to category page
      if (path.startsWith('/quiz/')) {
        const quizId = parseInt(path.split('/')[2]);
        // Determine category based on quiz ID
        if (quizId >= 85 && quizId <= 92) {
          navigate('/category/zt1');
        } else if (quizId >= 93 && quizId <= 98) {
          navigate('/category/zt2');
        } else if (quizId >= 99 && quizId <= 108) {
          navigate('/category/zt3');
        } else if (quizId >= 79 && quizId <= 84) {
          navigate('/category/wortschatz');
        } else if (quizId >= 52 && quizId <= 78) {
          navigate('/category/grammatik-b1');
        } else if (quizId >= 27 && quizId <= 51) {
          navigate('/category/grammatik-a2');
        } else if (quizId >= 7 && quizId <= 26) {
          navigate('/category/grammatik-a1');
        } else if (quizId >= 1 && quizId <= 6) {
          navigate('/category/cards');
        } else {
          navigate('/');
        }
      } else if (path.startsWith('/category/')) {
        navigate('/');
      } else {
        navigate(-1);
      }
    }
  };

  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40">
      <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {showBack && (
            <button 
              onClick={handleBack}
              className="p-1 -ml-1 rounded-lg hover:bg-accent transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
          )}
          {title && (
            <div>
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
              {subtitle && (
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
          )}
        </div>
        {rightElement}
      </div>
    </header>
  );
};
