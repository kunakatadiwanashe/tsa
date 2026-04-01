import BackButton from '@/components/BackButton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { HYMNS } from "../../../data/hymns";
import type { Language } from "../../../data/types";
import { useLanguage } from '../../context/LanguageContext';

export default function HymnDetail() {
  const params = useLocalSearchParams<{ id: string; lang?: Language }>();
  const { lang } = useLanguage();
  const effectiveLang = (params.lang as Language) || lang;

  const hymnId = Number(params.id);
  const hymn = HYMNS.find((h: any) => h.id === hymnId);

  if (!hymn) return (
    <ThemedView style={styles.center}>
      <ThemedText>Hymn not found</ThemedText>
      <BackButton />
    </ThemedView>
  );

  const data = hymn[effectiveLang];

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <BackButton />
        <ThemedText type="title">{data.title}</ThemedText>
        <ThemedText type="small">{hymn.number} | {hymn.category}</ThemedText>
      </ThemedView>

      {(data.verses as any[]).map((v) => (
        <ThemedView key={v.num} style={styles.verse}>
          <ThemedText type="subtitle">Verse {v.num}</ThemedText>
          {(v.lines as string[]).map((line, i) => (
            <ThemedText key={i} style={styles.line}>{line}</ThemedText>
          ))}
        </ThemedView>
      ))}

      {data.chorus && (
        <ThemedView style={styles.chorus}>
          <ThemedText type="subtitle">Chorus</ThemedText>
          {(data.chorus!.lines as string[]).map((line, i) => (
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
