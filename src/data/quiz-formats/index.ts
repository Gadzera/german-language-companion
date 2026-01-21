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
    instruction: 'Wählen Sie den richtigen Artikel (der, die oder das) für das Substantiv. Nach jeder Antwort sehen Sie das Wort mit Artikel zur Wiederholung.',
    translations: {
      ru: 'Выберите правильный артикль (der, die или das) для существительного. После ответа слово с артиклем появится для запоминания.',
      tr: 'İsim için doğru artikeli (der, die veya das) seçin. Her cevaptan sonra kelimeyi artikelle birlikte göreceksiniz.',
      fa: 'حرف تعریف صحیح (der، die یا das) را برای اسم انتخاب کنید. بعد از هر پاسخ، کلمه با حرف تعریف نمایش داده می‌شود.',
      ar: 'اختر أداة التعريف الصحيحة (der أو die أو das) للاسم. بعد كل إجابة سترى الكلمة مع أداة التعريف للتكرار.',
    },
  },
  F1: {
    id: 'F1',
    name: 'Einsetzen',
    description: 'Setzen Sie das passende Wort ein',
    instruction: 'Lesen Sie den Satz und wählen Sie das passende Wort für die Lücke. Es gibt immer nur eine richtige Antwort.',
    translations: {
      ru: 'Прочитайте предложение и выберите подходящее слово для пропуска. Правильный ответ только один.',
      tr: 'Cümleyi okuyun ve boşluk için uygun kelimeyi seçin. Sadece bir doğru cevap vardır.',
      fa: 'جمله را بخوانید و کلمه مناسب را برای جای خالی انتخاب کنید. فقط یک پاسخ صحیح وجود دارد.',
      ar: 'اقرأ الجملة واختر الكلمة المناسبة للفراغ. هناك إجابة واحدة صحيحة فقط.',
    },
  },
  F2: {
    id: 'F2',
    name: 'Form / Kasus wählen',
    description: 'Wählen Sie die richtige Form',
    instruction: 'Wählen Sie die grammatisch korrekte Form des Wortes (Kasus, Artikel oder Endung). Achten Sie auf den Kontext im Satz.',
    translations: {
      ru: 'Выберите грамматически правильную форму слова (падеж, артикль или окончание). Обратите внимание на контекст предложения.',
      tr: 'Kelimenin dilbilgisi açısından doğru formunu seçin (hal, artikel veya son ek). Cümledeki bağlama dikkat edin.',
      fa: 'فرم صحیح دستوری کلمه را انتخاب کنید (حالت، حرف تعریف یا پسوند). به متن جمله توجه کنید.',
      ar: 'اختر الصيغة النحوية الصحيحة للكلمة (الحالة أو أداة التعريف أو النهاية). انتبه للسياق في الجملة.',
    },
  },
  F3: {
    id: 'F3',
    name: 'Satzstruktur mit Auswahl',
    description: 'Wählen Sie die richtige Option',
    instruction: 'Lesen Sie den Satz aufmerksam und wählen Sie die passende Option. Achten Sie auf Verneinung, Modalverben oder Konnektoren.',
    translations: {
      ru: 'Внимательно прочитайте предложение и выберите подходящий вариант. Обратите внимание на отрицание, модальные глаголы или союзы.',
      tr: 'Cümleyi dikkatlice okuyun ve uygun seçeneği seçin. Olumsuzluk, modal fiiller veya bağlaçlara dikkat edin.',
      fa: 'جمله را با دقت بخوانید و گزینه مناسب را انتخاب کنید. به نفی، افعال کمکی یا حروف ربط توجه کنید.',
      ar: 'اقرأ الجملة بعناية واختر الخيار المناسب. انتبه للنفي والأفعال المساعدة والروابط.',
    },
  },
  F4: {
    id: 'F4',
    name: 'Einsetzen aus Liste',
    description: 'Setzen Sie Wörter aus der Liste in die Lücken ein',
    instruction: 'Setzen Sie die Wörter aus der Liste in die passenden Lücken ein. Klicken Sie zuerst auf ein Wort, dann auf die Lücke. Um ein Wort zu entfernen, klicken Sie erneut auf die Lücke.',
    translations: {
      ru: 'Вставьте слова из списка в подходящие пропуски. Сначала нажмите на слово, затем на пропуск. Чтобы удалить слово, нажмите на пропуск ещё раз.',
      tr: 'Listedeki kelimeleri uygun boşluklara yerleştirin. Önce kelimeye, sonra boşluğa tıklayın. Kaldırmak için boşluğa tekrar tıklayın.',
      fa: 'کلمات را از لیست در جای خالی مناسب قرار دهید. ابتدا روی کلمه کلیک کنید، سپس روی جای خالی. برای حذف، دوباره روی جای خالی کلیک کنید.',
      ar: 'ضع الكلمات من القائمة في الفراغات المناسبة. انقر أولاً على الكلمة ثم على الفراغ. للإزالة انقر على الفراغ مرة أخرى.',
    },
  },
  F5: {
    id: 'F5',
    name: 'Umformen',
    description: 'Bilden Sie die richtige Form',
    instruction: 'Ordnen Sie die Wörter in der richtigen Reihenfolge an, um einen korrekten deutschen Satz zu bilden. Achten Sie auf die Satzstellung.',
    translations: {
      ru: 'Расставьте слова в правильном порядке, чтобы составить корректное немецкое предложение. Обратите внимание на порядок слов.',
      tr: 'Doğru bir Almanca cümle oluşturmak için kelimeleri doğru sıraya koyun. Cümle yapısına dikkat edin.',
      fa: 'کلمات را به ترتیب صحیح بچینید تا یک جمله آلمانی درست بسازید. به ترتیب کلمات توجه کنید.',
      ar: 'رتب الكلمات بالترتيب الصحيح لتكوين جملة ألمانية صحيحة. انتبه لترتيب الكلمات.',
    },
  },
  F6: {
    id: 'F6',
    name: 'Richtige Wahl im Kontext',
    description: 'Wählen Sie die kontextuell richtige Option',
    instruction: 'Lesen Sie den Text oder Satz und wählen Sie die Option, die im gegebenen Kontext am besten passt.',
    translations: {
      ru: 'Прочитайте текст или предложение и выберите вариант, который лучше всего подходит по контексту.',
      tr: 'Metni veya cümleyi okuyun ve verilen bağlamda en iyi uyan seçeneği seçin.',
      fa: 'متن یا جمله را بخوانید و گزینه‌ای را انتخاب کنید که در متن داده شده بهترین تناسب را دارد.',
      ar: 'اقرأ النص أو الجملة واختر الخيار الذي يناسب السياق المعطى بشكل أفضل.',
    },
  },
  F7: {
    id: 'F7',
    name: 'Komposita bauen',
    description: 'Bilden Sie zusammengesetzte Wörter',
    instruction: 'Verbinden Sie zwei Wortteile, um ein zusammengesetztes Wort (Kompositum) zu bilden. Die deutschen Komposita werden immer zusammengeschrieben.',
    translations: {
      ru: 'Соедините две части, чтобы образовать сложное слово (Kompositum). Немецкие сложные слова всегда пишутся слитно.',
      tr: 'İki kelime parçasını birleştirerek bileşik bir kelime (Kompositum) oluşturun. Almanca bileşik kelimeler her zaman bitişik yazılır.',
      fa: 'دو قسمت کلمه را به هم وصل کنید تا یک کلمه مرکب (Kompositum) بسازید. کلمات مرکب آلمانی همیشه به هم چسبیده نوشته می‌شوند.',
      ar: 'اربط جزأين من الكلمة لتكوين كلمة مركبة (Kompositum). الكلمات المركبة الألمانية تُكتب دائماً متصلة.',
    },
  },
  F8: {
    id: 'F8',
    name: 'Zuordnen / Bilden',
    description: 'Ordnen Sie zu oder bilden Sie Paare',
    instruction: 'Wählen Sie die richtige Zuordnung zwischen den Elementen. Finden Sie die passenden Paare.',
    translations: {
      ru: 'Выберите правильное соответствие между элементами. Найдите подходящие пары.',
      tr: 'Öğeler arasındaki doğru eşleşmeyi seçin. Uygun çiftleri bulun.',
      fa: 'تطابق صحیح بین عناصر را انتخاب کنید. جفت‌های مناسب را پیدا کنید.',
      ar: 'اختر التطابق الصحيح بين العناصر. ابحث عن الأزواج المناسبة.',
    },
  },
  F9: {
    id: 'F9',
    name: 'Wort passt nicht',
    description: 'Finden Sie das Wort, das nicht passt',
    instruction: 'Welches Wort gehört nicht zu den anderen? Finden Sie das Wort, das nicht in die Gruppe passt, und wählen Sie es aus.',
    translations: {
      ru: 'Какое слово не подходит к остальным? Найдите слово, которое не относится к группе, и выберите его.',
      tr: 'Hangi kelime diğerlerine uymuyor? Gruba uymayan kelimeyi bulun ve seçin.',
      fa: 'کدام کلمه با بقیه مطابقت ندارد؟ کلمه‌ای را که به گروه تعلق ندارد پیدا کنید و انتخاب کنید.',
      ar: 'أي كلمة لا تنتمي للمجموعة؟ ابحث عن الكلمة التي لا تناسب المجموعة واخترها.',
    },
  },
  F10: {
    id: 'F10',
    name: 'Satz aus Wörtern bauen',
    description: 'Bauen Sie einen Satz aus den gegebenen Wörtern',
    instruction: 'Bilden Sie einen Satz aus den Wörtern!',
    translations: {
      ru: 'Составьте предложение из слов!',
      tr: 'Kelimelerden bir cümle oluşturun!',
      fa: 'از کلمات یک جمله بسازید!',
      ar: 'كوّن جملة من الكلمات!',
    },
  },
  F11: {
    id: 'F11',
    name: 'Lesen: Richtig oder Falsch',
    description: 'Lesen Sie den Text und beantworten Sie die Fragen',
    instruction: 'Lesen Sie den Text sorgfältig durch. Entscheiden Sie dann bei jeder Aussage: Ist sie laut Text richtig (R) oder falsch (F)? Achten Sie auf Details im Text.',
    translations: {
      ru: 'Внимательно прочитайте текст. Затем решите для каждого утверждения: оно правильное (R) или неправильное (F) согласно тексту? Обращайте внимание на детали.',
      tr: 'Metni dikkatlice okuyun. Sonra her ifade için karar verin: Metne göre doğru (R) mu yanlış (F) mı? Ayrıntılara dikkat edin.',
      fa: 'متن را با دقت بخوانید. سپس برای هر جمله تصمیم بگیرید: آیا طبق متن درست (R) است یا غلط (F)؟ به جزئیات توجه کنید.',
      ar: 'اقرأ النص بعناية. ثم قرر لكل عبارة: هل هي صحيحة (R) أم خاطئة (F) وفقاً للنص؟ انتبه للتفاصيل.',
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
