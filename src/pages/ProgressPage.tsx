import React from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Progress } from '@/components/ui/progress';

export const ProgressPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Fortschritt" />

      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-4">
          {/* Level progress cards */}
          {[
            { level: 'A1', completed: 0, total: 20, color: 'level-a1' },
            { level: 'A2', completed: 0, total: 25, color: 'level-a2' },
            { level: 'B1', completed: 0, total: 27, color: 'level-b1' },
            { level: 'ZT-1', completed: 0, total: 8, color: 'level-zt1' },
            { level: 'ZT-2', completed: 0, total: 6, color: 'level-zt2' },
            { level: 'ZT-3', completed: 0, total: 10, color: 'level-zt3' },
          ].map((item) => (
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
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
