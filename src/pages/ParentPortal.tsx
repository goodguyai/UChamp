import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Shield, TrendingUp, CheckCircle2, Calendar, Clock, Eye, Bell, ChevronDown, ChevronUp, Target, MapPin, Flag, MessageCircle, BarChart3, Send, ArrowUpRight, Home, LogOut } from 'lucide-react';
import { ATHLETES, getReliabilityColor, getReliabilityLabel, STAT_LABELS, STAT_UNITS, getTrainerById } from '../lib/mockData';
import { UPCOMING_EVENTS, COMBINE_BENCHMARKS, getEventTypeColor, getEventTypeLabel } from '../lib/combineData';
import { getStoredUser, clearStoredUser } from '../lib/mockAuth';
import Badge from '../components/ui/Badge';
import GoldShimmerText from '../components/ui/GoldShimmerText';

export default function ParentPortal() {
  const navigate = useNavigate();
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const athlete = ATHLETES[0]; // Marcus Johnson - parent viewing their child
  const trainer = getTrainerById(athlete.trainerId);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview', 'workouts']));
  const [selectedMessage, setSelectedMessage] = useState<string>('');
  const [customMessage, setCustomMessage] = useState<string>('');
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
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <GoldShimmerText as="span" className="text-xl font-black tracking-tight">
            UCHAMP
          </GoldShimmerText>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm hidden sm:block">Parent Portal</span>
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-gold-primary transition-colors cursor-pointer"
              title="Home"
            >
              <Home size={20} />
            </button>
            <button className="relative text-gray-400 hover:text-gold-primary transition-colors cursor-pointer">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-primary text-black-pure text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <button
              onClick={() => { clearStoredUser(); navigate('/login'); }}
              className="text-gray-400 hover:text-gold-primary transition-colors cursor-pointer"
              title="Sign out"
            >
              <LogOut size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gold-primary/20 flex items-center justify-center">
              <span className="text-gold-primary text-xs font-bold">PG</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8">
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
        <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-6 mb-6">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 overflow-hidden bg-black-elevated shrink-0" style={{ borderColor: color }}>
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
          <div className="grid grid-cols-3 gap-2 md:gap-4 mt-6">
            <div className="bg-black-elevated rounded-lg p-3 md:p-4 text-center">
              <Shield size={20} className="text-gold-primary mx-auto mb-2" />
              <p className="text-gold-primary font-mono text-xl font-bold">{athlete.reliabilityScore}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Reliability</p>
              <p className={`text-[10px] font-bold uppercase mt-0.5 ${athlete.reliabilityScore >= 90 ? 'text-gold-bright' : 'text-gold-primary'}`}>
                {getReliabilityLabel(athlete.reliabilityScore)}
              </p>
            </div>
            <div className="bg-black-elevated rounded-lg p-3 md:p-4 text-center">
              <CheckCircle2 size={20} className="text-gold-bright mx-auto mb-2" />
              <p className="text-white font-mono text-xl font-bold">{verifiedCount}/{totalWorkouts}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Verified</p>
              <p className="text-gray-600 text-[10px] mt-0.5">This month</p>
            </div>
            <div className="bg-black-elevated rounded-lg p-3 md:p-4 text-center">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {Object.entries(athlete.stats).map(([key, value]) => (
              <div key={key} className="bg-black-elevated rounded-lg p-2.5 md:p-3">
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

        {/* Combine Prep */}
        <SectionCard
          id="combine"
          title="Combine Prep"
          icon={Target}
          expanded={expandedSections.has('combine')}
          onToggle={toggleSection}
        >
          <div className="space-y-4">
            {/* Next event */}
            <div className="bg-gold-primary/[0.03] border border-gold-primary/10 rounded-lg p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">Next Event</p>
                  <p className="text-white font-bold text-sm">{UPCOMING_EVENTS[0].name}</p>
                  <div className="flex items-center gap-3 mt-1 text-gray-500 text-xs">
                    <span className="flex items-center gap-1"><MapPin size={10} />{UPCOMING_EVENTS[0].location}</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {new Date(UPCOMING_EVENTS[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gold-primary font-mono text-2xl font-black">{UPCOMING_EVENTS[0].daysUntil}</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider">Days</p>
                </div>
              </div>
            </div>

            {/* Key benchmarks */}
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Key Benchmarks</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {COMBINE_BENCHMARKS.slice(0, 3).map(bench => (
                  <div key={bench.metric} className="bg-black-elevated rounded-lg p-2.5">
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider">{bench.metric}</p>
                    <p className="text-gold-primary font-mono text-lg font-bold">{bench.current}{bench.unit}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gold-primary"
                          style={{ width: `${bench.percentToTarget}%` }}
                        />
                      </div>
                      <span className="text-gray-600 text-[9px] font-mono">{bench.percentToTarget}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming events list */}
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">All Upcoming Events</p>
              <div className="space-y-2">
                {UPCOMING_EVENTS.map(event => (
                  <div key={event.id} className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{
                          color: getEventTypeColor(event.type),
                          backgroundColor: `${getEventTypeColor(event.type)}15`,
                        }}
                      >
                        {getEventTypeLabel(event.type)}
                      </span>
                      <span className="text-white text-sm">{event.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flag size={10} className="text-gold-primary" />
                      <span className="text-gold-primary font-mono text-xs font-bold">{event.daysUntil}d</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-gold-primary/[0.03] border border-gold-primary/10 rounded-lg">
              <p className="text-gray-400 text-xs leading-relaxed">
                <span className="text-gold-primary font-medium">About Combine Prep:</span>{' '}
                Your child is actively preparing for upcoming combines and showcases. Benchmarks track their progress toward target performance levels used by college recruiters.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Contact Trainer */}
        <SectionCard
          id="trainer"
          title="Contact Trainer"
          icon={MessageCircle}
          expanded={expandedSections.has('trainer')}
          onToggle={toggleSection}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center">
                <MessageCircle size={18} className="text-gold-primary" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{trainer?.name || 'Coach'}</p>
                <p className="text-gray-500 text-xs">Head Trainer</p>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Quick Messages</p>
              <div className="flex flex-col gap-2">
                {[
                  `How is ${athlete.name} progressing?`,
                  'Can we schedule a meeting?',
                  'What areas need improvement?',
                ].map(msg => (
                  <button
                    key={msg}
                    onClick={() => { setSelectedMessage(msg); setCustomMessage(msg); }}
                    className={`text-left px-3 py-2 rounded-lg border text-sm transition-colors cursor-pointer ${
                      selectedMessage === msg
                        ? 'border-gold-primary bg-gold-primary/10 text-gold-primary'
                        : 'border-gray-800 bg-black-elevated text-gray-300 hover:border-gray-700'
                    }`}
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Custom Message</p>
              <textarea
                value={customMessage}
                onChange={e => setCustomMessage(e.target.value)}
                placeholder={`Type your message to ${trainer?.name || 'Coach'}...`}
                rows={3}
                className="w-full bg-black-elevated border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary/50 resize-none"
              />
            </div>

            <button
              onClick={() => alert('Messaging will be available in the full version.')}
              className="w-full flex items-center justify-center gap-2 bg-gold-primary text-black-pure font-bold text-sm uppercase tracking-wider py-3 rounded-lg hover:bg-gold-bright transition-colors cursor-pointer"
            >
              <Send size={14} />
              Send Message
            </button>

            <p className="text-gray-600 text-xs text-center">
              Messages are reviewed within 24 hours
            </p>
          </div>
        </SectionCard>

        {/* Weekly Summary */}
        <SectionCard
          id="weekly"
          title="Weekly Summary"
          icon={BarChart3}
          expanded={expandedSections.has('weekly')}
          onToggle={toggleSection}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              <div className="bg-black-elevated rounded-lg p-3 text-center">
                <p className="text-gray-500 text-xs uppercase tracking-wider">Workouts</p>
                <p className="text-white font-mono text-xl font-bold mt-1">4</p>
                <p className="text-gray-600 text-[10px] mt-0.5">This week</p>
              </div>
              <div className="bg-black-elevated rounded-lg p-3 text-center">
                <p className="text-gray-500 text-xs uppercase tracking-wider">Hours</p>
                <p className="text-white font-mono text-xl font-bold mt-1">5.2</p>
                <p className="text-gray-600 text-[10px] mt-0.5">Trained</p>
              </div>
              <div className="bg-black-elevated rounded-lg p-3 text-center">
                <p className="text-gray-500 text-xs uppercase tracking-wider">Verified</p>
                <p className="text-gold-primary font-mono text-xl font-bold mt-1">80%</p>
                <p className="text-gray-600 text-[10px] mt-0.5">Rate</p>
              </div>
              <div className="bg-black-elevated rounded-lg p-3 text-center">
                <p className="text-gray-500 text-xs uppercase tracking-wider">Trend</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <p className="text-gold-bright font-mono text-xl font-bold">Up</p>
                  <ArrowUpRight size={16} className="text-gold-bright" />
                </div>
                <p className="text-gray-600 text-[10px] mt-0.5">Improving</p>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Daily Activity</p>
              <div className="flex items-end gap-2">
                {[
                  { day: 'M', active: true },
                  { day: 'T', active: true },
                  { day: 'W', active: false },
                  { day: 'T', active: true },
                  { day: 'F', active: true },
                  { day: 'S', active: false },
                  { day: 'Su', active: false },
                ].map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className={`w-full rounded-md transition-all ${
                        d.active
                          ? 'bg-gold-primary h-10'
                          : 'bg-gray-800 h-4'
                      }`}
                    />
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${
                      d.active ? 'text-gold-primary' : 'text-gray-600'
                    }`}>
                      {d.day}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-600 text-[10px] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-gold-primary inline-block" /> Active
                </span>
                <span className="text-gray-600 text-[10px] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-gray-800 inline-block" /> Rest
                </span>
              </div>
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
