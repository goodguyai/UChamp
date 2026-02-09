import { useState } from 'react';
import { Shield, TrendingUp, Eye, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import type { Athlete } from '../../lib/mockData';

interface RetentionScoreProps {
  athlete: Athlete;
}

interface RetentionFactor {
  label: string;
  value: number;
  max: number;
  icon: typeof Shield;
  description: string;
}

function getRetentionScore(athlete: Athlete): number {
  // Simulated retention score based on athlete data patterns
  const workoutConsistency = athlete.reliabilityBreakdown.consistency;
  const verificationRate = athlete.reliabilityBreakdown.verification;
  const progressRate = athlete.reliabilityBreakdown.progress;
  const workoutFrequency = Math.min(100, (athlete.recentWorkouts.length / 5) * 100);
  const verifiedPct = Math.min(100, (athlete.recentWorkouts.filter(w => w.verified).length / Math.max(1, athlete.recentWorkouts.length)) * 100);

  return Math.round(
    workoutConsistency * 0.25 +
    verificationRate * 0.20 +
    progressRate * 0.20 +
    workoutFrequency * 0.15 +
    verifiedPct * 0.20
  );
}

function getRetentionFactors(athlete: Athlete): RetentionFactor[] {
  const totalWorkouts = athlete.recentWorkouts.length;
  const verifiedWorkouts = athlete.recentWorkouts.filter(w => w.verified).length;

  return [
    {
      label: 'Workout Frequency',
      value: Math.min(100, (totalWorkouts / 5) * 100),
      max: 100,
      icon: Calendar,
      description: `${totalWorkouts} workouts logged this month`,
    },
    {
      label: 'Verification Rate',
      value: totalWorkouts > 0 ? Math.round((verifiedWorkouts / totalWorkouts) * 100) : 0,
      max: 100,
      icon: Shield,
      description: `${verifiedWorkouts}/${totalWorkouts} workouts verified by trainer`,
    },
    {
      label: 'Progress Momentum',
      value: athlete.reliabilityBreakdown.progress,
      max: 100,
      icon: TrendingUp,
      description: 'Based on stat improvements over last 3 months',
    },
    {
      label: 'Platform Engagement',
      value: 88,
      max: 100,
      icon: Clock,
      description: 'Active logging, responding to coach feedback',
    },
    {
      label: 'Recruiter Visibility',
      value: athlete.reliabilityScore >= 85 ? 92 : 65,
      max: 100,
      icon: Eye,
      description: athlete.reliabilityScore >= 85
        ? 'Your profile is visible to premium recruiters'
        : 'Increase reliability score to boost visibility',
    },
  ];
}

function getRetentionLabel(score: number): { label: string; color: string } {
  if (score >= 90) return { label: 'LOCKED IN', color: 'text-gold-bright' };
  if (score >= 75) return { label: 'COMMITTED', color: 'text-gold-primary' };
  if (score >= 60) return { label: 'BUILDING', color: 'text-gold-bronze' };
  return { label: 'AT RISK', color: 'text-red-400' };
}

export default function RetentionScore({ athlete }: RetentionScoreProps) {
  const [expanded, setExpanded] = useState(false);
  const score = getRetentionScore(athlete);
  const factors = getRetentionFactors(athlete);
  const { label, color } = getRetentionLabel(score);

  return (
    <div className="bg-black-card border border-gray-800 rounded-xl overflow-hidden">
      {/* Header with score */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 hover:bg-black-elevated/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center">
              <Shield size={20} className="text-gold-primary" />
            </div>
            <div className="text-left">
              <h3 className="text-white font-bold text-sm uppercase tracking-wide">Retention Score</h3>
              <p className="text-gray-500 text-xs">How likely you are to stay on the grind</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-white font-mono text-2xl font-black">{score}</p>
              <p className={`text-xs font-bold uppercase tracking-wider ${color}`}>{label}</p>
            </div>
            {expanded ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
          </div>
        </div>

        {/* Mini progress bar */}
        <div className="mt-4 h-2 bg-black-elevated rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${score}%`,
              background: score >= 90
                ? 'linear-gradient(90deg, #D4AF37, #FFD700)'
                : score >= 75
                ? 'linear-gradient(90deg, #CD7F32, #D4AF37)'
                : score >= 60
                ? 'linear-gradient(90deg, #8B6914, #CD7F32)'
                : 'linear-gradient(90deg, #ef4444, #f87171)',
            }}
          />
        </div>
      </button>

      {/* Expanded factors */}
      {expanded && (
        <div className="border-t border-gray-800 p-4 space-y-4">
          {factors.map(factor => {
            const Icon = factor.icon;
            return (
              <div key={factor.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-gray-500" />
                    <span className="text-gray-300 text-xs font-medium">{factor.label}</span>
                  </div>
                  <span className="text-gold-primary font-mono text-xs font-bold">{Math.round(factor.value)}%</span>
                </div>
                <div className="h-1.5 bg-black-elevated rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full bg-gold-primary/60 rounded-full transition-all duration-700"
                    style={{ width: `${factor.value}%` }}
                  />
                </div>
                <p className="text-gray-600 text-[10px]">{factor.description}</p>
              </div>
            );
          })}

          {/* AI suggestion */}
          <div className="mt-4 p-3 bg-gold-primary/[0.03] border border-gold-primary/10 rounded-lg">
            <p className="text-gray-400 text-xs leading-relaxed">
              <span className="text-gold-primary font-medium">Boost your score:</span>{' '}
              {score < 90
                ? 'Get all workouts verified this week and maintain your logging streak to push into LOCKED IN territory.'
                : 'You\'re in elite territory. Keep this consistency and recruiter interest will continue to climb.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
