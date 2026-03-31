import { Spacing } from '@/constants/theme';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { LANGUAGES } from '../../data/language';
import { Language } from '../../data/types';
import { ThemedText } from './themed-text';

interface Props {
  lang: Language;
  setLang: (lang: Language) => void;
}

export function LanguageSelector({ lang, setLang }: Props) {
  return (
    <View style={styles.container}>
      {LANGUAGES.map(({ code, label, flag }) => {
        const isActive = lang === code;
        return (
          <Pressable
            key={code}
            onPress={() => setLang(code)}
            style={({ pressed }) => [
              styles.button,
              isActive && styles.buttonActive,
              pressed && styles.pressed,
            ]}
          >
            <ThemedText style={styles.flag}>{flag}</ThemedText>
            <ThemedText style={[styles.label, isActive && styles.labelActive]}>
              {label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.one,
    marginVertical: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonActive: {
    backgroundColor: '#007AFF',
  },
  pressed: {
    opacity: 0.8,
  },
  flag: {
    fontSize: 20,
    marginBottom: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  labelActive: {
    fontWeight: '700',
    color: '#fff',
  },
});

