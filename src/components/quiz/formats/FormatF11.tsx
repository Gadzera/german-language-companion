// FormatF11 - Lesen: Richtig oder Falsch
// Формат для чтения текста и ответа на вопросы Richtig/Falsch
// С подсветкой релевантного текста при неправильном ответе

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface LesenQuestion {
  id: string;
  statement: string;
  correct_answer: 'R' | 'F';
  text_reference?: string; // Фрагмент текста, подтверждающий правильный ответ
}

interface FormatF11Props {
  readingText: string;
  questions: LesenQuestion[];
  onComplete: (score: number, total: number) => void;
}

const FormatF11: React.FC<FormatF11Props> = ({ readingText, questions, onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, 'R' | 'F' | null>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [highlightedText, setHighlightedText] = useState<string | null>(null);

  const handleAnswer = (questionId: string, answer: 'R' | 'F') => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const newResults: Record<string, boolean> = {};
    let correct = 0;
    
    questions.forEach(q => {
      const isCorrect = answers[q.id] === q.correct_answer;
      newResults[q.id] = isCorrect;
      if (isCorrect) correct++;
    });
    
    setResults(newResults);
    setIsSubmitted(true);
    onComplete(correct, questions.length);
  };

  const allAnswered = questions.every(q => answers[q.id] !== undefined && answers[q.id] !== null);

  // Функция для подсветки текста
  const getHighlightedReadingText = () => {
    if (!highlightedText || !readingText) return readingText;
    
    const parts = readingText.split(new RegExp(`(${escapeRegExp(highlightedText)})`, 'gi'));
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === highlightedText.toLowerCase()) {
        return (
          <mark 
            key={index} 
            className="bg-yellow-300 dark:bg-yellow-600 px-1 rounded animate-pulse"
          >
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  // Экранирование спецсимволов для RegExp
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  return (
    <div className="space-y-6">
      {/* Reading Text */}
      <div className="bg-muted/30 rounded-lg p-4 md:p-6 border sticky top-0 z-10 max-h-[40vh] overflow-y-auto">
        <h3 className="font-semibold text-lg mb-3 text-primary">Text:</h3>
        <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line">
          {isSubmitted ? getHighlightedReadingText() : readingText}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Lesen Sie den Text und entscheiden Sie: Ist die Aussage richtig (R) oder falsch (F)?</h3>
        {questions.map((q, index) => (
          <div 
            key={q.id} 
            className={`p-4 rounded-lg border transition-all ${
              isSubmitted 
                ? results[q.id] 
                  ? 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700' 
                  : 'bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-700'
                : 'bg-card hover:border-primary/50'
            }`}
            onMouseEnter={() => {
              if (isSubmitted && !results[q.id] && q.text_reference) {
                setHighlightedText(q.text_reference);
              }
            }}
            onMouseLeave={() => setHighlightedText(null)}
          >
            <div className="flex items-start gap-3">
              <span className="font-medium text-muted-foreground min-w-[24px]">{index + 1}.</span>
              <div className="flex-1">
                <p className="mb-3 font-medium">{q.statement}</p>
                <div className="flex gap-3">
                  <Button
                    variant={answers[q.id] === 'R' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleAnswer(q.id, 'R')}
                    disabled={isSubmitted}
                    className={`min-w-[80px] ${
                      isSubmitted && q.correct_answer === 'R' 
                        ? 'bg-green-500 hover:bg-green-500 text-white border-green-500' 
                        : ''
                    } ${
                      isSubmitted && answers[q.id] === 'R' && q.correct_answer !== 'R'
                        ? 'bg-red-500 hover:bg-red-500 text-white border-red-500'
                        : ''
                    }`}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Richtig
                  </Button>
                  <Button
                    variant={answers[q.id] === 'F' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleAnswer(q.id, 'F')}
                    disabled={isSubmitted}
                    className={`min-w-[80px] ${
                      isSubmitted && q.correct_answer === 'F' 
                        ? 'bg-green-500 hover:bg-green-500 text-white border-green-500' 
                        : ''
                    } ${
                      isSubmitted && answers[q.id] === 'F' && q.correct_answer !== 'F'
                        ? 'bg-red-500 hover:bg-red-500 text-white border-red-500'
                        : ''
                    }`}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Falsch
                  </Button>
                </div>
                
                {/* Показать подсказку с релевантным текстом при неправильном ответе */}
                {isSubmitted && !results[q.id] && q.text_reference && (
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-700">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <span className="font-semibold">📖 Im Text steht:</span>
                    </p>
                    <p className="text-sm italic mt-1 text-yellow-700 dark:text-yellow-300">
                      „{q.text_reference}"
                    </p>
                  </div>
                )}
                
                {isSubmitted && !results[q.id] && !q.text_reference && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    ✗ Richtige Antwort: {q.correct_answer === 'R' ? 'Richtig' : 'Falsch'}
                  </p>
                )}
                
                {isSubmitted && results[q.id] && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                    ✓ Richtig!
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <Button 
          onClick={handleSubmit} 
          disabled={!allAnswered}
          className="w-full"
          size="lg"
        >
          Prüfen
        </Button>
      )}
    </div>
  );
};

export default FormatF11;