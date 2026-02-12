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
  bio?: string;
  gpa?: number;
  highlights?: string[];
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
    reliabilityBreakdown: { consistency: 95, verification: 90, progress: 91 },
    stats: { fortyYardDash: 4.65, bench: 225, vertical: 34.5, releaseTime: 2.3, completionPct: 64.2, throwingVelocity: 58 },
    trendData: {
      fortyYardDash: [{ date: 'Aug', value: 4.82 }, { date: 'Sep', value: 4.75 }, { date: 'Oct', value: 4.71 }, { date: 'Nov', value: 4.68 }, { date: 'Dec', value: 4.65 }, { date: 'Jan', value: 4.65 }],
      bench: [{ date: 'Aug', value: 205 }, { date: 'Sep', value: 210 }, { date: 'Oct', value: 215 }, { date: 'Nov', value: 220 }, { date: 'Dec', value: 225 }, { date: 'Jan', value: 225 }],
      vertical: [{ date: 'Aug', value: 32.0 }, { date: 'Sep', value: 33.0 }, { date: 'Oct', value: 33.5 }, { date: 'Nov', value: 34.0 }, { date: 'Dec', value: 34.5 }, { date: 'Jan', value: 34.5 }],
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
    bio: 'Dual-threat quarterback with elite pocket presence and 4.65 speed. Team captain and 3-year starter at Lithonia High.',
    gpa: 3.7,
    highlights: ['Region 5-5A Offensive MVP', '2,800 passing yards (Junior)', '32 touchdowns, 6 interceptions'],
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
    reliabilityBreakdown: { consistency: 90, verification: 88, progress: 86 },
    stats: { fortyYardDash: 4.48, bench: 185, vertical: 38.0, backpedalToSprint: 1.8, hipFlip: 165, recoverySpeed: 20.5 },
    trendData: {
      fortyYardDash: [{ date: 'Aug', value: 4.62 }, { date: 'Sep', value: 4.58 }, { date: 'Oct', value: 4.52 }, { date: 'Nov', value: 4.50 }, { date: 'Dec', value: 4.48 }, { date: 'Jan', value: 4.48 }],
      bench: [{ date: 'Aug', value: 165 }, { date: 'Sep', value: 170 }, { date: 'Oct', value: 175 }, { date: 'Nov', value: 180 }, { date: 'Dec', value: 185 }, { date: 'Jan', value: 185 }],
      vertical: [{ date: 'Aug', value: 35.5 }, { date: 'Sep', value: 36.5 }, { date: 'Oct', value: 37.0 }, { date: 'Nov', value: 37.5 }, { date: 'Dec', value: 38.0 }, { date: 'Jan', value: 38.0 }],
    },
    recentWorkouts: [
      { id: 'w6', date: '2026-02-08', type: 'Position Drills', duration: 90, verified: true },
      { id: 'w7', date: '2026-02-05', type: 'Speed & Agility', duration: 60, verified: false },
      { id: 'w8', date: '2026-02-03', type: 'Lower Body Strength', duration: 75, verified: true },
    ],
    verified: true,
    trainerId: 'trainer-1',
    bio: 'Lockdown corner with elite ball-hawking instincts. Led the state in interceptions as a junior.',
    gpa: 3.4,
    highlights: ['7 interceptions (Junior)', 'All-Region First Team', '4.48 verified 40-yard dash'],
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
    reliabilityBreakdown: { consistency: 88, verification: 85, progress: 82 },
    stats: { fortyYardDash: 5.32, bench: 315, vertical: 28.5, tenYardSplit: 1.92, reachIndex: 1.12, punchPower: 42 },
    trendData: {
      fortyYardDash: [{ date: 'Aug', value: 5.55 }, { date: 'Sep', value: 5.48 }, { date: 'Oct', value: 5.42 }, { date: 'Nov', value: 5.38 }, { date: 'Dec', value: 5.35 }, { date: 'Jan', value: 5.32 }],
      bench: [{ date: 'Aug', value: 275 }, { date: 'Sep', value: 285 }, { date: 'Oct', value: 295 }, { date: 'Nov', value: 305 }, { date: 'Dec', value: 315 }, { date: 'Jan', value: 315 }],
      vertical: [{ date: 'Aug', value: 26.0 }, { date: 'Sep', value: 27.0 }, { date: 'Oct', value: 27.5 }, { date: 'Nov', value: 28.0 }, { date: 'Dec', value: 28.5 }, { date: 'Jan', value: 28.5 }],
    },
    recentWorkouts: [
      { id: 'w9', date: '2026-02-07', type: 'Upper Body Strength', duration: 90, verified: false },
      { id: 'w10', date: '2026-02-04', type: 'Position Drills', duration: 75, verified: true },
    ],
    verified: false,
    trainerId: 'trainer-1',
    bio: 'Massive left tackle with rare agility for his size. Projected as top OL prospect in the Class of 2027.',
    gpa: 3.2,
    highlights: ['Zero sacks allowed (Junior)', 'All-County First Team', '315 lb bench press'],
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
    reliabilityBreakdown: { consistency: 92, verification: 89, progress: 89 },
    stats: { fortyYardDash: 4.42, bench: 195, vertical: 36.5, tenYardSplit: 1.52, catchRadius: 42 },
    trendData: {
      fortyYardDash: [{ date: 'Aug', value: 4.58 }, { date: 'Sep', value: 4.52 }, { date: 'Oct', value: 4.48 }, { date: 'Nov', value: 4.45 }, { date: 'Dec', value: 4.42 }, { date: 'Jan', value: 4.42 }],
      bench: [{ date: 'Aug', value: 175 }, { date: 'Sep', value: 180 }, { date: 'Oct', value: 185 }, { date: 'Nov', value: 190 }, { date: 'Dec', value: 195 }, { date: 'Jan', value: 195 }],
      vertical: [{ date: 'Aug', value: 34.0 }, { date: 'Sep', value: 35.0 }, { date: 'Oct', value: 35.5 }, { date: 'Nov', value: 36.0 }, { date: 'Dec', value: 36.5 }, { date: 'Jan', value: 36.5 }],
    },
    recentWorkouts: [
      { id: 'w11', date: '2026-02-08', type: 'Speed & Agility', duration: 60, verified: true },
      { id: 'w12', date: '2026-02-06', type: 'Route Running', duration: 90, verified: true },
      { id: 'w13', date: '2026-02-03', type: 'Hands & Catching', duration: 75, verified: true },
    ],
    verified: true,
    trainerId: 'trainer-2',
    bio: 'Explosive deep-threat receiver with sub-4.45 speed. Led the region in receiving yards and touchdowns.',
    gpa: 3.5,
    highlights: ['1,200 receiving yards (Junior)', '14 receiving TDs', 'Region 5-5A Offensive Player of the Year'],
  },
  {
    id: 'ath-5',
    name: 'Khalil Robinson',
    position: 'RB',
    school: 'Redan High School',
    city: 'Stone Mountain',
    state: 'GA',
    gradYear: 2026,
    height: '5\'10"',
    weight: 205,
    photoUrl: AVATARS.khalil,
    reliabilityScore: 87,
    reliabilityBreakdown: { consistency: 89, verification: 86, progress: 86 },
    stats: { fortyYardDash: 4.52, bench: 275, vertical: 35.0, tenYardSplit: 1.58 },
    trendData: {
      fortyYardDash: [{ date: 'Aug', value: 4.68 }, { date: 'Sep', value: 4.62 }, { date: 'Oct', value: 4.58 }, { date: 'Nov', value: 4.55 }, { date: 'Dec', value: 4.52 }, { date: 'Jan', value: 4.52 }],
      bench: [{ date: 'Aug', value: 245 }, { date: 'Sep', value: 255 }, { date: 'Oct', value: 260 }, { date: 'Nov', value: 265 }, { date: 'Dec', value: 270 }, { date: 'Jan', value: 275 }],
      vertical: [{ date: 'Aug', value: 33.0 }, { date: 'Sep', value: 33.5 }, { date: 'Oct', value: 34.0 }, { date: 'Nov', value: 34.5 }, { date: 'Dec', value: 35.0 }, { date: 'Jan', value: 35.0 }],
    },
    recentWorkouts: [
      { id: 'w14', date: '2026-02-09', type: 'Speed & Agility', duration: 60, verified: true },
      { id: 'w15', date: '2026-02-07', type: 'Lower Body Strength', duration: 75, verified: true },
      { id: 'w16', date: '2026-02-05', type: 'Position Drills', duration: 90, verified: false },
      { id: 'w17', date: '2026-02-02', type: 'Conditioning', duration: 45, verified: true },
    ],
    verified: true,
    trainerId: 'trainer-1',
    bio: 'Physical, downhill runner with breakaway speed. Rushed for 1,500+ yards as a junior.',
    gpa: 3.1,
    highlights: ['1,547 rushing yards (Junior)', '18 rushing TDs', 'All-Region Second Team'],
  },
  {
    id: 'ath-6',
    name: 'Davonte Carter',
    position: 'DL',
    school: 'Lithonia High School',
    city: 'Lithonia',
    state: 'GA',
    gradYear: 2027,
    height: '6\'3"',
    weight: 265,
    photoUrl: AVATARS.davonte,
    reliabilityScore: 79,
    reliabilityBreakdown: { consistency: 82, verification: 78, progress: 77 },
    stats: { fortyYardDash: 4.88, bench: 295, vertical: 30.0, tenYardSplit: 1.72 },
    trendData: {
      fortyYardDash: [{ date: 'Aug', value: 5.05 }, { date: 'Sep', value: 5.00 }, { date: 'Oct', value: 4.96 }, { date: 'Nov', value: 4.92 }, { date: 'Dec', value: 4.90 }, { date: 'Jan', value: 4.88 }],
      bench: [{ date: 'Aug', value: 260 }, { date: 'Sep', value: 270 }, { date: 'Oct', value: 275 }, { date: 'Nov', value: 280 }, { date: 'Dec', value: 290 }, { date: 'Jan', value: 295 }],
      vertical: [{ date: 'Aug', value: 27.5 }, { date: 'Sep', value: 28.0 }, { date: 'Oct', value: 28.5 }, { date: 'Nov', value: 29.0 }, { date: 'Dec', value: 29.5 }, { date: 'Jan', value: 30.0 }],
    },
    recentWorkouts: [
      { id: 'w18', date: '2026-02-08', type: 'Upper Body Strength', duration: 90, verified: false },
      { id: 'w19', date: '2026-02-05', type: 'Position Drills', duration: 60, verified: false },
      { id: 'w20', date: '2026-02-02', type: 'Conditioning', duration: 45, verified: true },
    ],
    verified: false,
    trainerId: 'trainer-3',
    bio: 'Explosive interior defensive lineman with a relentless motor. Projects as a 3-technique at the next level.',
    gpa: 2.9,
    highlights: ['8 sacks (Junior)', 'All-County Honorable Mention', '12 tackles for loss'],
  },
  {
    id: 'ath-7',
    name: 'Isaiah Brooks',
    position: 'LB',
    school: 'Martin Luther King Jr. High',
    city: 'Lithonia',
    state: 'GA',
    gradYear: 2026,
    height: '6\'2"',
    weight: 225,
    photoUrl: AVATARS.isaiah,
    reliabilityScore: 91,
    reliabilityBreakdown: { consistency: 93, verification: 90, progress: 90 },
    stats: { fortyYardDash: 4.58, bench: 285, vertical: 34.0, tenYardSplit: 1.62 },
    trendData: {
      fortyYardDash: [{ date: 'Aug', value: 4.72 }, { date: 'Sep', value: 4.68 }, { date: 'Oct', value: 4.65 }, { date: 'Nov', value: 4.62 }, { date: 'Dec', value: 4.60 }, { date: 'Jan', value: 4.58 }],
      bench: [{ date: 'Aug', value: 255 }, { date: 'Sep', value: 265 }, { date: 'Oct', value: 270 }, { date: 'Nov', value: 275 }, { date: 'Dec', value: 280 }, { date: 'Jan', value: 285 }],
      vertical: [{ date: 'Aug', value: 31.5 }, { date: 'Sep', value: 32.0 }, { date: 'Oct', value: 32.5 }, { date: 'Nov', value: 33.0 }, { date: 'Dec', value: 33.5 }, { date: 'Jan', value: 34.0 }],
    },
    recentWorkouts: [
      { id: 'w21', date: '2026-02-09', type: 'Speed & Agility', duration: 60, verified: true },
      { id: 'w22', date: '2026-02-07', type: 'Upper Body Strength', duration: 75, verified: true },
      { id: 'w23', date: '2026-02-05', type: 'Film Study', duration: 45, verified: true },
      { id: 'w24', date: '2026-02-03', type: 'Position Drills', duration: 90, verified: true },
    ],
    verified: true,
    trainerId: 'trainer-2',
    bio: 'Sideline-to-sideline linebacker with closing speed and instinctive play recognition. Defensive captain.',
    gpa: 3.6,
    highlights: ['112 tackles (Junior)', 'All-Region First Team Defense', '4 forced fumbles'],
  },
  {
    id: 'ath-8',
    name: 'Trevon Harris',
    position: 'TE',
    school: 'Redan High School',
    city: 'Stone Mountain',
    state: 'GA',
    gradYear: 2027,
    height: '6\'4"',
    weight: 235,
    photoUrl: AVATARS.trevon,
    reliabilityScore: 76,
    reliabilityBreakdown: { consistency: 78, verification: 75, progress: 75 },
    stats: { fortyYardDash: 4.72, bench: 245, vertical: 32.5, catchRadius: 38 },
    trendData: {
      fortyYardDash: [{ date: 'Aug', value: 4.90 }, { date: 'Sep', value: 4.85 }, { date: 'Oct', value: 4.82 }, { date: 'Nov', value: 4.78 }, { date: 'Dec', value: 4.75 }, { date: 'Jan', value: 4.72 }],
      bench: [{ date: 'Aug', value: 215 }, { date: 'Sep', value: 225 }, { date: 'Oct', value: 230 }, { date: 'Nov', value: 235 }, { date: 'Dec', value: 240 }, { date: 'Jan', value: 245 }],
      vertical: [{ date: 'Aug', value: 30.0 }, { date: 'Sep', value: 30.5 }, { date: 'Oct', value: 31.0 }, { date: 'Nov', value: 31.5 }, { date: 'Dec', value: 32.0 }, { date: 'Jan', value: 32.5 }],
    },
    recentWorkouts: [
      { id: 'w25', date: '2026-02-08', type: 'Route Running', duration: 60, verified: false },
      { id: 'w26', date: '2026-02-06', type: 'Upper Body Strength', duration: 75, verified: true },
    ],
    verified: false,
    trainerId: 'trainer-3',
    bio: 'Versatile tight end with the athleticism to stretch the seam. Still developing as a blocker but elite receiving upside.',
    gpa: 3.3,
    highlights: ['620 receiving yards (Junior)', '6 receiving TDs', 'All-County Second Team'],
  },
  {
    id: 'ath-9',
    name: 'Malik Scott',
    position: 'RB',
    school: 'Lithonia High School',
    city: 'Lithonia',
    state: 'GA',
    gradYear: 2027,
    height: '5\'9"',
    weight: 190,
    photoUrl: AVATARS.malik,
    reliabilityScore: 72,
    reliabilityBreakdown: { consistency: 75, verification: 70, progress: 71 },
    stats: { fortyYardDash: 4.55, bench: 225, vertical: 33.0, tenYardSplit: 1.55 },
    trendData: {
      fortyYardDash: [{ date: 'Aug', value: 4.72 }, { date: 'Sep', value: 4.68 }, { date: 'Oct', value: 4.65 }, { date: 'Nov', value: 4.60 }, { date: 'Dec', value: 4.58 }, { date: 'Jan', value: 4.55 }],
      bench: [{ date: 'Aug', value: 195 }, { date: 'Sep', value: 200 }, { date: 'Oct', value: 210 }, { date: 'Nov', value: 215 }, { date: 'Dec', value: 220 }, { date: 'Jan', value: 225 }],
      vertical: [{ date: 'Aug', value: 30.5 }, { date: 'Sep', value: 31.0 }, { date: 'Oct', value: 31.5 }, { date: 'Nov', value: 32.0 }, { date: 'Dec', value: 32.5 }, { date: 'Jan', value: 33.0 }],
    },
    recentWorkouts: [
      { id: 'w27', date: '2026-02-07', type: 'Speed & Agility', duration: 60, verified: false },
      { id: 'w28', date: '2026-02-04', type: 'Position Drills', duration: 90, verified: false },
    ],
    verified: false,
    trainerId: 'trainer-1',
    bio: 'Shifty, elusive back with excellent vision. Dual-threat as a receiver out of the backfield.',
    gpa: 3.0,
    highlights: ['850 rushing yards (Sophomore)', '38 receptions', 'Freshman of the Year'],
  },
  {
    id: 'ath-10',
    name: 'Jordan Phillips',
    position: 'DB',
    school: 'Redan High School',
    city: 'Stone Mountain',
    state: 'GA',
    gradYear: 2026,
    height: '6\'0"',
    weight: 185,
    photoUrl: AVATARS.jordan,
    reliabilityScore: 83,
    reliabilityBreakdown: { consistency: 85, verification: 82, progress: 82 },
    stats: { fortyYardDash: 4.45, bench: 195, vertical: 37.0, backpedalToSprint: 1.75, hipFlip: 170, recoverySpeed: 21.0 },
    trendData: {
      fortyYardDash: [{ date: 'Aug', value: 4.58 }, { date: 'Sep', value: 4.55 }, { date: 'Oct', value: 4.52 }, { date: 'Nov', value: 4.50 }, { date: 'Dec', value: 4.48 }, { date: 'Jan', value: 4.45 }],
      bench: [{ date: 'Aug', value: 175 }, { date: 'Sep', value: 180 }, { date: 'Oct', value: 185 }, { date: 'Nov', value: 188 }, { date: 'Dec', value: 192 }, { date: 'Jan', value: 195 }],
      vertical: [{ date: 'Aug', value: 34.5 }, { date: 'Sep', value: 35.0 }, { date: 'Oct', value: 35.5 }, { date: 'Nov', value: 36.0 }, { date: 'Dec', value: 36.5 }, { date: 'Jan', value: 37.0 }],
    },
    recentWorkouts: [
      { id: 'w29', date: '2026-02-09', type: 'Position Drills', duration: 90, verified: true },
      { id: 'w30', date: '2026-02-07', type: 'Speed & Agility', duration: 60, verified: true },
      { id: 'w31', date: '2026-02-05', type: 'Film Study', duration: 45, verified: true },
    ],
    verified: true,
    trainerId: 'trainer-3',
    bio: 'Rangy safety with elite ball skills and physicality in run support. Versatile enough to play corner or nickel.',
    gpa: 3.8,
    highlights: ['5 interceptions (Junior)', 'All-County First Team', '85 tackles'],
  },
];

