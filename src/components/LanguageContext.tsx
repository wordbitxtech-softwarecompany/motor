'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Language = 'en' | 'ur';

interface Ctx {
  language: Language;
  setLanguage: (l: Language) => void;
  t: (key: string, fallback?: string) => string;
  dir: 'ltr' | 'rtl';
}

/** UI strings. English is the source of truth; Urdu overrides where translated. */
const UR: Record<string, string> = {
  // nav
  'nav.newCars': 'نئی گاڑیاں',
  'nav.usedCars': 'استعمال شدہ گاڑیاں',
  'nav.evHybrid': 'الیکٹرک اور ہائبرڈ',
  'nav.bikes': 'موٹر سائیکلز اور اسکوٹیز',
  'nav.brands': 'تمام برانڈز',
  'nav.rent': 'رینٹ اے کار',
  'nav.sell': 'گاڑی فروخت کریں',
  'nav.compare': 'گاڑیوں کا موازنہ',
  'nav.news': 'آٹو نیوز اور گائیڈز',

  // header actions
  'action.search': 'تلاش',
  'action.bookTestDrive': 'ٹیسٹ ڈرائیو بک کریں',
  'action.buyNow': 'گاڑی خریدیں',
  'action.contact': 'رابطہ کریں',
  'action.signIn': 'لاگ اِن',
  'action.signUp': 'نیا اکاؤنٹ بنائیں',
  'action.myAccount': 'میرا اکاؤنٹ',
  'action.postAd': 'اشتہار لگائیں',

  // hero
  'hero.platform': 'پاکستان کا سب سے بڑا آٹوموٹیو پلیٹ فارم',
  'hero.title': 'پاکستان میں استعمال شدہ گاڑیاں تلاش کریں',
  'hero.subtitle': 'ہزاروں تصدیق شدہ گاڑیوں میں سے اپنے لیے بہترین گاڑی منتخب کریں',
  'hero.makeOrModel': 'گاڑی کا برانڈ یا ماڈل لکھیں (مثلاً کرولا، سوک)',
  'hero.allCities': 'تمام شہر',
  'hero.priceRange': 'قیمت کی حد',
  'hero.searchCars': 'گاڑیاں تلاش کریں',
  'hero.findMore': 'مزید فلٹرز اور ایڈوانس سرچ ›',
  'hero.popular': 'مقبول ترین تلاش:',

  // sell section
  'sell.heading': 'اپنی گاڑی موٹر پاکستان پر بیچیں اور بہترین قیمت حاصل کریں',
  'sell.myself': 'میں خود بیچوں گا!',
  'sell.forMe': 'میری طرف سے بیچیں (ہیلپ می سیل)',
  'sell.postAd': 'اپنا اشتہار لگائیں',
  'sell.helpMe': 'میری گاڑی بیچنے میں مدد کریں!',
  'sell.or': 'یا',
  'sell.bullet1': 'صرف 2 منٹ میں مفت اشتہار لگائیں',
  'sell.bullet2': 'پاکستان بھر سے 2 کروڑ سے زائد خریدار',
  'sell.bullet3': 'براہِ راست خریداروں سے رابطہ کریں',
  'sell.bullet4': 'بغیر کسی پریشانی کے باآسانی فروخت',
  'sell.bullet5': 'مفت انسپکشن اور فیچرڈ اشتہار کی سہولت',
  'sell.bullet6': 'ہماری ٹیم آپ کو بہترین ممکنہ قیمت دلائے گی',
  'sell.footnote': 'تمام اشتہارات خریداروں اور فروخت کنندگان کے تحفظ کے لیے ہماری انتظامیہ کی جانچ پڑتال کے بعد شائع ہوتے ہیں۔',

  // Sections
  'section.browseByMake': 'برانڈ کے لحاظ سے تلاش کریں',
  'section.allBrands': 'پاکستان میں دستیاب تمام کار اور بائیک برانڈز',
  'section.newCars': 'پاکستان میں نئی آنے والی گاڑیاں (2026)',
  'section.usedCars': 'استعمال شدہ تصدیق شدہ گاڑیاں',
  'section.bikes': 'موٹر سائیکلز اور الیکٹرک اسکوٹیز',
  'section.compare': 'گاڑیوں کا موازنہ کریں',

  // cities
  'city.lahore': 'لاہور',
  'city.islamabad': 'اسلام آباد',
  'city.karachi': 'کراچی',
  'city.rawalpindi': 'راولپنڈی',
  'city.faisalabad': 'فیصل آباد',
  'city.multan': 'ملتان',
  'city.peshawar': 'پشاور',
};

const LanguageContext = createContext<Ctx>({
  language: 'en',
  setLanguage: () => {},
  t: (_k, f) => f ?? _k,
  dir: 'ltr',
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLang] = useState<Language>('en');

  // Restore preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem('motor_lang');
      if (saved === 'ur' || saved === 'en') {
        setLang(saved as Language);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Apply lang + dir to <html> so RTL actually takes effect globally
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const el = document.documentElement;
      el.lang = language === 'ur' ? 'ur-PK' : 'en-PK';
      el.dir = language === 'ur' ? 'rtl' : 'ltr';
      if (language === 'ur') {
        el.classList.add('lang-ur');
      } else {
        el.classList.remove('lang-ur');
      }
    }
  }, [language]);

  const setLanguage = useCallback((l: Language) => {
    setLang(l);
    try {
      localStorage.setItem('motor_lang', l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: string, fallback?: string) => {
      if (language === 'ur') {
        return UR[key] ?? fallback ?? key;
      }
      return fallback ?? key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir: language === 'ur' ? 'rtl' : 'ltr' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
