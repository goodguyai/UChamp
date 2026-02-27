import { ATHLETES } from '../../lib/mockData';
import { getStoredUser } from '../../lib/mockAuth';
import PageLayout from '../../components/layout/PageLayout';
import AICoachChat from '../../components/athlete/AICoachChat';
import CoachInsightsPanel from '../../components/athlete/CoachInsightsPanel';

export default function AICoachPage() {
  const user = getStoredUser();
  const athlete = ATHLETES.find(a => a.id === user?.id) || ATHLETES[0];

  return (
    <PageLayout
      role="athlete"
      title="AI Coach"
      userName={athlete.name}
      userPhoto={athlete.photoUrl}
      notificationCount={3}
    >
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-1">
          AI Performance Coach
        </h2>
        <p className="text-gray-500 text-sm">
          Powered by your data. Built for your grind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Chat - takes 2 columns */}
        <div className="md:col-span-2 lg:col-span-2">
          <div className="bg-black-card border border-gray-800 rounded-xl overflow-hidden h-[calc(100vh-200px)] md:h-[500px] lg:h-[600px] flex flex-col">
            <AICoachChat athleteName={athlete.name} />
          </div>
        </div>

        {/* Insights sidebar */}
        <div className="md:col-span-1 lg:col-span-1">
          <CoachInsightsPanel />
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
          Data-driven. Athlete-first. Always grinding.
        </p>
      </div>
    </PageLayout>
  );
}
