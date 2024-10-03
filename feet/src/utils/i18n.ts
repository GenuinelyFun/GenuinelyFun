import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { Language } from './LanguageProvider';

i18next
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    supportedLngs: Object.values(Language),
  });

export default i18next;
