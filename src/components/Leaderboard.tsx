import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Award, User, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase-safe';
import { useAuth } from '@/contexts/AuthContext';
import { getCountryFlag } from '@/lib/countryFlags';

interface LeaderboardEntry {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  country: string | null;
  total_points: number;
}

interface UserProgressStats {
  totalCompleted: number;
  levels: Record<string, number>;
}

export const Leaderboard: React.FC = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [userStats, setUserStats] = useState<Record<string, UserProgressStats>>({});

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }

      try {
        // Получаем топ-100 игроков
        const { data, error } = await supabase
          .from('leaderboard')
          .select('*')
          .order('total_points', { ascending: false })
          .limit(100);

        if (error) {
          console.error('Error fetching leaderboard:', error);
        } else if (data) {
          setEntries(data as LeaderboardEntry[]);
          
          // Находим ранг текущего пользователя
          if (user) {
            const userIndex = data.findIndex(e => e.user_id === user.id);
            if (userIndex !== -1) {
              setUserRank(userIndex + 1);
            }
          }

          // Получаем статистику прогресса для топ-10
          const top10Ids = data.slice(0, 10).map(e => e.user_id);
          if (top10Ids.length > 0) {
            const { data: progressData } = await supabase
              .from('user_progress')
              .select('user_id, quiz_id, completed')
              .in('user_id', top10Ids)
              .eq('completed', true);

            if (progressData) {
              const statsMap: Record<string, UserProgressStats> = {};
              
              progressData.forEach(p => {
                if (!statsMap[p.user_id]) {
                  statsMap[p.user_id] = { totalCompleted: 0, levels: {} };
                }
                statsMap[p.user_id].totalCompleted++;
                
                // Определяем уровень
                let level = '';
                if (p.quiz_id >= 1 && p.quiz_id <= 26) level = 'A1';
                else if (p.quiz_id >= 27 && p.quiz_id <= 51) level = 'A2';
                else if (p.quiz_id >= 52 && p.quiz_id <= 84) level = 'B1';
                else if (p.quiz_id >= 85 && p.quiz_id <= 92) level = 'ZT-1';
                else if (p.quiz_id >= 93 && p.quiz_id <= 101) level = 'ZT-2';
                else if (p.quiz_id >= 102 && p.quiz_id <= 110) level = 'ZT-3';
                
                if (level) {
                  statsMap[p.user_id].levels[level] = (statsMap[p.user_id].levels[level] || 0) + 1;
                }
              });
              
              setUserStats(statsMap);
            }
          }
        }
      } catch (err) {
        console.error('Leaderboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [user]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-warning" />;
      case 2:
        return <Medal className="w-5 h-5 text-muted-foreground" />;
      case 3:
        return <Award className="w-5 h-5 text-primary" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-warning/20 to-warning/5 border-warning/30';
      case 2:
        return 'bg-gradient-to-r from-muted/40 to-muted/10 border-muted-foreground/30';
      case 3:
        return 'bg-gradient-to-r from-primary/20 to-primary/5 border-primary/30';
      default:
        return 'bg-card border-border';
    }
  };

  // Форматирование статистики уровней
  const formatLevelStats = (stats: UserProgressStats | undefined): string => {
    if (!stats || Object.keys(stats.levels).length === 0) return '';
    const parts: string[] = [];
    const order = ['A1', 'A2', 'B1', 'ZT-1', 'ZT-2', 'ZT-3'];
    order.forEach(level => {
      if (stats.levels[level]) {
        parts.push(`${level}: ${stats.levels[level]}`);
      }
    });
    return parts.slice(0, 3).join(' · ');
  };

  if (loading) {
    return (
      <div className="bg-card rounded-xl p-4 border border-border">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Top 100 Rangliste
        </h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="bg-card rounded-xl p-4 border border-border">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Top 100 Rangliste
        </h3>
        <p className="text-sm text-muted-foreground text-center py-4">
          Noch keine Einträge. Absolviere Quizze, um Punkte zu sammeln!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-4 border border-border">
      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-primary" />
        Top 100 Rangliste
        {userRank && (
          <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            Dein Platz: #{userRank}
          </span>
        )}
      </h3>
      
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {entries.map((entry, index) => {
          const rank = index + 1;
          const isCurrentUser = user?.id === entry.user_id;
          const stats = userStats[entry.user_id];
          
          return (
            <div
              key={entry.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${getRankStyle(rank)} ${
                isCurrentUser ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex-shrink-0 w-8 flex justify-center">
                {getRankIcon(rank)}
              </div>
              
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 relative">
                {entry.avatar_url ? (
                  <img 
                    src={entry.avatar_url} 
                    alt={entry.full_name || 'User'} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-muted-foreground" />
                )}
                {/* Флаг страны */}
                {entry.country && (
                  <span className="absolute -bottom-1 -right-1 text-sm" title={entry.country}>
                    {getCountryFlag(entry.country)}
                  </span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                  {entry.full_name || 'Anonym'}
                  {isCurrentUser && <span className="ml-1 text-xs">(Du)</span>}
                </p>
                {/* Статистика уровней */}
                {stats && stats.totalCompleted > 0 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3" />
                    <span>{stats.totalCompleted} Übungen</span>
                    {formatLevelStats(stats) && (
                      <span className="hidden sm:inline">· {formatLevelStats(stats)}</span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-foreground">{entry.total_points || 0}</p>
                <p className="text-xs text-muted-foreground">Punkte</p>
              </div>
            </div>
          );
        })}
      </div>
      
      {entries.length > 0 && (
        <p className="text-xs text-muted-foreground text-center mt-3">
          {entries.length === 100 ? 'Top 100' : `Top ${entries.length}`} Spieler
        </p>
      )}
    </div>
  );
};
