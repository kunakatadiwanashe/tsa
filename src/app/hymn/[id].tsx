import BackButton from '@/components/BackButton';

import { Spacing } from '@/constants/theme';
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { HYMNS } from "../../../data/hymns";
import type { Language } from "../../../data/types";
import { useLanguage } from '../../context/LanguageContext';
import { StyleSheet, Text, View } from 'react-native';

export default function HymnDetail() {
  const params = useLocalSearchParams<{ id: string; lang?: Language }>();
  const { lang } = useLanguage();
  const effectiveLang = (params.lang as Language) || lang;

  const hymnId = Number(params.id);
  const hymn = HYMNS.find((h: any) => h.id === hymnId);

  if (!hymn) return (
    <View style={styles.center}>
      <Text>Hymn not found</Text>
      <BackButton />
    </View>
  );

  const data = hymn[effectiveLang];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text>{data.title}</Text>
        <Text>{hymn.number} | {hymn.category}</Text>
      </View>

      {(data.verses as any[]).map((v) => (
        <View key={v.num} style={styles.verse}>
          <Text>Verse {v.num}</Text>
          {(v.lines as string[]).map((line, i) => (
            <Text key={i} style={styles.line}>{line}</Text>
          ))}
        </View>
      ))}

      {data.chorus && (
        <View style={styles.chorus}>
          <Text>Chorus</Text>
          {(data.chorus!.lines as string[]).map((line, i) => (
            <Text key={i} style={styles.line}>{line}</Text>
          ))}
        </View>
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
