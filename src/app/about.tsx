import BackButton from '@/components/BackButton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import React from 'react';
import { View } from 'react-native';

const about = () => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={{ padding: Spacing.four, gap: Spacing.two }}>
        <BackButton />
        <ThemedText type="title">About</ThemedText>
      </ThemedView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.four }}>
        <ThemedText type="subtitle">The Salvation Army Hymn Book App</ThemedText>
        <ThemedText>A mobile app for accessing Salvation Army hymns in multiple languages.</ThemedText>
      </View>
    </ThemedView>
  );
};

export default about;
