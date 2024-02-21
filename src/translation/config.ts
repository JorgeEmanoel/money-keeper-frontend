import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ENTranslation from './en/translation'
import PTBRTranslation from './pt_BR/translation'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        translation: ENTranslation
      },
      pt_BR: {
        translation: PTBRTranslation
      }
    }
  }).catch(console.error)

export default i18n
