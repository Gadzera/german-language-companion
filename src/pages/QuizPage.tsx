import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById } from '@/data/quizzes';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Demo questions for prototype
const demoQuestions = [
  {
    id: 1,
    sentence: "Ich fahre ______ Arbeit nach Hause.",
    options: ["In der", "zur", "für die", "an das"],
    correctIndex: 1,
  },
  {
    id: 2,
    sentence: "Er geht ______ Schule.",
    options: ["zur", "in die", "auf der", "nach der"],
    correctIndex: 0,
  },
  {
    id: 3,
    sentence: "Wir wohnen ______ München.",
    options: ["in", "bei", "nach", "an"],
    correctIndex: 0,
  },
];

export const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const quiz = getQuizById(Number(quizId));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(demoQuestions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const question = demoQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / demoQuestions.length) * 100;

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < demoQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
    } else {
      setShowResult(true);
    }
  };

  const correctCount = answers.filter((a, i) => a === demoQuestions[i].correctIndex).length;

  if (showResult) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Ergebnis" showBack />
        
        <main className="max-w-md mx-auto px-4 py-8">
          <div className="text-center animate-scale-in">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-success flex items-center justify-center">
              <svg className="w-10 h-10 text-success-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {correctCount >= demoQuestions.length * 0.7 ? 'Sehr gut!' : correctCount >= demoQuestions.length * 0.5 ? 'Gut!' : 'Weiter üben!'}
            </h2>
            
            <div className="text-4xl font-bold text-foreground mb-6">
              {correctCount} <span className="text-muted-foreground text-2xl">/ {demoQuestions.length}</span>
            </div>

            {/* Errors list */}
            <div className="text-left bg-card rounded-xl p-4 border border-border mb-6">
              <h3 className="font-semibold text-foreground mb-3">Fehler:</h3>
              <div className="space-y-2">
                {demoQuestions.map((q, i) => {
                  const isCorrect = answers[i] === q.correctIndex;
                  if (isCorrect) return null;
                  return (
                    <div key={q.id} className="flex items-center justify-between text-sm">
                      <span className="text-destructive flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center">✕</span>
                        {i + 1} · Frage {i + 1}
                      </span>
                      <span className="text-success">✓</span>
                    </div>
                  );
                })}
                {correctCount === demoQuestions.length && (
                  <p className="text-success text-sm">Keine Fehler! Perfekt!</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswer(null);
                  setAnswers(new Array(demoQuestions.length).fill(null));
                  setShowResult(false);
                }}
                className="w-full bg-primary text-primary-foreground"
              >
                <span className="mr-2">↺</span>
                Wiederholen
              </Button>
              <Button 
                onClick={() => navigate(-1)}
                variant="outline"
                className="w-full"
              >
                <span className="mr-2">→</span>
                Weiter
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title={`${quiz.level} · Nr. ${quiz.id}`}
        subtitle={`Frage ${currentQuestion + 1} / ${demoQuestions.length}`}
        showBack 
      />
      
      {/* Progress */}
      <div className="max-w-md mx-auto px-4 py-2">
        <Progress value={progress} className="h-1" />
      </div>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Question */}
        <div className="bg-card rounded-xl p-6 border border-border mb-6 animate-fade-in">
          <p className="text-lg text-foreground leading-relaxed">
            {question.sentence.split('______').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="inline-block w-20 border-b-2 border-primary mx-1" />
                )}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const letter = String.fromCharCode(65 + index);
            
            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-success bg-success/10'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <span className="font-medium text-foreground">
                  {letter}. {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="w-full bg-success text-success-foreground hover:bg-success/90"
        >
          {currentQuestion < demoQuestions.length - 1 ? 'Weiter' : 'Ergebnis anzeigen'}
        </Button>
      </main>
    </div>
  );
};
