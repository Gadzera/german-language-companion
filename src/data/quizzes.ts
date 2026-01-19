export type QuizCategory = 
  | 'cards' 
  | 'grammatik-a1' 
  | 'grammatik-a2' 
  | 'grammatik-b1' 
  | 'wortschatz' 
  | 'zt1' 
  | 'zt2' 
  | 'zt3';

export type QuizLevel = 'A1' | 'A2' | 'B1' | 'ZT-1' | 'ZT-2' | 'ZT-3';

export interface Quiz {
  id: number;
  title: string;
  format: string;
  category: QuizCategory;
  level: QuizLevel;
  duration: string;
  completed?: boolean;
  inProgress?: boolean;
}

export const quizzes: Quiz[] = [
  // A) Карточки (25 кадр, F0)
  { id: 1, title: "Wortschatz A1 – Nomen mit Artikel", format: "F0", category: "cards", level: "A1", duration: "5-7 Min" },
  { id: 2, title: "Wortschatz A1 – Alle anderen Wörter", format: "F0", category: "cards", level: "A1", duration: "5-7 Min" },
  { id: 3, title: "Wortschatz A2 – Nomen mit Artikel", format: "F0", category: "cards", level: "A2", duration: "6-8 Min" },
  { id: 4, title: "Wortschatz A2 – Alle anderen Wörter", format: "F0", category: "cards", level: "A2", duration: "6-8 Min" },
  { id: 5, title: "Wortschatz B1 – Nomen mit Artikel", format: "F0", category: "cards", level: "B1", duration: "7-10 Min" },
  { id: 6, title: "Wortschatz B1 – Alle anderen Wörter", format: "F0", category: "cards", level: "B1", duration: "7-10 Min" },

  // B) Grammatik A1
  { id: 7, title: "der / die / das einsetzen", format: "F1", category: "grammatik-a1", level: "A1", duration: "3-5 Min" },
  { id: 8, title: "ein / eine einsetzen", format: "F1", category: "grammatik-a1", level: "A1", duration: "3-5 Min" },
  { id: 9, title: "kein / keine einsetzen", format: "F1", category: "grammatik-a1", level: "A1", duration: "3-5 Min" },
  { id: 10, title: "Possessivartikel mein / dein / sein …", format: "F1", category: "grammatik-a1", level: "A1", duration: "4-6 Min" },
  { id: 11, title: "Pluralformen einsetzen", format: "F1", category: "grammatik-a1", level: "A1", duration: "4-6 Min" },
  { id: 12, title: "Nullartikel (leer) einsetzen", format: "F1", category: "grammatik-a1", level: "A1", duration: "3-5 Min" },
  { id: 13, title: "Personalpronomen Nominativ", format: "F1", category: "grammatik-a1", level: "A1", duration: "3-5 Min" },
  { id: 14, title: "Personalpronomen Akkusativ", format: "F1", category: "grammatik-a1", level: "A1", duration: "3-5 Min" },
  { id: 15, title: "Personalpronomen Dativ", format: "F1", category: "grammatik-a1", level: "A1", duration: "4-6 Min" },
  { id: 16, title: "Reflexivpronomen (mich / mir)", format: "F1", category: "grammatik-a1", level: "A1", duration: "4-6 Min" },
  { id: 17, title: "nicht oder kein", format: "F1", category: "grammatik-a1", level: "A1", duration: "4-6 Min" },
  { id: 18, title: "Präsens regelmäßige Verben", format: "F1", category: "grammatik-a1", level: "A1", duration: "5-7 Min" },
  { id: 19, title: "Präsens unregelmäßige Verben", format: "F1", category: "grammatik-a1", level: "A1", duration: "5-7 Min" },
  { id: 20, title: "Trennbare Verben (Position im Satz)", format: "F3", category: "grammatik-a1", level: "A1", duration: "5-7 Min" },
  { id: 21, title: "W-Fragen (Fragewort einsetzen)", format: "F1", category: "grammatik-a1", level: "A1", duration: "4-6 Min" },
  { id: 22, title: "Ja/Nein-Fragen (Wortstellung)", format: "F10", category: "grammatik-a1", level: "A1", duration: "5-7 Min" },
  { id: 23, title: "Hauptsatz: Verb auf Position 2", format: "F10", category: "grammatik-a1", level: "A1", duration: "5-7 Min" },
  { id: 24, title: "Zeit – Art – Ort (Wortstellung)", format: "F10", category: "grammatik-a1", level: "A1", duration: "5-7 Min" },
  { id: 25, title: "Präpositionen Grundbedeutung", format: "F6", category: "grammatik-a1", level: "A1", duration: "5-7 Min" },
  { id: 26, title: "Akkusativ nach Verben", format: "F1", category: "grammatik-a1", level: "A1", duration: "4-6 Min" },

  // C) Grammatik A2
  { id: 27, title: "Dativ nach Verben", format: "F1", category: "grammatik-a2", level: "A2", duration: "4-6 Min" },
  { id: 28, title: "Akkusativ + Dativ im Satz", format: "F3", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 29, title: "Präpositionen mit Dativ", format: "F2", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 30, title: "Präpositionen mit Akkusativ", format: "F2", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 31, title: "Wechselpräpositionen (wo / wohin)", format: "F2", category: "grammatik-a2", level: "A2", duration: "6-8 Min" },
  { id: 32, title: "Präposition + Artikel (im / am / zum …)", format: "F1", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 33, title: "wo oder wohin", format: "F6", category: "grammatik-a2", level: "A2", duration: "4-6 Min" },
  { id: 34, title: "Modalverben im Satz", format: "F3", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 35, title: "Perfekt: haben oder sein", format: "F6", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 36, title: "Perfekt Partizip einsetzen", format: "F1", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 37, title: "Präteritum sein / haben", format: "F1", category: "grammatik-a2", level: "A2", duration: "4-6 Min" },
  { id: 38, title: "Präteritum Modalverben", format: "F1", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 39, title: "Konnektoren und / oder / aber / denn / sondern", format: "F6", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 40, title: "Nebensatz mit weil", format: "F3", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 41, title: "Nebensatz mit dass", format: "F3", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 42, title: "Nebensatz mit wenn", format: "F3", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 43, title: "Verb am Ende im Nebensatz", format: "F10", category: "grammatik-a2", level: "A2", duration: "6-8 Min" },
  { id: 44, title: "als / wenn / wann", format: "F6", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 45, title: "Relativpronomen Nominativ", format: "F1", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 46, title: "Imperativ du", format: "F5", category: "grammatik-a2", level: "A2", duration: "4-5 Min" },
  { id: 47, title: "Imperativ ihr", format: "F5", category: "grammatik-a2", level: "A2", duration: "4-5 Min" },
  { id: 48, title: "Imperativ Sie", format: "F5", category: "grammatik-a2", level: "A2", duration: "4-5 Min" },
  { id: 49, title: "Adjektiv Komparativ", format: "F1", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 50, title: "Adjektiv Superlativ", format: "F1", category: "grammatik-a2", level: "A2", duration: "5-7 Min" },
  { id: 51, title: "Mix A1–A2 (Wiederholung)", format: "F3", category: "grammatik-a2", level: "A2", duration: "8-10 Min" },

  // D) Grammatik B1
  { id: 52, title: "obwohl / trotzdem", format: "F3", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 53, title: "damit", format: "F3", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 54, title: "um … zu", format: "F3", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 55, title: "nachdem", format: "F3", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 56, title: "bevor", format: "F3", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 57, title: "während", format: "F3", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 58, title: "Relativpronomen Akkusativ", format: "F1", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 59, title: "Relativpronomen Dativ", format: "F1", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 60, title: "Präposition + Relativ", format: "F6", category: "grammatik-b1", level: "B1", duration: "6-8 Min" },
  { id: 61, title: "Plusquamperfekt", format: "F3", category: "grammatik-b1", level: "B1", duration: "6-8 Min" },
  { id: 62, title: "Futur I", format: "F1", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 63, title: "Perfekt oder Präteritum", format: "F6", category: "grammatik-b1", level: "B1", duration: "6-8 Min" },
  { id: 64, title: "Passiv Präsens", format: "F3", category: "grammatik-b1", level: "B1", duration: "6-8 Min" },
  { id: 65, title: "Passiv Perfekt", format: "F3", category: "grammatik-b1", level: "B1", duration: "6-8 Min" },
  { id: 66, title: "Aktiv → Passiv", format: "F5", category: "grammatik-b1", level: "B1", duration: "6-8 Min" },
  { id: 67, title: "deshalb / darum / deswegen", format: "F6", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 68, title: "außerdem / nämlich / trotzdem", format: "F6", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 69, title: "einerseits … andererseits", format: "F3", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 70, title: "Verben mit Präposition", format: "F8", category: "grammatik-b1", level: "B1", duration: "6-8 Min" },
  { id: 71, title: "Präposition + Kasus", format: "F6", category: "grammatik-b1", level: "B1", duration: "6-8 Min" },
  { id: 72, title: "Konjunktiv II: sein / haben", format: "F1", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 73, title: "würde + Infinitiv", format: "F1", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 74, title: "Höfliche Bitten", format: "F6", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 75, title: "nicht-Stellung im komplexen Satz", format: "F3", category: "grammatik-b1", level: "B1", duration: "6-8 Min" },
  { id: 76, title: "Satzbau B1 (Haupt + Nebensatz)", format: "F10", category: "grammatik-b1", level: "B1", duration: "7-10 Min" },
  { id: 77, title: "Partizip I als Adjektiv", format: "F1", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },
  { id: 78, title: "Partizip II als Adjektiv", format: "F1", category: "grammatik-b1", level: "B1", duration: "5-7 Min" },

  // E) Wortschatz-Übungen
  { id: 79, title: "Komposita bauen (Grundtrainer)", format: "F7", category: "wortschatz", level: "A2", duration: "5-7 Min" },
  { id: 80, title: "Komposita mit Fugen-s-Highlight", format: "F7", category: "wortschatz", level: "A2", duration: "5-7 Min" },
  { id: 81, title: "Gegenteile (Antonyme)", format: "F8", category: "wortschatz", level: "A2", duration: "5-7 Min" },
  { id: 82, title: "Wort passt nicht", format: "F9", category: "wortschatz", level: "A2", duration: "5-7 Min" },
  { id: 83, title: "Wortbildung Nomen → Verb / Adjektiv", format: "F8", category: "wortschatz", level: "B1", duration: "6-8 Min" },
  { id: 84, title: "Verben + passende Ergänzung", format: "F6", category: "wortschatz", level: "B1", duration: "5-7 Min" },

  // F) ZT-1 Vorbereitung (Grammatik 22P + Wortschatz 8P)
  { id: 85, title: "Fragen mit Fragepronomen bilden", format: "F10", category: "zt1", level: "ZT-1", duration: "5-7 Min" },
  { id: 86, title: "Negative Antworten bilden", format: "F5", category: "zt1", level: "ZT-1", duration: "4-6 Min" },
  { id: 87, title: "Konnektoren (und / aber / oder / denn / sondern)", format: "F6", category: "zt1", level: "ZT-1", duration: "5-7 Min" },
  { id: 88, title: "Modalverben einsetzen", format: "F4", category: "zt1", level: "ZT-1", duration: "5-7 Min" },
  { id: 89, title: "Possessivartikel einsetzen", format: "F3", category: "zt1", level: "ZT-1", duration: "4-6 Min" },
  { id: 90, title: "Wortreihen (Nomen + Artikel)", format: "F4", category: "zt1", level: "ZT-1", duration: "4-6 Min" },
  { id: 91, title: "Gegenteile (Antonyme)", format: "F8", category: "zt1", level: "ZT-1", duration: "4-6 Min" },
  { id: 92, title: "der / die / das einsetzen", format: "F1", category: "zt1", level: "ZT-1", duration: "3-5 Min" },

  // G) ZT-2 Vorbereitung (Hören 10P + Grammatik 20P + Wortschatz 10P)
  { id: 93, title: "Lesen: Kinderuni Wien (Richtig/Falsch)", format: "F11", category: "zt2", level: "ZT-2", duration: "8-10 Min" },
  { id: 94, title: "Präposition + Artikel einsetzen", format: "F4", category: "zt2", level: "ZT-2", duration: "5-7 Min" },
  { id: 95, title: "Reflexive Verben einsetzen", format: "F4", category: "zt2", level: "ZT-2", duration: "4-6 Min" },
  { id: 96, title: "Dativ / Akkusativ einsetzen", format: "F4", category: "zt2", level: "ZT-2", duration: "5-7 Min" },
  { id: 97, title: "Imperativ bilden", format: "F5", category: "zt2", level: "ZT-2", duration: "4-5 Min" },
  { id: 98, title: "Konnektoren dass / weil / wenn", format: "F6", category: "zt2", level: "ZT-2", duration: "5-7 Min" },
  { id: 99, title: "Personalpronomen im Text", format: "F4", category: "zt2", level: "ZT-2", duration: "5-7 Min" },
  { id: 100, title: "Wort passt nicht (Wortschatz)", format: "F9", category: "zt2", level: "ZT-2", duration: "4-6 Min" },
  { id: 101, title: "Komposita bauen", format: "F7", category: "zt2", level: "ZT-2", duration: "5-7 Min" },

  // H) ZT-3 Vorbereitung (Lesen 12P + Grammatik 18P + Wortschatz 10P)
  { id: 102, title: "Lesen: Sicherheit im Sommerurlaub (Richtig/Falsch)", format: "F11", category: "zt3", level: "ZT-3", duration: "10-12 Min" },
  { id: 103, title: "Lesen: Verben im Text einsetzen", format: "F4", category: "zt3", level: "ZT-3", duration: "6-8 Min" },
  { id: 104, title: "Nebensätze: wenn / warum / dass / ob / weil", format: "F10", category: "zt3", level: "ZT-3", duration: "6-8 Min" },
  { id: 105, title: "als / wann / wenn", format: "F6", category: "zt3", level: "ZT-3", duration: "5-7 Min" },
  { id: 106, title: "Relativpronomen einsetzen", format: "F3", category: "zt3", level: "ZT-3", duration: "5-7 Min" },
  { id: 107, title: "Adjektiv: Positiv / Komparativ / Superlativ", format: "F4", category: "zt3", level: "ZT-3", duration: "5-7 Min" },
  { id: 108, title: "Präposition richtig wählen", format: "F6", category: "zt3", level: "ZT-3", duration: "5-7 Min" },
  { id: 109, title: "Präteritum ↔ Infinitiv zuordnen", format: "F8", category: "zt3", level: "ZT-3", duration: "5-7 Min" },
  { id: 110, title: "Wortbildung (Nomen bilden)", format: "F8", category: "zt3", level: "ZT-3", duration: "5-7 Min" },
];

