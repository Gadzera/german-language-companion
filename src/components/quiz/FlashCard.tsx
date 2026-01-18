import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface FlashCardProps {
  wordDe: string;
  wordTranslation: string;
  onComplete: () => void;
}

export const FlashCard: React.FC<FlashCardProps> = ({ wordDe, wordTranslation, onComplete }) => {
  // 25-й кадр: показываем ОДИН раз на ~40мс (1/25 секунды) и сразу уходим
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 40); // ~25 кадров в секунду = 40мс

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 1 }}
        className="text-center"
      >
        <div className="text-5xl font-bold text-primary mb-3">{wordDe}</div>
        <div className="text-3xl text-foreground">{wordTranslation}</div>
      </motion.div>
    </div>
  );
};
