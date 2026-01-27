# The Road to 1-0

A private training companion app for an MMA fighter preparing for their professional debut.

## Tech Stack

- Expo (managed workflow)
- React Native
- TypeScript
- React Navigation
- AsyncStorage (local persistence)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npx expo start
```

3. Scan the QR code with Expo Go app on your phone, or press `i` for iOS simulator, `a` for Android emulator.

## Features

- **Home Screen**: Countdown to fight day, daily quote, training streak
- **Daily Workout**: AI-generated workout plans (placeholder for future AI integration)
- **Fight Study**: Daily fight recommendations with note-taking
- **AI Assistant**: Chat interface with stoic coaching responses (mock AI, ready for integration)
- **Reflection**: Daily prompts for self-reflection
- **Progress**: Training statistics and progress tracking

## Design

- Dark mode default
- Minimal, stoic aesthetic
- Black/charcoal backgrounds
- White text with red accents
- No emojis, no playful UI

## Notes

- All data is stored locally using AsyncStorage
- No backend, no authentication
- AI workout generation is currently using deterministic logic based on date
- AI Assistant uses mock responses (marked with TODO for real AI integration)
