import React from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { MessageCircle, Star, Shield, BookOpen, HelpCircle, Gift, Send } from 'lucide-react';

export const SupportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Support & Hilfe" />
      
      <main className="flex-1 p-4 pb-24 max-w-md mx-auto w-full space-y-4">
        {/* Contact Card */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Send className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Kontakt</h2>
              <a 
                href="https://t.me/ale11111" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Telegram: @ale11111
              </a>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Entwickler: Gadzera Aleksandr
          </p>
        </div>

        {/* All Accordions in one card */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            
            {/* Free Access */}
            <AccordionItem value="free" className="border-border">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-success" />
                  <span>Kostenlose Nutzung</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground text-sm">
                <p className="text-success font-medium mb-1">🎉 100% Kostenlos!</p>
                <p>Alle Funktionen sind aktuell gratis. Premium-Features kommen später.</p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ */}
            <AccordionItem value="faq" className="border-border">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <span>Häufige Fragen</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground">
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground">Brauche ich ein Konto?</p>
                    <p>Ja, um deinen Fortschritt zu speichern.</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Funktioniert es offline?</p>
                    <p>Nein, Internetverbindung erforderlich.</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Welche Niveaus gibt es?</p>
                    <p>A1, A2, B1 und Prüfungsvorbereitung.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Grammar */}
            <AccordionItem value="grammar" className="border-border">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>Grammatik-Tipps</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground text-sm">
                <div className="space-y-1">
                  <p><strong>der</strong> – männlich (der Mann)</p>
                  <p><strong>die</strong> – weiblich (die Frau)</p>
                  <p><strong>das</strong> – neutral (das Kind)</p>
                </div>
                <p className="mt-2 text-xs">Tipp: Lerne Nomen immer mit dem Artikel!</p>
              </AccordionContent>
            </AccordionItem>

            {/* Privacy */}
            <AccordionItem value="privacy" className="border-border">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Datenschutz</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground text-sm">
                <p>Deine Daten sind sicher. Keine Weitergabe an Dritte.</p>
                <p className="mt-1">E-Mail nur für Anmeldung verwendet.</p>
              </AccordionContent>
            </AccordionItem>

            {/* Feedback */}
            <AccordionItem value="feedback" className="border-border">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span>Feedback</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground text-sm">
                <p>Fehler gefunden oder Ideen?</p>
                <p>Schreib auf Telegram: <strong className="text-primary">@ale11111</strong></p>
              </AccordionContent>
            </AccordionItem>

            {/* Rate */}
            <AccordionItem value="rate" className="border-border">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-warning" />
                  <span>App bewerten</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground text-sm">
                <p>Gefällt dir die App? Teile sie mit Freunden! 🙏</p>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground pt-2">
          Version 1.0 • Made with ❤️
        </p>
      </main>

      <BottomNav />
    </div>
  );
};
