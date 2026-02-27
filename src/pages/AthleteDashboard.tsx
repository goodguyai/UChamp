import { useState } from 'react';
import { Dumbbell, Bot, Film, Target, Calendar, Eye, TrendingUp, CheckCircle2, XCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ATHLETES } from '../lib/mockData';
import PageLayout from '../components/layout/PageLayout';
import ProfileHeader from '../components/athlete/ProfileHeader';
import ReliabilityHero from '../components/athlete/ReliabilityHero';
import RetentionScore from '../components/athlete/RetentionScore';
import StatsGrid from '../components/athlete/StatsGrid';
import TrendChart from '../components/athlete/TrendChart';
import WorkoutList from '../components/athlete/WorkoutList';
import WorkoutLogModal, { type WorkoutFormData } from '../components/athlete/WorkoutLogModal';
import Button from '../components/ui/Button';

export default function AthleteDashboard() {
  const athlete = ATHLETES[0]; // Marcus Johnson
  const [showWorkoutLog, setShowWorkoutLog] = useState(false);
  const navigate = useNavigate();
  const [loggedWorkouts, setLoggedWorkouts] = useState<typeof athlete.recentWorkouts>([]);
  const athleteWithLoggedWorkouts = { ...athlete, recentWorkouts: [...loggedWorkouts, ...athlete.recentWorkouts] };

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
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
        {/* Left: Reliability Score */}
        <div className="lg:col-span-2">
          <ReliabilityHero athlete={athlete} />

          {/* Quick stats below reliability */}
          <div className="mt-4 md:mt-6 grid grid-cols-3 gap-2 md:gap-3">
            <div
              onClick={() => navigate('/athlete/progress')}
              className="bg-black-card border border-gray-800 rounded-lg p-2.5 md:p-4 text-center hover:border-gold-primary/50 transition-all cursor-pointer"
            >
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-1">Workouts</p>
              <p className="text-white font-mono text-lg md:text-2xl font-bold">
                {athlete.recentWorkouts.length}
              </p>
              <p className="text-gray-600 text-[10px] md:text-xs">This month</p>
            </div>
            <div
              onClick={() => navigate('/athlete/progress')}
              className="bg-black-card border border-gray-800 rounded-lg p-2.5 md:p-4 text-center hover:border-gold-primary/50 transition-all cursor-pointer"
            >
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-1">Verified</p>
              <p className="text-gold-primary font-mono text-lg md:text-2xl font-bold">
                {athlete.recentWorkouts.filter(w => w.verified).length}
              </p>
              <p className="text-gray-600 text-[10px] md:text-xs">Confirmed</p>
            </div>
            <div
              onClick={() => navigate('/athlete/progress')}
              className="bg-black-card border border-gray-800 rounded-lg p-2.5 md:p-4 text-center hover:border-gold-primary/50 transition-all cursor-pointer"
            >
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-1">Streak</p>
              <p className="text-gold-bright font-mono text-lg md:text-2xl font-bold">12</p>
              <p className="text-gray-600 text-[10px] md:text-xs">Days</p>
            </div>
          </div>
        </div>

        {/* Right: Stats & Trends */}
        <div className="lg:col-span-3 space-y-4 md:space-y-6">
          <StatsGrid athlete={athlete} />
          <TrendChart athlete={athlete} />
        </div>
      </div>

      {/* Film Room CTA */}
      <div className="mt-6 md:mt-8">
        <button
          onClick={() => navigate('/athlete/film-room')}
          className="w-full bg-gradient-to-r from-gold-primary/[0.08] to-transparent border border-gold-primary/20 rounded-xl p-3.5 md:p-5 text-left hover:border-gold-primary/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold-primary/10 flex items-center justify-center shrink-0 group-hover:bg-gold-primary/20 transition-colors">
              <Film size={20} className="text-gold-primary" />
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
      <div className="mt-3 md:mt-4">
        <button
          onClick={() => navigate('/athlete/combine-prep')}
          className="w-full bg-gradient-to-r from-gold-bronze/[0.08] to-transparent border border-gold-bronze/20 rounded-xl p-3.5 md:p-5 text-left hover:border-gold-bronze/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold-bronze/10 flex items-center justify-center shrink-0 group-hover:bg-gold-bronze/20 transition-colors">
              <Target size={20} className="text-gold-bronze" />
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
      <div className="mt-6 md:mt-8">
        <div className="bg-black-card border border-gray-800 rounded-xl p-3.5 md:p-5">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gold-primary" />
              <h3 className="text-white font-bold text-xs md:text-sm uppercase tracking-wide">Workout Streak</h3>
            </div>
            <span className="text-gold-primary font-mono text-xs md:text-sm font-bold">12 Days</span>
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

      {/* Recruiting Activity */}
      <div className="mt-6 md:mt-8">
        <div className="bg-black-card border border-gray-800 rounded-xl p-3.5 md:p-5">
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-4 md:mb-5">
            <Eye size={14} className="text-gold-primary" />
            <h3 className="text-white font-bold text-xs md:text-sm uppercase tracking-wide">Recruiting Activity</h3>
          </div>

          {/* Top Stats Row: Profile Views + Schools Watching */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-5">
            {/* Profile Views */}
            <div className="bg-black/40 border border-gray-800 rounded-lg p-3 md:p-4">
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-2">Profile Views</p>
              <div className="flex items-end gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-mono text-xl md:text-2xl font-bold">7</span>
                    <TrendingUp size={14} className="text-green-400" />
                  </div>
                  <p className="text-gray-600 text-[10px] md:text-xs">This week</p>
                </div>
                <div className="border-l border-gray-800 pl-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-mono text-xl md:text-2xl font-bold">23</span>
                    <TrendingUp size={14} className="text-green-400" />
                  </div>
                  <p className="text-gray-600 text-[10px] md:text-xs">This month</p>
                </div>
              </div>
            </div>

            {/* Schools Watching */}
            <div className="bg-black/40 border border-gray-800 rounded-lg p-3 md:p-4">
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-2">Schools Watching</p>
              <div className="flex items-center gap-2 mb-1.5">
                <Users size={16} className="text-gold-primary" />
                <span className="text-white font-mono text-xl md:text-2xl font-bold">4</span>
              </div>
              <p className="text-gold-bronze text-[10px] md:text-xs font-medium">2 D1 &middot; 1 D2 &middot; 1 NAIA</p>
            </div>
          </div>

          {/* Profile Strength Score */}
          <div className="mb-4 md:mb-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Profile Strength</p>
              <span className="text-gold-bright font-mono text-sm md:text-base font-bold">82%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-primary to-gold-bright rounded-full transition-all"
                style={{ width: '82%' }}
              />
            </div>
          </div>

          {/* Profile Strength Breakdown */}
          <div className="space-y-2 mb-4 md:mb-5">
            {[
              { label: 'Video uploads', completed: true },
              { label: 'Verified workouts', completed: true },
              { label: 'GPA entered', completed: true },
              { label: 'Combine results', completed: true },
              { label: 'Coach endorsements', completed: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className={`text-xs ${item.completed ? 'text-gray-300' : 'text-gray-600'}`}>{item.label}</span>
                {item.completed ? (
                  <CheckCircle2 size={14} className="text-green-400" />
                ) : (
                  <XCircle size={14} className="text-gray-600" />
                )}
              </div>
            ))}
          </div>

          {/* Tip */}
          <div className="bg-gold-primary/[0.06] border border-gold-primary/15 rounded-lg p-2.5 md:p-3">
            <p className="text-gold-primary text-[10px] md:text-xs leading-relaxed">
              <span className="font-bold uppercase tracking-wider">Tip:</span>{' '}
              Add a highlight video to increase recruiter interest by 3x
            </p>
          </div>
        </div>
      </div>

      {/* Retention Score */}
      <div className="mt-6 md:mt-8">
        <RetentionScore athlete={athlete} />
      </div>

      {/* Workouts section */}
      <div className="mt-6 md:mt-8">
        <WorkoutList athlete={athleteWithLoggedWorkouts} />
      </div>

      {/* Bottom motivational */}
      <div className="mt-8 md:mt-12 mb-6 md:mb-8 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
          Championship mindset. Every rep counts.
        </p>
      </div>
    </PageLayout>

    {/* Workout log modal */}
    {showWorkoutLog && (
      <WorkoutLogModal
        onClose={() => setShowWorkoutLog(false)}
        onSubmit={(data: WorkoutFormData) => {
          setLoggedWorkouts(prev => [{
            id: `w-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            type: data.type,
            duration: data.duration,
            verified: false,
          }, ...prev]);
          setShowWorkoutLog(false);
        }}
      />
    )}
    </>
  );
}
