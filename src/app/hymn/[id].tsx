import BackButton from '@/components/BackButton';
import { Spacing } from '@/constants/theme';
import { useFavorites } from '@/context/FavoritesContext';
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { HYMNS } from "../../../data/hymns";
import type { Hymn, HymnSection, Language, Verse } from "../../../data/types";
import { useLanguage } from '../../context/LanguageContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HymnDetail() {
  const params = useLocalSearchParams<{ id: string; lang?: Language }>();
  const { lang } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
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
  const favorite = isFavorite(hymn.id);

  return (

    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerTopRow}>
              <BackButton />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={favorite ? 'Remove from favorites' : 'Add to favorites'}
                onPress={() => toggleFavorite(hymn.id)}
                style={({ pressed }) => [
                  styles.favoriteButton,
                  pressed && styles.favoriteButtonPressed,
                ]}>
                <Text style={[styles.favoriteIcon, favorite && styles.favoriteIconActive]}>
                  {favorite ? '♥' : '♡'}
                </Text>
              </Pressable>
            </View>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.subtitle}>
              {hymn.number} | {hymn.category} {favorite ? '| Favorite' : ''}
            </Text>
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
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  favoriteButton: {
    minWidth: 44,
    minHeight: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6eaea',
    padding: Spacing.one,
  },
  favoriteButtonPressed: {
    opacity: 0.75,
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#a33d3d',
  },
  favoriteIconActive: {
    color: '#c62828',
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
