import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
  Home: undefined;
  Workout: undefined;
  Study: undefined;
  Progress: undefined;
};

export type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'Home'>;
export type WorkoutScreenProps = BottomTabScreenProps<RootTabParamList, 'Workout'>;
export type StudyScreenProps = BottomTabScreenProps<RootTabParamList, 'Study'>;
export type ProgressScreenProps = BottomTabScreenProps<RootTabParamList, 'Progress'>;
