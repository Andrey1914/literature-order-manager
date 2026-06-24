import { getRequestConfig } from "next-intl/server";
import { locales, Locale } from "./config";

const messageImports = {
  ru: () => import("../messages/ru.json"),
  en: () => import("../messages/en.json"),
  uk: () => import("../messages/uk.json"),
  mk: () => import("../messages/mk.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = "ru";
  }

  const loadMessages = messageImports[locale as Locale] || messageImports.ru;
  const messages = (await loadMessages()).default;

  return {
    locale,
    messages,
  };
});
