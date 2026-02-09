import { useState } from 'react';
import { Users, Search } from 'lucide-react';
import { ATHLETES, TRAINERS } from '../../lib/mockData';
import type { Athlete } from '../../lib/mockData';
import PageLayout from '../../components/layout/PageLayout';
import AthleteCard from '../../components/trainer/AthleteCard';
import VerificationModal from '../../components/trainer/VerificationModal';

export default function AthletesPage() {
  const trainer = TRAINERS[0];
  const athletes = ATHLETES.filter(a => trainer.athletes.includes(a.id));
  const [search, setSearch] = useState('');
  const [verifyingAthlete, setVerifyingAthlete] = useState<Athlete | null>(null);

  const filtered = athletes.filter(a =>
    !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.position.toLowerCase().includes(search.toLowerCase())
  );

  const handleVerify = (athleteId: string) => {
    const athlete = athletes.find(a => a.id === athleteId);
    if (athlete) setVerifyingAthlete(athlete);
  };

  const handleVerificationComplete = () => {
    setVerifyingAthlete(null);
  };

  return (
    <>
    <PageLayout
      role="trainer"
      title="Athletes"
      userName={trainer.name}
      userPhoto={trainer.photoUrl}
      notificationCount={athletes.reduce((sum, a) => sum + a.recentWorkouts.filter(w => !w.verified).length, 0)}
    >
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Users size={24} className="text-gold-primary" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">My Athletes</h2>
        </div>
        <p className="text-gray-500 text-sm">{athletes.length} athletes in your roster.</p>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Search athletes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-black-elevated border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary focus:shadow-gold transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(athlete => (
          <AthleteCard
            key={athlete.id}
            athlete={athlete}
            onVerify={() => handleVerify(athlete.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-black-card border border-gray-800 rounded-xl">
          <Users size={48} className="text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500">No athletes found.</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
          Iron sharpens iron.
        </p>
      </div>
    </PageLayout>

    {verifyingAthlete && (
      <VerificationModal
        athlete={verifyingAthlete}
        workout={{
          id: `pending-${verifyingAthlete.id}`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          type: verifyingAthlete.recentWorkouts.find(w => !w.verified)?.type || 'General Training',
          duration: verifyingAthlete.recentWorkouts.find(w => !w.verified)?.duration || 60,
        }}
        onClose={() => setVerifyingAthlete(null)}
        onVerify={() => handleVerificationComplete()}
      />
    )}
    </>
  );
}
