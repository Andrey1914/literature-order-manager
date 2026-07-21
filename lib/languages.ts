import ISO6391 from "iso-639-1";

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

const PRIORITY_CODES = ["mk", "uk", "en", "ru", "de", "es", "tr"];

export const getAllLanguages = (): LanguageOption[] => {
  const allCodes = ISO6391.getAllCodes();

  return allCodes.map((code) => ({
    code,
    name: ISO6391.getName(code),
    nativeName: ISO6391.getNativeName(code) || ISO6391.getName(code),
  }));
};

export const getSortedLanguages = (): LanguageOption[] => {
  const all = getAllLanguages();

  const priority = all.filter((l) => PRIORITY_CODES.includes(l.code));
  const others = all.filter((l) => !PRIORITY_CODES.includes(l.code));

  priority.sort(
    (a, b) => PRIORITY_CODES.indexOf(a.code) - PRIORITY_CODES.indexOf(b.code),
  );

  others.sort((a, b) => a.nativeName.localeCompare(b.nativeName));

  return [...priority, ...others];
};

export const getLanguageLabel = (code?: string): string => {
  if (!code || !code.trim()) return "";

  const cleanCode = code.trim().toLowerCase();
  const nativeName = ISO6391.getNativeName(cleanCode);

  if (!nativeName) return cleanCode.toUpperCase();

  return `${cleanCode.toUpperCase()} (${nativeName})`;
};

export const formatLanguageLabel = (code?: string): string => {
  if (!code || !code.trim()) return "";

  const cleanCode = code.trim().toLowerCase();
  const nativeName =
    ISO6391.getNativeName(cleanCode) || ISO6391.getName(cleanCode);

  if (!nativeName) return `(${cleanCode.toUpperCase()})`;

  return `(${cleanCode.toUpperCase()}) ${nativeName}`;
};
