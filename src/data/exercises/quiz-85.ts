// Quiz 85 - ZT-1: Lesen - Neue Öffnungszeiten der Stadtbibliothek (Richtig/Falsch)
// Формат: F11 - Richtig oder Falsch
// Задание: Lesen Sie den Text und entscheiden Sie: Ist die Aussage richtig (R) oder falsch (F)?

export const readingText = `Neue Öffnungszeiten der Stadtbibliothek

Liebe Leserinnen und Leser,

wir möchten Sie über unsere neuen Öffnungszeiten informieren. Ab dem 1. September gelten folgende Zeiten:

Montag bis Freitag: 9:00 - 19:00 Uhr
Samstag: 10:00 - 16:00 Uhr
Sonntag: geschlossen

Bitte beachten Sie: Am letzten Mittwoch jedes Monats schließen wir bereits um 14:00 Uhr für interne Fortbildungen. An Feiertagen bleibt die Bibliothek geschlossen.

Neu ist unser Rückgabeautomat am Haupteingang. Sie können Bücher jetzt rund um die Uhr zurückgeben – auch wenn die Bibliothek geschlossen ist. Der Automat ist einfach zu bedienen und gibt Ihnen sofort eine Quittung.

Außerdem haben wir jetzt kostenloses WLAN in allen Räumen. Das Passwort erhalten Sie an der Information.

Wir freuen uns auf Ihren Besuch!

Ihr Bibliotheksteam`;

export default [
  {
    id: "zt1-85-1",
    quiz_id: 85,
    question_text: "Die neuen Öffnungszeiten beginnen am 1. September.",
    question_hint: "Lesen Sie den Text und entscheiden Sie: Ist die Aussage richtig (R) oder falsch (F)?",
    format: "F11",
    reading_text: readingText,
    text_reference: "Ab dem 1. September gelten folgende Zeiten",
    options: ["Richtig", "Falsch"],
    correct_answer: "Richtig",
  },
  {
    id: "zt1-85-2",
    quiz_id: 85,
    question_text: "Die Bibliothek ist am Sonntag geöffnet.",
    question_hint: "Lesen Sie den Text und entscheiden Sie: Ist die Aussage richtig (R) oder falsch (F)?",
    format: "F11",
    reading_text: readingText,
    text_reference: "Sonntag: geschlossen",
    options: ["Richtig", "Falsch"],
    correct_answer: "Falsch",
  },
  {
    id: "zt1-85-3",
    quiz_id: 85,
    question_text: "Am Samstag schließt die Bibliothek um 19:00 Uhr.",
    question_hint: "Lesen Sie den Text und entscheiden Sie: Ist die Aussage richtig (R) oder falsch (F)?",
    format: "F11",
    reading_text: readingText,
    text_reference: "Samstag: 10:00 - 16:00 Uhr",
    options: ["Richtig", "Falsch"],
    correct_answer: "Falsch",
  },
  {
    id: "zt1-85-4",
    quiz_id: 85,
    question_text: "Jeden letzten Mittwoch im Monat schließt die Bibliothek früher.",
    question_hint: "Lesen Sie den Text und entscheiden Sie: Ist die Aussage richtig (R) oder falsch (F)?",
    format: "F11",
    reading_text: readingText,
    text_reference: "Am letzten Mittwoch jedes Monats schließen wir bereits um 14:00 Uhr",
    options: ["Richtig", "Falsch"],
    correct_answer: "Richtig",
  },
  {
    id: "zt1-85-5",
    quiz_id: 85,
    question_text: "Der Rückgabeautomat funktioniert nur während der Öffnungszeiten.",
    question_hint: "Lesen Sie den Text und entscheiden Sie: Ist die Aussage richtig (R) oder falsch (F)?",
    format: "F11",
    reading_text: readingText,
    text_reference: "Sie können Bücher jetzt rund um die Uhr zurückgeben – auch wenn die Bibliothek geschlossen ist.",
    options: ["Richtig", "Falsch"],
    correct_answer: "Falsch",
  },
  {
    id: "zt1-85-6",
    quiz_id: 85,
    question_text: "Man bekommt eine Quittung, wenn man Bücher am Automaten zurückgibt.",
    question_hint: "Lesen Sie den Text und entscheiden Sie: Ist die Aussage richtig (R) oder falsch (F)?",
    format: "F11",
    reading_text: readingText,
    text_reference: "Der Automat ist einfach zu bedienen und gibt Ihnen sofort eine Quittung.",
    options: ["Richtig", "Falsch"],
    correct_answer: "Richtig",
  },
  {
    id: "zt1-85-7",
    quiz_id: 85,
    question_text: "WLAN ist nur im Lesesaal verfügbar.",
    question_hint: "Lesen Sie den Text und entscheiden Sie: Ist die Aussage richtig (R) oder falsch (F)?",
    format: "F11",
    reading_text: readingText,
    text_reference: "Außerdem haben wir jetzt kostenloses WLAN in allen Räumen.",
    options: ["Richtig", "Falsch"],
    correct_answer: "Falsch",
  },
  {
    id: "zt1-85-8",
    quiz_id: 85,
    question_text: "Das WLAN-Passwort bekommt man an der Information.",
    question_hint: "Lesen Sie den Text und entscheiden Sie: Ist die Aussage richtig (R) oder falsch (F)?",
    format: "F11",
    reading_text: readingText,
    text_reference: "Das Passwort erhalten Sie an der Information.",
    options: ["Richtig", "Falsch"],
    correct_answer: "Richtig",
  },
];
