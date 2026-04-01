
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Hymn, Language } from '../../data/types';
import { CategoryFilter } from './CategoryFilter';
import { HymnCard } from './HymnCard';
import LanguageSelector from './LanguageSelector';
import { ThemedView } from './themed-view';

interface Props {
  hymns: Hymn[];
  lang: Language;
  search: string;
  setSearch: (search: string) => void;
  category: string;
  setCategory: (category: string) => void;
  setLang: (lang: Language) => void;
}

export default function HymnList({ hymns, lang, search, setSearch, category, setCategory, setLang }: Props) {
  const categories = Array.from(new Set(hymns.map(h => h.category)));

  return (
    <ThemedView style={styles.container}>
      
      {/* Controls: search + language + category */}
      <View style={styles.controls}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search hymns..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.filterRow}>
          <LanguageSelector lang={lang} setLang={setLang} />
          <CategoryFilter categories={categories} category={category} setCategory={setCategory} />
        </View>
      </View>

      {/* Hymn List */}
      <FlatList
        data={hymns}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              router.push(`/hymn/${item.id}?lang=${lang}`)
            }
          >
            <HymnCard hymn={item} lang={lang} />
          </TouchableOpacity>
        )}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: Spacing.four }}
        showsVerticalScrollIndicator={false}
      />

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
    
  },
  controls: {
    gap: Spacing.three,
    marginBottom: Spacing.three,
  },
  searchInput: {
    padding: Spacing.two,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  filterRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,


  },
  list: {
    flex: 1,
  },
});