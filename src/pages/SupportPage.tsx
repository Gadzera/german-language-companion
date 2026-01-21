import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { BookOpen, HelpCircle, MessageCircle, ChevronDown, ChevronUp, ExternalLink, Code2 } from 'lucide-react';

const grammarRules = [
  {
    title: 'Artikel (der, die, das)',
    content: 'Im Deutschen gibt es drei Artikel: der (maskulin), die (feminin), das (neutral). Der Artikel muss mit dem Nomen übereinstimmen. Beispiel: der Tisch, die Lampe, das Buch.'
  },
  {
    title: 'Pluralbildung',
    content: 'Deutsche Nomen bilden den Plural auf verschiedene Weisen: -e (der Tisch → die Tische), -en (die Frau → die Frauen), -er (das Kind → die Kinder), -s (das Auto → die Autos), oder Umlaut (der Vater → die Väter).'
  },
  {
    title: 'Verbkonjugation (Präsens)',
    content: 'Regelmäßige Verben: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en. Beispiel: spielen → ich spiele, du spielst, er spielt, wir spielen, ihr spielt, sie spielen.'
  },
  {
    title: 'Perfekt',
    content: 'Das Perfekt wird mit haben/sein + Partizip II gebildet. Beispiel: Ich habe gespielt. Ich bin gegangen. Bewegungsverben und Zustandsänderungen nutzen "sein".'
  },
  {
    title: 'Dativ und Akkusativ',
    content: 'Akkusativ beantwortet "wen/was?", Dativ beantwortet "wem?". Beispiel: Ich gebe dem Mann (Dativ) das Buch (Akkusativ). Präpositionen bestimmen oft den Fall.'
  },
  {
    title: 'Wortstellung',
    content: 'Im Hauptsatz steht das Verb an zweiter Position. Im Nebensatz steht das Verb am Ende. Beispiel: Ich gehe heute ins Kino. Ich weiß, dass er heute ins Kino geht.'
  },
  {
    title: 'Modalverben',
    content: 'können, müssen, wollen, sollen, dürfen, mögen. Das Hauptverb steht im Infinitiv am Satzende. Beispiel: Ich kann Deutsch sprechen. Du musst arbeiten.'
  },
  {
    title: 'Adjektivdeklination',
    content: 'Adjektive vor Nomen werden dekliniert. Mit bestimmtem Artikel: -e/-en. Mit unbestimmtem Artikel: -er/-e/-es/-en. Ohne Artikel: starke Endungen.'
  }
];

const faqItems = [
  {
    question: 'Wie funktioniert die App?',
    answer: 'Wähle ein Level (A1, A2, B1) oder ein Thema aus, absolviere Quizze und sammle Punkte. Dein Fortschritt wird automatisch gespeichert, wenn du angemeldet bist.'
  },
  {
    question: 'Muss ich mich registrieren?',
    answer: 'Du kannst die App auch ohne Registrierung nutzen. Mit einem Konto werden dein Fortschritt und deine Punkte gespeichert und du erscheinst im Leaderboard.'
  },
  {
    question: 'Was bedeuten die Levels A1, A2, B1?',
    answer: 'Das sind die Sprachniveaus nach dem Gemeinsamen Europäischen Referenzrahmen (GER). A1 ist Anfänger, A2 ist Grundlagen, B1 ist Mittelstufe.'
  },
  {
    question: 'Wie bekomme ich Punkte?',
    answer: 'Du erhältst Punkte für jede richtige Antwort. Wenn du ein Quiz komplett abschließt, bekommst du zusätzlich 10 Bonuspunkte.'
  },
  {
    question: 'Kann ich die Übersetzungssprache ändern?',
    answer: 'Ja! Gehe zu deinem Profil und wähle deine bevorzugte Sprache für Übersetzungen (Russisch, Ukrainisch, Englisch, Türkisch, Arabisch).'
  },
  {
    question: 'Sind die Quizze kostenlos?',
    answer: 'Ja, alle Quizze sind kostenlos verfügbar. Premium-Funktionen werden in Zukunft optional angeboten.'
  },
  {
    question: 'Wie kann ich meinen Fortschritt sehen?',
    answer: 'Klicke auf "Fortschritt" in der unteren Navigation, um eine Übersicht aller Levels und deinen Abschlussstand zu sehen.'
  }
];

export const SupportPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [expandedRule, setExpandedRule] = useState<number | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Support" />

      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-4">
          {/* Grammar Rules */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => toggleSection('grammar')}
              className="w-full p-4 flex items-center gap-4 hover:bg-accent/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground">Grammatik-Regeln</h3>
                <p className="text-sm text-muted-foreground">Alle wichtigen Regeln nachschlagen</p>
              </div>
              {expandedSection === 'grammar' ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            
            {expandedSection === 'grammar' && (
              <div className="px-4 pb-4 space-y-2">
                {grammarRules.map((rule, index) => (
                  <div key={index} className="bg-accent/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedRule(expandedRule === index ? null : index)}
                      className="w-full p-3 flex items-center justify-between text-left hover:bg-accent/50 transition-colors"
                    >
                      <span className="font-medium text-foreground text-sm">{rule.title}</span>
                      {expandedRule === index ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                    {expandedRule === index && (
                      <p className="px-3 pb-3 text-sm text-muted-foreground">{rule.content}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FAQ */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => toggleSection('faq')}
              className="w-full p-4 flex items-center gap-4 hover:bg-accent/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-success" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground">FAQ</h3>
                <p className="text-sm text-muted-foreground">Häufig gestellte Fragen</p>
              </div>
              {expandedSection === 'faq' ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            
            {expandedSection === 'faq' && (
              <div className="px-4 pb-4 space-y-2">
                {faqItems.map((item, index) => (
                  <div key={index} className="bg-accent/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-3 flex items-center justify-between text-left hover:bg-accent/50 transition-colors"
                    >
                      <span className="font-medium text-foreground text-sm">{item.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <p className="px-3 pb-3 text-sm text-muted-foreground">{item.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => toggleSection('contact')}
              className="w-full p-4 flex items-center gap-4 hover:bg-accent/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-warning" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground">Kontakt</h3>
                <p className="text-sm text-muted-foreground">Hilfe vom Support-Team</p>
              </div>
              {expandedSection === 'contact' ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            
            {expandedSection === 'contact' && (
              <div className="px-4 pb-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Hast du Fragen, Vorschläge oder Probleme? Kontaktiere uns gerne!
                </p>
                
                <a
                  href="https://t.me/ale11111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0088cc]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.144.12.1.153.235.168.332.015.097.033.317.019.49z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Telegram</p>
                    <p className="text-sm text-muted-foreground">@ale11111</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>

                <div className="text-xs text-muted-foreground text-center pt-2">
                  Wir antworten normalerweise innerhalb von 24 Stunden.
                </div>
              </div>
            )}
          </div>

          {/* Developer Credit */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <Code2 className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Entwickelt von</p>
                <p className="font-semibold text-foreground">Gadzera Aleksandr</p>
              </div>
            </div>
          </div>

          {/* App Version */}
          <div className="text-center text-xs text-muted-foreground pt-2">
            German Language Companion v1.0.0
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
