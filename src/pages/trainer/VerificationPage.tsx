import { useState } from 'react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { ATHLETES, TRAINERS, getReliabilityColor } from '../../lib/mockData';
import { getStoredUser } from '../../lib/mockAuth';
import { getVerifiedWorkouts, saveVerifiedWorkouts, getFlaggedWorkouts, saveFlaggedWorkouts } from '../../lib/storage';
import type { Athlete } from '../../lib/mockData';
import PageLayout from '../../components/layout/PageLayout';
import VerificationModal from '../../components/trainer/VerificationModal';

interface PendingItem {
  athlete: Athlete;
  workout: { id: string; date: string; type: string; duration: number };
}

export default function VerificationPage() {
  const user = getStoredUser();
  const trainer = TRAINERS.find(t => t.id === user?.id) || TRAINERS[0];
  const athletes = ATHLETES.filter(a => trainer.athletes.includes(a.id));
  const [verifiedSet, setVerifiedSet] = useState<Set<string>>(() => new Set(getVerifiedWorkouts()));
  const [flaggedSet, setFlaggedSet] = useState<Set<string>>(() => new Set(getFlaggedWorkouts()));
  const [verifyingItem, setVerifyingItem] = useState<PendingItem | null>(null);

  // Build pending list from all athletes' unverified workouts
  const pendingItems: PendingItem[] = athletes.flatMap(athlete =>
    athlete.recentWorkouts
      .filter(w => !w.verified && !verifiedSet.has(w.id) && !flaggedSet.has(w.id))
      .map(w => ({
        athlete,
        workout: { id: w.id, date: w.date, type: w.type, duration: w.duration },
      }))
  );

  const verifiedCount = verifiedSet.size;
  const flaggedCount = flaggedSet.size;

  const handleVerification = (approved: boolean, _notes: string) => {
    if (!verifyingItem) return;
    if (approved) {
      setVerifiedSet(prev => {
        const next = new Set([...prev, verifyingItem.workout.id]);
        saveVerifiedWorkouts(Array.from(next));
        return next;
      });
    } else {
      setFlaggedSet(prev => {
        const next = new Set([...prev, verifyingItem.workout.id]);
        saveFlaggedWorkouts(Array.from(next));
        return next;
      });
    }
    setVerifyingItem(null);
  };

  return (
    <>
    <PageLayout
      role="trainer"
      title="Verification"
      userName={trainer.name}
      userPhoto={trainer.photoUrl}
      notificationCount={pendingItems.length}
    >
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <CheckCircle2 size={24} className="text-gold-primary" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Verification Queue</h2>
        </div>
        <p className="text-gray-500 text-sm">Review and verify athlete workouts.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-black-card border border-gray-800 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-bronze/10 flex items-center justify-center">
            <Clock size={18} className="text-gold-bronze" />
          </div>
          <div>
            <p className="text-gold-bronze font-mono text-xl font-bold">{pendingItems.length}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Pending</p>
          </div>
        </div>
        <div className="bg-black-card border border-gray-800 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center">
            <CheckCircle2 size={18} className="text-gold-primary" />
          </div>
          <div>
            <p className="text-gold-primary font-mono text-xl font-bold">{verifiedCount}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Verified Today</p>
          </div>
        </div>
        <div className="bg-black-card border border-gray-800 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-400/10 flex items-center justify-center">
            <XCircle size={18} className="text-red-400" />
          </div>
          <div>
            <p className="text-red-400 font-mono text-xl font-bold">{flaggedCount}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Flagged</p>
          </div>
        </div>
      </div>

      {/* Pending list */}
      {pendingItems.length > 0 ? (
        <div className="space-y-3">
          {pendingItems.map(item => {
            const color = getReliabilityColor(item.athlete.reliabilityScore);
            return (
              <div
                key={item.workout.id}
                className="bg-black-card border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 overflow-hidden bg-black-elevated" style={{ borderColor: color }}>
                      <img src={item.athlete.photoUrl} alt={item.athlete.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-white font-bold">{item.athlete.name}</p>
                      <p className="text-gray-400 text-sm">{item.workout.type}</p>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                        <span>{new Date(item.workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <span>{item.workout.duration} min</span>
                        <span className="text-gold-primary/60">{item.athlete.position}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setVerifyingItem(item)}
                    className="flex items-center gap-2 bg-gold-primary text-black-pure px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-gold-bright transition-colors cursor-pointer"
                  >
                    <CheckCircle2 size={14} />
                    Review
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-black-card border border-gray-800 rounded-xl">
          <CheckCircle2 size={48} className="text-gold-primary mx-auto mb-4" />
          <p className="text-gold-primary font-bold text-lg">All caught up!</p>
          <p className="text-gray-500 text-sm mt-2">No pending verifications. Great work, Coach.</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
          Verify the rep. Build the trust.
        </p>
      </div>
    </PageLayout>

    {verifyingItem && (
      <VerificationModal
        athlete={verifyingItem.athlete}
        workout={verifyingItem.workout}
        onClose={() => setVerifyingItem(null)}
        onVerify={handleVerification}
      />
    )}
    </>
  );
}
