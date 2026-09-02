import { Colors, Spacing } from '@/constants/theme';
import React from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

const About = () => {
  const scheme = useColorScheme();
  const themeColors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.text }]}>
          About
        </Text>
      </View>

      {/* App Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/logo.png')} 
          style={styles.logo}
        />
        <Text style={[styles.appName, { color: themeColors.text }]}>
          Salvation Army Hymn Book
        </Text>
      </View>

      {/* Description */}
      <Text style={[styles.description, { color: themeColors.textSecondary }]}>
        Access Salvation Army hymns in English, Shona, and Ndebele with ease. Developed by Kun Technologies.
      </Text>
      
      <View style={[styles.card, { backgroundColor: themeColors.backgroundElement }]}>
        <Text style={[styles.cardTitle, { color: themeColors.textSecondary }]}>Copyright</Text>
        <Text style={[styles.cardText, { color: themeColors.text }]}>
          All hymns are the property of The Salvation Army Zimbabwe.
        </Text>
      </View>

      {/* Section Cards */}
      <View style={[styles.card, { backgroundColor: themeColors.backgroundElement }]}>
        <Text style={[styles.cardTitle, { color: themeColors.textSecondary }]}>Developer</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://kuntech.co.zw')}>
          <Text style={[styles.cardText, styles.link]}>Kun Technologies</Text>
        </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('mailto:kunakatadiwanashe@gmail.com')}>
          <Text style={[styles.cardText, styles.link]}>
            kunakatadiwanashe@gmail.com
          </Text>
        </TouchableOpacity>
      </View>




      {/* Footer */}
      <Text style={[styles.footer, { color: themeColors.textSecondary }]}>Version 1.0.0</Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.four,
    gap: Spacing.two,
  },

  title: {
    fontSize: 28,
    fontWeight: '600',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.four,
  },

  logo: {
    width: 100,
    height: 100,
    borderRadius: 24,
    marginBottom: Spacing.two,
  },

  appName: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },

  description: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: Spacing.four,
    lineHeight: 22,
  },

  card: {
    width: '100%',
    padding: Spacing.three,
    borderRadius: 16,
    marginBottom: Spacing.three,
  },

  cardTitle: {
    fontSize: 13,
    marginBottom: 4,
  },

  cardText: {
    fontSize: 15,
    fontWeight: '500',
  },

  link: {
    color: '#007AFF', // iOS blue link
  },

  footer: {
    marginTop: Spacing.four,
    fontSize: 12,
    textAlign: 'center',
  },
});