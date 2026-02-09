import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, CheckCircle2, Clock, Trophy } from 'lucide-react';
import { ATHLETES, TRAINERS } from '../lib/mockData';
import AthleteCard from '../components/trainer/AthleteCard';
import GoldShimmerText from '../components/ui/GoldShimmerText';

export default function TrainerDashboard() {
  const navigate = useNavigate();
  const trainer = TRAINERS[0]; // Coach Mike Davis
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
    <div className="min-h-screen bg-black-surface">
      {/* Top bar */}
      <header className="border-b border-gray-800 bg-black-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gold-primary transition-colors cursor-pointer">
              <ArrowLeft size={20} />
            </button>
            <GoldShimmerText as="span" className="text-xl font-black tracking-tight">
              UCHAMP
            </GoldShimmerText>
            <span className="text-gray-600 text-sm">|</span>
            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Trainer Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-gold-primary overflow-hidden">
              <img src={trainer.photoUrl} alt={trainer.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-gray-300 text-sm font-medium hidden md:block">{trainer.name}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Hero tagline */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
            Iron Sharpens Iron
          </h1>
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
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
            Your Roster
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </main>
    </div>
  );
}
