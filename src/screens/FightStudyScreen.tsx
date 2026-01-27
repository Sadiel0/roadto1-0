import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { getFightOfTheDay } from '../fightStudy/fights';

export default function FightStudyScreen() {
  const [fight, setFight] = useState(getFightOfTheDay());

  useEffect(() => {
    // Load today's fight
    const todayFight = getFightOfTheDay();
    setFight(todayFight);
  }, []);

  const handleThumbnailPress = async () => {
    const url = fight.youtubeUrl;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FIGHT STUDY</Text>
          <View style={styles.headerLine} />
        </View>

        {/* YouTube Thumbnail */}
        <TouchableOpacity
          style={styles.thumbnailContainer}
          onPress={handleThumbnailPress}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: fight.thumbnailUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <View style={styles.playButtonOverlay}>
            <View style={styles.playButton}>
              <Ionicons name="play" size={32} color={colors.text} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Fight Title */}
        <View style={styles.titleSection}>
          <Text style={styles.fightTitle}>{fight.title}</Text>
        </View>

        {/* Key Takeaways */}
        <View style={styles.focusCard}>
          <Text style={styles.focusLabel}>KEY TAKEAWAYS</Text>
          {fight.keyTakeaways.map((takeaway: string, index: number) => (
            <View key={index} style={styles.takeawayRow}>
              <View style={styles.takeawayBullet} />
              <Text style={styles.takeawayText}>{takeaway}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 28,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 2,
    marginBottom: 14,
    textShadowColor: colors.shadowAccent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerLine: {
    width: 60,
    height: 4,
    backgroundColor: colors.accent,
    borderRadius: 2,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 3,
  },
  thumbnailContainer: {
    width: '100%',
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.borderAccent,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: colors.surface,
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 6,
  },
  titleSection: {
    marginBottom: 12,
  },
  fightTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 0.5,
    textShadowColor: colors.shadowAccent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  focusCard: {
    backgroundColor: colors.surface,
    padding: 22,
    borderRadius: 16,
    borderLeftWidth: 5,
    borderLeftColor: colors.accent,
    borderWidth: 1.5,
    borderColor: colors.borderAccent,
    marginBottom: 24,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  focusLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 14,
    textShadowColor: colors.shadowAccent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  takeawayRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  takeawayBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginTop: 9,
    marginRight: 12,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  takeawayText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});
