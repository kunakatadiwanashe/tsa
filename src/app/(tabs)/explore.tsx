import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text } from "react-native"
import BackButton from '@/components/BackButton';
import { ExternalLink } from '@/components/external-link';
import { Collapsible } from '@/components/ui/collapsible';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <BackButton />
          <Text >Explore</Text>
          <Text style={styles.centerText}>
            This starter app includes example{'\n'}code to help you get started.
          </Text>

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable style={({ pressed }) => pressed && styles.pressed}>
              <View style={styles.linkButton}>
                <Text >Expo documentation</Text>
                <SymbolView
                  tintColor={theme.text}
                  name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }}
                  size={12}
                />
              </View>
            </Pressable>
          </ExternalLink>
        </View>

        <View style={styles.sectionsWrapper}>
          <Collapsible title="File-based routing">
            <Text >
              This app has two tab screens: <Text style={styles.codeText}>src/app/(tabs)/index.tsx</Text> and{' '}
              <Text >src/app/(tabs)/explore.tsx</Text>
            </Text>
            <Text >
              The root layout in <Text style={styles.codeText}>src/app/_layout.tsx</Text> sets up
              the stack, while <Text style={styles.codeText}>src/app/(tabs)/_layout.tsx</Text> sets up
              the tab navigator.
            </Text>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <Text >Learn more</Text>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Android, iOS, and web support">
            <View style={styles.collapsibleContent}>
              <Text >
                You can open this project on Android, iOS, and the web. To open the web version,
                press <Text >w</Text> in the terminal running this
                project.
              </Text>
              <Image
                source={require('@/assets/images/tutorial-web.png')}
                style={styles.imageTutorial}
              />
            </View>
          </Collapsible>

          <Collapsible title="Images">
            <Text >
              For static images, you can use the <Text style={styles.codeText}>@2x</Text> and{' '}
              <Text >@3x</Text> suffixes to provide files for different
              screen densities.
            </Text>
            <Image source={require('@/assets/images/react-logo.png')} style={styles.imageReact} />
            <ExternalLink href="https://reactnative.dev/docs/images">
              <Text >Learn more</Text>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Light and dark mode components">
            <Text >
              This template has light and dark mode support. The{' '}
              <Text >useColorScheme()</Text> hook lets you inspect what the
              user's current color scheme is, and so you can adjust UI colors accordingly.
            </Text>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <Text >Learn more</Text>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Animations">
            <Text >
              This template includes an example of an animated component. The{' '}
              <Text >src/components/ui/collapsible.tsx</Text> component uses
              the powerful <Text >react-native-reanimated</Text> library to
              animate opening this hint.
            </Text>
          </Collapsible>
        </View>
        {Platform.OS === 'web' && <WebBadge />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: 'center',
  },
  codeText: {
    fontFamily: 'monospace',
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: 'center',
    gap: Spacing.one,
    alignItems: 'center',
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  collapsibleContent: {
    alignItems: 'center',
  },
  imageTutorial: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  imageReact: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});
