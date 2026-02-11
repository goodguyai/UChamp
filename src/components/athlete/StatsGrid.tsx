import { Zap, Dumbbell, ArrowUp, Timer, Target, Wind } from 'lucide-react';
import type { Athlete } from '../../lib/mockData';
import { STAT_LABELS, STAT_UNITS } from '../../lib/mockData';

interface StatsGridProps {
  athlete: Athlete;
}

const STAT_ICONS: Record<string, typeof Zap> = {
  fortyYardDash: Zap,
  bench: Dumbbell,
  vertical: ArrowUp,
  releaseTime: Timer,
  completionPct: Target,
  throwingVelocity: Wind,
  backpedalToSprint: Timer,
  hipFlip: Target,
  recoverySpeed: Wind,
  tenYardSplit: Timer,
  reachIndex: ArrowUp,
  punchPower: Zap,
  catchRadius: Target,
};

export default function StatsGrid({ athlete }: StatsGridProps) {
  const statEntries = Object.entries(athlete.stats);

  return (
    <div>
      <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 md:mb-4">
        Performance Stats
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        {statEntries.map(([key, value]) => {
          const Icon = STAT_ICONS[key] || Zap;
          const label = STAT_LABELS[key] || key;
          const unit = STAT_UNITS[key] || '';

          return (
            <div
              key={key}
              className="bg-black-elevated border border-gray-800 rounded-lg p-3 md:p-4 group hover:border-gold-primary transition-all duration-300 hover:shadow-gold"
            >
              <div className="w-7 h-7 md:w-9 md:h-9 mb-2 md:mb-3 rounded-full bg-gold-primary/10 flex items-center justify-center group-hover:bg-gold-primary/20 transition-colors">
                <Icon className="text-gold-primary" size={16} />
              </div>
              <p className="text-gray-500 text-[10px] md:text-xs font-medium uppercase tracking-wider mb-0.5 md:mb-1">
                {label}
              </p>
              <p className="text-white font-mono text-lg md:text-2xl font-bold">
                {value}
                <span className="text-gray-500 text-xs md:text-sm ml-1">{unit}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
