import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HYMNS } from "../../data/hymns";
import { Hymn } from '../../data/types';
import HymnList from "../components/HymnList";
import { useLanguage } from '../context/LanguageContext';

export default function HomeScreen() {
  const { lang, setLang } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered: Hymn[] = HYMNS.filter((h) => {
    const data = (h[lang as 'en' | 'sn' | 'nd'] as any);
    return (
      (data as any).title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || h.category === category)
    );
  });

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
     
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText type="subtitle" style={styles.title}>
            The Salvation Army Hymn Book
          </ThemedText>
        </View>
      
        <View>
          <HymnList
            hymns={filtered}
            lang={lang}
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            setLang={setLang}
          />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:0,
    margin:0,
   width:'100%',
   height:'100%',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    paddingBottom: BottomTabInset + Spacing.three,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft:40,
    paddingRight:40,
    paddingBottom:20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333', 
    lineHeight: 28,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
});