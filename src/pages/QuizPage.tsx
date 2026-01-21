import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById } from '@/data/quizzes';
import { getLocalQuestions } from '@/data/quizzes/index';
import { getExerciseQuestions, hasExerciseFile } from '@/data/exercises/index';
import { getFormatInstructionDe, getFormatInstructionTranslation } from '@/data/quiz-formats/index';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage, TranslationLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { OptionButton } from '@/components/quiz/OptionButton';
import { WordBuilder } from '@/components/quiz/WordBuilder';
import { GapFill } from '@/components/quiz/GapFill';
import { CompositaBuilder } from '@/components/quiz/CompositaBuilder';
import { QuizResult } from '@/components/quiz/QuizResult';
import { FlashCard } from '@/components/quiz/FlashCard';
import FormatF11 from '@/components/quiz/formats/FormatF11';
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
  correct_answers?: string[]; // Массив альтернативных правильных ответов
  word_de?: string;
  article?: string;
  word_translation?: Record<string, string>;
  extra_words?: string[];
}

// Функция проверки правильности ответа с учетом альтернатив
const isAnswerCorrect = (userAnswer: string, question: QuizQuestion): boolean => {
  const normalizedUserAnswer = userAnswer.toLowerCase().trim().replace(/\s+/g, ' ');
  
  // Проверяем основной правильный ответ
  if (normalizedUserAnswer === question.correct_answer.toLowerCase().trim()) {
    return true;
  }
  
  // Проверяем полный правильный ответ
  if (question.correct_answer_full && 
      normalizedUserAnswer === question.correct_answer_full.toLowerCase().trim()) {
    return true;
  }
  
  // Проверяем альтернативные правильные ответы
  if (question.correct_answers) {
    return question.correct_answers.some(
      ans => normalizedUserAnswer === ans.toLowerCase().trim().replace(/\s+/g, ' ')
    );
  }
  
  return false;
};

