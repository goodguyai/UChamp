import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Dumbbell, Bot } from 'lucide-react';
import { ATHLETES } from '../lib/mockData';
import ProfileHeader from '../components/athlete/ProfileHeader';
import ReliabilityHero from '../components/athlete/ReliabilityHero';
import StatsGrid from '../components/athlete/StatsGrid';
import TrendChart from '../components/athlete/TrendChart';
import WorkoutList from '../components/athlete/WorkoutList';
import Button from '../components/ui/Button';
import GoldShimmerText from '../components/ui/GoldShimmerText';

export default function AthleteDashboard() {
  const navigate = useNavigate();
  const athlete = ATHLETES[0]; // Marcus Johnson - the star

  return (
    <div className="min-h-screen bg-black-surface">
      {/* Top bar */}
      <header className="border-b border-gray-800 bg-black-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-gold-primary transition-colors cursor-pointer"
            >
              <ArrowLeft size={20} />
            </button>
            <GoldShimmerText as="span" className="text-xl font-black tracking-tight">
              UCHAMP
            </GoldShimmerText>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm">
              <span className="flex items-center gap-2">
                <Bot size={16} />
                AI Coach
              </span>
            </Button>
            <Button size="sm">
              <span className="flex items-center gap-2">
                <Dumbbell size={16} />
                Log the Grind
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-8 max-w-6xl">
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

        {/* Workouts section - full width */}
        <div className="mt-8">
          <WorkoutList athlete={athlete} />
        </div>

        {/* Bottom motivational */}
        <div className="mt-12 mb-8 text-center">
          <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
            Championship mindset. Every rep counts.
          </p>
        </div>
      </main>
    </div>
  );
}
