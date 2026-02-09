import { AVATARS } from './avatars';

export interface Athlete {
  id: string;
  name: string;
  position: 'QB' | 'RB' | 'WR' | 'TE' | 'OL' | 'DL' | 'LB' | 'DB';
  school: string;
  city: string;
  state: string;
  gradYear: number;
  height: string;
  weight: number;
  photoUrl: string;
  reliabilityScore: number;
  reliabilityBreakdown: {
    consistency: number;
    verification: number;
    progress: number;
  };
  stats: Record<string, number>;
  trendData: {
    fortyYardDash: { date: string; value: number }[];
    bench: { date: string; value: number }[];
    vertical: { date: string; value: number }[];
  };
  recentWorkouts: {
    id: string;
    date: string;
    type: string;
    duration: number;
    verified: boolean;
  }[];
  verified: boolean;
  trainerId: string;
}

export const ATHLETES: Athlete[] = [
  {
    id: 'ath-1',
    name: 'Marcus Johnson',
    position: 'QB',
    school: 'Lithonia High School',
    city: 'Lithonia',
    state: 'GA',
    gradYear: 2026,
    height: '6\'2"',
    weight: 195,
    photoUrl: AVATARS.marcus,
    reliabilityScore: 92,
    reliabilityBreakdown: {
      consistency: 95,
      verification: 90,
      progress: 91,
    },
    stats: {
      fortyYardDash: 4.65,
      bench: 225,
      vertical: 34.5,
      releaseTime: 2.3,
      completionPct: 64.2,
      throwingVelocity: 58,
    },
    trendData: {
      fortyYardDash: [
        { date: 'Aug', value: 4.82 },
        { date: 'Sep', value: 4.75 },
        { date: 'Oct', value: 4.71 },
        { date: 'Nov', value: 4.68 },
        { date: 'Dec', value: 4.65 },
        { date: 'Jan', value: 4.65 },
      ],
      bench: [
        { date: 'Aug', value: 205 },
        { date: 'Sep', value: 210 },
        { date: 'Oct', value: 215 },
        { date: 'Nov', value: 220 },
        { date: 'Dec', value: 225 },
        { date: 'Jan', value: 225 },
      ],
      vertical: [
        { date: 'Aug', value: 32.0 },
        { date: 'Sep', value: 33.0 },
        { date: 'Oct', value: 33.5 },
        { date: 'Nov', value: 34.0 },
        { date: 'Dec', value: 34.5 },
        { date: 'Jan', value: 34.5 },
      ],
    },
    recentWorkouts: [
      { id: 'w1', date: '2026-02-08', type: 'Speed & Agility', duration: 60, verified: true },
      { id: 'w2', date: '2026-02-06', type: 'Upper Body Strength', duration: 75, verified: true },
      { id: 'w3', date: '2026-02-04', type: 'Plyometrics', duration: 45, verified: false },
      { id: 'w4', date: '2026-02-01', type: 'Position Drills', duration: 90, verified: true },
      { id: 'w5', date: '2026-01-30', type: 'Conditioning', duration: 60, verified: true },
    ],
    verified: true,
    trainerId: 'trainer-1',
  },
  {
    id: 'ath-2',
    name: 'Jamal Williams',
    position: 'DB',
    school: 'Lithonia High School',
    city: 'Lithonia',
    state: 'GA',
    gradYear: 2026,
    height: '5\'11"',
    weight: 180,
    photoUrl: AVATARS.jamal,
    reliabilityScore: 88,
    reliabilityBreakdown: {
      consistency: 90,
      verification: 88,
      progress: 86,
    },
    stats: {
      fortyYardDash: 4.48,
      bench: 185,
      vertical: 38.0,
      backpedalToSprint: 1.8,
      hipFlip: 165,
      recoverySpeed: 20.5,
    },
    trendData: {
      fortyYardDash: [
        { date: 'Aug', value: 4.62 },
        { date: 'Sep', value: 4.58 },
        { date: 'Oct', value: 4.52 },
        { date: 'Nov', value: 4.50 },
        { date: 'Dec', value: 4.48 },
        { date: 'Jan', value: 4.48 },
      ],
      bench: [
        { date: 'Aug', value: 165 },
        { date: 'Sep', value: 170 },
        { date: 'Oct', value: 175 },
        { date: 'Nov', value: 180 },
        { date: 'Dec', value: 185 },
        { date: 'Jan', value: 185 },
      ],
      vertical: [
        { date: 'Aug', value: 35.5 },
        { date: 'Sep', value: 36.5 },
        { date: 'Oct', value: 37.0 },
        { date: 'Nov', value: 37.5 },
        { date: 'Dec', value: 38.0 },
        { date: 'Jan', value: 38.0 },
      ],
    },
    recentWorkouts: [
      { id: 'w6', date: '2026-02-08', type: 'Position Drills', duration: 90, verified: true },
      { id: 'w7', date: '2026-02-05', type: 'Speed & Agility', duration: 60, verified: false },
      { id: 'w8', date: '2026-02-03', type: 'Lower Body Strength', duration: 75, verified: true },
    ],
    verified: true,
    trainerId: 'trainer-1',
  },
  {
    id: 'ath-3',
    name: 'DeAndre Thomas',
    position: 'OL',
    school: 'Lithonia High School',
    city: 'Lithonia',
    state: 'GA',
    gradYear: 2027,
    height: '6\'5"',
    weight: 285,
    photoUrl: AVATARS.deandre,
    reliabilityScore: 85,
    reliabilityBreakdown: {
      consistency: 88,
      verification: 85,
      progress: 82,
    },
    stats: {
      fortyYardDash: 5.32,
      bench: 315,
      vertical: 28.5,
      tenYardSplit: 1.92,
      reachIndex: 1.12,
      punchPower: 42,
    },
    trendData: {
      fortyYardDash: [
        { date: 'Aug', value: 5.55 },
        { date: 'Sep', value: 5.48 },
        { date: 'Oct', value: 5.42 },
        { date: 'Nov', value: 5.38 },
        { date: 'Dec', value: 5.35 },
        { date: 'Jan', value: 5.32 },
      ],
      bench: [
        { date: 'Aug', value: 275 },
        { date: 'Sep', value: 285 },
        { date: 'Oct', value: 295 },
        { date: 'Nov', value: 305 },
        { date: 'Dec', value: 315 },
        { date: 'Jan', value: 315 },
      ],
      vertical: [
        { date: 'Aug', value: 26.0 },
        { date: 'Sep', value: 27.0 },
        { date: 'Oct', value: 27.5 },
        { date: 'Nov', value: 28.0 },
        { date: 'Dec', value: 28.5 },
        { date: 'Jan', value: 28.5 },
      ],
    },
    recentWorkouts: [
      { id: 'w9', date: '2026-02-07', type: 'Upper Body Strength', duration: 90, verified: false },
      { id: 'w10', date: '2026-02-04', type: 'Position Drills', duration: 75, verified: true },
    ],
    verified: false,
    trainerId: 'trainer-1',
  },
  {
    id: 'ath-4',
    name: 'Terrell Green',
    position: 'WR',
    school: 'Martin Luther King Jr. High',
    city: 'Lithonia',
    state: 'GA',
    gradYear: 2026,
    height: '6\'1"',
    weight: 185,
    photoUrl: AVATARS.terrell,
    reliabilityScore: 90,
    reliabilityBreakdown: {
      consistency: 92,
      verification: 89,
      progress: 89,
    },
    stats: {
      fortyYardDash: 4.42,
      bench: 195,
      vertical: 36.5,
      tenYardSplit: 1.52,
      catchRadius: 42,
    },
    trendData: {
      fortyYardDash: [
        { date: 'Aug', value: 4.58 },
        { date: 'Sep', value: 4.52 },
        { date: 'Oct', value: 4.48 },
        { date: 'Nov', value: 4.45 },
        { date: 'Dec', value: 4.42 },
        { date: 'Jan', value: 4.42 },
      ],
      bench: [
        { date: 'Aug', value: 175 },
        { date: 'Sep', value: 180 },
        { date: 'Oct', value: 185 },
        { date: 'Nov', value: 190 },
        { date: 'Dec', value: 195 },
        { date: 'Jan', value: 195 },
      ],
      vertical: [
        { date: 'Aug', value: 34.0 },
        { date: 'Sep', value: 35.0 },
        { date: 'Oct', value: 35.5 },
        { date: 'Nov', value: 36.0 },
        { date: 'Dec', value: 36.5 },
        { date: 'Jan', value: 36.5 },
      ],
    },
    recentWorkouts: [
      { id: 'w11', date: '2026-02-08', type: 'Speed & Agility', duration: 60, verified: true },
      { id: 'w12', date: '2026-02-06', type: 'Route Running', duration: 90, verified: true },
      { id: 'w13', date: '2026-02-03', type: 'Hands & Catching', duration: 75, verified: true },
    ],
    verified: true,
    trainerId: 'trainer-2',
  },
];

