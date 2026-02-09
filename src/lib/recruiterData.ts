// Recruiter-specific mock data for alerts, reports, and watchlist activity

export interface ScoutAlert {
  id: string;
  type: 'profile_update' | 'score_change' | 'new_verified' | 'breakout' | 'combine_ready';
  athleteId: string;
  athleteName: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface WatchlistNote {
  athleteId: string;
  note: string;
  date: string;
}

export interface ReportMetric {
  label: string;
  value: number;
  change: number;
  changeLabel: string;
}

export const SCOUT_ALERTS: ScoutAlert[] = [
  {
    id: 'sa-1',
    type: 'score_change',
    athleteId: 'ath-1',
    athleteName: 'Marcus Johnson',
    title: 'Reliability Score Increase',
    message: 'Marcus Johnson\'s reliability score rose from 89 to 92 this week. Consistency and verification rates both improved.',
    time: '2 hours ago',
    read: false,
    priority: 'high',
  },
  {
    id: 'sa-2',
    type: 'breakout',
    athleteId: 'ath-4',
    athleteName: 'Terrell Green',
    title: 'Breakout Performance',
    message: 'Terrell Green posted a new 40-yard dash PR of 4.42s. This puts him in the top 5% of WR prospects nationally.',
    time: '5 hours ago',
    read: false,
    priority: 'high',
  },
  {
    id: 'sa-3',
    type: 'new_verified',
    athleteId: 'ath-2',
    athleteName: 'Jamal Williams',
    title: 'Workout Verified',
    message: 'Jamal Williams had his Position Drills session verified by Coach Davis. 3 of 3 recent workouts now verified.',
    time: '1 day ago',
    read: true,
    priority: 'medium',
  },
  {
    id: 'sa-4',
    type: 'profile_update',
    athleteId: 'ath-3',
    athleteName: 'DeAndre Thomas',
    title: 'Profile Updated',
    message: 'DeAndre Thomas updated his bench press stat to 315 lbs (+20 lbs from last month). New film footage added.',
    time: '2 days ago',
    read: true,
    priority: 'medium',
  },
  {
    id: 'sa-5',
    type: 'combine_ready',
    athleteId: 'ath-1',
    athleteName: 'Marcus Johnson',
    title: 'Combine Ready Assessment',
    message: 'AI analysis indicates Marcus Johnson\'s metrics are combine-ready. 40-yard, bench, and vertical all in competitive range for QB prospects.',
    time: '3 days ago',
    read: true,
    priority: 'low',
  },
  {
    id: 'sa-6',
    type: 'score_change',
    athleteId: 'ath-2',
    athleteName: 'Jamal Williams',
    title: 'Score Milestone',
    message: 'Jamal Williams crossed the 85+ reliability threshold. He is now visible in premium search results.',
    time: '4 days ago',
    read: true,
    priority: 'medium',
  },
];

export const WATCHLIST_NOTES: WatchlistNote[] = [
  { athleteId: 'ath-1', note: 'Elite arm talent. Track 40-time improvement. Possible early commit target.', date: 'Feb 5, 2026' },
  { athleteId: 'ath-4', note: 'Fastest WR in the region. Route running needs polish but raw speed is elite.', date: 'Feb 3, 2026' },
];

export const REPORT_METRICS: ReportMetric[] = [
  { label: 'Athletes Viewed', value: 24, change: 8, changeLabel: 'this week' },
  { label: 'Profiles Saved', value: 6, change: 2, changeLabel: 'this week' },
  { label: 'Avg Reliability Score', value: 88, change: 3, changeLabel: 'vs last month' },
  { label: 'Watchlist Size', value: 2, change: 0, changeLabel: 'no change' },
];

export const PIPELINE_DATA = [
  { stage: 'Identified', count: 24, color: '#525252' },
  { stage: 'Watching', count: 6, color: '#CD7F32' },
  { stage: 'Evaluating', count: 2, color: '#D4AF37' },
  { stage: 'Priority', count: 1, color: '#FFD700' },
];

export const POSITION_BREAKDOWN = [
  { position: 'QB', count: 1, avgScore: 92 },
  { position: 'WR', count: 1, avgScore: 90 },
  { position: 'DB', count: 1, avgScore: 88 },
  { position: 'OL', count: 1, avgScore: 85 },
];

export const WEEKLY_ACTIVITY = [
  { day: 'Mon', views: 5, saves: 1 },
  { day: 'Tue', views: 8, saves: 2 },
  { day: 'Wed', views: 3, saves: 0 },
  { day: 'Thu', views: 12, saves: 3 },
  { day: 'Fri', views: 6, saves: 1 },
  { day: 'Sat', views: 2, saves: 0 },
  { day: 'Sun', views: 1, saves: 0 },
];

export const ALERT_TYPE_CONFIG = {
  profile_update: { label: 'Profile Update', color: 'text-gray-400 bg-gray-700/30' },
  score_change: { label: 'Score Change', color: 'text-gold-primary bg-gold-primary/10' },
  new_verified: { label: 'Verified', color: 'text-gold-bright bg-gold-bright/10' },
  breakout: { label: 'Breakout', color: 'text-purple-400 bg-purple-400/10' },
  combine_ready: { label: 'Combine Ready', color: 'text-gold-bronze bg-gold-bronze/10' },
};
