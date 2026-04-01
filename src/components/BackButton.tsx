import { router, useRouter } from 'expo-router';
import React from 'react';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { Spacing } from '@/constants/theme';

export default function BackButton() {
  const routerInstance = useRouter();

  const handleBack = () => {
    if (routerInstance.canGoBack()) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.one }}>
      <ThemedText onPress={handleBack} type="link">← Back</ThemedText>
    </ThemedView>
  );
}
