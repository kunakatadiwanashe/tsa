import BackButton from '@/components/BackButton';
import { Spacing } from '@/constants/theme';
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { HYMNS } from "../../../data/hymns";
import type { Hymn, HymnSection, Language, Verse } from "../../../data/types";
import { useLanguage } from '../../context/LanguageContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HymnDetail() {
  const params = useLocalSearchParams<{ id: string; lang?: Language }>();
  const { lang } = useLanguage();
  const effectiveLang = (params.lang as Language) || lang;

  const hymnId = Number(params.id);
  const hymn = HYMNS.find((h: Hymn) => h.id === hymnId);

  if (!hymn) return (
    <View style={styles.center}>
      <Text>Hymn not found</Text>
      <BackButton />
    </View>
  );

  const data = hymn[effectiveLang] as HymnSection;

  return (

    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.subtitle}>{hymn.number} | {hymn.category}</Text>
          </View>

          {data.verses.map((v: Verse) => (
            <View key={v.num} style={styles.verse}>
              <Text style={styles.verseTitle}>Verse {v.num}</Text>
              {v.lines.map((line, i) => (
                <Text key={i} style={styles.line}>{line}</Text>
              ))}
            </View>
          ))}

          {data.chorus && (
            <View style={styles.chorus}>
              <Text style={styles.verseTitle}>Chorus</Text>
              {data.chorus.lines.map((line, i) => (
                <Text key={i} style={styles.line}>{line}</Text>
              ))}
            </View>
          )}
        </ScrollView>


      </SafeAreaView>
    </SafeAreaProvider>



  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.four,
    backgroundColor: 'white',
  },
  header: {
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
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
  verseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#a33d3d',
    marginBottom: Spacing.two,
  },
  chorus: {
    marginTop: Spacing.three,
    padding: Spacing.two,
  },
  line: {
    marginVertical: Spacing.one,
    fontSize: 16,
    lineHeight: 28,
    color: '#222',
  },
});
