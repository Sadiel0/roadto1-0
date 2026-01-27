import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { getDaysUntilFight, getTodayDateString } from '../utils/dateUtils';
import { quotes } from '../utils/quotes';
import { storage } from '../utils/storage';
import CountdownTimer from '../components/CountdownTimer';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const [daysUntilFight, setDaysUntilFight] = useState(0);
  const [quote, setQuote] = useState('');
  const [completed, setCompleted] = useState({
    pullUps: false,
    sitUps: false,
    squats: false,
  });
  const lastLoadedDateRef = useRef<string | null>(null);

  useEffect(() => {
    setDaysUntilFight(getDaysUntilFight());
    // Select a random quote that changes on refresh
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
    
    // Load completion state for today and reset if it's a new day
    const loadCompletion = async () => {
      const today = getTodayDateString();
      const lastDate = lastLoadedDateRef.current;
      
      // If it's a new day, reset tasks
      if (lastDate && lastDate !== today) {
        const resetState = { pullUps: false, sitUps: false, squats: false };
        setCompleted(resetState);
        await storage.setNonNegotiables(today, resetState);
      } else {
        // Load today's completion state
        const todayCompleted = await storage.getNonNegotiables(today);
        setCompleted(todayCompleted);
      }
      lastLoadedDateRef.current = today;
    };
    loadCompletion();

    // Check for date change every minute to reset at midnight
    const interval = setInterval(async () => {
      setDaysUntilFight(getDaysUntilFight());
      const today = getTodayDateString();
      const lastDate = lastLoadedDateRef.current;
      if (lastDate && lastDate !== today) {
        const resetState = { pullUps: false, sitUps: false, squats: false };
        setCompleted(resetState);
        await storage.setNonNegotiables(today, resetState);
        lastLoadedDateRef.current = today;
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleTask = async (task: 'pullUps' | 'sitUps' | 'squats') => {
    // Only allow checking, not unchecking
    if (completed[task]) {
      return;
    }
    
    const newCompleted = {
      ...completed,
      [task]: true,
    };
    setCompleted(newCompleted);
    const today = getTodayDateString();
    await storage.setNonNegotiables(today, newCompleted);
  };

  const allCompleted = completed.pullUps && completed.sitUps && completed.squats;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.title}>THE ROAD TO 1-0</Text>
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownLabel}>COUNTDOWN TO BATTLE</Text>
            <CountdownTimer />
            <Text style={styles.fightDate}>MARCH 7, 2026</Text>
          </View>
        </View>

        {/* Quote Section */}
        <View style={styles.quoteSection}>
          <Text style={styles.quoteLabel}>TODAY'S MANTRA</Text>
          <Text style={styles.quote}>{quote}</Text>
        </View>

        {/* Daily Non Negotiables */}
        <View style={styles.nonNegotiablesSection}>
          <Text style={styles.sectionTitle}>DAILY NON NEGOTIABLES</Text>
          <View style={styles.nonNegotiablesList}>
            <TouchableOpacity
              style={[styles.nonNegotiableItem, completed.pullUps && styles.completedItem]}
              onPress={() => toggleTask('pullUps')}
              activeOpacity={completed.pullUps ? 1 : 0.8}
              disabled={completed.pullUps}
            >
              <View style={styles.taskContent}>
                {completed.pullUps ? (
                  <Ionicons name="checkmark-circle" size={28} color={colors.accent} />
                ) : (
                  <View style={styles.circle} />
                )}
                <View style={styles.taskTextContainer}>
                  <Text style={[styles.nonNegotiableValue, completed.pullUps && styles.completedText]}>100</Text>
                  <Text style={[styles.nonNegotiableLabel, completed.pullUps && styles.completedText]}>PUSH UPS</Text>
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.nonNegotiableItem, completed.sitUps && styles.completedItem]}
              onPress={() => toggleTask('sitUps')}
              activeOpacity={completed.sitUps ? 1 : 0.8}
              disabled={completed.sitUps}
            >
              <View style={styles.taskContent}>
                {completed.sitUps ? (
                  <Ionicons name="checkmark-circle" size={28} color={colors.accent} />
                ) : (
                  <View style={styles.circle} />
                )}
                <View style={styles.taskTextContainer}>
                  <Text style={[styles.nonNegotiableValue, completed.sitUps && styles.completedText]}>100</Text>
                  <Text style={[styles.nonNegotiableLabel, completed.sitUps && styles.completedText]}>SIT UPS</Text>
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.nonNegotiableItem, completed.squats && styles.completedItem]}
              onPress={() => toggleTask('squats')}
              activeOpacity={completed.squats ? 1 : 0.8}
              disabled={completed.squats}
            >
              <View style={styles.taskContent}>
                {completed.squats ? (
                  <Ionicons name="checkmark-circle" size={28} color={colors.accent} />
                ) : (
                  <View style={styles.circle} />
                )}
                <View style={styles.taskTextContainer}>
                  <Text style={[styles.nonNegotiableValue, completed.squats && styles.completedText]}>100</Text>
                  <Text style={[styles.nonNegotiableLabel, completed.squats && styles.completedText]}>SQUATS</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {allCompleted && (
            <View style={styles.completionMessage}>
              <Ionicons name="trophy" size={24} color={colors.accent} />
              <Text style={styles.completionText}>Well done brother, lets keep grinding. Stay hard !</Text>
            </View>
          )}
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
    paddingBottom: 32,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 28,
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 2,
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: colors.shadowAccent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  countdownContainer: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  countdownLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    letterSpacing: 1.5,
    fontWeight: '700',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  fightDate: {
    fontSize: 12,
    color: colors.textMuted,
    letterSpacing: 1,
    fontWeight: '600',
    marginTop: 16,
  },
  quoteSection: {
    backgroundColor: colors.surface,
    padding: 22,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.borderAccent,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 5,
  },
  quoteLabel: {
    fontSize: 10,
    color: colors.accent,
    letterSpacing: 1.5,
    fontWeight: '700',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  quote: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 26,
    fontStyle: 'italic',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  nonNegotiablesSection: {
    backgroundColor: colors.surface,
    padding: 22,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.borderAccent,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 11,
    color: colors.accent,
    letterSpacing: 1.5,
    fontWeight: '700',
    marginBottom: 18,
    textTransform: 'uppercase',
  },
  nonNegotiablesList: {
    gap: 12,
  },
  nonNegotiableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.borderAccent,
    minHeight: 72,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  completedItem: {
    borderColor: colors.accent,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 2,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2.5,
    borderColor: colors.accent,
    backgroundColor: 'transparent',
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  taskTextContainer: {
    flex: 1,
  },
  nonNegotiableValue: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.accent,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  nonNegotiableLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    letterSpacing: 1,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.35,
  },
  completionMessage: {
    marginTop: 20,
    padding: 18,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 5,
  },
  completionText: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '700',
    letterSpacing: 0.5,
    flex: 1,
    textAlign: 'center',
  },
});
