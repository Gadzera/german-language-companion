import React from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

export const ProfilePage: React.FC = () => {
  const { getCurrentLanguage } = useLanguage();
  const currentLang = getCurrentLanguage();

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Profil" />

      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Language setting */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-1">Übersetzungssprache</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Wählen Sie die Sprache für Übersetzungen
            </p>
            <LanguageSelector />
          </div>

          {/* Stats placeholder */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-3">Statistik</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-accent rounded-lg">
                <div className="text-2xl font-bold text-foreground">0</div>
                <div className="text-xs text-muted-foreground">Abgeschlossen</div>
              </div>
              <div className="text-center p-3 bg-accent rounded-lg">
                <div className="text-2xl font-bold text-foreground">108</div>
                <div className="text-xs text-muted-foreground">Gesamt</div>
              </div>
            </div>
          </div>

          {/* Current language display */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Aktuelle Einstellungen</h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentLang.flag}</span>
              <span className="text-foreground">{currentLang.name}</span>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
