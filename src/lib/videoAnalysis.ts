// Video analysis mock data - simulated AI form analysis
// In production, this would integrate with computer vision APIs

export interface VideoUpload {
  id: string;
  filename: string;
  type: 'mp4' | 'mov' | 'webm';
  size: string;
  duration: string;
  thumbnailColor: string; // Placeholder gradient for demo
  uploadedAt: string;
  workoutType: string;
  status: 'uploading' | 'processing' | 'analyzed' | 'error';
  progress: number; // 0-100
}

export interface FormAnalysis {
  id: string;
  videoId: string;
  overallScore: number; // 0-100
  category: 'excellent' | 'good' | 'needs_work' | 'critical';
  summary: string;
  breakdown: FormBreakdownItem[];
  keyMoments: KeyMoment[];
  comparisons: FormComparison[];
  recommendations: string[];
}

export interface FormBreakdownItem {
  name: string;
  score: number;
  feedback: string;
  icon: 'body' | 'speed' | 'power' | 'technique' | 'balance' | 'timing';
}

export interface KeyMoment {
  timestamp: string;
  label: string;
  type: 'highlight' | 'correction' | 'milestone';
  description: string;
}

export interface FormComparison {
  metric: string;
  athlete: number;
  proAvg: number;
  unit: string;
}

// Simulated analysis results for different workout types
export const MOCK_ANALYSES: Record<string, Omit<FormAnalysis, 'id' | 'videoId'>> = {
  'Speed & Agility': {
    overallScore: 87,
    category: 'good',
    summary: 'Strong acceleration phase with excellent hip drive. First-step explosion is above average. Deceleration mechanics need refinement — you\'re braking with your heels instead of forefoot.',
    breakdown: [
      { name: 'Start Position', score: 92, feedback: 'Low center of gravity, excellent 3-point stance. Weight distribution is optimal.', icon: 'body' },
      { name: 'Acceleration', score: 90, feedback: 'First 10 yards show elite-level ground force application. Arm drive is powerful.', icon: 'speed' },
      { name: 'Top-End Speed', score: 85, feedback: 'Good stride length but stride frequency could increase. Focus on faster turnover.', icon: 'speed' },
      { name: 'Deceleration', score: 72, feedback: 'Braking with heels detected. Transition to forefoot braking for faster change of direction.', icon: 'technique' },
      { name: 'Change of Direction', score: 88, feedback: 'Sharp cuts with good hip rotation. Plant foot angle is within optimal range.', icon: 'balance' },
      { name: 'Recovery Stride', score: 84, feedback: 'Solid recovery after direction changes. Could be slightly more explosive out of cuts.', icon: 'power' },
    ],
    keyMoments: [
      { timestamp: '0:03', label: 'Explosive Start', type: 'highlight', description: 'First-step reaction time: 0.18s — top 5% for position' },
      { timestamp: '0:07', label: 'Peak Speed Reached', type: 'milestone', description: 'Hit 19.8 mph — personal best for training session' },
      { timestamp: '0:12', label: 'Heel Braking', type: 'correction', description: 'AI detected heel-first ground contact during deceleration phase' },
      { timestamp: '0:18', label: 'Sharp Cut', type: 'highlight', description: 'Left 45-degree cut executed with 0.32s transition time — elite level' },
      { timestamp: '0:24', label: 'Recovery', type: 'correction', description: 'Slight balance loss after third cone — strengthen lateral stabilizers' },
    ],
    comparisons: [
      { metric: 'First-step (0-5 yd)', athlete: 1.02, proAvg: 0.98, unit: 's' },
      { metric: 'Top Speed', athlete: 19.8, proAvg: 21.2, unit: 'mph' },
      { metric: 'COD Time', athlete: 0.32, proAvg: 0.28, unit: 's' },
      { metric: 'Deceleration Rate', athlete: 6.2, proAvg: 7.8, unit: 'm/s²' },
    ],
    recommendations: [
      'Drill forefoot braking mechanics with wall deceleration drills 3x/week',
      'Add resisted lateral shuffles to improve change-of-direction power',
      'Incorporate wicket runs for stride frequency improvement',
      'Film next session from side angle for better acceleration analysis',
    ],
  },
  'Upper Body Strength': {
    overallScore: 83,
    category: 'good',
    summary: 'Solid bench press form with good bar path. Slight elbow flare on reps 4-5 detected. Back arch is controlled and within safe range. Grip width is optimal for your frame.',
    breakdown: [
      { name: 'Bar Path', score: 88, feedback: 'Consistent J-curve path. Slight drift on final reps — fatigue management needed.', icon: 'technique' },
      { name: 'Elbow Position', score: 76, feedback: 'Elbows flare past 45° on reps 4-5. Tuck elbows slightly more under fatigue.', icon: 'body' },
      { name: 'Tempo Control', score: 85, feedback: 'Good eccentric control (2.1s avg). Concentric could be more explosive.', icon: 'timing' },
      { name: 'Leg Drive', score: 90, feedback: 'Excellent foot placement and drive through the floor. Very stable base.', icon: 'power' },
      { name: 'Lockout', score: 82, feedback: 'Full extension achieved but speed drops off. Focus on tricep lockout power.', icon: 'power' },
      { name: 'Breathing', score: 80, feedback: 'Good Valsalva on heavy reps. Remember to reset between reps for longer sets.', icon: 'body' },
    ],
    keyMoments: [
      { timestamp: '0:05', label: 'Strong Setup', type: 'highlight', description: 'Proper arch, retracted scapulae, feet firmly planted' },
      { timestamp: '0:15', label: 'Smooth Rep 1-3', type: 'highlight', description: 'Bar path and speed consistent across first 3 reps' },
      { timestamp: '0:28', label: 'Elbow Flare', type: 'correction', description: 'Rep 4: Elbows drifted to ~55° — should stay under 45°' },
      { timestamp: '0:35', label: 'Grind Rep', type: 'milestone', description: 'Rep 5 completed with 3.2s concentric — gutsy finish' },
    ],
    comparisons: [
      { metric: 'Eccentric Speed', athlete: 2.1, proAvg: 1.8, unit: 's' },
      { metric: 'Concentric Speed', athlete: 1.4, proAvg: 1.1, unit: 's' },
      { metric: 'Bar Path Deviation', athlete: 2.3, proAvg: 1.5, unit: 'cm' },
      { metric: 'Rep Consistency', athlete: 88, proAvg: 94, unit: '%' },
    ],
    recommendations: [
      'Add band-resisted bench press to improve lockout speed',
      'Practice paused reps at 80% 1RM to ingrain elbow position under fatigue',
      'Tempo training: 3-1-X-1 for next 3 weeks to build control',
      'Film from above to better track bar path consistency',
    ],
  },
  'Position Drills': {
    overallScore: 91,
    category: 'excellent',
    summary: 'Elite-level pocket movement and throwing mechanics. Release point is consistent across dropbacks. Footwork in the pocket shows advanced awareness. Ball placement on routes is trending up.',
    breakdown: [
      { name: 'Dropback Mechanics', score: 94, feedback: 'Quick, balanced 3-step and 5-step drops. Eyes downfield throughout.', icon: 'technique' },
      { name: 'Throwing Motion', score: 92, feedback: 'Clean overhand release. Consistent release point at 11 o\'clock. Spiral is tight.', icon: 'technique' },
      { name: 'Pocket Movement', score: 90, feedback: 'Excellent lateral slides and step-up mechanics. Maintains throwing platform.', icon: 'balance' },
      { name: 'Ball Placement', score: 88, feedback: 'Good accuracy on short/intermediate. Deep ball placement improving.', icon: 'technique' },
      { name: 'Hip Rotation', score: 93, feedback: 'Full hip-through on every throw. This is where your velocity comes from.', icon: 'power' },
      { name: 'Follow Through', score: 89, feedback: 'Consistent follow-through. Occasionally short on out-breaking routes.', icon: 'body' },
    ],
    keyMoments: [
      { timestamp: '0:08', label: 'Perfect 5-Step', type: 'highlight', description: 'Textbook 5-step drop: 1.62s with eyes locked on safety' },
      { timestamp: '0:14', label: 'Pocket Slide', type: 'highlight', description: 'Clean left pocket slide while maintaining throwing platform' },
      { timestamp: '0:22', label: 'Deep Ball', type: 'milestone', description: '52-yard throw with tight spiral and optimal trajectory' },
      { timestamp: '0:31', label: 'Short Follow', type: 'correction', description: 'Out route: Ball placement slightly behind receiver — extend follow-through' },
    ],
    comparisons: [
      { metric: 'Release Time', athlete: 2.3, proAvg: 2.1, unit: 's' },
      { metric: 'Spiral Rate', athlete: 580, proAvg: 620, unit: 'rpm' },
      { metric: 'Accuracy (15-25 yd)', athlete: 68, proAvg: 72, unit: '%' },
      { metric: 'Pocket Time', athlete: 3.1, proAvg: 2.8, unit: 's' },
    ],
    recommendations: [
      'Work on shortening release by 0.1s with quick-release drill progressions',
      'Film out-breaking routes specifically to improve ball placement on those patterns',
      'Continue pocket movement drills — this is becoming a real strength',
      'Add resistance band throws to build spiral tightness',
    ],
  },
};

