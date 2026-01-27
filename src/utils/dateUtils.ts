export const FIGHT_DATE = new Date('2026-03-07T00:00:00');

export function getDaysUntilFight(): number {
  const now = new Date();
  const diff = FIGHT_DATE.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}

export function getTodayDateString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export function isSameDay(date1: string, date2: string): boolean {
  return date1 === date2;
}

export function getProgressPercentage(): number {
  const now = new Date();
  const startDate = new Date('2026-01-01T00:00:00');
  const totalDays = (FIGHT_DATE.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const elapsedDays = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const percentage = (elapsedDays / totalDays) * 100;
  return Math.min(100, Math.max(0, percentage));
}
