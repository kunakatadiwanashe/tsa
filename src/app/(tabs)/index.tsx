import React, { useMemo, useState } from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HymnList from '@/components/HymnList';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { HYMNS } from '../../../data/hymns';


const PALETTE = {
  primary: '#8B0000',      // Salvation Army Crimson
  primaryLight: '#FFF5F5',
  accent: '#FFD700',       // Salvation Gold
  textDark: '#0A0A0C',
  textMuted: '#6E6E73',
  surface: '#FFFFFF',
  background: '#F8F9FA',
  border: '#E9ECEF',
};

export default function HomeScreen() {
  const { lang, setLang } = useLanguage();
  const [search, setSearch] = useState('');


  const filtered = useMemo(() => {
    if (!search.trim()) return HYMNS;
    const query = search.toLowerCase().trim();

    return HYMNS.filter((h) => {
      const data = h[lang as 'en' | 'sn' | 'nd'];
      if (!data) return false;

      const titleMatch = data.title?.toLowerCase().includes(query);
      const numberMatch = h.id?.toString().includes(query);

      return titleMatch || numberMatch;
    });
  }, [search, lang]);

  const languages = [
    { code: 'en', label: 'ENG' },
    { code: 'sn', label: 'SHO' },
    { code: 'nd', label: 'NDE' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.background} />

      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>


        <View style={styles.header}>
          <View style={styles.brandGroup}>
            <View style={styles.logoBadge}>
              <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.titleWrapper}>
              <Text style={styles.heading}>The Salvation Army</Text>
              <Text style={styles.subHeading}>Zimbabwe Hymn Book</Text>
            </View>
          </View>

          
        </View>


        <View style={styles.langSelector}>
          {languages.map((item) => {
            const active = lang === item.code;
            return (
              <TouchableOpacity
                key={item.code}
                onPress={() => setLang(item.code as 'en' | 'sn' | 'nd')}
                style={[styles.langChip, active && styles.langChipActive]}
                activeOpacity={0.7}
              >
                <Text style={[styles.langText, active && styles.langTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>


        {/* Main List Container */}
        <View style={styles.listWrapper}>
          <HymnList
            hymns={filtered}
            lang={lang}
            search={search}
            setSearch={setSearch}
            setLang={setLang}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.background,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four || 16,
    paddingBottom: (BottomTabInset || 12) + (Spacing.three || 12),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginTop: 4,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: PALETTE.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: PALETTE.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  logo: {
    width: 34,
    height: 34,
  },
  titleWrapper: {
    justifyContent: 'center',
  },
  subHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: PALETTE.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: PALETTE.textDark,
    letterSpacing: -0.4,
  },
  langSelector: {
    flexDirection: 'row',
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    padding: 6,
    gap: 2,
    width: "50%",
  },
  langChip: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
  },
  langChipActive: {
    backgroundColor: PALETTE.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  langText: {
    fontSize: 10,
    fontWeight: '700',
    color: PALETTE.textMuted,
  },
  langTextActive: {
    color: PALETTE.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.surface,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: PALETTE.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: PALETTE.textDark,
    fontWeight: '500',
  },
  listWrapper: {
    flex: 1,
    marginTop: 4,
  },
});