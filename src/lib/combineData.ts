// Combine / Showcase Prep Data
// Track upcoming events, target benchmarks, and readiness

export interface CombineEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  type: 'combine' | 'showcase' | 'camp' | 'tryout';
  registered: boolean;
  daysUntil: number;
}

export interface CombineBenchmark {
  metric: string;
  current: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'flat';
  percentToTarget: number;
}

export interface TrainingPlan {
  id: string;
  week: number;
  focus: string;
  sessions: TrainingSession[];
  completed: boolean;
}

export interface TrainingSession {
  day: string;
  type: string;
  duration: number;
  completed: boolean;
  notes?: string;
}

export const UPCOMING_EVENTS: CombineEvent[] = [
  {
    id: 'evt-1',
    name: 'Georgia Elite Combine',
    date: '2026-03-15',
    location: 'Atlanta, GA',
    type: 'combine',
    registered: true,
    daysUntil: 34,
  },
  {
    id: 'evt-2',
    name: 'Under Armour Next Camp',
    date: '2026-04-12',
    location: 'Orlando, FL',
    type: 'camp',
    registered: true,
    daysUntil: 62,
  },
  {
    id: 'evt-3',
    name: 'Rivals 5-Star Challenge',
    date: '2026-06-20',
    location: 'Atlanta, GA',
    type: 'showcase',
    registered: false,
    daysUntil: 131,
  },
];

export const COMBINE_BENCHMARKS: CombineBenchmark[] = [
  { metric: '40-Yard Dash', current: 4.65, target: 4.55, unit: 's', trend: 'down', percentToTarget: 82 },
  { metric: 'Bench Press', current: 225, target: 245, unit: 'lbs', trend: 'flat', percentToTarget: 75 },
  { metric: 'Vertical Jump', current: 34.5, target: 36, unit: '"', trend: 'up', percentToTarget: 90 },
  { metric: 'Broad Jump', current: 114, target: 120, unit: '"', trend: 'up', percentToTarget: 85 },
  { metric: '3-Cone Drill', current: 7.12, target: 6.90, unit: 's', trend: 'down', percentToTarget: 70 },
  { metric: 'Shuttle Run', current: 4.35, target: 4.20, unit: 's', trend: 'down', percentToTarget: 65 },
];

export const TRAINING_PLAN: TrainingPlan[] = [
  {
    id: 'plan-1',
    week: 1,
    focus: 'Speed & Explosiveness',
    completed: true,
    sessions: [
      { day: 'Mon', type: 'Sprint Mechanics', duration: 60, completed: true },
      { day: 'Tue', type: 'Lower Body Power', duration: 75, completed: true },
      { day: 'Wed', type: 'Active Recovery', duration: 30, completed: true },
      { day: 'Thu', type: 'Position Drills', duration: 90, completed: true },
      { day: 'Fri', type: 'Speed Endurance', duration: 60, completed: true },
    ],
  },
  {
    id: 'plan-2',
    week: 2,
    focus: 'Strength & Power',
    completed: true,
    sessions: [
      { day: 'Mon', type: 'Upper Body Max', duration: 75, completed: true },
      { day: 'Tue', type: 'Plyometrics', duration: 60, completed: true },
      { day: 'Wed', type: 'Film Study', duration: 45, completed: true },
      { day: 'Thu', type: 'Lower Body Strength', duration: 75, completed: true },
      { day: 'Fri', type: 'Conditioning Test', duration: 60, completed: true },
    ],
  },
  {
    id: 'plan-3',
    week: 3,
    focus: 'Agility & Change of Direction',
    completed: false,
    sessions: [
      { day: 'Mon', type: 'Cone Drills', duration: 60, completed: true },
      { day: 'Tue', type: 'Upper Body Hypertrophy', duration: 75, completed: true },
      { day: 'Wed', type: 'Active Recovery', duration: 30, completed: false },
      { day: 'Thu', type: 'Shuttle & Agility', duration: 60, completed: false },
      { day: 'Fri', type: 'Full Combine Sim', duration: 90, completed: false },
    ],
  },
  {
    id: 'plan-4',
    week: 4,
    focus: 'Peak & Taper',
    completed: false,
    sessions: [
      { day: 'Mon', type: 'Light Speed Work', duration: 45, completed: false },
      { day: 'Tue', type: 'Mobility & Recovery', duration: 30, completed: false },
      { day: 'Wed', type: 'Mental Prep & Film', duration: 60, completed: false },
      { day: 'Thu', type: 'Light Position Work', duration: 45, completed: false },
      { day: 'Fri', type: 'Rest Day', duration: 0, completed: false, notes: 'Combine tomorrow' },
    ],
  },
];

export function getEventTypeColor(type: CombineEvent['type']): string {
  switch (type) {
    case 'combine': return '#FFD700';
    case 'showcase': return '#D4AF37';
    case 'camp': return '#CD7F32';
    case 'tryout': return '#A3A3A3';
  }
}

export function getEventTypeLabel(type: CombineEvent['type']): string {
  switch (type) {
    case 'combine': return 'COMBINE';
    case 'showcase': return 'SHOWCASE';
    case 'camp': return 'CAMP';
    case 'tryout': return 'TRYOUT';
  }
}

export function getTrendColor(trend: CombineBenchmark['trend']): string {
  switch (trend) {
    case 'up': return '#FFD700';
    case 'down': return '#D4AF37';
    case 'flat': return '#CD7F32';
  }
}
