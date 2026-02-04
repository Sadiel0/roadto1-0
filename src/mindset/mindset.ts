import { getScheduleForDate } from "../schedule/dailySchedule";

export type MindsetItem = {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  message: string;
  focusPoints: string[];
};

/** Mindset content by id. Schedule maps each day to a mindsetId. */
export const mindsetItems: MindsetItem[] = [
  {
    id: "calm-under-fire",
    title: "Calm Under Fire",
    youtubeUrl: "https://www.youtube.com/watch?v=IdTMDpizis8",
    thumbnailUrl: "https://img.youtube.com/vi/IdTMDpizis8/hqdefault.jpg",
    message:
      "Chaos exposes emotion. Discipline keeps you functional. Stay calm and execute.",
    focusPoints: [
      "Slow the breath first",
      "Emotion wastes energy",
      "Calm fighters see openings",
      "Composure wins exchanges"
    ]
  },
  {
    id: "relentless-consistency",
    title: "Consistency Beats Talent",
    youtubeUrl: "https://www.youtube.com/watch?v=hNi9M6JOnYw",
    thumbnailUrl: "https://img.youtube.com/vi/hNi9M6JOnYw/hqdefault.jpg",
    message:
      "Winning is built long before fight night. Repetition creates inevitability.",
    focusPoints: [
      "Do the work regardless of mood",
      "Small efforts compound",
      "No shortcuts during camp",
      "Trust preparation"
    ]
  },
  {
    id: "chosen-hardship",
    title: "You Chose This Path",
    youtubeUrl: "https://youtu.be/mrSey_Nln0k",
    thumbnailUrl: "https://img.youtube.com/vi/mrSey_Nln0k/hqdefault.jpg",
    message:
      "This path is hard by design. You chose it. Now honor it.",
    focusPoints: [
      "Voluntary suffering builds confidence",
      "Comfort is not the goal",
      "Hard paths forge durable fighters",
      "Finish what you started"
    ]
  },
  {
    id: "spartan-law",
    title: "Stand Your Ground",
    youtubeUrl: "https://www.youtube.com/watch?v=eGtF-zkeo9s",
    thumbnailUrl: "https://img.youtube.com/vi/eGtF-zkeo9s/hqdefault.jpg",
    message:
      "You don't retreat from pressure. You meet it with structure.",
    focusPoints: [
      "Posture before movement",
      "Strength in stillness",
      "Discipline under threat",
      "No unnecessary reactions"
    ]
  },
  {
    id: "identity-lock-in",
    title: "This Is Who You Are Now",
    youtubeUrl: "https://www.youtube.com/watch?v=Yv4vPDqoOmQ",
    thumbnailUrl: "https://img.youtube.com/vi/Yv4vPDqoOmQ/hqdefault.jpg",
    message:
      "You're no longer preparing to be a fighter. You are one.",
    focusPoints: [
      "Act from identity, not hope",
      "Confidence through repetition",
      "No second-guessing",
      "Execute with certainty"
    ]
  }
];

/**
 * Mindset of the day by ID-date. Refreshes at 12am via schedule.
 */
export function getMindsetOfTheDay(date?: Date): MindsetItem {
  const d = date ?? new Date();
  const { mindsetId } = getScheduleForDate(d);
  const item = mindsetItems.find((m) => m.id === mindsetId);
  return item ?? mindsetItems[0];
}
