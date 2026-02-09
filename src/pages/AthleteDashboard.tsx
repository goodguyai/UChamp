import { Dumbbell, Bot } from 'lucide-react';
import { ATHLETES } from '../lib/mockData';
import PageLayout from '../components/layout/PageLayout';
import ProfileHeader from '../components/athlete/ProfileHeader';
import ReliabilityHero from '../components/athlete/ReliabilityHero';
import StatsGrid from '../components/athlete/StatsGrid';
import TrendChart from '../components/athlete/TrendChart';
import WorkoutList from '../components/athlete/WorkoutList';
import Button from '../components/ui/Button';

export default function AthleteDashboard() {
  const athlete = ATHLETES[0]; // Marcus Johnson

  return (
    <PageLayout
      role="athlete"
      title="Dashboard"
      userName={athlete.name}
      userPhoto={athlete.photoUrl}
      notificationCount={3}
      headerActions={
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <span className="flex items-center gap-2">
              <Bot size={16} />
              <span className="hidden sm:inline">AI Coach</span>
            </span>
          </Button>
          <Button size="sm">
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
      <div className="mt-6 mb-8">
        <p className="text-gray-600 text-sm italic">
          "The grind doesn't stop. The climb continues."
        </p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Reliability Score (2 cols) */}
        <div className="lg:col-span-2">
          <ReliabilityHero athlete={athlete} />

          {/* Quick stats below reliability */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="bg-black-card border border-gray-800 rounded-lg p-4 text-center">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Workouts</p>
              <p className="text-white font-mono text-2xl font-bold">
                {athlete.recentWorkouts.length}
              </p>
              <p className="text-gray-600 text-xs">This month</p>
            </div>
            <div className="bg-black-card border border-gray-800 rounded-lg p-4 text-center">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Verified</p>
              <p className="text-gold-primary font-mono text-2xl font-bold">
                {athlete.recentWorkouts.filter(w => w.verified).length}
              </p>
              <p className="text-gray-600 text-xs">Confirmed</p>
            </div>
            <div className="bg-black-card border border-gray-800 rounded-lg p-4 text-center">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Streak</p>
              <p className="text-gold-bright font-mono text-2xl font-bold">12</p>
              <p className="text-gray-600 text-xs">Days</p>
            </div>
          </div>
        </div>

        {/* Right: Stats & Trends (3 cols) */}
        <div className="lg:col-span-3 space-y-8">
          <StatsGrid athlete={athlete} />
          <TrendChart athlete={athlete} />
        </div>
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
  );
}