export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  athletes: string[];
  photoUrl: string;
}

export const TRAINERS: Trainer[] = [
  {
    id: 'trainer-1',
    name: 'Coach Mike Davis',
    email: 'coach.davis@uchamp.com',
    phone: '(404) 555-0123',
    athletes: ['ath-1', 'ath-2', 'ath-3'],
    photoUrl: AVATARS.mike,
  },
  {
    id: 'trainer-2',
    name: 'Coach Sarah Johnson',
    email: 'coach.johnson@uchamp.com',
    athletes: ['ath-4'],
    photoUrl: AVATARS.sarah,
  },
];

export interface Recruiter {
  id: string;
  name: string;
  school: string;
  email: string;
  watchlist: string[];
  photoUrl: string;
}

export const RECRUITERS: Recruiter[] = [
  {
    id: 'rec-1',
    name: 'John Smith',
    school: 'Georgia Tech',
    email: 'jsmith@gatech.edu',
    watchlist: ['ath-1', 'ath-4'],
    photoUrl: AVATARS.john,
  },
];

export function getAthleteById(id: string): Athlete | undefined {
  return ATHLETES.find(a => a.id === id);
}

export function getTrainerById(id: string): Trainer | undefined {
  return TRAINERS.find(t => t.id === id);
}

export function getAthletesByTrainer(trainerId: string): Athlete[] {
  return ATHLETES.filter(a => a.trainerId === trainerId);
}