// Функция для перемешивания массива (Fisher-Yates)
const shuffleArray = <T,>(array: T[], seed?: number): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const QuizPage = forwardRef<HTMLDivElement, {}>((_, ref) => {
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
  // Хранение перемешанных опций для каждого вопроса
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Record<number, string[]>>({});

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!quizId) return;
      
      const quizIdNum = Number(quizId);
      let loadedQuestions: QuizQuestion[] = [];
      
      // 1. Сначала пробуем отдельный файл упражнения
      if (hasExerciseFile(quizIdNum)) {
        const exerciseQuestions = getExerciseQuestions(quizIdNum);
        if (exerciseQuestions.length > 0) {
          loadedQuestions = exerciseQuestions;
        }
      }
      
      // 2. Потом пробуем локальные данные из групповых файлов
      if (loadedQuestions.length === 0) {
        const localQuestions = getLocalQuestions(quizIdNum);
        if (localQuestions.length > 0) {
          loadedQuestions = localQuestions;
        }
      }
      
      // 3. Если локальных нет - загружаем из БД
      if (loadedQuestions.length === 0) {
        const { data, error } = await supabase
          .from('quiz_questions')
          .select('*')
          .eq('quiz_id', quizIdNum)
          .order('created_at');

        if (error) {
          console.error('Error fetching questions:', error);
          toast.error('Fehler beim Laden der Fragen');
        } else if (data && data.length > 0) {
          loadedQuestions = data as unknown as QuizQuestion[];
        }
      }
      
      // Перемешиваем варианты ответов для каждого вопроса
      const shuffledMap: Record<number, string[]> = {};
      loadedQuestions.forEach((q, index) => {
        // Перемешиваем только для форматов с выбором ответа (не F4, F5, F10, F7)
        if (!['F4', 'F5', 'F10', 'F7'].includes(q.format)) {
          shuffledMap[index] = shuffleArray(q.options);
        } else {
          shuffledMap[index] = q.options;
        }
      });
      
      setQuestions(loadedQuestions);
      setShuffledOptionsMap(shuffledMap);
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
      questions[i] && isAnswerCorrect(a, questions[i])
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
    
    // Пересоздаём перемешанные опции
    const shuffledMap: Record<number, string[]> = {};
    questions.forEach((q, index) => {
      if (!['F4', 'F5', 'F10', 'F7'].includes(q.format)) {
        shuffledMap[index] = shuffleArray(q.options);
      } else {
        shuffledMap[index] = q.options;
      }
    });
    setShuffledOptionsMap(shuffledMap);
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
        <main className="max-w-2xl mx-auto px-4 py-8 text-center">
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
    questions[i] && isAnswerCorrect(a, questions[i])
  ).length;

  if (showResult) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Ergebnis" showBack />
        
        <main className="max-w-2xl mx-auto px-4 py-8">
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
                  const isCorrect = answers[i] ? isAnswerCorrect(answers[i], q) : false;
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

  const isCurrentCorrect = selectedAnswer ? isAnswerCorrect(selectedAnswer, question) : false;

  // Специальная обработка для F11 - Lesen: Richtig oder Falsch
  // Показываем текст и ВСЕ вопросы сразу
  if (question.format === 'F11') {
    // Получаем reading_text из первого вопроса (все вопросы F11 имеют одинаковый текст)
    const readingText = (questions[0] as any).reading_text || '';
    
    // Преобразуем вопросы в формат для FormatF11
    const f11Questions = questions.map(q => ({
      id: q.id,
      statement: q.question_text,
      correct_answer: q.correct_answer === 'Richtig' ? 'R' as const : 'F' as const,
      text_reference: (q as any).text_reference || undefined,
    }));

    const handleF11Complete = (score: number, total: number) => {
      // Сохраняем прогресс
      if (user && quizId) {
        supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            quiz_id: Number(quizId),
            score: score,
            total_questions: total,
            completed: true,
            last_attempt_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id,quiz_id'
          });
      }
    };

    return (
      <div className="min-h-screen bg-background">
        <Header 
          title={`${quiz.level} · Nr. ${quiz.id}`}
          subtitle={quiz.title}
          showBack 
        />
        
        <main className="max-w-3xl mx-auto px-4 py-6">
          {/* Инструкция к заданию */}
          <div className="bg-muted/50 rounded-lg px-4 py-3 mb-6 text-center space-y-1">
            <p className="text-sm font-medium text-foreground">
              {getFormatInstructionDe('F11')}
            </p>
            <p className="text-xs text-muted-foreground">
              {getFormatInstructionTranslation('F11', translationLanguage as TranslationLanguage)}
            </p>
          </div>

          <FormatF11 
            readingText={readingText}
            questions={f11Questions}
            onComplete={handleF11Complete}
          />

          {/* Кнопки навигации после завершения */}
          <div className="mt-6 space-y-3">
            <Button 
              onClick={restartQuiz}
              variant="outline"
              className="w-full"
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
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title={`${quiz.level} · Nr. ${quiz.id}`}
        subtitle={`Frage ${currentQuestion + 1} / ${questions.length}`}
        showBack 
      />
      
      {/* Progress */}
      <div className="max-w-2xl mx-auto px-4 py-2">
        <Progress value={progress} className="h-1" />
      </div>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Инструкция к заданию — немецкий + перевод мелким шрифтом */}
        <div className="bg-muted/50 rounded-lg px-4 py-3 mb-4 text-center space-y-1">
          <p className="text-sm font-medium text-foreground">
            {getFormatInstructionDe(question.format)}
          </p>
          <p className="text-xs text-muted-foreground">
            {getFormatInstructionTranslation(question.format, translationLanguage as TranslationLanguage)}
          </p>
        </div>

        {/* Beispiel - показываем ВСЕГДА для форматов, которые имеют примеры */}
        {renderExampleBox(Number(quizId), question.format)}

        {/* Question - скрываем для F4 и F10, так как они показывают свой UI */}
        {!['F4', 'F10'].includes(question.format) && (
          <div className="bg-card rounded-xl p-6 border border-border mb-6 animate-fade-in">
            {question.question_hint && (
              <p className="text-sm text-muted-foreground mb-2">{question.question_hint}</p>
            )}
            <p className="text-lg text-foreground leading-relaxed" 
               dangerouslySetInnerHTML={{
                 __html: question.question_text.replace(/<u>/g, '<span class="underline decoration-2">').replace(/<\/u>/g, '</span>').split('_____').map((part, i, arr) => 
                   i < arr.length - 1 
                     ? part + `<span class="inline-block min-w-16 border-b-2 border-primary mx-1 text-center">${showQuestionResult ? `<span class="text-success font-medium">${question.correct_answer}</span>` : ''}</span>`
                     : part
                 ).join('')
               }}
            />
          </div>
        )}
        
        {/* Контекст предложения для F10 - это question_text с поддержкой подчёркивания */}
        {question.format === 'F10' && (
          <div className="bg-card rounded-xl p-4 border border-border mb-4 animate-fade-in">
            <p className="text-base text-foreground leading-relaxed"
               dangerouslySetInnerHTML={{
                 __html: '• ' + question.question_text.replace(/<u>/g, '<span class="underline decoration-2 decoration-primary">').replace(/<\/u>/g, '</span>')
               }}
            />
          </div>
        )}
        
        {/* Hint для F4 формата */}
        {question.format === 'F4' && question.question_hint && (
          <p className="text-sm text-muted-foreground mb-4 text-center">{question.question_hint}</p>
        )}

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
        {renderQuizFormat(question, selectedAnswer, handleAnswer, showQuestionResult, shuffledOptionsMap[currentQuestion] || question.options)}

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
});

