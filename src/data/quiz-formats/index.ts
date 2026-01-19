// Описания и инструкции для каждого формата викторины
// F0-F10 - разные типы упражнений

export interface FormatInfo {
  id: string;
  name: string;
  description: string;
  instruction: string;
  instructionRu: string;
}

export const quizFormats: Record<string, FormatInfo> = {
  F0: {
    id: 'F0',
    name: 'Flashcards / Wortschatz',
    description: 'Wortschatz lernen mit Karteikarten (25-Kadur-Methode)',
    instruction: 'Wählen Sie die richtige Übersetzung des Wortes.',
    instructionRu: 'Выберите правильный перевод слова. После ответа появится карточка для запоминания.',
  },
  F1: {
    id: 'F1',
    name: 'Einsetzen',
    description: 'Setzen Sie das passende Wort ein',
    instruction: 'Wählen Sie die richtige Antwort, um die Lücke zu füllen.',
    instructionRu: 'Выберите правильный вариант для заполнения пропуска.',
  },
  F2: {
    id: 'F2',
    name: 'Form / Kasus wählen',
    description: 'Wählen Sie die richtige Form',
    instruction: 'Wählen Sie die grammatisch richtige Form.',
    instructionRu: 'Выберите грамматически правильную форму (падеж, артикль).',
  },
  F3: {
    id: 'F3',
    name: 'Satzstruktur mit Auswahl',
    description: 'Wählen Sie die richtige Option',
    instruction: 'Wählen Sie die passende Option für den Satz.',
    instructionRu: 'Выберите подходящий вариант для предложения.',
  },
  F4: {
    id: 'F4',
    name: 'Einsetzen aus Liste',
    description: 'Setzen Sie Wörter aus der Liste in die Lücken ein',
    instruction: 'Wählen Sie ein Wort und klicken Sie auf eine Lücke, um es einzusetzen. Klicken Sie auf eine gefüllte Lücke, um das Wort zu entfernen.',
    instructionRu: 'Выберите слово и нажмите на пропуск, чтобы вставить его. Нажмите на заполненный пропуск, чтобы удалить слово.',
  },
  F5: {
    id: 'F5',
    name: 'Umformen',
    description: 'Bilden Sie die richtige Form',
    instruction: 'Ordnen Sie die Wörter, um den Satz zu bilden.',
    instructionRu: 'Расставьте слова в правильном порядке, чтобы составить предложение.',
  },
  F6: {
    id: 'F6',
    name: 'Richtige Wahl im Kontext',
    description: 'Wählen Sie die kontextuell richtige Option',
    instruction: 'Wählen Sie die Option, die im Kontext passt.',
    instructionRu: 'Выберите вариант, который подходит по контексту.',
  },
  F7: {
    id: 'F7',
    name: 'Komposita bauen',
    description: 'Bilden Sie zusammengesetzte Wörter',
    instruction: 'Verbinden Sie die Wortteile zu einem zusammengesetzten Wort.',
    instructionRu: 'Соедините части слов, чтобы составить сложное слово (Kompositum).',
  },
  F8: {
    id: 'F8',
    name: 'Zuordnen / Bilden',
    description: 'Ordnen Sie zu oder bilden Sie Paare',
    instruction: 'Wählen Sie die richtige Zuordnung.',
    instructionRu: 'Выберите правильное соответствие.',
  },
  F9: {
    id: 'F9',
    name: 'Wort passt nicht',
    description: 'Finden Sie das Wort, das nicht passt',
    instruction: 'Welches Wort passt nicht zu den anderen?',
    instructionRu: 'Какое слово не подходит к остальным? Выберите лишнее.',
  },
  F10: {
    id: 'F10',
    name: 'Satz aus Wörtern bauen',
    description: 'Bauen Sie einen Satz aus den gegebenen Wörtern',
    instruction: 'Klicken Sie auf die Wörter in der richtigen Reihenfolge, um einen korrekten Satz zu bilden. Es gibt mehrere richtige Lösungen mit verschiedenen Konjunktionen.',
    instructionRu: 'Нажимайте на слова в правильном порядке, чтобы составить предложение. Есть несколько правильных решений с разными союзами (wenn, weil, ob, dass, warum).',
  },
};

export const getFormatInfo = (formatId: string): FormatInfo | undefined => {
  return quizFormats[formatId];
};

export const getFormatInstruction = (formatId: string, language: 'de' | 'ru' = 'de'): string => {
  const format = quizFormats[formatId];
  if (!format) return '';
  return language === 'ru' ? format.instructionRu : format.instruction;
};
