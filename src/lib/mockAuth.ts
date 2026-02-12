import { ATHLETES, TRAINERS, RECRUITERS } from './mockData';

export type UserRole = 'athlete' | 'trainer' | 'recruiter';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  photoUrl: string;
}

const ALL_USERS: AuthUser[] = [
  ...ATHLETES.map(a => ({ id: a.id, email: `${a.name.toLowerCase().replace(' ', '.')}@uchamp.com`, name: a.name, role: 'athlete' as const, photoUrl: a.photoUrl })),
  ...TRAINERS.map(t => ({ id: t.id, email: t.email, name: t.name, role: 'trainer' as const, photoUrl: t.photoUrl })),
  ...RECRUITERS.map(r => ({ id: r.id, email: r.email, name: r.name, role: 'recruiter' as const, photoUrl: r.photoUrl })),
];

// Quick-login accounts for demo
export const DEMO_ACCOUNTS: { label: string; email: string; password: string; role: UserRole }[] = [
  { label: 'Marcus Johnson (Athlete)', email: 'marcus.johnson@uchamp.com', password: 'demo', role: 'athlete' },
  { label: 'Coach Mike Davis (Trainer)', email: 'coach.davis@uchamp.com', password: 'demo', role: 'trainer' },
  { label: 'Coach Sarah Johnson (Trainer)', email: 'coach.johnson@uchamp.com', password: 'demo', role: 'trainer' },
  { label: 'Coach Ray Lewis Jr. (Trainer)', email: 'coach.lewis@uchamp.com', password: 'demo', role: 'trainer' },
  { label: 'John Smith (Recruiter)', email: 'jsmith@gatech.edu', password: 'demo', role: 'recruiter' },
  { label: 'Patricia Washington (Recruiter)', email: 'pwashington@uga.edu', password: 'demo', role: 'recruiter' },
  { label: 'David Martinez (Recruiter)', email: 'dmartinez@gsu.edu', password: 'demo', role: 'recruiter' },
];

export function authenticateUser(email: string, _password: string): AuthUser | null {
  const user = ALL_USERS.find(u => u.email === email);
  return user || null;
}

export function getStoredUser(): AuthUser | null {
  const data = localStorage.getItem('uchamp_user');
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function storeUser(user: AuthUser): void {
  localStorage.setItem('uchamp_user', JSON.stringify(user));
}

export function clearStoredUser(): void {
  localStorage.removeItem('uchamp_user');
}