export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  athletes: string[];
  photoUrl: string;
  specialty?: string;
  yearsExperience?: number;
  certifications?: string[];
  rating?: number;
}

export const TRAINERS: Trainer[] = [
  {
    id: 'trainer-1',
    name: 'Coach Mike Davis',
    email: 'coach.davis@uchamp.com',
    phone: '(404) 555-0123',
    athletes: ['ath-1', 'ath-2', 'ath-3', 'ath-5', 'ath-9'],
    photoUrl: AVATARS.mike,
    specialty: 'Speed & Agility Development',
    yearsExperience: 15,
    certifications: ['CSCS', 'USAW Level 2', 'FMS Certified'],
    rating: 4.8,
  },
  {
    id: 'trainer-2',
    name: 'Coach Sarah Johnson',
    email: 'coach.johnson@uchamp.com',
    phone: '(404) 555-0456',
    athletes: ['ath-4', 'ath-7'],
    photoUrl: AVATARS.sarah,
    specialty: 'Position-Specific Coaching',
    yearsExperience: 10,
    certifications: ['CSCS', 'CPT', 'Sport Performance Coach'],
    rating: 4.9,
  },
  {
    id: 'trainer-3',
    name: 'Coach Ray Lewis Jr.',
    email: 'coach.lewis@uchamp.com',
    phone: '(404) 555-0789',
    athletes: ['ath-6', 'ath-8', 'ath-10'],
    photoUrl: AVATARS.ray,
    specialty: 'Strength & Power Training',
    yearsExperience: 8,
    certifications: ['CSCS', 'NSCA-CPT'],
    rating: 4.6,
  },
];

