import { useState } from 'react';
import { Dumbbell, Bot, Film, Target, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ATHLETES } from '../lib/mockData';
import PageLayout from '../components/layout/PageLayout';
import ProfileHeader from '../components/athlete/ProfileHeader';
import ReliabilityHero from '../components/athlete/ReliabilityHero';
import RetentionScore from '../components/athlete/RetentionScore';
import StatsGrid from '../components/athlete/StatsGrid';
import TrendChart from '../components/athlete/TrendChart';
import WorkoutList from '../components/athlete/WorkoutList';
import WorkoutLogModal from '../components/athlete/WorkoutLogModal';
import Button from '../components/ui/Button';

export default function AthleteDashboard() {
  const athlete = ATHLETES[0]; // Marcus Johnson
  const [showWorkoutLog, setShowWorkoutLog] = useState(false);
  const navigate = useNavigate();

  return (
    <>
    <PageLayout
      role="athlete"
      title="Dashboard"
      userName={athlete.name}
      userPhoto={athlete.photoUrl}
      notificationCount={3}
      headerActions={
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate('/athlete/ai-coach')}>
            <span className="flex items-center gap-2">
              <Bot size={16} />
              <span className="hidden sm:inline">AI Coach</span>
            </span>
          </Button>
          <Button size="sm" onClick={() => setShowWorkoutLog(true)}>
            <span className="flex items-center gap-2">
              <Dumbbell size={16} />
              <span className="hidden sm:inline">Log the Grind</span>
            </span>
          </Button>
        </div>
      }
    >
      {/* Profile header */}
      <ProfileHeader athlete={athlete} />

      {/* Motivational line */}
      <div className="mt-4 md:mt-6 mb-6 md:mb-8">
        <p className="text-gray-600 text-sm italic">
          "The grind doesn't stop. The climb continues."
        </p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
        {/* Left: Reliability Score (2 cols) */}
        <div className="md:col-span-1 lg:col-span-2">
          <ReliabilityHero athlete={athlete} />

          {/* Quick stats below reliability */}
          <div className="mt-4 md:mt-6 grid grid-cols-3 gap-2 md:gap-3">
            <div className="bg-black-card border border-gray-800 rounded-lg p-3 md:p-4 text-center">
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-1">Workouts</p>
              <p className="text-white font-mono text-xl md:text-2xl font-bold">
                {athlete.recentWorkouts.length}
              </p>
              <p className="text-gray-600 text-[10px] md:text-xs">This month</p>
            </div>
            <div className="bg-black-card border border-gray-800 rounded-lg p-3 md:p-4 text-center">
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-1">Verified</p>
              <p className="text-gold-primary font-mono text-xl md:text-2xl font-bold">
                {athlete.recentWorkouts.filter(w => w.verified).length}
              </p>
              <p className="text-gray-600 text-[10px] md:text-xs">Confirmed</p>
            </div>
            <div className="bg-black-card border border-gray-800 rounded-lg p-3 md:p-4 text-center">
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-1">Streak</p>
              <p className="text-gold-bright font-mono text-xl md:text-2xl font-bold">12</p>
              <p className="text-gray-600 text-[10px] md:text-xs">Days</p>
            </div>
          </div>
        </div>

        {/* Right: Stats & Trends (3 cols) */}
        <div className="md:col-span-2 lg:col-span-3 space-y-4 md:space-y-6 lg:space-y-8">
          <StatsGrid athlete={athlete} />
          <TrendChart athlete={athlete} />
        </div>
      </div>

      {/* Film Room CTA */}
      <div className="mt-8">
        <button
          onClick={() => navigate('/athlete/film-room')}
          className="w-full bg-gradient-to-r from-gold-primary/[0.08] to-transparent border border-gold-primary/20 rounded-xl p-4 md:p-5 text-left hover:border-gold-primary/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold-primary/10 flex items-center justify-center shrink-0 group-hover:bg-gold-primary/20 transition-colors">
              <Film size={22} className="text-gold-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-white font-bold text-sm">Film Room</h3>
                <span className="text-[9px] bg-gold-primary/20 text-gold-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  AI Powered
                </span>
              </div>
              <p className="text-gray-500 text-xs">Upload workout videos for AI form analysis, technique scoring, and pro comparisons</p>
            </div>
            <span className="text-gold-primary text-lg opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </div>
        </button>
      </div>

      {/* Combine Prep CTA */}
      <div className="mt-4">
        <button
          onClick={() => navigate('/athlete/combine-prep')}
          className="w-full bg-gradient-to-r from-gold-bronze/[0.08] to-transparent border border-gold-bronze/20 rounded-xl p-4 md:p-5 text-left hover:border-gold-bronze/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold-bronze/10 flex items-center justify-center shrink-0 group-hover:bg-gold-bronze/20 transition-colors">
              <Target size={22} className="text-gold-bronze" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-white font-bold text-sm">Combine Prep</h3>
                <span className="text-[9px] bg-gold-bronze/20 text-gold-bronze px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  34 Days
                </span>
              </div>
              <p className="text-gray-500 text-xs">Track benchmarks, training plan, and upcoming combine events</p>
            </div>
            <span className="text-gold-bronze text-lg opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </div>
        </button>
      </div>

      {/* Workout Streak Calendar */}
      <div className="mt-8">
        <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gold-primary" />
              <h3 className="text-white font-bold text-sm uppercase tracking-wide">Workout Streak</h3>
            </div>
            <span className="text-gold-primary font-mono text-sm font-bold">12 Day Streak</span>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {/* Day labels */}
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={`label-${i}`} className="text-center text-gray-600 text-[9px] font-medium mb-1">{d}</div>
            ))}
            {/* Past 28 days of activity */}
            {Array.from({ length: 28 }, (_, i) => {
              const isActive = i >= 16 || (i >= 8 && i <= 14) || i === 3 || i === 5 || i === 6;
              const isToday = i === 27;
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-sm transition-all ${
                    isToday
                      ? 'bg-gold-bright ring-1 ring-gold-bright/50'
                      : isActive
                      ? 'bg-gold-primary/60'
                      : 'bg-gray-800/50'
                  }`}
                  title={isActive ? 'Workout logged' : 'Rest day'}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-3 text-[10px] text-gray-600">
            <span>4 weeks ago</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-800/50 rounded-sm" />
                <span>Rest</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gold-primary/60 rounded-sm" />
                <span>Active</span>
              </div>
            </div>
            <span>Today</span>
          </div>
        </div>
      </div>

      {/* Retention Score */}
      <div className="mt-8">
        <RetentionScore athlete={athlete} />
      </div>

      {/* Workouts section */}
      <div className="mt-8">
        <WorkoutList athlete={athlete} />
      </div>

      {/* Bottom motivational */}
      <div className="mt-12 mb-8 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
          Championship mindset. Every rep counts.
        </p>
      </div>
    </PageLayout>

    {/* Workout log modal */}
    {showWorkoutLog && (
      <WorkoutLogModal
        onClose={() => setShowWorkoutLog(false)}
        onSubmit={() => setShowWorkoutLog(false)}
      />
    )}
    </>
  );
}
