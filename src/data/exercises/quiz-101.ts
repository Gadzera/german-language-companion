// Quiz 101 - ZT-2: Komposita bauen
// Формат: F7 - Komposita
// Задание: Bilden Sie zusammengesetzte Nomen (Komposita), schreiben Sie auch den Artikel!

// Beispiel: Haus + Übung → die Hausübung
export const quizExample = {
  question: "Haus + Übung = ?",
  answer: "<u>die Hausübung</u>"
};

// Wörter zur Auswahl laut PDF:
// Plastik, Haus, Ferien, Kurs
// Tonne, Kuchen, Dose, Buch
// Beginn, Wörter, Müll, Bett
// Teilnehmer, Kinder, Treppen, Apfel

export default [
  {
    id: "zt2-101-1",
    quiz_id: 101,
    question_text: "Bilden Sie ein Kompositum mit Artikel!",
    question_hint: "Plastik + Tonne = ?",
    format: "F7",
    word_de: "Plastik + Tonne",
    options: ["die Plastiktonne", "der Plastikton", "das Plastiktonne", "die Tonnenplastik"],
    correct_answer: "die Plastiktonne",
  },
  {
    id: "zt2-101-2",
    quiz_id: 101,
    question_text: "Bilden Sie ein Kompositum mit Artikel!",
    question_hint: "Müll + Dose = ?",
    format: "F7",
    word_de: "Müll + Dose",
    options: ["die Mülldose", "der Müllbeutel", "das Müllpaket", "die Dosenmüll"],
    correct_answer: "die Mülldose",
  },
  {
    id: "zt2-101-3",
    quiz_id: 101,
    question_text: "Bilden Sie ein Kompositum mit Artikel!",
    question_hint: "Apfel + Kuchen = ?",
    format: "F7",
    word_de: "Apfel + Kuchen",
    options: ["der Apfelkuchen", "die Apfelkuchen", "das Kuchenapfel", "der Kuchenapfel"],
    correct_answer: "der Apfelkuchen",
  },
  {
    id: "zt2-101-4",
    quiz_id: 101,
    question_text: "Bilden Sie ein Kompositum mit Artikel!",
    question_hint: "Kurs + Buch = ?",
    format: "F7",
    word_de: "Kurs + Buch",
    options: ["das Kursbuch", "der Kursbuch", "die Buchkurs", "das Buchkurs"],
    correct_answer: "das Kursbuch",
  },
  {
    id: "zt2-101-5",
    quiz_id: 101,
    question_text: "Bilden Sie ein Kompositum mit Artikel!",
    question_hint: "Kurs + Beginn = ?",
    format: "F7",
    word_de: "Kurs + Beginn",
    options: ["der Kursbeginn", "die Kursbeginn", "das Beginnkurs", "der Beginnkurs"],
    correct_answer: "der Kursbeginn",
  },
  {
    id: "zt2-101-6",
    quiz_id: 101,
    question_text: "Bilden Sie ein Kompositum mit Artikel!",
    question_hint: "Kurs + Teilnehmer = ?",
    format: "F7",
    word_de: "Kurs + Teilnehmer",
    options: ["der Kursteilnehmer", "die Kursteilnehmer", "das Teilnehmerkurs", "der Teilnehmerkurs"],
    correct_answer: "der Kursteilnehmer",
  },
  {
    id: "zt2-101-7",
    quiz_id: 101,
    question_text: "Bilden Sie ein Kompositum mit Artikel!",
    question_hint: "Kinder + Bett = ?",
    format: "F7",
    word_de: "Kinder + Bett",
    options: ["das Kinderbett", "der Kinderbett", "die Bettkinder", "das Bettkind"],
    correct_answer: "das Kinderbett",
  },
  {
    id: "zt2-101-8",
    quiz_id: 101,
    question_text: "Bilden Sie ein Kompositum mit Artikel!",
    question_hint: "Treppen + Haus = ?",
    format: "F7",
    word_de: "Treppen + Haus",
    options: ["das Treppenhaus", "der Treppenhaus", "die Haustreppen", "das Haustreppe"],
    correct_answer: "das Treppenhaus",
  },
];
