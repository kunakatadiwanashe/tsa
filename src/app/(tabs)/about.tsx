import BackButton from '@/components/BackButton';
import { Spacing } from '@/constants/theme';
import React from 'react';
import { Text,View, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.title}>
          About
        </Text>
      </View>

      {/* App Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.appName}>
          Salvation Army Hymn Book
        </Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Access Salvation Army hymns in English, Shona, and Ndebele with ease. Developed by Kun Technologies.
      </Text>
      
            <View style={styles.card}>
        <Text style={styles.cardTitle}>Copyright</Text>
        <Text style={styles.cardText}>
          All hymns are the property of The Salvation Army Zimbabwe.
        </Text>
      </View>

      {/* Section Cards */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Developer</Text>
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
      <Text style={styles.footer}>Version 1.0.0</Text>
    </View>
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