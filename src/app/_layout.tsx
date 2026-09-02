import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { LanguageProvider } from '@/context/LanguageContext';

function useNavigationTheme() {
  const colorScheme = useColorScheme();

  return useMemo(() => {
    const isDark = colorScheme === 'dark';
    return isDark ? DarkTheme : DefaultTheme;
  }, [colorScheme]);
}


export default function RootLayout() {
  const navigationTheme = useNavigationTheme();



  return (
    <FavoritesProvider>
      <LanguageProvider>
        <ThemeProvider value={navigationTheme}>
          <AnimatedSplashOverlay />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="hymn/[id]" />
          </Stack>
        </ThemeProvider>

      </LanguageProvider>
    </FavoritesProvider>
  );
}