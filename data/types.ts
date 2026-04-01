export type Language = "en" | "sn" | "nd";

export interface LanguageItem {
  code: Language;
  label: string;
  flagUrl: string;
}

export interface Verse {
  num: number;
  lines: string[];
}

export interface HymnSection {
  title: string;
  verses: Verse[];
  chorus: { lines: string[] } | null;
}

export interface Hymn {
  id: number;
  number: string;
  category: string;
  en: HymnSection;
  sn: HymnSection;
  nd: HymnSection;
}
