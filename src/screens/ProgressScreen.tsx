import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { storage } from '../utils/storage';
import { getDaysUntilFight, getProgressPercentage } from '../utils/dateUtils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProgressScreen() {
  const [daysTrained, setDaysTrained] = useState(0);
  const [streak, setStreak] = useState(0);
  const [daysUntilFight, setDaysUntilFight] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const trained = await storage.getDaysTrained();
      const currentStreak = await storage.getStreak();
      const daysLeft = getDaysUntilFight();
      const progressPercent = getProgressPercentage();

      setDaysTrained(trained);
      setStreak(currentStreak);
      setDaysUntilFight(daysLeft);
      setProgress(progressPercent);
    };
    loadData();
  }, []);

  const progressWidth = Math.max(0, Math.min(100, progress));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>PROGRESS</Text>
          <View style={styles.headerLine} />
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="calendar" size={28} color={colors.accent} />
            <Text style={styles.statValue}>{daysTrained}</Text>
            <Text style={styles.statLabel}>DAYS TRAINED</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="flame" size={28} color={colors.accent} />
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>CURRENT STREAK</Text>
          </View>
        </View>

        <View style={styles.countdownCard}>
          <Ionicons name="time" size={24} color={colors.accent} />
          <Text style={styles.countdownValue}>{daysUntilFight}</Text>
          <Text style={styles.countdownLabel}>DAYS UNTIL FIGHT</Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>JOURNEY PROGRESS</Text>
            <Text style={styles.progressPercent}>{Math.round(progressWidth)}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                { width: (SCREEN_WIDTH - 88) * (progressWidth / 100) }
              ]} 
            />
          </View>
          <Text style={styles.progressSubtext}>
            {Math.round(progressWidth)}% complete on the road to 1-0
          </Text>
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
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 26,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.borderAccent,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
  },
  statValue: {
    fontSize: 44,
    fontWeight: '900',
    color: colors.accent,
    marginTop: 14,
    marginBottom: 10,
    letterSpacing: 0.5,
    textShadowColor: colors.shadowAccent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    letterSpacing: 1.2,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  countdownCard: {
    backgroundColor: colors.surface,
    padding: 36,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.accent,
    marginBottom: 24,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
  countdownValue: {
    fontSize: 72,
    fontWeight: '900',
    color: colors.accent,
    marginTop: 16,
    marginBottom: 12,
    letterSpacing: 1,
    textShadowColor: colors.shadowAccent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  countdownLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    letterSpacing: 1.5,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  progressCard: {
    backgroundColor: colors.surface,
    padding: 26,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.borderAccent,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  progressLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    letterSpacing: 1.2,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  progressPercent: {
    fontSize: 18,
    color: colors.accent,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: colors.background,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 5,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  progressSubtext: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },
});
