import { Spacing } from '@/constants/theme';
import React from 'react';
import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface Props {
  categories: string[];
  category: string;
  setCategory: (category: string) => void;
}

export function CategoryFilter({ categories, category, setCategory }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {categories.map((cat) => {
        const isActive = category === cat;

        return (
          <TouchableOpacity
            key={cat}
            activeOpacity={0.7}
            style={[
              styles.button,
              isActive && styles.activeButton
            ]}
            onPress={() => setCategory(cat)}
          >
            <Text
              style={[
                styles.text,
                isActive && styles.activeText
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingRight: Spacing.two,
  },
  button: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 20, // pill shape
    backgroundColor: '#f0f0f0',
    marginRight: Spacing.two,
  },
  activeButton: {
    backgroundColor: '#222', // dark minimal
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
});
