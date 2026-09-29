import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import it from './locales/it.json'

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'it', name: 'Italiano' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
]

const STORAGE_KEY = 'oddscore.lang'

function storedLanguage() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.some((l) => l.code === value) ? value : null
  } catch {
    return null
  }
}

// ES, PT, TR, FR, DE have no resources yet and fall back to EN.
i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, it: { translation: it } },
  lng: storedLanguage() ?? 'en',
  fallbackLng: 'en',
  supportedLngs: LANGUAGES.map((l) => l.code),
  interpolation: { escapeValue: false },
})

document.documentElement.lang = i18n.language

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    // storage unavailable: selection just won't persist
  }
})

export default i18n
