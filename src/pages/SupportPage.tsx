import React from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { BookOpen, HelpCircle, MessageCircle } from 'lucide-react';

export const SupportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Support" />

      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-4">
          <div className="bg-card rounded-xl p-4 border border-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Grammatik-Regeln</h3>
              <p className="text-sm text-muted-foreground">Alle Regeln nachschlagen</p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">FAQ</h3>
              <p className="text-sm text-muted-foreground">Häufig gestellte Fragen</p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Kontakt</h3>
              <p className="text-sm text-muted-foreground">Hilfe vom Support-Team</p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