QuizPage.displayName = 'QuizPage';

// Функция для отображения примера (Beispiel) для разных квизов
function renderExampleBox(quizId: number, format: string): React.ReactNode {
  // ZT-1: Quiz 86 - Fragen mit Fragepronomen
  if (quizId === 86 && format === 'F10') {
    return (
      <div className="bg-accent/50 rounded-lg p-4 mb-4 border border-accent">
        <p className="text-sm font-semibold text-foreground mb-2">Beispiel:</p>
        <p className="text-sm text-muted-foreground mb-1">Julia kommt <span className="underline decoration-2">aus Linz</span>. Und du?</p>
        <p className="text-sm text-foreground">
          <span className="font-medium">Lösung:</span> <span className="italic">Woher kommst du?</span>
        </p>
      </div>
    );
  }

  // ZT-1: Quiz 87 - Negation (nicht/kein)
  if (quizId === 87 && format === 'F10') {
    return (
      <div className="bg-accent/50 rounded-lg p-4 mb-4 border border-accent">
        <p className="text-sm font-semibold text-foreground mb-2">Beispiel:</p>
        <p className="text-sm text-muted-foreground mb-1">Spielst du gern Fußball?</p>
        <p className="text-sm text-foreground">
          <span className="font-medium">Nein,</span> <span className="italic underline decoration-2">ich spiele nicht gern Fußball.</span>
        </p>
      </div>
    );
  }

  // ZT-1: Quiz 90 - Possessivartikel
  if (quizId === 90 && format === 'F3') {
    return (
      <div className="bg-accent/50 rounded-lg p-4 mb-4 border border-accent">
        <p className="text-sm font-semibold text-foreground mb-2">Beispiel:</p>
        <p className="text-sm text-muted-foreground mb-1">Ich habe einen Sohn.</p>
        <p className="text-sm text-foreground">
          <span className="underline decoration-2 font-medium">Mein</span> Sohn ist 5 Jahre alt.
        </p>
      </div>
    );
  }

  // ZT-2: Quiz 97 - Imperativ bilden
  if (quizId === 97 && format === 'F10') {
    return (
      <div className="bg-accent/50 rounded-lg p-4 mb-4 border border-accent">
        <p className="text-sm font-semibold text-foreground mb-2">Beispiel:</p>
        <p className="text-sm text-muted-foreground mb-1">Paul soll die Hausübung machen.</p>
        <p className="text-sm text-foreground">
          Sein Vater sagt: „<span className="italic underline decoration-2">Mach die Hausübung!</span>"
        </p>
      </div>
    );
  }

  // ZT-2: Quiz 98 - Imperativ
  if (quizId === 98 && format === 'F10') {
    return (
      <div className="bg-accent/50 rounded-lg p-4 mb-4 border border-accent">
        <p className="text-sm font-semibold text-foreground mb-2">Beispiel:</p>
        <p className="text-sm text-muted-foreground mb-1">Paul soll die Hausübung machen.</p>
        <p className="text-sm text-foreground">
          Sein Vater sagt: <span className="italic underline decoration-2">"Mach die Hausübung!"</span>
        </p>
      </div>
    );
  }

  // ZT-2: Quiz 100 - Wort passt nicht
  if (quizId === 100 && format === 'F9') {
    return (
      <div className="bg-accent/50 rounded-lg p-4 mb-4 border border-accent">
        <p className="text-sm font-semibold text-foreground mb-2">Beispiel:</p>
        <p className="text-sm text-muted-foreground mb-1">die Ärztin – <span className="line-through">das Taxi</span> – die Operation – das Krankenhaus</p>
        <p className="text-sm text-foreground">
          <span className="font-medium">→</span> <span className="italic">"das Taxi" passt nicht!</span>
        </p>
      </div>
    );
  }

  return null;
}

function renderQuizFormat(
  question: QuizQuestion,
  selectedAnswer: string | null,
  onAnswer: (answer: string) => void,
  showResult: boolean,
  shuffledOptions: string[]
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
        {shuffledOptions.map((option, index) => {
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
    // Передаём слова — перемешивание происходит внутри GapFill
    const allWords = [...question.options, ...(question.extra_words || [])];
    // Правильные ответы для подсветки
    const correctAnswersList = question.correct_answer.split(' ');
    
    return (
      <GapFill
        words={allWords}
        fullText={question.question_text}
        correctAnswers={correctAnswersList}
        onSubmit={(answers) => {
          const answer = Object.values(answers).join(' ');
          onAnswer(answer);
        }}
        disabled={showResult}
        showResult={showResult}
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

  // F11 - Lesen: Richtig oder Falsch (handled separately in component)

  // Fallback - показываем опции
  return (
    <div className="space-y-3">
      {shuffledOptions.map((option, index) => (
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
