// TODO: AI-generated workout logic
// This function should eventually be replaced with AI-generated workouts
// based on training history, fight date proximity, and fighter's current state

export interface Workout {
  warmup: string[];
  strength: string[];
  mmaDrills: string[];
  mentalTask: string;
}

const WARMUP_OPTIONS = [
  "10 min dynamic stretching",
  "5 min jump rope",
  "10 min shadow boxing",
  "5 min light jog + dynamic movements",
  "10 min mobility work",
];

const STRENGTH_OPTIONS = [
  "Deadlifts: 5x5",
  "Squats: 4x6",
  "Bench press: 4x5",
  "Pull-ups: 4x8",
  "Overhead press: 4x5",
  "Rows: 4x8",
  "Farmer's walks: 3x50m",
  "Turkish get-ups: 3x5 each side",
];

const MMA_DRILLS = [
  "20 min pad work - combinations",
  "15 min sparring rounds",
  "20 min ground work - transitions",
  "15 min bag work - power shots",
  "20 min clinch work",
  "15 min takedown drills",
  "20 min defensive drills",
  "15 min counter-striking",
];

const MENTAL_TASKS = [
  "Visualize the fight. See yourself executing perfectly.",
  "Review one technique for 10 minutes. Master it.",
  "Meditate for 15 minutes. Focus on breath.",
  "Write down three weaknesses. Plan to address them.",
  "Study one round of a champion's fight.",
  "Practice mental toughness: do one more round when you want to quit.",
];

export function generateDailyWorkout(): Workout {
  const today = new Date();
  const seed = today.getDate() + today.getMonth() * 31;
  
  // Simple deterministic selection based on date
  const warmup = [WARMUP_OPTIONS[seed % WARMUP_OPTIONS.length]];
  const strength = [
    STRENGTH_OPTIONS[seed % STRENGTH_OPTIONS.length],
    STRENGTH_OPTIONS[(seed + 1) % STRENGTH_OPTIONS.length],
  ];
  const mmaDrills = [MMA_DRILLS[seed % MMA_DRILLS.length]];
  const mentalTask = MENTAL_TASKS[seed % MENTAL_TASKS.length];

  return {
    warmup,
    strength,
    mmaDrills,
    mentalTask,
  };
}
