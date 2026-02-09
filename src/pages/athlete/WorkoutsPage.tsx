import { useState } from 'react';
import { Dumbbell, CheckCircle2, Clock, Filter, Calendar, AlertCircle, Film } from 'lucide-react';
import { ATHLETES } from '../../lib/mockData';
import PageLayout from '../../components/layout/PageLayout';
import WorkoutLogModal from '../../components/athlete/WorkoutLogModal';
import Button from '../../components/ui/Button';

type FilterType = 'all' | 'verified' | 'pending';

export default function WorkoutsPage() {
  const athlete = ATHLETES[0];
  const [showLog, setShowLog] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  const allWorkouts = athlete.recentWorkouts;
  const filtered = filter === 'all'
    ? allWorkouts
    : filter === 'verified'
    ? allWorkouts.filter(w => w.verified)
    : allWorkouts.filter(w => !w.verified);

  const verifiedCount = allWorkouts.filter(w => w.verified).length;
  const pendingCount = allWorkouts.filter(w => !w.verified).length;

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
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
          Workout Log
        </h2>
        <p className="text-gray-500 text-sm">Every rep tracked. Every session counted.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-black-card border border-gray-800 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center">
            <Dumbbell size={18} className="text-gold-primary" />
          </div>
          <div>
            <p className="text-white font-mono text-xl font-bold">{allWorkouts.length}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Total</p>
          </div>
        </div>
        <div className="bg-black-card border border-gray-800 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-bright/10 flex items-center justify-center">
            <CheckCircle2 size={18} className="text-gold-bright" />
          </div>
          <div>
            <p className="text-gold-primary font-mono text-xl font-bold">{verifiedCount}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Verified</p>
          </div>
        </div>
        <div className="bg-black-card border border-gray-800 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-bronze/10 flex items-center justify-center">
            <Clock size={18} className="text-gold-bronze" />
          </div>
          <div>
            <p className="text-gold-bronze font-mono text-xl font-bold">{pendingCount}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Pending</p>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-6">
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

      {/* Workout list */}
      <div className="space-y-3">
        {filtered.map(workout => (
          <div
            key={workout.id}
            className="bg-black-card border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
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

      {filtered.length === 0 && (
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
        onSubmit={() => setShowLog(false)}
      />
    )}
    </>
  );
}
