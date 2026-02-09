import { useState } from 'react';
import {
  Film, Target, Zap, Shield, Gauge, Timer, ArrowUp, ArrowDown,
  Minus, ChevronDown, ChevronUp, Lightbulb, PlayCircle, AlertTriangle,
  Award, Activity,
} from 'lucide-react';
import type { FormAnalysis, FormBreakdownItem, KeyMoment } from '../../lib/videoAnalysis';
import { getScoreColor, getAnalysisCategoryLabel, getAnalysisCategoryColor } from '../../lib/videoAnalysis';

interface VideoAnalysisResultsProps {
  analysis: FormAnalysis;
  onClose: () => void;
}

const BREAKDOWN_ICONS: Record<FormBreakdownItem['icon'], typeof Target> = {
  body: Activity,
  speed: Zap,
  power: Gauge,
  technique: Target,
  balance: Shield,
  timing: Timer,
};

const MOMENT_STYLES: Record<KeyMoment['type'], { bg: string; text: string; icon: typeof Award }> = {
  highlight: { bg: 'bg-gold-primary/10', text: 'text-gold-primary', icon: Award },
  correction: { bg: 'bg-red-500/10', text: 'text-red-400', icon: AlertTriangle },
  milestone: { bg: 'bg-gold-bright/10', text: 'text-gold-bright', icon: Zap },
};

export default function VideoAnalysisResults({ analysis, onClose }: VideoAnalysisResultsProps) {
  const [expandedBreakdown, setExpandedBreakdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'breakdown' | 'moments' | 'comparison'>('breakdown');

  const categoryColor = getAnalysisCategoryColor(analysis.category);
  const categoryLabel = getAnalysisCategoryLabel(analysis.category);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black-pure/85 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-black-card border border-gray-800 rounded-2xl w-full max-w-2xl my-8 shadow-gold-glow overflow-hidden">
        {/* Header with overall score */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/10 via-transparent to-gold-bronze/5" />
          <div className="relative p-6 pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold-primary/10 flex items-center justify-center">
                  <Film className="text-gold-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tight">AI Form Analysis</h2>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Powered by UChamp Vision AI</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors cursor-pointer text-sm">
                Close
              </button>
            </div>

            {/* Score display */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1a1a1a" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke={categoryColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${analysis.overallScore * 2.51} 251`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-2xl font-black font-mono text-white">{analysis.overallScore}</span>
                    <span className="text-gray-500 text-xs block">/100</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <span
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2"
                  style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}
                >
                  {categoryLabel}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed">{analysis.summary}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 px-6">
          <div className="flex gap-1">
            {(['breakdown', 'moments', 'comparison'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                  activeTab === tab
                    ? 'border-gold-primary text-gold-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab === 'breakdown' ? 'Form Breakdown' : tab === 'moments' ? 'Key Moments' : 'Pro Comparison'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Breakdown tab */}
          {activeTab === 'breakdown' && (
            <div className="space-y-3">
              {analysis.breakdown.map((item) => {
                const Icon = BREAKDOWN_ICONS[item.icon];
                const color = getScoreColor(item.score);
                const isExpanded = expandedBreakdown === item.name;

                return (
                  <div key={item.name} className="bg-black-elevated border border-gray-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedBreakdown(isExpanded ? null : item.name)}
                      className="w-full flex items-center justify-between p-4 hover:bg-black-card/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                          <Icon size={14} style={{ color }} />
                        </div>
                        <span className="text-white text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm" style={{ color }}>{item.score}</span>
                        <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${item.score}%`, backgroundColor: color }} />
                        </div>
                        {isExpanded ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0">
                        <p className="text-gray-400 text-xs leading-relaxed pl-11">{item.feedback}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Key Moments tab */}
          {activeTab === 'moments' && (
            <div className="space-y-3">
              {analysis.keyMoments.map((moment, i) => {
                const style = MOMENT_STYLES[moment.type];
                const MomentIcon = style.icon;
                return (
                  <div key={i} className="flex gap-4 group">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full ${style.bg} flex items-center justify-center shrink-0`}>
                        <MomentIcon size={14} className={style.text} />
                      </div>
                      {i < analysis.keyMoments.length - 1 && (
                        <div className="w-px flex-1 bg-gray-800 my-1" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-4 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-gold-primary bg-gold-primary/10 px-2 py-0.5 rounded">
                          {moment.timestamp}
                        </span>
                        <span className="text-white text-sm font-bold">{moment.label}</span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{moment.description}</p>
                    </div>
                  </div>
                );
              })}

              <div className="mt-4 p-3 bg-gold-primary/[0.03] border border-gold-primary/10 rounded-lg flex items-start gap-2">
                <PlayCircle size={14} className="text-gold-primary shrink-0 mt-0.5" />
                <p className="text-gray-400 text-xs leading-relaxed">
                  <span className="text-gold-primary font-medium">Pro tip:</span>{' '}
                  In a future update, you'll be able to jump to each timestamp and see frame-by-frame overlay annotations on the video.
                </p>
              </div>
            </div>
          )}

          {/* Comparison tab */}
          {activeTab === 'comparison' && (
            <div className="space-y-4">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Your metrics vs. D1 averages</p>
              {analysis.comparisons.map((comp) => {
                const diff = comp.athlete - comp.proAvg;
                const isLowerBetter = comp.unit === 's'; // For time-based metrics, lower is better
                const isPositive = isLowerBetter ? diff < 0 : diff > 0;
                const isNeutral = Math.abs(diff) < 0.01;

                return (
                  <div key={comp.metric} className="bg-black-elevated border border-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-400 text-xs uppercase tracking-wider">{comp.metric}</span>
                      <div className="flex items-center gap-1">
                        {isNeutral ? (
                          <Minus size={12} className="text-gray-500" />
                        ) : isPositive ? (
                          <ArrowUp size={12} className="text-gold-primary" />
                        ) : (
                          <ArrowDown size={12} className="text-red-400" />
                        )}
                        <span className={`text-xs font-mono font-bold ${
                          isNeutral ? 'text-gray-500' : isPositive ? 'text-gold-primary' : 'text-red-400'
                        }`}>
                          {isPositive ? '+' : ''}{diff.toFixed(1)}{comp.unit}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-gray-600 text-[10px] uppercase tracking-wider mb-1">You</p>
                        <p className="text-white font-mono font-bold">{comp.athlete}{comp.unit}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-[10px] uppercase tracking-wider mb-1">D1 Average</p>
                        <p className="text-gray-400 font-mono font-bold">{comp.proAvg}{comp.unit}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recommendations footer */}
        <div className="border-t border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={14} className="text-gold-primary" />
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">AI Recommendations</h4>
          </div>
          <div className="space-y-2">
            {analysis.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-gold-primary font-mono text-xs font-bold mt-0.5 shrink-0">{i + 1}.</span>
                <p className="text-gray-400 text-xs leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
