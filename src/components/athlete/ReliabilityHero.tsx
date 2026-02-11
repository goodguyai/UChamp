import { Trophy, TrendingUp, Shield, Zap } from 'lucide-react';
import type { Athlete } from '../../lib/mockData';
import { getReliabilityLabel } from '../../lib/mockData';

interface ReliabilityHeroProps {
  athlete: Athlete;
}

export default function ReliabilityHero({ athlete }: ReliabilityHeroProps) {
  const { reliabilityScore, reliabilityBreakdown } = athlete;
  const label = getReliabilityLabel(reliabilityScore);

  const breakdownItems = [
    { label: 'Consistency', value: reliabilityBreakdown.consistency, icon: TrendingUp },
    { label: 'Verification', value: reliabilityBreakdown.verification, icon: Shield },
    { label: 'Progress', value: reliabilityBreakdown.progress, icon: Zap },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black-elevated via-black-card to-black-elevated p-5 md:p-8 border-2 border-gold-primary shadow-gold-glow">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.1) 2px, rgba(212, 175, 55, 0.1) 4px)',
        }} />
      </div>

      {/* Radial glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 md:w-60 md:h-60 bg-gold-primary/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3 md:mb-4">
          Reliability Score
        </p>

        {/* The big number */}
        <div className="flex items-baseline gap-3 md:gap-4 mb-4 md:mb-6">
          <span className="font-mono text-6xl md:text-8xl font-black gold-shimmer">
            {reliabilityScore}
          </span>
          <span className="text-2xl md:text-3xl text-gray-600 font-mono">/100</span>
        </div>

        {/* Status label */}
        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gold-bright/20 border border-gold-bright mb-6 md:mb-8">
          <Trophy className="text-gold-bright" size={18} />
          <span className="text-gold-bright font-bold uppercase text-xs md:text-sm tracking-wide">
            {label} STATUS
          </span>
        </div>

        {/* Breakdown bars */}
        <div className="space-y-4 md:space-y-5">
          {breakdownItems.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-400 flex items-center gap-2">
                  <item.icon size={14} className="text-gold-primary/60" />
                  {item.label}
                </span>
                <span className="text-gold-primary font-bold font-mono">{item.value}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-primary to-gold-bright rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
