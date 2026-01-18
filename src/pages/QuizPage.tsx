import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById } from '@/data/quizzes';
import { getLocalQuestions } from '@/data/quizzes/index';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { OptionButton } from '@/components/quiz/OptionButton';
import { WordBuilder } from '@/components/quiz/WordBuilder';
import { GapFill } from '@/components/quiz/GapFill';
import { CompositaBuilder } from '@/components/quiz/CompositaBuilder';
import { QuizResult } from '@/components/quiz/QuizResult';
import { FlashCard } from '@/components/quiz/FlashCard';
import { toast } from 'sonner';

interface QuizQuestion {
  id: string;
  quiz_id: number;
  question_text: string;
  question_hint?: string;
  format: string;
  options: string[];
  correct_answer: string;
  correct_answer_full?: string;
  word_de?: string;
  article?: string;
  word_translation?: Record<string, string>;
  extra_words?: string[];
}

export const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { translationLanguage } = useLanguage();
  const quiz = getQuizById(Number(quizId));

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showQuestionResult, setShowQuestionResult] = useState(false);
  const [showFlashCard, setShowFlashCard] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!quizId) return;
      
      const quizIdNum = Number(quizId);
      
      // Сначала пробуем локальные данные
      const localQuestions = getLocalQuestions(quizIdNum);
      if (localQuestions.length > 0) {
        setQuestions(localQuestions);
        setLoading(false);
        return;
      }
      
      // Если локальных нет - загружаем из БД
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('quiz_id', quizIdNum)
        .order('created_at');

      if (error) {
        console.error('Error fetching questions:', error);
        toast.error('Fehler beim Laden der Fragen');
      } else if (data && data.length > 0) {
        setQuestions(data as unknown as QuizQuestion[]);
      }
      setLoading(false);
    };

    fetchQuestions();
  }, [quizId]);

  const question = questions[currentQuestion];
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  const handleAnswer = useCallback((answer: string) => {
    setSelectedAnswer(answer);
    setShowQuestionResult(true);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    // Для F0 показываем 25-кадр
    if (question?.format === 'F0' && question.word_de) {
      setTimeout(() => {
        setShowFlashCard(true);
      }, 1000);
    }
  }, [answers, currentQuestion, question]);

  const handleNext = () => {
    setShowQuestionResult(false);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      saveProgress();
      setShowResult(true);
    }
  };

  const handleFlashCardComplete = () => {
    setShowFlashCard(false);
    handleNext();
  };

  const saveProgress = async () => {
    if (!user || !quizId) return;

    const correctCount = answers.filter((a, i) => 
      a === questions[i]?.correct_answer || 
      a === questions[i]?.correct_answer_full
    ).length;

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        quiz_id: Number(quizId),
        score: correctCount,
        total_questions: questions.length,
        completed: true,
        last_attempt_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,quiz_id'
      });

    if (error) {
      console.error('Error saving progress:', error);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setShowQuestionResult(false);
  };

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Quiz nicht gefunden</h2>
          <Button onClick={() => navigate('/')}>Zur Startseite</Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header title={quiz.title} showBack />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header title={quiz.title} showBack />
        <main className="max-w-md mx-auto px-4 py-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <span className="text-3xl">📝</span>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Keine Fragen vorhanden</h2>
          <p className="text-muted-foreground mb-6">Dieses Quiz hat noch keine Fragen.</p>
          <Button onClick={() => navigate(-1)} variant="outline">Zurück</Button>
        </main>
      </div>
    );
  }

  if (showFlashCard && question) {
    const translation = question.word_translation?.[translationLanguage] || 
                       question.word_translation?.['ru'] || '';
    return (
      <FlashCard
        wordDe={question.word_de || question.correct_answer}
        wordTranslation={translation}
        onComplete={handleFlashCardComplete}
      />
    );
  }

  const correctCount = answers.filter((a, i) => 
    a === questions[i]?.correct_answer || 
    a === questions[i]?.correct_answer_full
  ).length;

  if (showResult) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Ergebnis" showBack />
        
        <main className="max-w-md mx-auto px-4 py-8">
          <div className="text-center animate-scale-in">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
              correctCount >= questions.length * 0.7 ? 'bg-success' : 
              correctCount >= questions.length * 0.5 ? 'bg-warning' : 'bg-destructive'
            }`}>
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {correctCount >= questions.length * 0.7 ? 'Sehr gut!' : 
               correctCount >= questions.length * 0.5 ? 'Gut!' : 'Weiter üben!'}
            </h2>
            
            <div className="text-4xl font-bold text-foreground mb-6">
              {correctCount} <span className="text-muted-foreground text-2xl">/ {questions.length}</span>
            </div>

            {/* Errors list */}
            <div className="text-left bg-card rounded-xl p-4 border border-border mb-6">
              <h3 className="font-semibold text-foreground mb-3">Ergebnisse:</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {questions.map((q, i) => {
                  const isCorrect = answers[i] === q.correct_answer || answers[i] === q.correct_answer_full;
                  return (
                    <div key={q.id} className="flex items-center justify-between text-sm py-1">
                      <span className="flex-1 truncate pr-2">{i + 1}. {q.question_text.substring(0, 30)}...</span>
                      <span className={isCorrect ? 'text-success' : 'text-destructive'}>
                        {isCorrect ? '✓' : '✕'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={restartQuiz}
                className="w-full bg-primary text-primary-foreground"
              >
                <span className="mr-2">↺</span>
                Wiederholen
              </Button>
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full"
              >
                <span className="mr-2">→</span>
                Zur Startseite
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const isCurrentCorrect = selectedAnswer === question.correct_answer || 
                          selectedAnswer === question.correct_answer_full;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title={`${quiz.level} · Nr. ${quiz.id}`}
        subtitle={`Frage ${currentQuestion + 1} / ${questions.length}`}
        showBack 
      />
      
      {/* Progress */}
      <div className="max-w-md mx-auto px-4 py-2">
        <Progress value={progress} className="h-1" />
      </div>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Question */}
        <div className="bg-card rounded-xl p-6 border border-border mb-6 animate-fade-in">
          {question.question_hint && (
            <p className="text-sm text-muted-foreground mb-2">{question.question_hint}</p>
          )}
          <p className="text-lg text-foreground leading-relaxed">
            {question.question_text.split('_____').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="inline-block min-w-16 border-b-2 border-primary mx-1 text-center">
                    {showQuestionResult && (
                      <span className="text-success font-medium">{question.correct_answer}</span>
                    )}
                  </span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Result feedback */}
        {showQuestionResult && (
          <div className="mb-4">
            <QuizResult
              isCorrect={isCurrentCorrect}
              correctAnswer={question.correct_answer_full || question.correct_answer}
              userAnswer={selectedAnswer || ''}
            />
          </div>
        )}

        {/* Render based on format */}
        {renderQuizFormat(question, selectedAnswer, handleAnswer, showQuestionResult)}

        {/* Next button */}
        {showQuestionResult && question.format !== 'F0' && (
          <Button
            onClick={handleNext}
            className="w-full mt-4 bg-success text-success-foreground hover:bg-success/90"
          >
            {currentQuestion < questions.length - 1 ? 'Weiter' : 'Ergebnis anzeigen'}
          </Button>
        )}
      </main>
    </div>
  );
};

function renderQuizFormat(
  question: QuizQuestion,
  selectedAnswer: string | null,
  onAnswer: (answer: string) => void,
  showResult: boolean
) {
  const format = question.format;

  // F0 - Wortschatz (артикли или слова)
  // F1 - Einsetzen (вставить один элемент)
  // F2 - Form / Kasus wählen
  // F3 - Satzstruktur mit Auswahl
  // F6 - Richtige Wahl im Kontext
  // F8 - Zuordnen / Bilden
  // F9 - Wort passt nicht
  if (['F0', 'F1', 'F2', 'F3', 'F6', 'F8', 'F9'].includes(format)) {
    return (
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.correct_answer;
          const isWrong = isSelected && !isCorrect;
          
          return (
            <OptionButton
              key={index}
              label={option}
              index={index}
              isSelected={isSelected}
              isCorrect={showResult && isCorrect}
              isWrong={showResult && isWrong}
              showResult={showResult}
              onClick={() => !showResult && onAnswer(option)}
              disabled={showResult}
            />
          );
        })}
      </div>
    );
  }

  // F4 - Einsetzen aus Liste (мультипропуски)
  if (format === 'F4') {
    // Передаём полный текст как есть
    const allWords = [...question.options, ...(question.extra_words || [])];
    // Перемешиваем слова
    const shuffledWords = allWords.sort(() => Math.random() - 0.5);
    
    return (
      <GapFill
        words={shuffledWords}
        fullText={question.question_text}
        onSubmit={(answers) => {
          const answer = Object.values(answers).join(' ');
          onAnswer(answer);
        }}
        disabled={showResult}
      />
    );
  }

  // F5 - Umformen (сборка из слов)
  // F10 - Satz aus Wörtern bauen
  if (['F5', 'F10'].includes(format)) {
    const allWords = [...question.options, ...(question.extra_words || [])];
    // Перемешиваем слова
    const shuffledWords = allWords.sort(() => Math.random() - 0.5);
    
    return (
      <WordBuilder
        availableWords={shuffledWords}
        onSubmit={(sentence) => {
          // Убираем лишние пробелы и сравниваем
          const normalizedAnswer = sentence.replace(/\s+/g, ' ').trim();
          onAnswer(normalizedAnswer);
        }}
        disabled={showResult}
      />
    );
  }

  // F7 - Komposita bauen
  if (format === 'F7') {
    return (
      <CompositaBuilder
        parts={question.options}
        correctAnswer={question.correct_answer}
        onSubmit={onAnswer}
        disabled={showResult}
      />
    );
  }

  // Fallback - показываем опции
  return (
    <div className="space-y-3">
      {question.options.map((option, index) => (
        <OptionButton
          key={index}
          label={option}
          index={index}
          isSelected={selectedAnswer === option}
          isCorrect={showResult && option === question.correct_answer}
          isWrong={showResult && selectedAnswer === option && option !== question.correct_answer}
          showResult={showResult}
          onClick={() => !showResult && onAnswer(option)}
          disabled={showResult}
        />
      ))}
    </div>
  );
}
