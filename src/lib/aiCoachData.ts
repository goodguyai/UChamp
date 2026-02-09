// AI Coach mock data - simulated conversation responses and analysis

export interface ChatMessage {
  id: string;
  role: 'user' | 'coach';
  content: string;
  timestamp: string;
}

export interface CoachInsight {
  id: string;
  category: 'plateau' | 'suggestion' | 'achievement' | 'warning';
  title: string;
  message: string;
  metric?: string;
  action?: string;
}

export interface ProComparison {
  name: string;
  position: string;
  college: string;
  photoUrl: string;
  stats: Record<string, number>;
  atSameAge: Record<string, number>;
}

// Mock AI coach responses keyed by common user prompts
const COACH_RESPONSES: Record<string, string> = {
  default: "I'm your AI performance coach. I analyze your workouts, track your progress, and help you break through plateaus. What would you like to work on?",
  plateau: "Looking at your bench press data, you've been at 225 lbs for 3 weeks now. This is a classic plateau. Here's my recommendation:\n\n**Week 1-2:** Drop to 205 lbs, increase reps to 8-10 per set\n**Week 3:** Introduce pause reps at 215 lbs (3-count hold)\n**Week 4:** Test new max\n\nAlso, your sleep has averaged 6.2 hours this month. Getting that to 7.5+ hours will directly impact your recovery and strength gains.",
  speed: "Your 40-yard dash improved from 4.82s to 4.65s over 5 months — that's elite-level improvement. To break into the 4.5s, focus on:\n\n1. **Start mechanics** — Your first 10 yards need work. Film analysis shows you're standing up too early.\n2. **Hip flexor mobility** — Add dynamic stretching pre-workout\n3. **Resisted sprints** — 2x per week with sled pulls at 15% body weight\n\nAt your current trajectory, you could hit 4.55s by summer combine season.",
  recovery: "Based on your workout logs and soreness data, your recovery pattern needs adjustment:\n\n**Current concern:** You logged 8/10 soreness after Tuesday's upper body session, but trained upper body again Thursday. That's not enough recovery time.\n\n**My recommendation:**\n- Space upper body sessions 72 hours apart minimum\n- Add 15 min foam rolling post-workout\n- Your sleep quality dips on training days — try cutting caffeine after 2pm\n- Current nutrition window looks good, but increase protein to 1g per lb bodyweight",
  gameday: "Based on your reliability score of 92 and recent performance data, here's your game-day readiness assessment:\n\n**Physical Readiness: 89/100**\n- Strength metrics are peaking\n- Speed is in top 5% range for QBs\n- Minor fatigue from Wednesday's session (monitor)\n\n**Mental Readiness: 94/100**\n- Consistency score is at all-time high\n- 12-day workout streak shows elite discipline\n- Verified workouts building recruiter confidence\n\n**Key Focus:** Stay hydrated, get 8+ hours tonight, and trust your preparation. The data says you're ready.",
};

export function getCoachResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('plateau') || lower.includes('stuck') || lower.includes('bench')) return COACH_RESPONSES.plateau;
  if (lower.includes('speed') || lower.includes('40') || lower.includes('faster') || lower.includes('sprint')) return COACH_RESPONSES.speed;
  if (lower.includes('recovery') || lower.includes('sore') || lower.includes('rest') || lower.includes('sleep')) return COACH_RESPONSES.recovery;
  if (lower.includes('game') || lower.includes('ready') || lower.includes('combine') || lower.includes('prepared')) return COACH_RESPONSES.gameday;
  return COACH_RESPONSES.default;
}

export const INITIAL_INSIGHTS: CoachInsight[] = [
  {
    id: 'ins-1',
    category: 'plateau',
    title: 'Bench Press Plateau',
    message: 'Your bench has been at 225 lbs for 3 weeks. Time to switch up your training approach.',
    metric: 'bench',
    action: 'Ask me about plateau breaking strategies',
  },
  {
    id: 'ins-2',
    category: 'achievement',
    title: '40-Yard PR Trajectory',
    message: 'At your current rate, you\'re on pace to hit 4.55s by June. Keep pushing.',
    metric: 'fortyYardDash',
  },
  {
    id: 'ins-3',
    category: 'suggestion',
    title: 'Sleep Optimization',
    message: 'Your average sleep dropped to 6.2 hours. Increasing to 7.5+ could boost recovery by 30%.',
    action: 'Ask me about recovery protocols',
  },
  {
    id: 'ins-4',
    category: 'warning',
    title: 'Overtraining Risk',
    message: 'You\'ve trained upper body 3 times in 5 days. Consider more spacing for optimal recovery.',
    action: 'Ask me about recovery scheduling',
  },
];

export const PRO_COMPARISONS: ProComparison[] = [
  {
    name: 'Patrick Mahomes',
    position: 'QB',
    college: 'Texas Tech',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mahomes',
    stats: {
      fortyYardDash: 4.80,
      bench: 225,
      vertical: 34.0,
      throwingVelocity: 62,
    },
    atSameAge: {
      fortyYardDash: 4.85,
      bench: 205,
      vertical: 31.5,
      throwingVelocity: 55,
    },
  },
  {
    name: 'Josh Allen',
    position: 'QB',
    college: 'Wyoming',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Allen',
    stats: {
      fortyYardDash: 4.75,
      bench: 245,
      vertical: 36.0,
      throwingVelocity: 65,
    },
    atSameAge: {
      fortyYardDash: 4.90,
      bench: 215,
      vertical: 33.0,
      throwingVelocity: 56,
    },
  },
  {
    name: 'Lamar Jackson',
    position: 'QB',
    college: 'Louisville',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lamar',
    stats: {
      fortyYardDash: 4.34,
      bench: 205,
      vertical: 34.5,
      throwingVelocity: 58,
    },
    atSameAge: {
      fortyYardDash: 4.55,
      bench: 185,
      vertical: 32.0,
      throwingVelocity: 52,
    },
  },
];

export const QUICK_PROMPTS = [
  { label: 'Break my plateau', icon: 'TrendingUp' },
  { label: 'Speed training plan', icon: 'Zap' },
  { label: 'Recovery advice', icon: 'Heart' },
  { label: 'Game day readiness', icon: 'Trophy' },
];
