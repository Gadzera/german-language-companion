import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Progress } from '@/components/ui/progress';
import { Leaderboard } from '@/components/Leaderboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase-safe';
import { BarChart3, Trophy, Users } from 'lucide-react';

interface UserStats {
  total_users: number;
  online_users: number;
}

export const ProgressPage: React.FC = () => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
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
          .select('quiz_id, completed')
          .eq('user_id', user.id)
          .eq('completed', true);

        if (progressData) {
          const counts: Record<string, number> = {
            A1: 0, A2: 0, B1: 0, 'ZT-1': 0, 'ZT-2': 0, 'ZT-3': 0
          };
          
          progressData.forEach(p => {
            const quizId = p.quiz_id;
            if (quizId >= 1 && quizId <= 26) counts['A1']++;
            else if (quizId >= 27 && quizId <= 51) counts['A2']++;
            else if (quizId >= 52 && quizId <= 84) counts['B1']++;
            else if (quizId >= 85 && quizId <= 92) counts['ZT-1']++;
            else if (quizId >= 93 && quizId <= 101) counts['ZT-2']++;
            else if (quizId >= 102 && quizId <= 110) counts['ZT-3']++;
          });
          
          setCompletedQuizzes(counts);
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

      <main className="max-w-md mx-auto px-4 py-6">
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

        {/* Tabs for Progress and Leaderboard */}
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Fortschritt
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Rangliste
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
