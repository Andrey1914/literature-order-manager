export const formatDate = (
  isoString: string,
  locale: string,
): string | null => {
  if (!isoString) return null;

  const fullLocales: Record<string, string> = {
    ru: "ru-RU",
    uk: "uk-UA",
    en: "en-US",
    mk: "mk-MK",
  };

  const systemLocale = fullLocales[locale] || locale;

  if (locale === "mk") {
    const isMacedonianSupported =
      Intl.DateTimeFormat.supportedLocalesOf(["mk-MK"]).length > 0;

    if (!isMacedonianSupported) {
      return null;
    }
  }

  return new Date(isoString).toLocaleDateString(systemLocale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
