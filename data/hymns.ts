import { HYMNS_EN } from './hymns-en';
import { HYMNS_ND } from './hymns-nd';
import { HYMNS_SN } from './hymns-sn';
import type { Hymn } from './types';

export const HYMNS: Hymn[] = HYMNS_EN.map((englishHymn) => {
  const shonaHymn = HYMNS_SN.find((hymn) => hymn.id === englishHymn.id);
  const ndebeleHymn = HYMNS_ND.find((hymn) => hymn.id === englishHymn.id);

  if (!shonaHymn || !ndebeleHymn) {
    throw new Error(`Missing translation for hymn ${englishHymn.id}`);
  }

  return {
    id: englishHymn.id,
    number: englishHymn.number,
    writer: englishHymn.writer,
    category: englishHymn.category,
    en: { title: englishHymn.title, verses: englishHymn.verses, chorus: englishHymn.chorus },
    sn: { title: shonaHymn.title, verses: shonaHymn.verses, chorus: shonaHymn.chorus },
    nd: { title: ndebeleHymn.title, verses: ndebeleHymn.verses, chorus: ndebeleHymn.chorus },
  };
});
