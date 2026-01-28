const STORAGE_KEYS = {
  STREAK: 'training_streak',
  LAST_TRAINING_DATE: 'last_training_date',
  DAYS_TRAINED: 'days_trained',
  REFLECTIONS: 'reflections',
  FIGHT_STUDY_NOTES: 'fight_study_notes',
  NON_NEGOTIABLES: 'non_negotiables',
} as const;

export const storage = {
  async getStreak(): Promise<number> {
    const value = window.localStorage.getItem(STORAGE_KEYS.STREAK);
    return value ? parseInt(value, 10) : 0;
  },

  async setStreak(value: number): Promise<void> {
    window.localStorage.setItem(STORAGE_KEYS.STREAK, value.toString());
  },

  async getLastTrainingDate(): Promise<string | null> {
    return window.localStorage.getItem(STORAGE_KEYS.LAST_TRAINING_DATE);
  },

  async setLastTrainingDate(date: string): Promise<void> {
    window.localStorage.setItem(STORAGE_KEYS.LAST_TRAINING_DATE, date);
  },

  async getDaysTrained(): Promise<number> {
    const value = window.localStorage.getItem(STORAGE_KEYS.DAYS_TRAINED);
    return value ? parseInt(value, 10) : 0;
  },

  async incrementDaysTrained(): Promise<number> {
    const current = await this.getDaysTrained();
    const newValue = current + 1;
    window.localStorage.setItem(STORAGE_KEYS.DAYS_TRAINED, newValue.toString());
    return newValue;
  },

  async getReflections(): Promise<Record<string, string>> {
    const value = window.localStorage.getItem(STORAGE_KEYS.REFLECTIONS);
    return value ? JSON.parse(value) : {};
  },

  async saveReflection(date: string, content: string): Promise<void> {
    const reflections = await this.getReflections();
    reflections[date] = content;
    window.localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(reflections));
  },

  async getReflection(date: string): Promise<string | null> {
    const reflections = await this.getReflections();
    return reflections[date] || null;
  },

  async getFightStudyNotes(): Promise<Record<string, string>> {
    const value = window.localStorage.getItem(STORAGE_KEYS.FIGHT_STUDY_NOTES);
    return value ? JSON.parse(value) : {};
  },

  async saveFightStudyNotes(date: string, notes: string): Promise<void> {
    const allNotes = await this.getFightStudyNotes();
    allNotes[date] = notes;
    window.localStorage.setItem(STORAGE_KEYS.FIGHT_STUDY_NOTES, JSON.stringify(allNotes));
  },

  async getNonNegotiables(date: string): Promise<{ pullUps: boolean; sitUps: boolean; squats: boolean }> {
    const value = window.localStorage.getItem(`${STORAGE_KEYS.NON_NEGOTIABLES}_${date}`);
    return value ? JSON.parse(value) : { pullUps: false, sitUps: false, squats: false };
  },

  async setNonNegotiables(date: string, completed: { pullUps: boolean; sitUps: boolean; squats: boolean }): Promise<void> {
    window.localStorage.setItem(`${STORAGE_KEYS.NON_NEGOTIABLES}_${date}`, JSON.stringify(completed));
  },

  /**
   * Reset all workout and non-negotiables data for a fresh start
   * Clears streaks, training dates, days trained, and all non-negotiables
   */
  async resetAllData(): Promise<void> {
    window.localStorage.removeItem(STORAGE_KEYS.STREAK);
    window.localStorage.removeItem(STORAGE_KEYS.LAST_TRAINING_DATE);
    window.localStorage.removeItem(STORAGE_KEYS.DAYS_TRAINED);

    Object.keys(window.localStorage)
      .filter(key => key.startsWith(STORAGE_KEYS.NON_NEGOTIABLES))
      .forEach(key => window.localStorage.removeItem(key));
  },
};
