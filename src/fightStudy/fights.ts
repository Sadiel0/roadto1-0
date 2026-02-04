import { getScheduleForDate } from "../schedule/dailySchedule";

export type FightStudy = {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  keyTakeaways: string[];
};

/** Fight study content by id. Schedule (dailySchedule) maps each day to a fightId. */
export const fightStudies: FightStudy[] = [
  {
    id: "aldo-tdd-balance",
    title: "José Aldo — Balance Before Defense",
    youtubeUrl: "https://www.youtube.com/watch?v=thVxWrMi1U8",
    thumbnailUrl: "https://img.youtube.com/vi/thVxWrMi1U8/hqdefault.jpg",
    keyTakeaways: [
      "Balance prevents takedowns before hands are needed",
      "Wide base and posture stop clean entries",
      "Defend early — don't wait for deep shots",
      "Hands are secondary to hips and stance"
    ]
  },
  {
    id: "mma-breakdown-fundamentals",
    title: "MMA Fundamentals — Defend, Reset, Punish",
    youtubeUrl: "https://www.youtube.com/watch?v=rmwot8oOyM4",
    thumbnailUrl: "https://img.youtube.com/vi/rmwot8oOyM4/hqdefault.jpg",
    keyTakeaways: [
      "First goal is stopping momentum, not countering",
      "Reset posture before striking",
      "Hands fight grips while hips stay heavy",
      "Defense must be repeatable under fatigue"
    ]
  },
  {
    id: "mma-scramble-awareness",
    title: "Scramble Awareness — Don't Chase, Don't Freeze",
    youtubeUrl: "https://www.youtube.com/watch?v=LDJfB9T7n7M",
    thumbnailUrl: "https://img.youtube.com/vi/LDJfB9T7n7M/hqdefault.jpg",
    keyTakeaways: [
      "Scrambles favor calm fighters",
      "Win small positions, not big moves",
      "Stay upright whenever possible",
      "Breathing control decides scrambles"
    ]
  },
  {
    id: "aldo-fight-iq-tdd",
    title: "José Aldo — Fight IQ vs Wrestlers",
    youtubeUrl: "https://www.youtube.com/watch?v=K63PJBKuA4U",
    thumbnailUrl: "https://img.youtube.com/vi/K63PJBKuA4U/hqdefault.jpg",
    keyTakeaways: [
      "Anticipation beats reaction",
      "Recognize shot setups early",
      "Force opponents to shoot tired",
      "Smart defense preserves energy"
    ]
  }
];

/**
 * Fight of the day by schedule. First day → first fight, next day → next fight, then cycles at 12am.
 */
export function getFightOfTheDay(date?: Date): FightStudy {
  const d = date ?? new Date();
  const { fightId } = getScheduleForDate(d);
  const fight = fightStudies.find((f) => f.id === fightId);
  return fight ?? fightStudies[0];
}
