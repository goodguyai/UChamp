import { AVATARS } from './avatars';

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
  film: "I reviewed your latest Film Room upload. Here's what the AI vision analysis found:\n\n**Overall Form Score: 87/100** — Strong work.\n\n**Top strengths:**\n- Your first-step explosion rated in the **top 5% for your position**\n- Hip drive during acceleration is textbook — this is elite-level\n- Change of direction cuts are sharp with 0.32s transition time\n\n**Areas to improve:**\n- **Deceleration mechanics** — The AI detected heel-first ground contact. Switch to forefoot braking for faster stops\n- **Stride frequency** — Good stride length, but turnover could be faster\n\nHead to the **Film Room** to see the full breakdown with timestamps, pro comparisons, and drill recommendations. Film don't lie.",
  nutrition: "Let's talk fuel, champ. Based on your training load and body metrics:\n\n**Daily targets:**\n- **Protein:** 195g (1g per lb bodyweight)\n- **Carbs:** 290g (fuel for your training intensity)\n- **Calories:** ~2,800-3,000 per day\n\n**Timing matters:**\n- Pre-workout (2hrs before): Complex carbs + lean protein\n- Post-workout (within 30 min): 40g protein + fast carbs\n- Before bed: Casein protein or cottage cheese for overnight recovery\n\n**Current issue:** Your soreness data suggests you might be under-fueling on training days. Track your intake for a week and let's compare.",
  combine: "Georgia Elite Combine is **34 days** away. Let's make sure you peak at the right time.\n\n**Current Benchmark Readiness: 78%**\n\n**Where you stand:**\n- 40-Yard Dash: 4.65s (target: 4.55s) — **82% there**\n- Vertical Jump: 34.5\" (target: 36\") — **90% there** ✅\n- 3-Cone Drill: 7.12s (target: 6.90s) — **70% there** ⚠️\n\n**34-Day Game Plan:**\n- **Weeks 1-2:** Heavy speed and agility focus. 3-cone is your biggest gap.\n- **Week 3:** Full combine simulation day on Saturday\n- **Week 4:** Taper week — light speed work, mobility, mental prep\n\n**Key priority:** Your 3-cone drill needs the most improvement. Add cone drill work 3x this week — I'll track your progress. Hit the **Combine Prep** page for your full training plan.",
};

export function getCoachResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('plateau') || lower.includes('stuck') || lower.includes('bench')) return COACH_RESPONSES.plateau;
  if (lower.includes('speed') || lower.includes('40') || lower.includes('faster') || lower.includes('sprint')) return COACH_RESPONSES.speed;
  if (lower.includes('recovery') || lower.includes('sore') || lower.includes('rest') || lower.includes('sleep')) return COACH_RESPONSES.recovery;
  if (lower.includes('combine') || lower.includes('benchmark') || lower.includes('prep') || lower.includes('event')) return COACH_RESPONSES.combine;
  if (lower.includes('game') || lower.includes('ready') || lower.includes('prepared')) return COACH_RESPONSES.gameday;
  if (lower.includes('film') || lower.includes('video') || lower.includes('form') || lower.includes('technique')) return COACH_RESPONSES.film;
  if (lower.includes('nutrition') || lower.includes('diet') || lower.includes('eat') || lower.includes('food') || lower.includes('protein')) return COACH_RESPONSES.nutrition;
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
  {
    id: 'ins-5',
    category: 'suggestion',
    title: 'Film Room Available',
    message: 'Upload your workout videos for AI form analysis. Get scored, compared to D1 athletes, and coached up.',
    action: 'Ask me about film review',
  },
  {
    id: 'ins-6',
    category: 'warning',
    title: 'Combine in 34 Days',
    message: 'Georgia Elite Combine is approaching. Your 3-cone drill needs the most work — add focused agility sessions.',
    action: 'Ask me about combine prep',
  },
];

export const PRO_COMPARISONS: ProComparison[] = [
  {
    name: 'Patrick Mahomes',
    position: 'QB',
    college: 'Texas Tech',
    photoUrl: AVATARS.mahomes,
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
    photoUrl: AVATARS.allen,
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
    photoUrl: AVATARS.lamar,
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
  { label: 'Review my film', icon: 'Film' },
  { label: 'Recovery advice', icon: 'Heart' },
  { label: 'Nutrition plan', icon: 'Apple' },
  { label: 'Game day readiness', icon: 'Trophy' },
  { label: 'Combine prep plan', icon: 'Target' },
];