export interface CategoryInfo {
  id: QuizCategory;
  name: string;
  subtitle: string;
  quizRange: string;
  levelClass: string;
  quizIds: number[];
}

export const categories: CategoryInfo[] = [
  { 
    id: "cards", 
    name: "Kartenlernen", 
    subtitle: "Карточки (25 кадр)", 
    quizRange: "1-6", 
    levelClass: "level-cards",
    quizIds: [1, 2, 3, 4, 5, 6]
  },
  { 
    id: "grammatik-a1", 
    name: "A1", 
    subtitle: "Grammatik · Wortschatz", 
    quizRange: "7-26", 
    levelClass: "level-a1",
    quizIds: Array.from({ length: 20 }, (_, i) => i + 7)
  },
  { 
    id: "grammatik-a2", 
    name: "A2", 
    subtitle: "Grammatik · Wortschatz", 
    quizRange: "27-51", 
    levelClass: "level-a2",
    quizIds: Array.from({ length: 25 }, (_, i) => i + 27)
  },
  { 
    id: "grammatik-b1", 
    name: "B1", 
    subtitle: "Grammatik · Wortschatz", 
    quizRange: "52-78", 
    levelClass: "level-b1",
    quizIds: Array.from({ length: 27 }, (_, i) => i + 52)
  },
  { 
    id: "wortschatz", 
    name: "Wortschatz", 
    subtitle: "Übungen", 
    quizRange: "79-84", 
    levelClass: "level-wortschatz",
    quizIds: [79, 80, 81, 82, 83, 84]
  },
  { 
    id: "zt1", 
    name: "ZT-1", 
    subtitle: "Vorbereitung", 
    quizRange: "85-92", 
    levelClass: "level-zt1",
    quizIds: [85, 86, 87, 88, 89, 90, 91, 92]
  },
  { 
    id: "zt2", 
    name: "ZT-2", 
    subtitle: "Vorbereitung", 
    quizRange: "93-101", 
    levelClass: "level-zt2",
    quizIds: [93, 94, 95, 96, 97, 98, 99, 100, 101]
  },
  { 
    id: "zt3", 
    name: "ZT-3", 
    subtitle: "Vorbereitung", 
    quizRange: "102-110", 
    levelClass: "level-zt3",
    quizIds: [102, 103, 104, 105, 106, 107, 108, 109, 110]
  },
];

export const getQuizzesByCategory = (categoryId: QuizCategory): Quiz[] => {
  const category = categories.find(c => c.id === categoryId);
  if (!category) return [];
  return quizzes.filter(q => category.quizIds.includes(q.id));
};

export const getQuizById = (id: number): Quiz | undefined => {
  return quizzes.find(q => q.id === id);
};
