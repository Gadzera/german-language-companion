import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Progress } from '@/components/ui/progress';
import { Leaderboard } from '@/components/Leaderboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase-safe';
import { BarChart3, Trophy, Users, Target, Star, TrendingUp } from 'lucide-react';

interface UserStats {
  total_users: number;
  online_users: number;
}

interface PersonalStats {
  totalExercises: number;
  totalCorrect: number;
  averageScore: number;
  ztScores: {
    zt1: { completed: number; total: number; avgScore: number };
    zt2: { completed: number; total: number; avgScore: number };
    zt3: { completed: number; total: number; avgScore: number };
  };
}

export const ProgressPage: React.FC = () => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [personalStats, setPersonalStats] = useState<PersonalStats | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, number>>({
    A1: 0, A2: 0, B1: 0, 'ZT-1': 0, 'ZT-2': 0, 'ZT-3': 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!isSupabaseConfigured()) return;

      // Fetch user statistics
      const { data: statsData } = await supabase
        .from('user_statistics')
        .select('*')
        .single();
      
      if (statsData) {
        setUserStats(statsData as UserStats);
      }

      // Fetch user progress if logged in
      if (user) {
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('quiz_id, completed, score, total_questions')
          .eq('user_id', user.id);

        if (progressData) {
          const counts: Record<string, number> = {
            A1: 0, A2: 0, B1: 0, 'ZT-1': 0, 'ZT-2': 0, 'ZT-3': 0
          };
          
          let totalExercises = 0;
          let totalCorrect = 0;
          let totalQuestions = 0;
          
          const ztScores = {
            zt1: { completed: 0, total: 8, scores: [] as number[] },
            zt2: { completed: 0, total: 9, scores: [] as number[] },
            zt3: { completed: 0, total: 9, scores: [] as number[] },
          };
          
          progressData.forEach(p => {
            if (p.completed) {
              totalExercises++;
              totalCorrect += p.score || 0;
              totalQuestions += p.total_questions || 0;
              
              const quizId = p.quiz_id;
              if (quizId >= 1 && quizId <= 26) counts['A1']++;
              else if (quizId >= 27 && quizId <= 51) counts['A2']++;
              else if (quizId >= 52 && quizId <= 84) counts['B1']++;
              else if (quizId >= 85 && quizId <= 92) {
                counts['ZT-1']++;
                ztScores.zt1.completed++;
                if (p.score && p.total_questions) {
                  ztScores.zt1.scores.push((p.score / p.total_questions) * 100);
                }
              }
              else if (quizId >= 93 && quizId <= 101) {
                counts['ZT-2']++;
                ztScores.zt2.completed++;
                if (p.score && p.total_questions) {
                  ztScores.zt2.scores.push((p.score / p.total_questions) * 100);
                }
              }
              else if (quizId >= 102 && quizId <= 110) {
                counts['ZT-3']++;
                ztScores.zt3.completed++;
                if (p.score && p.total_questions) {
                  ztScores.zt3.scores.push((p.score / p.total_questions) * 100);
                }
              }
            }
          });
          
          setCompletedQuizzes(counts);
          
          // Рассчитываем персональную статистику
          const avgScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
          
          setPersonalStats({
            totalExercises,
            totalCorrect,
            averageScore: avgScore,
            ztScores: {
              zt1: {
                completed: ztScores.zt1.completed,
                total: ztScores.zt1.total,
                avgScore: ztScores.zt1.scores.length > 0 
                  ? Math.round(ztScores.zt1.scores.reduce((a, b) => a + b, 0) / ztScores.zt1.scores.length)
                  : 0
              },
              zt2: {
                completed: ztScores.zt2.completed,
                total: ztScores.zt2.total,
                avgScore: ztScores.zt2.scores.length > 0 
                  ? Math.round(ztScores.zt2.scores.reduce((a, b) => a + b, 0) / ztScores.zt2.scores.length)
                  : 0
              },
              zt3: {
                completed: ztScores.zt3.completed,
                total: ztScores.zt3.total,
                avgScore: ztScores.zt3.scores.length > 0 
                  ? Math.round(ztScores.zt3.scores.reduce((a, b) => a + b, 0) / ztScores.zt3.scores.length)
                  : 0
              },
            }
          });
        }
      }
    };

    fetchStats();
  }, [user]);

  const levelData = [
    { level: 'A1', completed: completedQuizzes['A1'], total: 26, color: 'level-a1' },
    { level: 'A2', completed: completedQuizzes['A2'], total: 25, color: 'level-a2' },
    { level: 'B1', completed: completedQuizzes['B1'], total: 33, color: 'level-b1' },
    { level: 'ZT-1', completed: completedQuizzes['ZT-1'], total: 8, color: 'level-zt1' },
    { level: 'ZT-2', completed: completedQuizzes['ZT-2'], total: 9, color: 'level-zt2' },
    { level: 'ZT-3', completed: completedQuizzes['ZT-3'], total: 9, color: 'level-zt3' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Fortschritt" />

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* User Statistics Banner */}
        {userStats && (
          <div className="bg-card rounded-xl p-4 border border-border mb-6">
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-2xl font-bold text-foreground">{userStats.total_users}</span>
                </div>
                <p className="text-xs text-muted-foreground">Registriert</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-2xl font-bold text-foreground">{userStats.online_users}</span>
                </div>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
          </div>
        )}

        {/* Personal Stats (if logged in) */}
        {user && personalStats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-card rounded-xl p-3 border border-border text-center">
              <Target className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-xl font-bold text-foreground">{personalStats.totalExercises}</p>
              <p className="text-xs text-muted-foreground">Übungen</p>
            </div>
            <div className="bg-card rounded-xl p-3 border border-border text-center">
              <Star className="w-5 h-5 mx-auto mb-1 text-warning" />
              <p className="text-xl font-bold text-foreground">{personalStats.averageScore}%</p>
              <p className="text-xs text-muted-foreground">Durchschnitt</p>
            </div>
            <div className="bg-card rounded-xl p-3 border border-border text-center">
              <TrendingUp className="w-5 h-5 mx-auto mb-1 text-success" />
              <p className="text-xl font-bold text-foreground">{personalStats.totalCorrect}</p>
              <p className="text-xs text-muted-foreground">Richtige</p>
            </div>
            <div className="bg-card rounded-xl p-3 border border-border text-center">
              <Trophy className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-xl font-bold text-foreground">
                {personalStats.ztScores.zt1.completed + personalStats.ztScores.zt2.completed + personalStats.ztScores.zt3.completed}
              </p>
              <p className="text-xs text-muted-foreground">ZT bestanden</p>
            </div>
          </div>
        )}

        {/* ZT Test Scores */}
        {user && personalStats && (personalStats.ztScores.zt1.completed > 0 || personalStats.ztScores.zt2.completed > 0 || personalStats.ztScores.zt3.completed > 0) && (
          <div className="bg-card rounded-xl p-4 border border-border mb-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-warning" />
              Zwischentest-Ergebnisse
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {personalStats.ztScores.zt1.completed > 0 && (
                <div className="text-center p-2 rounded-lg bg-success/10 border border-success/30">
                  <p className="text-xs text-muted-foreground">ZT-1</p>
                  <p className="text-lg font-bold text-success">{personalStats.ztScores.zt1.avgScore}%</p>
                  <p className="text-xs text-muted-foreground">{personalStats.ztScores.zt1.completed}/{personalStats.ztScores.zt1.total}</p>
                </div>
              )}
              {personalStats.ztScores.zt2.completed > 0 && (
                <div className="text-center p-2 rounded-lg bg-success/10 border border-success/30">
                  <p className="text-xs text-muted-foreground">ZT-2</p>
                  <p className="text-lg font-bold text-success">{personalStats.ztScores.zt2.avgScore}%</p>
                  <p className="text-xs text-muted-foreground">{personalStats.ztScores.zt2.completed}/{personalStats.ztScores.zt2.total}</p>
                </div>
              )}
              {personalStats.ztScores.zt3.completed > 0 && (
                <div className="text-center p-2 rounded-lg bg-success/10 border border-success/30">
                  <p className="text-xs text-muted-foreground">ZT-3</p>
                  <p className="text-lg font-bold text-success">{personalStats.ztScores.zt3.avgScore}%</p>
                  <p className="text-xs text-muted-foreground">{personalStats.ztScores.zt3.completed}/{personalStats.ztScores.zt3.total}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tabs for Progress and Leaderboard */}
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Fortschritt
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Top 100
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="space-y-4">
            {levelData.map((item) => (
              <div key={item.level} className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className={`${item.color} text-white px-3 py-1 rounded-lg text-sm font-semibold`}>
                    {item.level}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {item.completed} / {item.total}
                  </span>
                </div>
                <Progress value={(item.completed / item.total) * 100} className="h-2" />
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};
