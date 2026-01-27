import { Text, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { useCountdownTimer } from '../hooks/useCountdownTimer';

export default function CountdownTimer() {
  const { days, hours, minutes, seconds } = useCountdownTimer();

  return (
    <View style={styles.container}>
      <View style={styles.timeSegment}>
        <Text style={styles.timeValue}>{days}</Text>
        <Text style={styles.timeLabel}>D</Text>
      </View>
      <Text style={styles.separator}>:</Text>
      <View style={styles.timeSegment}>
        <Text style={styles.timeValue}>{hours}</Text>
        <Text style={styles.timeLabel}>HRS</Text>
      </View>
      <Text style={styles.separator}>:</Text>
      <View style={styles.timeSegment}>
        <Text style={styles.timeValue}>{minutes}</Text>
        <Text style={styles.timeLabel}>min</Text>
      </View>
      <Text style={styles.separator}>:</Text>
      <View style={styles.timeSegment}>
        <Text style={styles.timeValue}>{seconds}</Text>
        <Text style={styles.timeLabel}>sec</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 8,
  },
  timeSegment: {
    flex: 1,
    maxWidth: 80,
    minWidth: 70,
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: colors.surface,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: colors.shadowAccent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  timeValue: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.accent,
    letterSpacing: 0.5,
    textShadowColor: colors.shadowAccent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    includeFontPadding: false,
  },
  timeLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 0.8,
    marginTop: 2,
    textTransform: 'uppercase',
    includeFontPadding: false,
  },
  separator: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.accent,
    marginHorizontal: 4,
    textShadowColor: colors.shadowAccent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    includeFontPadding: false,
  },
});
