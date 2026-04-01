import BackButton from '@/components/BackButton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import React from 'react';
import { View, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';

const About = () => {
  return (
    <ThemedView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <ThemedText type="title" style={styles.title}>
          About
        </ThemedText>
      </View>

      {/* App Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/logo.png')} 
          style={styles.logo}
        />
        <ThemedText type="subtitle" style={styles.appName}>
          Salvation Army Hymn Book
        </ThemedText>
      </View>

      {/* Description */}
      <ThemedText style={styles.description}>
        Access Salvation Army hymns in English, Shona, and Ndebele with ease. Developed by Kun Technologies.
      </ThemedText>
      
            <View style={styles.card}>
        <ThemedText style={styles.cardTitle}>Copyright</ThemedText>
        <ThemedText style={styles.cardText}>
          All hymns are the property of The Salvation Army Zimbabwe.
        </ThemedText>
      </View>

      {/* Section Cards */}
      <View style={styles.card}>
        <ThemedText style={styles.cardTitle}>Developer</ThemedText>
        <TouchableOpacity onPress={() => Linking.openURL('https://kuntech.co.zw')}>
          <ThemedText style={[styles.cardText, styles.link]}>Kun Technologies</ThemedText>
        </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('mailto:kunakatadiwanashe@gmail.com')}>
          <ThemedText style={[styles.cardText, styles.link]}>
            kunakatadiwanashe@gmail.com
          </ThemedText>
        </TouchableOpacity>
      </View>




      {/* Footer */}
      <ThemedText style={styles.footer}>Version 1.0.0</ThemedText>
    </ThemedView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
    backgroundColor: '#f9f9f9',
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
    opacity: 0.7,
    marginBottom: Spacing.four,
    lineHeight: 22,
  },

  card: {
    width: '100%',
    padding: Spacing.three,
    borderRadius: 16,
    marginBottom: Spacing.three,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },

  cardTitle: {
    fontSize: 13,
    opacity: 0.6,
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
    opacity: 0.5,
    textAlign: 'center',
  },
});