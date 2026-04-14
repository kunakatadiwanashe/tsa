import { HymnCard } from '@/components/HymnCard';
import { useFavorites } from '@/context/FavoritesContext';
import { useLanguage } from '@/context/LanguageContext';
import { BottomTabInset, Spacing } from '@/constants/theme';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HYMNS } from '../../../data/hymns';
import type { Hymn } from '../../../data/types';

export default function ExploreScreen() {
  const { favoriteIds } = useFavorites();
  const { lang } = useLanguage();

  const favoriteHymns: Hymn[] = HYMNS.filter((hymn) => favoriteIds.includes(hymn.id));

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Saved Favorites</Text>
          <Text style={styles.subtitle}>
            {favoriteHymns.length === 0
              ? 'Your saved hymns will appear here.'
              : `${favoriteHymns.length} saved hymn${favoriteHymns.length === 1 ? '' : 's'}`}
          </Text>
        </View>

        {favoriteHymns.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyText}>
              Open any hymn and tap the heart icon to save it here.
            </Text>
          </View>
        ) : (
          favoriteHymns.map((hymn) => <HymnCard key={hymn.id} hymn={hymn} lang={lang} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f3ef',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
  },
  header: {
    marginBottom: Spacing.four,
    gap: Spacing.one,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b625c',
  },
  emptyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: Spacing.four,
    borderWidth: 1,
    borderColor: '#eadfd6',
    gap: Spacing.two,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  emptyText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6b625c',
  },
});
