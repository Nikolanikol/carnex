// i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./enTranslation.json";
// Определяем ресурсы с переводами
const resources = {
  kor: {
    translation: {
      hello: "안녕",

      // Добавьте другие ключи перевода для английского языка
    },
  },
  en: {
    translation: enTranslation,

    // Добавьте другие ключи перевода для русского языка
  },
};

i18n
  // Опционально: определение языка на основе настроек браузера
  //   .use(LanguageDetector)
  // Инициализация для работы с React

  .use(initReactI18next)

  .init({
    lng: "kor",
    resources, // Подключаем ресурсы с переводами
    fallbackLng: "en", // Если выбранный язык недоступен, использовать русский
    debug: false, // В режиме разработки выводятся отладочные сообщения
    interpolation: {
      escapeValue: false, // React уже экранирует данные, отключаем экранирование
    },
    react: {
      useSuspense: false, // Отключаем suspense, если он не используется в приложении
    },
  });
i18n.on("missingKey", (lng, ns, key) => {
  console.warn(`❗ Пропущенный ключ перевода: [${lng}] ${key}`);
});

export default i18n;
