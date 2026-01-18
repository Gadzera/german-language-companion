import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false, 
  rightElement,
  subtitle 
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40">
      <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {showBack && (
            <button 
              onClick={() => navigate(-1)}
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