// Get analysis for a workout type (falls back to Speed & Agility)
export function getMockAnalysis(workoutType: string): Omit<FormAnalysis, 'id' | 'videoId'> {
  return MOCK_ANALYSES[workoutType] || MOCK_ANALYSES['Speed & Agility'];
}

// Simulated processing stages
export const PROCESSING_STAGES = [
  { label: 'Uploading video...', percent: 15 },
  { label: 'Extracting frames...', percent: 30 },
  { label: 'Detecting body landmarks...', percent: 50 },
  { label: 'Analyzing movement patterns...', percent: 65 },
  { label: 'Comparing with pro models...', percent: 80 },
  { label: 'Generating recommendations...', percent: 92 },
  { label: 'Analysis complete', percent: 100 },
];

export function getAnalysisCategoryColor(category: FormAnalysis['category']): string {
  switch (category) {
    case 'excellent': return '#FFD700';
    case 'good': return '#D4AF37';
    case 'needs_work': return '#CD7F32';
    case 'critical': return '#ef4444';
  }
}

export function getAnalysisCategoryLabel(category: FormAnalysis['category']): string {
  switch (category) {
    case 'excellent': return 'ELITE FORM';
    case 'good': return 'STRONG FORM';
    case 'needs_work': return 'NEEDS WORK';
    case 'critical': return 'CRITICAL';
  }
}

export function getScoreColor(score: number): string {
  if (score >= 90) return '#FFD700';
  if (score >= 80) return '#D4AF37';
  if (score >= 70) return '#CD7F32';
  return '#ef4444';
}
