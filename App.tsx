import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import DailyWorkoutScreen from './src/screens/DailyWorkoutScreen';
import FightStudyScreen from './src/screens/FightStudyScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import { colors } from './src/theme/colors';
import { storage } from './src/utils/storage';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    // One-time reset: Clear all workout and non-negotiables data
    // This ensures a fresh start when sharing with your brother
    // The reset only happens once - remove this block after sharing if you want to preserve future progress
    const performReset = async () => {
      await storage.resetAllData();
    };
    performReset();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
              borderTopWidth: 1,
              height: 70,
              paddingBottom: 10,
              paddingTop: 10,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            },
            tabBarActiveTintColor: colors.accent,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '700',
              marginTop: 4,
              letterSpacing: 0.5,
            },
            tabBarIconStyle: {
              marginTop: 2,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Workout"
            component={DailyWorkoutScreen}
            options={{
              tabBarLabel: 'Workout',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="barbell" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Study"
            component={FightStudyScreen}
            options={{
              tabBarLabel: 'Study',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="eye" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Progress"
            component={ProgressScreen}
            options={{
              tabBarLabel: 'Progress',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="stats-chart" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
