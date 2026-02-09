import { useState } from 'react';
import { Ghost, ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { PRO_COMPARISONS } from '../../lib/aiCoachData';
import type { ProComparison } from '../../lib/aiCoachData';
import type { Athlete } from '../../lib/mockData';
import { STAT_LABELS, STAT_UNITS } from '../../lib/mockData';

interface ShadowModeProps {
  athlete: Athlete;
}

function ComparisonRow({
  label,
  unit,
  yours,
  proVal,
  proAtAge,
  lowerIsBetter,
}: {
  label: string;
  unit: string;
  yours: number;
  proVal: number;
  proAtAge: number;
  lowerIsBetter?: boolean;
}) {
  const vsProAtAge = lowerIsBetter ? proAtAge - yours : yours - proAtAge;

  const getIndicator = (diff: number) => {
    if (Math.abs(diff) < 0.5 && unit === 's') return { icon: Minus, color: 'text-gray-400', label: 'Even' };
    if (Math.abs(diff) < 2 && unit !== 's') return { icon: Minus, color: 'text-gray-400', label: 'Even' };
    if (diff > 0) return { icon: TrendingUp, color: 'text-gold-bright', label: 'Ahead' };
    return { icon: TrendingDown, color: 'text-gold-bronze', label: 'Behind' };
  };

  const ageIndicator = getIndicator(vsProAtAge);
  const AgeIcon = ageIndicator.icon;

  return (
    <div className="grid grid-cols-4 gap-3 py-3 border-b border-gray-800/50 last:border-0 items-center text-sm">
      <div className="text-gray-400 text-xs uppercase tracking-wider">{label}</div>
      <div className="text-white font-mono text-center">
        {yours}{unit}
      </div>
      <div className="text-gray-500 font-mono text-center">
        {proVal}{unit}
      </div>
      <div className={`flex items-center justify-center gap-1.5 ${ageIndicator.color}`}>
        <AgeIcon size={14} />
        <span className="text-xs font-medium">
          {vsProAtAge > 0 ? '+' : ''}{lowerIsBetter ? -vsProAtAge : vsProAtAge}{unit !== '' ? unit : ''}
        </span>
      </div>
    </div>
  );
}

export default function ShadowMode({ athlete }: ShadowModeProps) {
  const [selectedPro, setSelectedPro] = useState<ProComparison>(PRO_COMPARISONS[0]);
  const [expanded, setExpanded] = useState(true);

  // Get overlapping stats between athlete and selected pro
  const sharedStats = Object.keys(athlete.stats).filter(
    key => key in selectedPro.stats && key in selectedPro.atSameAge
  );

  return (
    <div className="bg-black-card border border-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-black-elevated/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Ghost size={20} className="text-purple-400" />
          </div>
          <div className="text-left">
            <h3 className="text-white font-bold text-sm uppercase tracking-wide">Shadow Mode</h3>
            <p className="text-gray-500 text-xs">Compare your stats to the pros at your age</p>
          </div>
        </div>
        {expanded ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
      </button>

      {expanded && (
        <div className="border-t border-gray-800">
          {/* Pro selector */}
          <div className="p-4 border-b border-gray-800/50">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Compare against</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {PRO_COMPARISONS.map(pro => (
                <button
                  key={pro.name}
                  onClick={() => setSelectedPro(pro)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedPro.name === pro.name
                      ? 'bg-gold-primary/10 border border-gold-primary text-gold-primary'
                      : 'bg-black-elevated border border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-black-card shrink-0">
                    <img src={pro.photoUrl} alt={pro.name} className="w-full h-full object-cover" />
                  </div>
                  {pro.name}
                </button>
              ))}
            </div>
          </div>

          {/* Selected pro info */}
          <div className="p-4 border-b border-gray-800/50 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-purple-500/50 overflow-hidden bg-black-elevated">
              <img src={selectedPro.photoUrl} alt={selectedPro.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-white font-bold">{selectedPro.name}</p>
              <p className="text-gray-500 text-sm">{selectedPro.position} · {selectedPro.college}</p>
              <p className="text-purple-400 text-xs mt-0.5">Stats at your age vs. NFL Combine</p>
            </div>
          </div>

          {/* Comparison table */}
          <div className="p-4">
            {/* Table header */}
            <div className="grid grid-cols-4 gap-3 pb-2 border-b border-gray-800 mb-1">
              <div className="text-gray-600 text-[10px] uppercase tracking-wider">Metric</div>
              <div className="text-gold-primary text-[10px] uppercase tracking-wider text-center">You</div>
              <div className="text-gray-600 text-[10px] uppercase tracking-wider text-center">Pro (Combine)</div>
              <div className="text-gray-600 text-[10px] uppercase tracking-wider text-center">vs Pro @ Your Age</div>
            </div>

            {sharedStats.map(key => (
              <ComparisonRow
                key={key}
                label={STAT_LABELS[key] || key}
                unit={STAT_UNITS[key] || ''}
                yours={athlete.stats[key]}
                proVal={selectedPro.stats[key]}
                proAtAge={selectedPro.atSameAge[key]}
                lowerIsBetter={key.includes('Dash') || key.includes('Split') || key === 'releaseTime'}
              />
            ))}

            {sharedStats.length === 0 && (
              <p className="text-gray-600 text-sm text-center py-6">
                No comparable stats available for this matchup.
              </p>
            )}
          </div>

          {/* Bottom insight */}
          <div className="p-4 border-t border-gray-800 bg-gold-primary/[0.02]">
            <p className="text-gray-400 text-xs leading-relaxed">
              <span className="text-gold-primary font-medium">AI Insight:</span>{' '}
              {sharedStats.length > 0
                ? `At your age, ${selectedPro.name} had similar or lower numbers in most metrics. Your current trajectory is competitive with his development path. Keep grinding.`
                : `Select a pro with matching position stats for a detailed comparison.`
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
