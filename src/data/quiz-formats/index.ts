// Описания и инструкции для каждого формата викторины
// F0-F10 - разные типы упражнений
// Все 11 форматов в одном файле

import { TranslationLanguage } from '@/contexts/LanguageContext';

export interface FormatInfo {
  id: string;
  name: string;
  description: string;
  instruction: string; // Немецкий - всегда показывается
  translations: Record<TranslationLanguage, string>; // Переводы на 4 языка
}

export const quizFormats: Record<string, FormatInfo> = {
  F0: {
    id: 'F0',
    name: 'Flashcards / Wortschatz',
    description: 'Wortschatz lernen mit Karteikarten (25-Kadur-Methode)',
    instruction: 'Wählen Sie die richtige Übersetzung des Wortes.',
    translations: {
      ru: 'Выберите правильный перевод слова.',
      tr: 'Kelimenin doğru çevirisini seçin.',
      fa: 'ترجمه صحیح کلمه را انتخاب کنید.',
      ar: 'اختر الترجمة الصحيحة للكلمة.',
    },
  },
  F1: {
    id: 'F1',
    name: 'Einsetzen',
    description: 'Setzen Sie das passende Wort ein',
    instruction: 'Wählen Sie die richtige Antwort, um die Lücke zu füllen.',
    translations: {
      ru: 'Выберите правильный вариант для заполнения пропуска.',
      tr: 'Boşluğu doldurmak için doğru cevabı seçin.',
      fa: 'پاسخ صحیح را برای پر کردن جای خالی انتخاب کنید.',
      ar: 'اختر الإجابة الصحيحة لملء الفراغ.',
    },
  },
  F2: {
    id: 'F2',
    name: 'Form / Kasus wählen',
    description: 'Wählen Sie die richtige Form',
    instruction: 'Wählen Sie die grammatisch richtige Form.',
    translations: {
      ru: 'Выберите грамматически правильную форму (падеж, артикль).',
      tr: 'Dilbilgisi açısından doğru formu seçin.',
      fa: 'فرم صحیح دستوری را انتخاب کنید.',
      ar: 'اختر الصيغة النحوية الصحيحة.',
    },
  },
  F3: {
    id: 'F3',
    name: 'Satzstruktur mit Auswahl',
    description: 'Wählen Sie die richtige Option',
    instruction: 'Wählen Sie die passende Option für den Satz.',
    translations: {
      ru: 'Выберите подходящий вариант для предложения.',
      tr: 'Cümle için uygun seçeneği seçin.',
      fa: 'گزینه مناسب را برای جمله انتخاب کنید.',
      ar: 'اختر الخيار المناسب للجملة.',
    },
  },
  F4: {
    id: 'F4',
    name: 'Einsetzen aus Liste',
    description: 'Setzen Sie Wörter aus der Liste in die Lücken ein',
    instruction: 'Wählen Sie ein Wort und klicken Sie auf eine Lücke. Klicken Sie erneut, um zu entfernen.',
    translations: {
      ru: 'Выберите слово и нажмите на пропуск. Нажмите ещё раз, чтобы удалить.',
      tr: 'Bir kelime seçin ve boşluğa tıklayın. Kaldırmak için tekrar tıklayın.',
      fa: 'یک کلمه انتخاب کنید و روی جای خالی کلیک کنید. برای حذف دوباره کلیک کنید.',
      ar: 'اختر كلمة وانقر على الفراغ. انقر مرة أخرى للإزالة.',
    },
  },
  F5: {
    id: 'F5',
    name: 'Umformen',
    description: 'Bilden Sie die richtige Form',
    instruction: 'Ordnen Sie die Wörter, um den Satz zu bilden.',
    translations: {
      ru: 'Расставьте слова в правильном порядке.',
      tr: 'Cümle oluşturmak için kelimeleri sıralayın.',
      fa: 'کلمات را برای ساختن جمله مرتب کنید.',
      ar: 'رتب الكلمات لتكوين الجملة.',
    },
  },
  F6: {
    id: 'F6',
    name: 'Richtige Wahl im Kontext',
    description: 'Wählen Sie die kontextuell richtige Option',
    instruction: 'Wählen Sie die Option, die im Kontext passt.',
    translations: {
      ru: 'Выберите вариант, который подходит по контексту.',
      tr: 'Bağlama uygun seçeneği seçin.',
      fa: 'گزینه‌ای را انتخاب کنید که در متن مناسب است.',
      ar: 'اختر الخيار المناسب للسياق.',
    },
  },
  F7: {
    id: 'F7',
    name: 'Komposita bauen',
    description: 'Bilden Sie zusammengesetzte Wörter',
    instruction: 'Verbinden Sie die Wortteile zu einem zusammengesetzten Wort.',
    translations: {
      ru: 'Соедините части слов в сложное слово (Kompositum).',
      tr: 'Kelime parçalarını birleşik bir kelime oluşturmak için birleştirin.',
      fa: 'قسمت‌های کلمه را به یک کلمه مرکب وصل کنید.',
      ar: 'اربط أجزاء الكلمة لتكوين كلمة مركبة.',
    },
  },
  F8: {
    id: 'F8',
    name: 'Zuordnen / Bilden',
    description: 'Ordnen Sie zu oder bilden Sie Paare',
    instruction: 'Wählen Sie die richtige Zuordnung.',
    translations: {
      ru: 'Выберите правильное соответствие.',
      tr: 'Doğru eşleşmeyi seçin.',
      fa: 'تطابق صحیح را انتخاب کنید.',
      ar: 'اختر التطابق الصحيح.',
    },
  },
  F9: {
    id: 'F9',
    name: 'Wort passt nicht',
    description: 'Finden Sie das Wort, das nicht passt',
    instruction: 'Welches Wort passt nicht zu den anderen?',
    translations: {
      ru: 'Какое слово лишнее? Выберите его.',
      tr: 'Hangi kelime diğerlerine uymuyor?',
      fa: 'کدام کلمه با بقیه مطابقت ندارد؟',
      ar: 'أي كلمة لا تتناسب مع الكلمات الأخرى؟',
    },
  },
  F10: {
    id: 'F10',
    name: 'Satz aus Wörtern bauen',
    description: 'Bauen Sie einen Satz aus den gegebenen Wörtern',
    instruction: 'Klicken Sie auf die Wörter in der richtigen Reihenfolge. Mehrere Lösungen möglich.',
    translations: {
      ru: 'Нажимайте на слова в правильном порядке. Несколько решений возможно.',
      tr: 'Doğru sırayla kelimelere tıklayın. Birden fazla çözüm mümkün.',
      fa: 'به ترتیب صحیح روی کلمات کلیک کنید. چندین راه حل ممکن است.',
      ar: 'انقر على الكلمات بالترتيب الصحيح. عدة حلول ممكنة.',
    },
  },
};

export const getFormatInfo = (formatId: string): FormatInfo | undefined => {
  return quizFormats[formatId];
};

// Возвращает немецкую инструкцию (основную)
export const getFormatInstructionDe = (formatId: string): string => {
  const format = quizFormats[formatId];
  return format?.instruction || '';
};

// Возвращает перевод инструкции на выбранный язык
export const getFormatInstructionTranslation = (formatId: string, language: TranslationLanguage): string => {
  const format = quizFormats[formatId];
  return format?.translations[language] || '';
};

// Для обратной совместимости
export const getFormatInstruction = (formatId: string, language: 'de' | TranslationLanguage = 'de'): string => {
  if (language === 'de') {
    return getFormatInstructionDe(formatId);
  }
  return getFormatInstructionTranslation(formatId, language);
};
