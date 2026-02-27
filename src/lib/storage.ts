// localStorage persistence layer for UChamp

const PREFIX = 'uchamp_';

function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // silently fail
  }
}

export interface UserSettings {
  name: string;
  email: string;
  phone: string;
  location: string;
  notifications: Record<string, boolean>;
  privacy: Record<string, boolean>;
  theme: 'dark-gold' | 'midnight' | 'light';
  accentColor: string;
}

export function getSettings(role: string): UserSettings {
  return getItem<UserSettings>(`settings_${role}`, {
    name: '',
    email: '',
    phone: '(404) 555-0100',
    location: 'Lithonia, GA',
    notifications: {
      email_alerts: true,
      push_notifications: true,
      workout_reminders: role === 'athlete',
      score_updates: true,
      scout_alerts: role === 'athlete',
      verification_alerts: role === 'trainer',
      message_notifications: true,
    },
    privacy: {
      profile_visible: true,
      show_stats: true,
      show_workouts: false,
      show_score: true,
    },
    theme: 'dark-gold',
    accentColor: '#D4AF37',
  });
}

export function saveSettings(role: string, settings: UserSettings): void {
  setItem(`settings_${role}`, settings);
}

export function getWatchlist(recruiterId: string): string[] {
  return getItem<string[]>(`watchlist_${recruiterId}`, []);
}

export function saveWatchlist(recruiterId: string, ids: string[]): void {
  setItem(`watchlist_${recruiterId}`, ids);
}

export function getScoutNotes(recruiterId: string): Record<string, string> {
  return getItem<Record<string, string>>(`notes_${recruiterId}`, {});
}

export function saveScoutNotes(recruiterId: string, notes: Record<string, string>): void {
  setItem(`notes_${recruiterId}`, notes);
}

export function getVerifiedWorkouts(): string[] {
  return getItem<string[]>('verified_workouts', []);
}

export function saveVerifiedWorkouts(ids: string[]): void {
  setItem('verified_workouts', ids);
}

export function getFlaggedWorkouts(): string[] {
  return getItem<string[]>('flagged_workouts', []);
}

export function saveFlaggedWorkouts(ids: string[]): void {
  setItem('flagged_workouts', ids);
}

export function getReadAlerts(recruiterId: string): string[] {
  return getItem<string[]>(`read_alerts_${recruiterId}`, []);
}

export function saveReadAlerts(recruiterId: string, ids: string[]): void {
  setItem(`read_alerts_${recruiterId}`, ids);
}

export function hasWatchlist(recruiterId: string): boolean {
  return localStorage.getItem(`${PREFIX}watchlist_${recruiterId}`) !== null;
}

export function getLoggedWorkouts(athleteId: string): { id: string; date: string; type: string; duration: number; verified: boolean }[] {
  return getItem(`logged_workouts_${athleteId}`, []);
}

export function saveLoggedWorkouts(athleteId: string, workouts: { id: string; date: string; type: string; duration: number; verified: boolean }[]): void {
  setItem(`logged_workouts_${athleteId}`, workouts);
}
