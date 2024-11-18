// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files
import mn from './translate/mn.json';
import en from './translate/en.json';

// Initialize i18next
i18n
  .use(HttpBackend) 
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    resources: {
      mn: {
        translation: mn,
      },
      en: {
        translation: en,
      },
    },
    fallbackLng: 'mn',
    supportedLngs: ['mn', 'en'],
    debug: true, 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
