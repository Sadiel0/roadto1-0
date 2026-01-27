import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { storage } from '../utils/storage';
import { getTodayDateString, isSameDay } from '../utils/dateUtils';
import { phase1FoundationOfViolence } from '../workouts/phase1_foundation_of_violence';
import { shadowboxingRules } from '../workouts/rules';

type DayWorkout = {
  title: string;
  rounds?: string;
  workout: string[];
};

export default function DailyWorkoutScreen() {
  const [dayWorkout, setDayWorkout] = useState<DayWorkout | null>(null);
  const [dayName, setDayName] = useState<string>('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Get current day of week
    const today = new Date();
    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const currentDay = dayNames[today.getDay()];
    setDayName(currentDay);
    
    // Get today's workout from Phase 1 schedule
    const todayWorkout = phase1FoundationOfViolence.schedule[currentDay as keyof typeof phase1FoundationOfViolence.schedule];
    if (todayWorkout) {
      setDayWorkout(todayWorkout);
    }
    
    const checkCompletion = async () => {
      const lastDate = await storage.getLastTrainingDate();
      const today = getTodayDateString();
      if (lastDate && isSameDay(lastDate, today)) {
        setCompleted(true);
      }
    };
    checkCompletion();
  }, []);

  const handleComplete = async () => {
    const today = getTodayDateString();
    const lastDate = await storage.getLastTrainingDate();
    
    let newStreak = await storage.getStreak();
    
    if (!lastDate || !isSameDay(lastDate, today)) {
      if (lastDate) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (isSameDay(lastDate, yesterdayStr)) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }
      
      await storage.setStreak(newStreak);
      await storage.setLastTrainingDate(today);
      await storage.incrementDaysTrained();
      setCompleted(true);
    }
  };

  if (!dayWorkout) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading workout...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {completed && (
          <>
            <View style={styles.completedBanner}>
              <Ionicons name="checkmark-circle" size={24} color={colors.text} />
              <Text style={styles.completedText}>SESSION COMPLETED</Text>
            </View>
            <View style={styles.completionMessage}>
              <Ionicons name="trophy" size={28} color={colors.accent} />
              <Text style={styles.completionMessageText}>
                Way to go brother, you become stronger with each workout. Forward is the way. Stay hard !
              </Text>
            </View>
          </>
        )}

        <View style={styles.header}>
          <Text style={styles.headerTitle}>{dayName}</Text>
          <View style={styles.headerLine} />
        </View>

        <View style={styles.workoutTitleSection}>
          <Text style={styles.workoutTitle}>{dayWorkout.title}</Text>
          {dayWorkout.rounds && (
            <Text style={styles.roundsText}>{dayWorkout.rounds}</Text>
          )}
        </View>

        <View style={styles.shadowboxingSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="fitness" size={20} color={colors.accent} />
            <Text style={styles.sectionTitle}>{shadowboxingRules.title}</Text>
          </View>
          <View style={styles.shadowboxingSubsection}>
            <Text style={styles.shadowboxingLabel}>BEGIN EVERY SESSION:</Text>
            {shadowboxingRules.beginEverySession.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <View style={styles.bullet} />
                <Text style={styles.item}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={styles.shadowboxingSubsection}>
            <Text style={styles.shadowboxingLabel}>END EVERY SESSION:</Text>
            {shadowboxingRules.endEverySession.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <View style={styles.bullet} />
                <Text style={styles.item}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="barbell" size={20} color={colors.accent} />
            <Text style={styles.sectionTitle}>WORKOUT</Text>
          </View>
          {dayWorkout.workout.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <View style={styles.bullet} />
              <Text style={styles.item}>{item}</Text>
            </View>
          ))}
        </View>

        {!completed && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
            activeOpacity={0.8}
          >
            <Text style={styles.completeButtonText}>COMPLETE SESSION</Text>
            <Ionicons name="checkmark-circle-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  completedBanner: {
    backgroundColor: colors.accent,
    padding: 18,
    borderRadius: 14,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
  completedText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  header: {
    marginBottom: 24,
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
  workoutTitleSection: {
    marginBottom: 28,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.borderAccent,
  },
  workoutTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: 1,
    marginBottom: 10,
    textShadowColor: colors.shadowAccent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  roundsText: {
    fontSize: 17,
    color: colors.textSecondary,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  shadowboxingSection: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.borderAccent,
    marginBottom: 24,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  shadowboxingSubsection: {
    marginTop: 18,
  },
  shadowboxingLabel: {
    fontSize: 13,
    color: colors.accent,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 12,
    textTransform: 'uppercase',
    textShadowColor: colors.shadowAccent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  section: {
    marginBottom: 28,
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.borderAccent,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textShadowColor: colors.shadowAccent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingLeft: 4,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginTop: 10,
    marginRight: 16,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  item: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  mentalSection: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 32,
  },
  mentalTask: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 26,
    fontStyle: 'italic',
    paddingLeft: 28,
  },
  completeButton: {
    backgroundColor: colors.accent,
    padding: 22,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  completeButtonText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  completionMessage: {
    backgroundColor: colors.surfaceElevated,
    padding: 22,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.accent,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
  completionMessageText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '700',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
});
