import { useState } from 'react';
import { TrendingUp, Trophy, Flame, Calendar, Award, Target, ChevronUp, ChevronDown, Minus } from 'lucide-react';
import { ATHLETES, STAT_LABELS, STAT_UNITS } from '../../lib/mockData';
import PageLayout from '../../components/layout/PageLayout';
import TrendChart from '../../components/athlete/TrendChart';
import ShadowMode from '../../components/athlete/ShadowMode';
import RetentionScore from '../../components/athlete/RetentionScore';
import StatsGrid from '../../components/athlete/StatsGrid';

export default function ProgressPage() {
  const athlete = ATHLETES[0];
  const [activeView, setActiveView] = useState<'overview' | 'records' | 'milestones'>('overview');

  // Calculate personal records from trend data
  const personalRecords = [
    { label: '40-Yard Dash', value: Math.min(...athlete.trendData.fortyYardDash.map(d => d.value)), unit: 's', best: true },
    { label: 'Bench Press', value: Math.max(...athlete.trendData.bench.map(d => d.value)), unit: ' lbs', best: true },
    { label: 'Vertical Jump', value: Math.max(...athlete.trendData.vertical.map(d => d.value)), unit: '"', best: true },
  ];

  // Weekly workout summary
  const thisWeekWorkouts = athlete.recentWorkouts.filter(w => {
    const d = new Date(w.date);
    const now = new Date('2026-02-10');
    const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  });
  const totalMinutes = thisWeekWorkouts.reduce((s, w) => s + w.duration, 0);
  const verifiedCount = thisWeekWorkouts.filter(w => w.verified).length;

  // Milestones
  const milestones = [
    { label: 'First Verified Workout', achieved: true, date: 'Aug 2025', icon: Award },
    { label: 'Reliability Score 80+', achieved: true, date: 'Oct 2025', icon: Target },
    { label: 'Reliability Score 90+ (CHAMPION)', achieved: athlete.reliabilityScore >= 90, date: athlete.reliabilityScore >= 90 ? 'Jan 2026' : undefined, icon: Trophy },
    { label: '5 Consecutive Verified Workouts', achieved: true, date: 'Nov 2025', icon: Flame },
    { label: 'All Stats Improved Month-Over-Month', achieved: true, date: 'Dec 2025', icon: TrendingUp },
    { label: 'Combine Ready Assessment', achieved: true, date: 'Feb 2026', icon: Target },
  ];

  // Stat changes (compare last two trend values)
  const statChanges = Object.entries(athlete.stats).map(([key, current]) => {
    const trendKey = key === 'fortyYardDash' ? 'fortyYardDash' : key === 'bench' ? 'bench' : key === 'vertical' ? 'vertical' : null;
    let change: 'up' | 'down' | 'same' = 'same';
    if (trendKey && athlete.trendData[trendKey as keyof typeof athlete.trendData]) {
      const data = athlete.trendData[trendKey as keyof typeof athlete.trendData];
      if (data.length >= 2) {
        const prev = data[data.length - 2].value;
        const curr = data[data.length - 1].value;
        if (key === 'fortyYardDash') {
          change = curr < prev ? 'up' : curr > prev ? 'down' : 'same';
        } else {
          change = curr > prev ? 'up' : curr < prev ? 'down' : 'same';
        }
      }
    }
    return { key, value: current, change, label: STAT_LABELS[key] || key, unit: STAT_UNITS[key] || '' };
  });

  const VIEWS = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'records' as const, label: 'Records' },
    { id: 'milestones' as const, label: 'Milestones' },
  ];

  return (
    <PageLayout role="athlete" title="Progress" userName={athlete.name} userPhoto={athlete.photoUrl} notificationCount={3}>
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-1">
          <TrendingUp size={24} className="text-gold-primary" />
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Your Progress</h2>
        </div>
        <p className="text-gray-500 text-sm">Track the climb. Every data point tells your story.</p>
      </div>

      {/* View tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        {VIEWS.map(v => (
          <button key={v.id} onClick={() => setActiveView(v.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
              activeView === v.id ? 'bg-gold-primary/10 text-gold-primary border border-gold-primary/30' : 'text-gray-400 hover:text-white hover:bg-black-elevated'
            }`}>
            {v.label}
          </button>
        ))}
      </div>

      {activeView === 'overview' && (
        <>
          {/* Weekly summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-black-card border border-gray-800 rounded-xl p-4 text-center">
              <Calendar size={18} className="text-gold-primary mx-auto mb-2" />
              <p className="text-white font-mono text-2xl font-bold">{thisWeekWorkouts.length}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">This Week</p>
            </div>
            <div className="bg-black-card border border-gray-800 rounded-xl p-4 text-center">
              <Flame size={18} className="text-gold-bright mx-auto mb-2" />
              <p className="text-white font-mono text-2xl font-bold">{totalMinutes}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Minutes</p>
            </div>
            <div className="bg-black-card border border-gray-800 rounded-xl p-4 text-center">
              <Award size={18} className="text-gold-primary mx-auto mb-2" />
              <p className="text-gold-primary font-mono text-2xl font-bold">{verifiedCount}/{thisWeekWorkouts.length}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Verified</p>
            </div>
            <div className="bg-black-card border border-gray-800 rounded-xl p-4 text-center">
              <Trophy size={18} className="text-gold-bright mx-auto mb-2" />
              <p className="text-white font-mono text-2xl font-bold">{athlete.reliabilityScore}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Score</p>
            </div>
          </div>

          {/* Retention + Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <RetentionScore athlete={athlete} />
            <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-5">
              <StatsGrid athlete={athlete} />
            </div>
          </div>

          {/* Trend chart */}
          <div className="mb-6"><TrendChart athlete={athlete} /></div>

          {/* Shadow Mode */}
          <div className="mb-6"><ShadowMode athlete={athlete} /></div>
        </>
      )}

      {activeView === 'records' && (
        <>
          {/* Personal Records */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-6 mb-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
              <Trophy size={14} className="text-gold-primary" /> Personal Records
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {personalRecords.map(pr => (
                <div key={pr.label} className="bg-black-elevated rounded-lg p-4 text-center border border-gold-primary/20">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">{pr.label}</p>
                  <p className="text-gold-bright font-mono text-3xl font-black">{pr.value}{pr.unit}</p>
                  <p className="text-gold-primary text-[10px] uppercase tracking-wider mt-1">Personal Best</p>
                </div>
              ))}
            </div>
          </div>

          {/* All stats with change indicators */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-6 mb-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
              <TrendingUp size={14} className="text-gold-primary" /> All Stats
            </h3>
            <div className="space-y-3">
              {statChanges.map(s => (
                <div key={s.key} className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
                  <span className="text-gray-300 text-sm">{s.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono text-sm font-bold">{s.value}{s.unit}</span>
                    {s.change === 'up' && <ChevronUp size={14} className="text-green-400" />}
                    {s.change === 'down' && <ChevronDown size={14} className="text-red-400" />}
                    {s.change === 'same' && <Minus size={14} className="text-gray-600" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workout history */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
              <Calendar size={14} className="text-gold-primary" /> Recent Workouts
            </h3>
            <div className="space-y-2">
              {athlete.recentWorkouts.map(w => (
                <div key={w.id} className="flex items-center justify-between py-2.5 px-3 bg-black-elevated rounded-lg">
                  <div>
                    <p className="text-white text-sm font-medium">{w.type}</p>
                    <p className="text-gray-500 text-xs">{new Date(w.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} &middot; {w.duration} min</p>
                  </div>
                  <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${w.verified ? 'text-gold-primary bg-gold-primary/10' : 'text-gray-500 bg-gray-700/30'}`}>
                    {w.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeView === 'milestones' && (
        <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
            <Award size={14} className="text-gold-primary" /> Milestones
          </h3>
          <div className="space-y-4">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className={`flex items-start gap-4 py-3 px-4 rounded-lg ${m.achieved ? 'bg-black-elevated' : 'bg-black-elevated/50 opacity-60'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${m.achieved ? 'bg-gold-primary/20' : 'bg-gray-800'}`}>
                    <Icon size={18} className={m.achieved ? 'text-gold-primary' : 'text-gray-600'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold ${m.achieved ? 'text-white' : 'text-gray-500'}`}>{m.label}</p>
                    {m.achieved && m.date ? (
                      <p className="text-gold-primary text-xs mt-0.5">Achieved {m.date}</p>
                    ) : (
                      <p className="text-gray-600 text-xs mt-0.5">In progress...</p>
                    )}
                  </div>
                  {m.achieved && (
                    <div className="text-gold-bright"><Trophy size={16} /></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">The numbers don't lie. The grind speaks for itself.</p>
      </div>
    </PageLayout>
  );
}
