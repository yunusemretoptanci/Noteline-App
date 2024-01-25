import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import en from './locales/en/en.json';
i18n.use(initReactI18next).init({
 debug: true,
 fallbackLng: "en",
    interpolation: {
    escapeValue: false
    },
    resources: {
        en: {
            translation: en
        },
      
    }
});

export default i18n;