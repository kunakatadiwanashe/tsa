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
      <Text onPress={handleBack} style={styles.bk}>←</Text>
    </View>
  );
}


const styles = {
  bk: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    cursor: 'pointer',
    backgroundShadow: '0 0 5px rgba(101, 89, 89, 0.5)',
  },

} as const;
