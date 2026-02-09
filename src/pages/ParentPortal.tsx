import { useState } from 'react';
import { Shield, TrendingUp, CheckCircle2, Calendar, Clock, Eye, Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { ATHLETES, getReliabilityColor, getReliabilityLabel, STAT_LABELS, STAT_UNITS } from '../lib/mockData';
import Badge from '../components/ui/Badge';
import GoldShimmerText from '../components/ui/GoldShimmerText';

export default function ParentPortal() {
  const athlete = ATHLETES[0]; // Marcus Johnson - parent viewing their child
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview', 'workouts']));
  const color = getReliabilityColor(athlete.reliabilityScore);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const verifiedCount = athlete.recentWorkouts.filter(w => w.verified).length;
  const totalWorkouts = athlete.recentWorkouts.length;

  return (
    <div className="min-h-screen bg-black-surface">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black-card/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <GoldShimmerText as="span" className="text-xl font-black tracking-tight">
            UCHAMP
          </GoldShimmerText>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm hidden sm:block">Parent Portal</span>
            <button className="relative text-gray-400 hover:text-gold-primary transition-colors cursor-pointer">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-primary text-black-pure text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gold-primary/20 flex items-center justify-center">
              <span className="text-gold-primary text-xs font-bold">PG</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
            {athlete.name}'s Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Parent view — See your child's verified progress and training activity.
          </p>
        </div>

        {/* Athlete overview card */}
        <div className="bg-black-card border border-gray-800 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full border-2 overflow-hidden bg-black-elevated shrink-0" style={{ borderColor: color }}>
              <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-white">{athlete.name}</h2>
                <Badge score={athlete.reliabilityScore} size="sm" />
              </div>
              <p className="text-gray-400 text-sm">{athlete.position} · {athlete.school}</p>
              <p className="text-gray-500 text-xs">Class of {athlete.gradYear} · {athlete.height} · {athlete.weight} lbs</p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-black-elevated rounded-lg p-4 text-center">
              <Shield size={20} className="text-gold-primary mx-auto mb-2" />
              <p className="text-gold-primary font-mono text-xl font-bold">{athlete.reliabilityScore}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Reliability</p>
              <p className={`text-[10px] font-bold uppercase mt-0.5 ${athlete.reliabilityScore >= 90 ? 'text-gold-bright' : 'text-gold-primary'}`}>
                {getReliabilityLabel(athlete.reliabilityScore)}
              </p>
            </div>
            <div className="bg-black-elevated rounded-lg p-4 text-center">
              <CheckCircle2 size={20} className="text-gold-bright mx-auto mb-2" />
              <p className="text-white font-mono text-xl font-bold">{verifiedCount}/{totalWorkouts}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Verified</p>
              <p className="text-gray-600 text-[10px] mt-0.5">This month</p>
            </div>
            <div className="bg-black-elevated rounded-lg p-4 text-center">
              <TrendingUp size={20} className="text-gold-bronze mx-auto mb-2" />
              <p className="text-white font-mono text-xl font-bold">12</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Day Streak</p>
              <p className="text-gray-600 text-[10px] mt-0.5">Consecutive days</p>
            </div>
          </div>
        </div>

        {/* Reliability Breakdown */}
        <SectionCard
          id="overview"
          title="Reliability Breakdown"
          icon={Shield}
          expanded={expandedSections.has('overview')}
          onToggle={toggleSection}
        >
          <div className="space-y-4">
            {Object.entries(athlete.reliabilityBreakdown).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400 capitalize">{key}</span>
                  <span className="text-gold-primary font-bold font-mono">{value}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-primary to-gold-bright rounded-full transition-all duration-700"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-gold-primary/[0.03] border border-gold-primary/10 rounded-lg">
            <p className="text-gray-400 text-xs leading-relaxed">
              <span className="text-gold-primary font-medium">What this means:</span>{' '}
              {athlete.reliabilityScore >= 90
                ? `${athlete.name}'s score indicates elite-level consistency and verified training. Recruiters actively monitor athletes at this level.`
                : `${athlete.name} is building a strong track record. Continued consistency will increase recruiter visibility.`
              }
            </p>
          </div>
        </SectionCard>

        {/* Recent Workouts */}
        <SectionCard
          id="workouts"
          title="Recent Workouts"
          icon={Calendar}
          expanded={expandedSections.has('workouts')}
          onToggle={toggleSection}
        >
          <div className="space-y-3">
            {athlete.recentWorkouts.map(workout => (
              <div key={workout.id} className="flex items-center justify-between py-3 border-b border-gray-800/50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    workout.verified ? 'bg-gold-primary/10' : 'bg-gold-bronze/10'
                  }`}>
                    {workout.verified
                      ? <CheckCircle2 size={14} className="text-gold-primary" />
                      : <Clock size={14} className="text-gold-bronze" />
                    }
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{workout.type}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {workout.duration} min
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  workout.verified
                    ? 'bg-gold-primary/10 text-gold-primary'
                    : 'bg-gold-bronze/10 text-gold-bronze'
                }`}>
                  {workout.verified ? 'Verified' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Performance Stats */}
        <SectionCard
          id="stats"
          title="Performance Stats"
          icon={TrendingUp}
          expanded={expandedSections.has('stats')}
          onToggle={toggleSection}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(athlete.stats).map(([key, value]) => (
              <div key={key} className="bg-black-elevated rounded-lg p-3">
                <p className="text-gray-500 text-xs uppercase tracking-wider">{STAT_LABELS[key] || key}</p>
                <p className="text-white font-mono text-lg font-bold mt-1">
                  {value}<span className="text-gray-500 text-sm ml-1">{STAT_UNITS[key]}</span>
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Recruiter visibility */}
        <SectionCard
          id="visibility"
          title="Recruiter Visibility"
          icon={Eye}
          expanded={expandedSections.has('visibility')}
          onToggle={toggleSection}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Profile visible to recruiters</span>
              <span className="text-gold-primary text-sm font-bold">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Profile views this month</span>
              <span className="text-white text-sm font-mono font-bold">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Watchlisted by</span>
              <span className="text-white text-sm font-mono font-bold">1 recruiter</span>
            </div>
            <div className="p-3 bg-gold-primary/[0.03] border border-gold-primary/10 rounded-lg">
              <p className="text-gray-400 text-xs leading-relaxed">
                <span className="text-gold-primary font-medium">Privacy note:</span>{' '}
                All recruiter activity is anonymized. You can see how many recruiters viewed the profile, but not their identities. Your child's personal information is never shared without consent.
              </p>
            </div>
          </div>
        </SectionCard>

        <div className="mt-12 text-center">
          <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
            Supporting the grind. Watching the climb.
          </p>
        </div>
      </main>
    </div>
  );
}

// Collapsible section component
function SectionCard({
  id,
  title,
  icon: Icon,
  expanded,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  icon: typeof Shield;
  expanded: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black-card border border-gray-800 rounded-xl mb-4 overflow-hidden">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between p-5 hover:bg-black-elevated/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className="text-gold-primary" />
          <h3 className="text-white font-bold text-sm uppercase tracking-wide">{title}</h3>
        </div>
        {expanded ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
      </button>
      {expanded && (
        <div className="px-5 pb-5">
          {children}
        </div>
      )}
    </div>
  );
}
