import { useState } from 'react';
import { Users, CheckCircle2, Clock, Trophy } from 'lucide-react';
import { ATHLETES, TRAINERS } from '../lib/mockData';
import PageLayout from '../components/layout/PageLayout';
import AthleteCard from '../components/trainer/AthleteCard';

export default function TrainerDashboard() {
  const trainer = TRAINERS[0];
  const athletes = ATHLETES.filter(a => trainer.athletes.includes(a.id));
  const [verifiedIds, setVerifiedIds] = useState<Set<string>>(new Set());

  const totalPending = athletes.reduce((sum, a) => {
    if (verifiedIds.has(a.id)) return sum;
    return sum + a.recentWorkouts.filter(w => !w.verified).length;
  }, 0);

  const avgScore = Math.round(athletes.reduce((sum, a) => sum + a.reliabilityScore, 0) / athletes.length);

  const handleVerify = (athleteId: string) => {
    setVerifiedIds(prev => new Set([...prev, athleteId]));
  };

  return (
    <PageLayout
      role="trainer"
      title="Dashboard"
      userName={trainer.name}
      userPhoto={trainer.photoUrl}
      notificationCount={totalPending}
    >
      {/* Hero tagline */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
          Iron Sharpens Iron
        </h2>
        <p className="text-gray-500">Building champions, one verified rep at a time.</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-black-card border border-gray-800 rounded-lg p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center">
            <Users className="text-gold-primary" size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Athletes</p>
            <p className="text-white font-mono text-2xl font-bold">{athletes.length}</p>
          </div>
        </div>

        <div className="bg-black-card border border-gray-800 rounded-lg p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gold-bronze/10 flex items-center justify-center">
            <Clock className="text-gold-bronze" size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Pending</p>
            <p className="text-gold-bronze font-mono text-2xl font-bold">{totalPending}</p>
          </div>
        </div>

        <div className="bg-black-card border border-gray-800 rounded-lg p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center">
            <CheckCircle2 className="text-gold-primary" size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Verified Today</p>
            <p className="text-gold-primary font-mono text-2xl font-bold">{verifiedIds.size + 4}</p>
          </div>
        </div>

        <div className="bg-black-card border border-gray-800 rounded-lg p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gold-bright/10 flex items-center justify-center">
            <Trophy className="text-gold-bright" size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Avg Score</p>
            <p className="text-gold-bright font-mono text-2xl font-bold">{avgScore}</p>
          </div>
        </div>
      </div>

      {/* Athlete grid */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
          Your Roster
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {athletes.map(athlete => (
            <AthleteCard
              key={athlete.id}
              athlete={athlete}
              onVerify={() => handleVerify(athlete.id)}
            />
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
          Verify the rep. Build the legacy.
        </p>
      </div>
    </PageLayout>
  );
}
