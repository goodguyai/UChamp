import { useState } from 'react';
import { GitCompare, ChevronDown, Trophy, TrendingUp, Shield } from 'lucide-react';
import { ATHLETES, RECRUITERS, getReliabilityColor, getReliabilityLabel, STAT_LABELS, STAT_UNITS } from '../../lib/mockData';
import type { Athlete } from '../../lib/mockData';
import PageLayout from '../../components/layout/PageLayout';
import Badge from '../../components/ui/Badge';

export default function ComparePage() {
  const recruiter = RECRUITERS[0];
  const [athleteA, setAthleteA] = useState<Athlete | null>(ATHLETES[0]);
  const [athleteB, setAthleteB] = useState<Athlete | null>(ATHLETES[3]);
  const [dropdownA, setDropdownA] = useState(false);
  const [dropdownB, setDropdownB] = useState(false);

  const lowerIsBetter = new Set(['fortyYardDash', 'releaseTime', 'backpedalToSprint', 'tenYardSplit']);

  const getWinner = (statKey: string, valA: number, valB: number): 'a' | 'b' | 'tie' => {
    if (valA === valB) return 'tie';
    if (lowerIsBetter.has(statKey)) return valA < valB ? 'a' : 'b';
    return valA > valB ? 'a' : 'b';
  };

  const allCommonStats = athleteA && athleteB
    ? Object.keys(athleteA.stats).filter(k => k in athleteB.stats)
    : [];

  return (
    <PageLayout role="recruiter" title="Compare" userName={recruiter.name} userPhoto={recruiter.photoUrl} notificationCount={2}>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <GitCompare size={24} className="text-gold-primary" />
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Athlete Comparison</h2>
        </div>
        <p className="text-gray-500 text-sm">Compare athletes side-by-side to make data-driven decisions.</p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          { label: 'Athlete A', selected: athleteA, setSelected: setAthleteA, open: dropdownA, setOpen: setDropdownA, other: athleteB, setOtherOpen: setDropdownB },
          { label: 'Athlete B', selected: athleteB, setSelected: setAthleteB, open: dropdownB, setOpen: setDropdownB, other: athleteA, setOtherOpen: setDropdownA },
        ].map((sel) => (
          <div key={sel.label} className="relative">
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">{sel.label}</label>
            <button onClick={() => { sel.setOpen(!sel.open); sel.setOtherOpen(false); }}
              className="w-full bg-black-elevated border border-gray-700 rounded-lg px-4 py-3 text-left flex items-center justify-between cursor-pointer hover:border-gold-primary/50 transition-all">
              <span className="text-white text-sm font-medium">{sel.selected ? `${sel.selected.name} — ${sel.selected.position}` : 'Select Athlete'}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            {sel.open && (
              <div className="absolute z-20 w-full mt-1 bg-black-card border border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {ATHLETES.filter(a => a.id !== sel.other?.id).map(a => (
                  <button key={a.id} onClick={() => { sel.setSelected(a); sel.setOpen(false); }}
                    className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-black-elevated hover:text-white transition-colors cursor-pointer">
                    {a.name} — {a.position} · {a.school}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {athleteA && athleteB ? (
        <>
          {/* Profile cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[athleteA, athleteB].map(athlete => (
              <div key={athlete.id} className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-5 text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 overflow-hidden bg-black-elevated mx-auto mb-3" style={{ borderColor: getReliabilityColor(athlete.reliabilityScore) }}>
                  <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-white font-bold text-sm md:text-base">{athlete.name}</p>
                <p className="text-gray-500 text-xs">{athlete.position} · Class of {athlete.gradYear}</p>
                <p className="text-gray-600 text-xs">{athlete.height} · {athlete.weight} lbs</p>
                <div className="mt-3"><Badge score={athlete.reliabilityScore} size="sm" /></div>
                {athlete.gpa && <p className="text-gray-500 text-xs mt-2">GPA: <span className="text-white font-mono">{athlete.gpa}</span></p>}
              </div>
            ))}
          </div>

          {/* Reliability breakdown */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-6 mb-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
              <Shield size={14} className="text-gold-primary" /> Reliability Breakdown
            </h3>
            {(['consistency', 'verification', 'progress'] as const).map(key => {
              const valA = athleteA.reliabilityBreakdown[key];
              const valB = athleteB.reliabilityBreakdown[key];
              const winner = valA > valB ? 'a' : valA < valB ? 'b' : 'tie';
              return (
                <div key={key} className="mb-4 last:mb-0">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2 capitalize">{key}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-black-elevated rounded-full h-2.5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${valA}%`, backgroundColor: winner === 'a' ? '#FFD700' : '#D4AF37' }} />
                      </div>
                      <span className={`font-mono text-sm font-bold ${winner === 'a' ? 'text-gold-bright' : 'text-gray-400'}`}>{valA}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-sm font-bold ${winner === 'b' ? 'text-gold-bright' : 'text-gray-400'}`}>{valB}</span>
                      <div className="flex-1 bg-black-elevated rounded-full h-2.5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${valB}%`, backgroundColor: winner === 'b' ? '#FFD700' : '#D4AF37' }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats comparison */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-6 mb-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
              <TrendingUp size={14} className="text-gold-primary" /> Performance Stats
            </h3>
            <div className="space-y-3">
              {allCommonStats.map(stat => {
                const valA = athleteA.stats[stat];
                const valB = athleteB.stats[stat];
                if (valA === undefined || valB === undefined) return null;
                const winner = getWinner(stat, valA, valB);
                const label = STAT_LABELS[stat] || stat;
                const unit = STAT_UNITS[stat] || '';
                return (
                  <div key={stat} className="grid grid-cols-3 items-center gap-2 py-2 border-b border-gray-800/50 last:border-0">
                    <div className="text-right">
                      <span className={`font-mono text-sm font-bold ${winner === 'a' ? 'text-gold-bright' : 'text-white'}`}>{valA}{unit}</span>
                      {winner === 'a' && <Trophy size={10} className="inline ml-1 text-gold-bright" />}
                    </div>
                    <div className="text-center"><p className="text-gray-400 text-xs uppercase tracking-wider">{label}</p></div>
                    <div className="text-left">
                      {winner === 'b' && <Trophy size={10} className="inline mr-1 text-gold-bright" />}
                      <span className={`font-mono text-sm font-bold ${winner === 'b' ? 'text-gold-bright' : 'text-white'}`}>{valB}{unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
              <Trophy size={14} className="text-gold-primary" /> Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[athleteA, athleteB].map(athlete => (
                <div key={athlete.id} className="bg-black-elevated rounded-lg p-4">
                  <p className="text-white font-bold text-sm mb-3">{athlete.name}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-gray-500">Reliability</span><span className="text-gold-primary font-mono font-bold">{athlete.reliabilityScore}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="font-mono font-bold" style={{ color: getReliabilityColor(athlete.reliabilityScore) }}>{getReliabilityLabel(athlete.reliabilityScore)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Verified</span><span className="text-white font-mono font-bold">{athlete.recentWorkouts.filter(w => w.verified).length}/{athlete.recentWorkouts.length}</span></div>
                    {athlete.gpa && <div className="flex justify-between"><span className="text-gray-500">GPA</span><span className="text-white font-mono font-bold">{athlete.gpa}</span></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-20 bg-black-card border border-gray-800 rounded-xl">
          <GitCompare size={48} className="text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Select two athletes to compare</p>
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">Compare the data. Trust the numbers.</p>
      </div>
    </PageLayout>
  );
}