export interface Recruiter {
  id: string;
  name: string;
  school: string;
  email: string;
  watchlist: string[];
  photoUrl: string;
  conference?: string;
  title?: string;
}

export const RECRUITERS: Recruiter[] = [
  {
    id: 'rec-1',
    name: 'John Smith',
    school: 'Georgia Tech',
    email: 'jsmith@gatech.edu',
    watchlist: ['ath-1', 'ath-4', 'ath-7'],
    photoUrl: AVATARS.john,
    conference: 'ACC',
    title: 'Director of Player Personnel',
  },
  {
    id: 'rec-2',
    name: 'Patricia Washington',
    school: 'University of Georgia',
    email: 'pwashington@uga.edu',
    watchlist: ['ath-1', 'ath-2', 'ath-5'],
    photoUrl: AVATARS.patricia,
    conference: 'SEC',
    title: 'Area Scout — Metro Atlanta',
  },
  {
    id: 'rec-3',
    name: 'David Martinez',
    school: 'Georgia State University',
    email: 'dmartinez@gsu.edu',
    watchlist: ['ath-3', 'ath-6', 'ath-8', 'ath-10'],
    photoUrl: AVATARS.david,
    conference: 'Sun Belt',
    title: 'Recruiting Coordinator',
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
  backpedalToSprint: 'Backpedal\u2192Sprint',
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
  hipFlip: '\u00B0',
  recoverySpeed: 'mph',
  tenYardSplit: 's',
  reachIndex: '',
  punchPower: '',
  catchRadius: '"',
};
