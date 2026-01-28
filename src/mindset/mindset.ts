export type MindsetItem = {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  message: string;
  focusPoints: string[];
};

export const mindsetItems: MindsetItem[] = [
  {
    id: "soldiers-rage",
    title: "Controlled Rage",
    youtubeUrl: "https://www.youtube.com/watch?v=di3rHkEZuUw",
    thumbnailUrl: "https://img.youtube.com/vi/di3rHkEZuUw/hqdefault.jpg",
    message:
      "This is not emotion. This is controlled violence. You enter the fight calm, disciplined, and ready to impose your will.",
    focusPoints: [
      "Aggression without panic",
      "Calm eyes under pressure",
      "Violence with structure",
      "Dominate exchanges mentally first"
    ]
  },
  {
    id: "short-discipline",
    title: "No Motivation Required",
    youtubeUrl: "https://www.youtube.com/shorts/VBa8cjajZeE",
    thumbnailUrl: "https://img.youtube.com/vi/VBa8cjajZeE/hqdefault.jpg",
    message:
      "You don't wait to feel ready. You move because that's who you are now.",
    focusPoints: [
      "Action before emotion",
      "No negotiation with fatigue",
      "Execute regardless of mood",
      "Discipline builds confidence"
    ]
  },
  {
    id: "short-pressure",
    title: "Pressure Is the Weapon",
    youtubeUrl: "https://www.youtube.com/shorts/WrjQMHzNB2A",
    thumbnailUrl: "https://img.youtube.com/vi/WrjQMHzNB2A/hqdefault.jpg",
    message:
      "Pressure exposes weakness. Your job is to apply it until something breaks.",
    focusPoints: [
      "Forward intent at all times",
      "No wasted movement",
      "Break rhythm, not just bodies",
      "Stay composed while advancing"
    ]
  },
  {
    id: "anime-focus",
    title: "Unshakeable Focus",
    youtubeUrl: "https://www.youtube.com/watch?v=vKYTUy-GFRs",
    thumbnailUrl: "https://img.youtube.com/vi/vKYTUy-GFRs/hqdefault.jpg",
    message:
      "Tunnel vision. One task. One opponent. Everything else disappears.",
    focusPoints: [
      "No crowd awareness",
      "No time awareness",
      "Only execution",
      "Trust preparation completely"
    ]
  },
  {
    id: "anime-endurance",
    title: "Endure Longer",
    youtubeUrl: "https://www.youtube.com/watch?v=V18QLZYZjf0",
    thumbnailUrl: "https://img.youtube.com/vi/V18QLZYZjf0/hqdefault.jpg",
    message:
      "When the fight becomes uncomfortable, that's where it's decided.",
    focusPoints: [
      "Comfort is irrelevant",
      "Endurance wins debuts",
      "Stay present under fatigue",
      "Outlast, then overwhelm"
    ]
  },
  {
    id: "short-identity",
    title: "This Is Who You Are Now",
    youtubeUrl: "https://www.youtube.com/shorts/Acfy8Iz4HSI",
    thumbnailUrl: "https://img.youtube.com/vi/Acfy8Iz4HSI/hqdefault.jpg",
    message:
      "You are no longer preparing. You are becoming.",
    focusPoints: [
      "Identity before outcome",
      "Act like the fighter now",
      "Confidence through repetition",
      "No hesitation, no doubt"
    ]
  }
];

export function getMindsetOfTheDay(): MindsetItem {
  const today = new Date().toISOString().split("T")[0];
  const index =
    today.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    mindsetItems.length;

  return mindsetItems[index];
}
