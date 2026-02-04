/**
 * Daily schedule: date (MM-DD) → fightId and mindsetId.
 * First day shows first fight, next day the next, then cycles at 12am.
 */
export type DayScheduleEntry = {
  date: string; // "MM-DD"
  fightId: string;
  mindsetId: string;
};

export const dailySchedule: DayScheduleEntry[] = [
  { date: "04-08", fightId: "aldo-tdd-balance", mindsetId: "04-08" },
  { date: "04-09", fightId: "mma-breakdown-fundamentals", mindsetId: "04-08" },
  { date: "04-10", fightId: "mma-scramble-awareness", mindsetId: "04-08" },
  { date: "04-11", fightId: "aldo-fight-iq-tdd", mindsetId: "04-08" }
];

function toDateKey(d: Date): string {
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/**
 * Returns fightId and mindsetId for the given date.
 * Exact MM-DD match first; else cycles by day-of-year so content advances each day.
 */
export function getScheduleForDate(d: Date): { fightId: string; mindsetId: string } {
  const key = toDateKey(d);
  const exact = dailySchedule.find((e) => e.date === key);
  if (exact) return { fightId: exact.fightId, mindsetId: exact.mindsetId };
  const dayOfYear = Math.floor(
    (d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % dailySchedule.length;
  const entry = dailySchedule[index];
  return { fightId: entry.fightId, mindsetId: entry.mindsetId };
}
