import { ATHLETES } from '../../lib/mockData';
import PageLayout from '../../components/layout/PageLayout';
import TrendChart from '../../components/athlete/TrendChart';
import ShadowMode from '../../components/athlete/ShadowMode';
import RetentionScore from '../../components/athlete/RetentionScore';
import StatsGrid from '../../components/athlete/StatsGrid';

export default function ProgressPage() {
  const athlete = ATHLETES[0];

  return (
    <PageLayout
      role="athlete"
      title="Progress"
      userName={athlete.name}
      userPhoto={athlete.photoUrl}
      notificationCount={3}
    >
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-1">
          Your Progress
        </h2>
        <p className="text-gray-500 text-sm">
          Track the climb. Every data point tells your story.
        </p>
      </div>

      {/* Retention + Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <RetentionScore athlete={athlete} />
        <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-5">
          <StatsGrid athlete={athlete} />
        </div>
      </div>

      {/* Trend chart full width */}
      <div className="mb-6 md:mb-8">
        <TrendChart athlete={athlete} />
      </div>

      {/* Shadow Mode */}
      <div className="mb-6 md:mb-8">
        <ShadowMode athlete={athlete} />
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
          The numbers don't lie. The grind speaks for itself.
        </p>
      </div>
    </PageLayout>
  );
}
