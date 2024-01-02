import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "fin",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
        translation: {
            home: 'Home'
        }
    },
    fin: {
        translation: {
            home: 'Koti'
        }
    }
  },
});

export default i18n;