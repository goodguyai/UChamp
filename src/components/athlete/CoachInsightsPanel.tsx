import { TrendingUp, AlertTriangle, Sparkles, Target } from 'lucide-react';
import { INITIAL_INSIGHTS } from '../../lib/aiCoachData';
import type { CoachInsight } from '../../lib/aiCoachData';

interface CoachInsightsPanelProps {
  onAskCoach?: (question: string) => void;
}

const CATEGORY_CONFIG: Record<CoachInsight['category'], { icon: typeof TrendingUp; color: string; bg: string }> = {
  plateau: { icon: AlertTriangle, color: 'text-gold-bronze', bg: 'bg-gold-bronze/10' },
  suggestion: { icon: Sparkles, color: 'text-gold-primary', bg: 'bg-gold-primary/10' },
  achievement: { icon: TrendingUp, color: 'text-gold-bright', bg: 'bg-gold-bright/10' },
  warning: { icon: Target, color: 'text-red-400', bg: 'bg-red-400/10' },
};

export default function CoachInsightsPanel({ onAskCoach }: CoachInsightsPanelProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
        <Sparkles size={14} className="text-gold-primary" />
        AI Insights
      </h3>

      {INITIAL_INSIGHTS.map(insight => {
        const config = CATEGORY_CONFIG[insight.category];
        const Icon = config.icon;

        return (
          <div
            key={insight.id}
            className="bg-black-elevated border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${config.bg}`}>
                <Icon size={14} className={config.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{insight.title}</p>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{insight.message}</p>
                {insight.action && onAskCoach && (
                  <button
                    onClick={() => onAskCoach(insight.action!)}
                    className="mt-2 text-gold-primary text-xs font-medium hover:underline cursor-pointer"
                  >
                    {insight.action} →
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
