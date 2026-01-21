import React from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { 
  BookOpen, 
  HelpCircle, 
  MessageCircle, 
  Send, 
  Heart, 
  Info, 
  Gift,
  Shield,
  Star
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const SupportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Support & Hilfe" />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* App Info */}
        <section className="bg-card rounded-xl p-5 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Info className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-foreground text-lg">German Language Companion</h2>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Dein persönlicher Begleiter beim Deutschlernen. Mit über 100 interaktiven Quizzen 
            von A1 bis B1 und darüber hinaus. Perfekt für die Vorbereitung auf Sprachprüfungen 
            wie den Deutsch-Test für Zuwanderer (DTZ) und Telc.
          </p>
        </section>

        {/* Free Access Banner */}
        <section className="bg-success rounded-xl p-5 text-success-foreground">
          <div className="flex items-center gap-3 mb-3">
            <Gift className="w-8 h-8" />
            <div>
              <h3 className="font-bold text-lg">100% Kostenlos!</h3>
              <p className="text-success-foreground/80 text-sm">Alle Funktionen gratis verfügbar</p>
            </div>
          </div>
          <p className="text-success-foreground/90 text-sm leading-relaxed">
            Aktuell sind alle Quizze und Funktionen komplett kostenlos. 
            In Zukunft werden Premium-Funktionen hinzugefügt, aber die Grundfunktionen 
            bleiben für immer kostenlos!
          </p>
        </section>

        {/* Contact */}
        <section className="bg-card rounded-xl p-5 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Send className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Kontakt</h3>
              <p className="text-sm text-muted-foreground">Schreib uns bei Fragen!</p>
            </div>
          </div>
          <a 
            href="https://t.me/ale11111" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-primary">@ale11111</p>
              <p className="text-sm text-primary/70">Telegram Support</p>
            </div>
          </a>
        </section>

        {/* Developer */}
        <section className="bg-card rounded-xl p-5 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <Heart className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Entwickler</h3>
              <p className="text-sm text-muted-foreground">Mit ❤️ entwickelt von</p>
            </div>
          </div>
          <div className="bg-accent rounded-xl p-4">
            <p className="font-semibold text-foreground text-lg">
              Gadzera Aleksandr
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Full-Stack Developer | Sprachlehrer-Enthusiast
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-card rounded-xl p-5 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Häufige Fragen (FAQ)</h3>
              <p className="text-sm text-muted-foreground">Antworten auf deine Fragen</p>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm text-left">
                Ist die App wirklich kostenlos?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">
                Ja! Aktuell sind alle Funktionen 100% kostenlos verfügbar. Du kannst alle Quizze 
                ohne Einschränkungen nutzen. In Zukunft werden optionale Premium-Features hinzugefügt.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm text-left">
                Für welche Sprachniveaus ist die App geeignet?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">
                Die App bietet Übungen für die Niveaus A1, A2 und B1. Außerdem gibt es spezielle 
                Kategorien für die Prüfungsvorbereitung (ZT-1, ZT-2, ZT-3).
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sm text-left">
                Wird mein Fortschritt gespeichert?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">
                Ja, wenn du ein Konto erstellst, wird dein Fortschritt automatisch gespeichert. 
                Du kannst deine Statistiken jederzeit einsehen und deinen Lernfortschritt verfolgen.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-sm text-left">
                Kann ich die App offline nutzen?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">
                Die App benötigt eine Internetverbindung für die Anmeldung und das Speichern 
                des Fortschritts. Die Quizze selbst können auch mit einer langsamen Verbindung 
                problemlos genutzt werden.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-sm text-left">
                Wie kann ich Fehler melden?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">
                Wenn du einen Fehler in einem Quiz findest oder technische Probleme hast, 
                schreib uns einfach auf Telegram (@ale11111). Wir freuen uns über jedes Feedback!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Grammar Rules */}
        <section className="bg-card rounded-xl p-5 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Grammatik-Tipps</h3>
              <p className="text-sm text-muted-foreground">Wichtige Regeln im Überblick</p>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="grammar-1">
              <AccordionTrigger className="text-sm text-left">
                Artikel: der, die, das
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm space-y-2">
                <p><strong>der</strong> – maskulin (z.B. der Mann, der Tisch)</p>
                <p><strong>die</strong> – feminin (z.B. die Frau, die Lampe)</p>
                <p><strong>das</strong> – neutrum (z.B. das Kind, das Buch)</p>
                <p className="pt-2 text-xs">Tipp: Lerne neue Wörter immer mit dem Artikel!</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="grammar-2">
              <AccordionTrigger className="text-sm text-left">
                Akkusativ und Dativ
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm space-y-2">
                <p><strong>Akkusativ (Wen? Was?):</strong> den Mann, die Frau, das Kind</p>
                <p><strong>Dativ (Wem?):</strong> dem Mann, der Frau, dem Kind</p>
                <p className="pt-2 text-xs">Merkwörter: Für, Um, Durch, Gegen, Ohne → Akkusativ</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="grammar-3">
              <AccordionTrigger className="text-sm text-left">
                Perfekt bilden
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm space-y-2">
                <p><strong>haben + Partizip II:</strong> Ich habe gegessen.</p>
                <p><strong>sein + Partizip II:</strong> Ich bin gegangen. (bei Bewegung/Zustandsänderung)</p>
                <p className="pt-2 text-xs">Regelmäßig: ge- + Stamm + -t (gemacht)</p>
                <p className="text-xs">Unregelmäßig: ge- + Stamm + -en (gegessen)</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Privacy & Terms */}
        <section className="bg-card rounded-xl p-5 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <Shield className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Datenschutz</h3>
              <p className="text-sm text-muted-foreground">Deine Daten sind sicher</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Wir speichern nur die notwendigen Daten für deinen Lernfortschritt. 
            Deine Daten werden nicht an Dritte verkauft oder weitergegeben. 
            Bei Fragen zum Datenschutz kontaktiere uns auf Telegram.
          </p>
        </section>

        {/* Rate App */}
        <section className="bg-warning rounded-xl p-5 text-warning-foreground">
          <div className="flex items-center gap-3 mb-3">
            <Star className="w-8 h-8" />
            <div>
              <h3 className="font-bold text-lg">Gefällt dir die App?</h3>
              <p className="text-warning-foreground/80 text-sm">Teile sie mit Freunden!</p>
            </div>
          </div>
          <p className="text-warning-foreground/90 text-sm">
            Wenn dir die App beim Deutschlernen hilft, erzähle es weiter! 
            Jedes Feedback motiviert uns, die App noch besser zu machen. 🙏
          </p>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};
