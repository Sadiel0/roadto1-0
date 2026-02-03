export type FightStudy = {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  keyTakeaways: string[];
};

export const fightStudies: FightStudy[] = [
  {
    id: "mike-tyson-fights",
    title: "Mike Tyson – Knockout Pressure & Entry Destruction",
    youtubeUrl: "https://www.youtube.com/watch?v=aJ-AUIkBX_Y",
    thumbnailUrl: "https://img.youtube.com/vi/aJ-AUIkBX_Y/hqdefault.jpg",
    keyTakeaways: [
      "Explode forward behind head movement",
      "Close distance violently, not gradually",
      "Punch in short combinations, not single shots",
      "Finish immediately when opponent freezes"
    ]
  },
  {
    id: "wrestler-vs-striker-ufc",
    title: "Wrestler vs Striker – UFC Pressure & Control",
    youtubeUrl: "https://www.youtube.com/watch?v=747QmirYOIU",
    thumbnailUrl: "https://img.youtube.com/vi/747QmirYOIU/hqdefault.jpg",
    keyTakeaways: [
      "Pressure forces predictable reactions",
      "Mix levels to break striking rhythm",
      "Control posture before advancing",
      "Fatigue favors the fighter who dictates pace"
    ]
  },
  {
    id: "chuck-liddell-fight",
    title: "Chuck Liddell – Counter Striking & Takedown Defense",
    youtubeUrl: "https://www.youtube.com/watch?v=jgOfAR2AUBE",
    thumbnailUrl: "https://img.youtube.com/vi/jgOfAR2AUBE/hqdefault.jpg",
    keyTakeaways: [
      "Strong takedown defense creates striking confidence",
      "Patience forces opponents to overextend",
      "Explosive counters beat volume",
      "Capitalize instantly when opponent is hurt"
    ]
  },
  {
    id: "rampage-jackson-fight",
    title: "Rampage Jackson – Power & Pocket Violence",
    youtubeUrl: "https://www.youtube.com/watch?v=iBkPA7Mx8Sg",
    thumbnailUrl: "https://img.youtube.com/vi/iBkPA7Mx8Sg/hqdefault.jpg",
    keyTakeaways: [
      "Comfort in the pocket breaks opponents",
      "Hooks and uppercuts over wide punches",
      "Forward pressure without panic",
      "Mental intimidation through physical dominance"
    ]
  },
  {
    id: "dustin-poirier-fight",
    title: "Dustin Poirier – Composure, Volume, and Durability",
    youtubeUrl: "https://www.youtube.com/watch?v=QerSpl9y6uE",
    thumbnailUrl: "https://img.youtube.com/vi/QerSpl9y6uE/hqdefault.jpg",
    keyTakeaways: [
      "Stay calm under early adversity",
      "Build damage through volume, not rush",
      "Body shots slow aggressive opponents",
      "Confidence grows as pressure is absorbed"
    ]
  },
  {
    id: "jose-aldo-fight",
    title: "José Aldo – Timing, Defense, and Fight IQ",
    youtubeUrl: "https://www.youtube.com/watch?v=L8oht5ZNwFM",
    thumbnailUrl: "https://img.youtube.com/vi/L8oht5ZNwFM/hqdefault.jpg",
    keyTakeaways: [
      "Timing beats speed and strength",
      "Defensive responsibility before offense",
      "Leg kicks control distance and rhythm",
      "Calm execution wins high-pressure moments"
    ]
  },
  {
    id: "striker-vs-wrestler-blueprint",
    title: "Striker vs Wrestler — Distance, Damage, Discipline",
    youtubeUrl: "https://www.youtube.com/watch?v=FHp-k31llgo",
    thumbnailUrl: "https://img.youtube.com/vi/FHp-k31llgo/hqdefault.jpg",
    keyTakeaways: [
      "Control distance before throwing combinations",
      "Punish level changes with uppercuts and knees",
      "Circle off immediately after defending shots",
      "Damage accumulates when the wrestler fails repeatedly",
      "Do not chase finishes — let fatigue create openings"
    ]
  }
];

const STRIKER_VS_WRESTLER_BLUEPRINT = fightStudies.find(
  (f) => f.id === "striker-vs-wrestler-blueprint"
)!;

/**
 * Get the fight of the day. Currently fixed to Striker vs Wrestler — Distance, Damage, Discipline.
 */
export function getFightOfTheDay(_date?: Date): FightStudy {
  return STRIKER_VS_WRESTLER_BLUEPRINT;
}