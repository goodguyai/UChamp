import { useState } from 'react';
import { Dumbbell, CheckCircle2, Clock, Filter, Calendar, AlertCircle, Film, TrendingUp, Flame, BarChart3 } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { ATHLETES } from '../../lib/mockData';
import { getStoredUser } from '../../lib/mockAuth';
import { getLoggedWorkouts, saveLoggedWorkouts } from '../../lib/storage';
import PageLayout from '../../components/layout/PageLayout';
import WorkoutLogModal, { type WorkoutFormData } from '../../components/athlete/WorkoutLogModal';
import Button from '../../components/ui/Button';

type FilterType = 'all' | 'verified' | 'pending';
type ViewType = 'list' | 'analytics';

export default function WorkoutsPage() {
  const user = getStoredUser();
  const athlete = ATHLETES.find(a => a.id === user?.id) || ATHLETES[0];
  const [showLog, setShowLog] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [view, setView] = useState<ViewType>('list');
  const [loggedWorkouts, setLoggedWorkouts] = useState<typeof athlete.recentWorkouts>(() => getLoggedWorkouts(athlete.id));

  const allWorkouts = [...loggedWorkouts, ...athlete.recentWorkouts];
  const filtered = filter === 'all'
    ? allWorkouts
    : filter === 'verified'
    ? allWorkouts.filter(w => w.verified)
    : allWorkouts.filter(w => !w.verified);

  const verifiedCount = allWorkouts.filter(w => w.verified).length;
  const pendingCount = allWorkouts.filter(w => !w.verified).length;
  const totalMinutes = allWorkouts.reduce((s, w) => s + w.duration, 0);
  const avgDuration = allWorkouts.length > 0 ? Math.round(totalMinutes / allWorkouts.length) : 0;

  // Workout type distribution for pie chart
  const typeMap: Record<string, number> = {};
  allWorkouts.forEach(w => { typeMap[w.type] = (typeMap[w.type] || 0) + 1; });
  const typeData = Object.entries(typeMap).map(([name, value]) => ({ name, value }));
  const TYPE_COLORS = ['#D4AF37', '#FFD700', '#CD7F32', '#a78bfa', '#60a5fa', '#34d399'];

  // Weekly duration data (mock - distribute workouts across week)
  const weeklyData = [
    { day: 'Mon', minutes: 75, workouts: 1 },
    { day: 'Tue', minutes: 90, workouts: 1 },
    { day: 'Wed', minutes: 0, workouts: 0 },
    { day: 'Thu', minutes: 60, workouts: 1 },
    { day: 'Fri', minutes: 85, workouts: 1 },
    { day: 'Sat', minutes: 45, workouts: 1 },
    { day: 'Sun', minutes: 0, workouts: 0 },
  ];

  return (
    <>
    <PageLayout
      role="athlete"
      title="Workouts"
      userName={athlete.name}
      userPhoto={athlete.photoUrl}
      notificationCount={3}
      headerActions={
        <Button size="sm" onClick={() => setShowLog(true)}>
          <span className="flex items-center gap-2">
            <Dumbbell size={16} />
            <span className="hidden sm:inline">Log the Grind</span>
          </span>
        </Button>
      }
    >
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-1">
          Workout Log
        </h2>
        <p className="text-gray-500 text-sm">Every rep tracked. Every session counted.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-black-card border border-gray-800 rounded-lg p-3 md:p-4 text-center">
          <Dumbbell size={18} className="text-gold-primary mx-auto mb-1.5" />
          <p className="text-white font-mono text-xl font-bold">{allWorkouts.length}</p>
          <p className="text-gray-500 text-xs uppercase tracking-wider">Total</p>
        </div>
        <div className="bg-black-card border border-gray-800 rounded-lg p-3 md:p-4 text-center">
          <CheckCircle2 size={18} className="text-gold-bright mx-auto mb-1.5" />
          <p className="text-gold-primary font-mono text-xl font-bold">{verifiedCount}</p>
          <p className="text-gray-500 text-xs uppercase tracking-wider">Verified</p>
        </div>
        <div className="bg-black-card border border-gray-800 rounded-lg p-3 md:p-4 text-center">
          <Flame size={18} className="text-gold-bronze mx-auto mb-1.5" />
          <p className="text-white font-mono text-xl font-bold">{totalMinutes}</p>
          <p className="text-gray-500 text-xs uppercase tracking-wider">Minutes</p>
        </div>
        <div className="bg-black-card border border-gray-800 rounded-lg p-3 md:p-4 text-center">
          <TrendingUp size={18} className="text-gold-primary mx-auto mb-1.5" />
          <p className="text-white font-mono text-xl font-bold">{avgDuration}</p>
          <p className="text-gray-500 text-xs uppercase tracking-wider">Avg Min</p>
        </div>
      </div>

      {/* View toggle + filter */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-500" />
          {(['all', 'verified', 'pending'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all cursor-pointer ${
                filter === f
                  ? 'bg-gold-primary text-black-pure font-bold'
                  : 'bg-black-elevated text-gray-400 border border-gray-700 hover:border-gray-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {(['list', 'analytics'] as ViewType[]).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                view === v
                  ? 'bg-gold-primary/10 text-gold-primary border border-gold-primary/30'
                  : 'text-gray-400 hover:text-white hover:bg-black-elevated'
              }`}
            >
              {v === 'analytics' ? <BarChart3 size={14} className="inline mr-1" /> : null}
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === 'analytics' ? (
        <>
          {/* Weekly Duration Chart */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-6 mb-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
              <Calendar size={14} className="text-gold-primary" /> Weekly Training Volume
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" opacity={0.5} />
                <XAxis dataKey="day" stroke="#737373" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <YAxis stroke="#737373" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#121212', border: '1px solid #D4AF37', borderRadius: '8px', fontSize: '12px' }}
                  labelStyle={{ color: '#A3A3A3' }}
                />
                <Bar dataKey="minutes" fill="#D4AF37" radius={[4, 4, 0, 0]} name="Minutes" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Type breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Workout Types</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={typeData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                    {typeData.map((_, i) => (
                      <Cell key={i} fill={TYPE_COLORS[i % TYPE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#121212', border: '1px solid #D4AF37', borderRadius: '8px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {typeData.map((t, i) => (
                  <div key={t.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: TYPE_COLORS[i % TYPE_COLORS.length] }} />
                    <span className="text-gray-400 text-xs truncate">{t.name}</span>
                    <span className="text-white font-mono text-xs font-bold ml-auto">{t.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Verification Rate</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#262626" strokeWidth="10" />
                    <circle
                      cx="60" cy="60" r="52" fill="none"
                      stroke="#D4AF37" strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={`${(verifiedCount / Math.max(1, allWorkouts.length)) * 327} 327`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gold-primary font-mono text-2xl font-black">
                      {Math.round((verifiedCount / Math.max(1, allWorkouts.length)) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Verified</span>
                  <span className="text-gold-primary font-mono font-bold">{verifiedCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Pending</span>
                  <span className="text-gold-bronze font-mono font-bold">{pendingCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Total Time</span>
                  <span className="text-white font-mono font-bold">{Math.round(totalMinutes / 60)}h {totalMinutes % 60}m</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Workout list */
        <div className="space-y-3">
          {filtered.map(workout => (
            <div
              key={workout.id}
              className="bg-black-card border border-gray-800 rounded-lg p-4 md:p-5 hover:border-gray-700 transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                  <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 ${
                    workout.verified ? 'bg-gold-primary/10' : 'bg-gold-bronze/10'
                  }`}>
                    {workout.verified
                      ? <CheckCircle2 size={18} className="text-gold-primary" />
                      : <AlertCircle size={18} className="text-gold-bronze" />
                    }
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium">{workout.type}</p>
                      {(workout.id === 'w1' || workout.id === 'w4') && (
                        <span className="flex items-center gap-1 text-[10px] bg-gold-primary/10 text-gold-primary px-1.5 py-0.5 rounded-full font-bold">
                          <Film size={8} /> AI Analyzed
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {workout.duration} min
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    workout.verified
                      ? 'bg-gold-primary/10 text-gold-primary'
                      : 'bg-gold-bronze/10 text-gold-bronze'
                  }`}>
                    {workout.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && view === 'list' && (
        <div className="text-center py-16 bg-black-card border border-gray-800 rounded-xl">
          <Dumbbell size={48} className="text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500">No {filter !== 'all' ? filter : ''} workouts found.</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
          Log the work. Earn the respect.
        </p>
      </div>
    </PageLayout>

    {showLog && (
      <WorkoutLogModal
        onClose={() => setShowLog(false)}
        onSubmit={(data: WorkoutFormData) => {
          const newWorkout = {
            id: `w-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            type: data.type,
            duration: data.duration,
            verified: false,
          };
          setLoggedWorkouts(prev => {
            const next = [newWorkout, ...prev];
            saveLoggedWorkouts(athlete.id, next);
            return next;
          });
          setShowLog(false);
        }}
      />
    )}
    </>
  );
}
