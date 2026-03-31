import { Language } from "./types";

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "sn", label: "Shona", flag: "🇿🇼" },
  { code: "nd", label: "Ndebele", flag: "🇿🇼" },
];

export const getLanguageLabel = (code: Language): string => {
  return LANGUAGES.find((l) => l.code === code)?.label || "English";
};
