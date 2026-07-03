import { createNavigation } from "next-intl/navigation";

export const locales = ["ru", "en", "uk", "mk"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, { name: string; flag: string }> = {
  ru: { name: "Русский", flag: "ru" },
  en: { name: "English", flag: "en" },
  uk: { name: "Українська", flag: "uk" },
  mk: { name: "Македонски", flag: "mk" },
};

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
});
