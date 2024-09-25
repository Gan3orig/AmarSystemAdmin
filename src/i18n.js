// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files
import en from './translate/en.json';
import mn from './translate/mn.json';

// Initialize i18next
i18n
  .use(HttpBackend) 
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: en,
      },
      mn: {
        translation: mn,
      },
    },
    fallbackLng: 'mn',
    debug: true, 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