export function getReliabilityLabel(score: number): string {
  if (score >= 90) return 'CHAMPION';
  if (score >= 75) return 'ELITE';
  if (score >= 60) return 'GRINDING';
  return 'DEVELOPING';
}

export function getReliabilityColor(score: number): string {
  if (score >= 90) return '#FFD700';
  if (score >= 75) return '#D4AF37';
  if (score >= 60) return '#CD7F32';
  return '#525252';
}

export const STAT_LABELS: Record<string, string> = {
  fortyYardDash: '40-Yard Dash',
  bench: 'Bench Press',
  vertical: 'Vertical Jump',
  releaseTime: 'Release Time',
  completionPct: 'Completion %',
  throwingVelocity: 'Throw Velocity',
  backpedalToSprint: 'Backpedal→Sprint',
  hipFlip: 'Hip Flip',
  recoverySpeed: 'Recovery Speed',
  tenYardSplit: '10-Yard Split',
  reachIndex: 'Reach Index',
  punchPower: 'Punch Power',
  catchRadius: 'Catch Radius',
};

export const STAT_UNITS: Record<string, string> = {
  fortyYardDash: 's',
  bench: 'lbs',
  vertical: '"',
  releaseTime: 's',
  completionPct: '%',
  throwingVelocity: 'mph',
  backpedalToSprint: 's',
  hipFlip: '°',
  recoverySpeed: 'mph',
  tenYardSplit: 's',
  reachIndex: '',
  punchPower: '',
  catchRadius: '"',
};
