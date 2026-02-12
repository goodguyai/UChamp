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
  {
    id: 'sa-7',
    type: 'breakout',
    athleteId: 'ath-7',
    athleteName: 'Isaiah Brooks',
    title: 'Breakout Performance',
    message: 'Isaiah Brooks hit a verified 4.58s 40-yard dash and 285 lb bench press. His reliability score climbed to 91.',
    time: '1 day ago',
    read: false,
    priority: 'high',
  },
  {
    id: 'sa-8',
    type: 'new_verified',
    athleteId: 'ath-5',
    athleteName: 'Khalil Robinson',
    title: 'Workout Verified',
    message: 'Khalil Robinson completed a verified Speed & Agility session. 3 of 4 recent workouts now verified.',
    time: '2 days ago',
    read: false,
    priority: 'medium',
  },
  {
    id: 'sa-9',
    type: 'profile_update',
    athleteId: 'ath-10',
    athleteName: 'Jordan Phillips',
    title: 'New Film Uploaded',
    message: 'Jordan Phillips uploaded 3 new game film clips from the region playoff game. Coverage skills on full display.',
    time: '3 days ago',
    read: true,
    priority: 'medium',
  },
  {
    id: 'sa-10',
    type: 'combine_ready',
    athleteId: 'ath-4',
    athleteName: 'Terrell Green',
    title: 'Combine Simulation Complete',
    message: 'Terrell Green completed a full combine simulation scoring in the 95th percentile for WR prospects. All metrics verified.',
    time: '5 days ago',
    read: true,
    priority: 'low',
  },
];

export const WATCHLIST_NOTES: WatchlistNote[] = [
  { athleteId: 'ath-1', note: 'Elite arm talent. Track 40-time improvement. Possible early commit target.', date: 'Feb 5, 2026' },
  { athleteId: 'ath-4', note: 'Fastest WR in the region. Route running needs polish but raw speed is elite.', date: 'Feb 3, 2026' },
  { athleteId: 'ath-7', note: 'Most complete linebacker in the area. Leadership qualities stand out on film.', date: 'Feb 7, 2026' },
  { athleteId: 'ath-2', note: 'Ball skills are exceptional. Need to see more press coverage reps.', date: 'Feb 1, 2026' },
  { athleteId: 'ath-5', note: 'Downhill runner with surprising pass-catching ability. Physical style of play.', date: 'Jan 28, 2026' },
];

export const REPORT_METRICS: ReportMetric[] = [
  { label: 'Athletes Viewed', value: 42, change: 12, changeLabel: 'this week' },
  { label: 'Profiles Saved', value: 10, change: 4, changeLabel: 'this week' },
  { label: 'Avg Reliability Score', value: 85, change: 3, changeLabel: 'vs last month' },
  { label: 'Watchlist Size', value: 7, change: 2, changeLabel: 'this month' },
];

export const PIPELINE_DATA = [
  { stage: 'Identified', count: 42, color: '#525252' },
  { stage: 'Watching', count: 10, color: '#CD7F32' },
  { stage: 'Evaluating', count: 5, color: '#D4AF37' },
  { stage: 'Priority', count: 3, color: '#FFD700' },
];

export const POSITION_BREAKDOWN = [
  { position: 'QB', count: 1, avgScore: 92 },
  { position: 'WR', count: 1, avgScore: 90 },
  { position: 'DB', count: 3, avgScore: 85 },
  { position: 'OL', count: 1, avgScore: 85 },
  { position: 'RB', count: 2, avgScore: 80 },
  { position: 'LB', count: 1, avgScore: 91 },
  { position: 'DL', count: 1, avgScore: 79 },
  { position: 'TE', count: 1, avgScore: 76 },
];

export const WEEKLY_ACTIVITY = [
  { day: 'Mon', views: 8, saves: 2 },
  { day: 'Tue', views: 12, saves: 3 },
  { day: 'Wed', views: 6, saves: 1 },
  { day: 'Thu', views: 15, saves: 4 },
  { day: 'Fri', views: 10, saves: 2 },
  { day: 'Sat', views: 4, saves: 1 },
  { day: 'Sun', views: 2, saves: 0 },
];

export const ALERT_TYPE_CONFIG = {
  profile_update: { label: 'Profile Update', color: 'text-gray-400 bg-gray-700/30' },
  score_change: { label: 'Score Change', color: 'text-gold-primary bg-gold-primary/10' },
  new_verified: { label: 'Verified', color: 'text-gold-bright bg-gold-bright/10' },
  breakout: { label: 'Breakout', color: 'text-purple-400 bg-purple-400/10' },
  combine_ready: { label: 'Combine Ready', color: 'text-gold-bronze bg-gold-bronze/10' },
};
