import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlashCardProps {
  wordDe: string;
  wordTranslation: string;
  onComplete: () => void;
}

export const FlashCard: React.FC<FlashCardProps> = ({ wordDe, wordTranslation, onComplete }) => {
  const [flashCount, setFlashCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const maxFlashes = 5;

  useEffect(() => {
    if (flashCount >= maxFlashes) {
      setTimeout(onComplete, 500);
      return;
    }

    const timer = setInterval(() => {
      setIsVisible(prev => !prev);
      if (!isVisible) {
        setFlashCount(prev => prev + 1);
      }
    }, 100); // 25 кадр эффект - очень быстрое мерцание

    return () => clearInterval(timer);
  }, [flashCount, isVisible, onComplete]);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.05 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-primary mb-2">{wordDe}</div>
            <div className="text-2xl text-foreground">{wordTranslation}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
