import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { Link, useLocalSearchParams } from "expo-router";
import { ScrollView, Pressable } from "react-native";
import { HYMNS } from "../../../data/hymns";
import type { Language } from "../../../data/types";
import { useLanguage } from '../../context/LanguageContext';

export default function HymnDetail() {
  const params = useLocalSearchParams<{ id: string; lang?: Language }>();
  const { lang } = useLanguage();
  const effectiveLang = (params.lang as Language) || lang;

  const hymnId = Number(params.id as string);
  const hymn = HYMNS.find((h) => h.id === hymnId);

  if (!hymn) return (
    <ThemedView style={styles.center}>
      <ThemedText>Hymn not found</ThemedText>
      <Link href="/">
        <ThemedText type="link">Back to Home</ThemedText>
      </Link>
    </ThemedView>
  );

  const data = hymn[effectiveLang];

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <Link href="/" style={styles.back}>
          <ThemedText>← Back</ThemedText>
        </Link>
        <ThemedText type="title">{data.title}</ThemedText>
        <ThemedText type="small">{hymn.number} | {hymn.category}</ThemedText>
      </ThemedView>

      {data.verses.map((v) => (
        <ThemedView key={v.num} style={styles.verse}>
          <ThemedText type="subtitle">Verse {v.num}</ThemedText>
          {v.lines.map((line, i) => (
            <ThemedText key={i} style={styles.line}>{line}</ThemedText>
          ))}
        </ThemedView>
      ))}

      {data.chorus && (
        <ThemedView style={styles.chorus}>
          <ThemedText type="subtitle">Chorus</ThemedText>
          {data.chorus.lines.map((line, i) => (
            <ThemedText key={i} style={styles.line}>{line}</ThemedText>
          ))}
        </ThemedView>
      )}
    </ScrollView>
  );
}

const styles = {
  container: {
    padding: Spacing.four,
  },
  header: {
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  back: {
    // Inline
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
  },
  verse: {
    marginBottom: Spacing.three,
    padding: Spacing.two,
  },
  chorus: {
    marginTop: Spacing.three,
    padding: Spacing.two,
  },
line: {
    marginVertical: Spacing.one,
    fontSize: 18,
    lineHeight: 1.8,
  },
} as const;

