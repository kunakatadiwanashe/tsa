import { router, useRouter } from 'expo-router';
import React from 'react';
import { Spacing } from '@/constants/theme';
import { Text, View } from 'react-native';

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
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.one }}>
      <Text onPress={handleBack} >← Back</Text>
    </View>
  );
}
