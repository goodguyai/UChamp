import { Trophy, Users, CheckCircle2, TrendingUp, Star } from 'lucide-react';
import { ATHLETES, TRAINERS, getReliabilityColor } from '../../lib/mockData';
import Badge from '../../components/ui/Badge';
import PageLayout from '../../components/layout/PageLayout';

export default function PortfolioPage() {
  const trainer = TRAINERS[0];
  const athletes = ATHLETES.filter(a => trainer.athletes.includes(a.id));
  const avgScore = Math.round(athletes.reduce((sum, a) => sum + a.reliabilityScore, 0) / athletes.length);
  const totalVerified = athletes.reduce((sum, a) => sum + a.recentWorkouts.filter(w => w.verified).length, 0);
  const totalWorkouts = athletes.reduce((sum, a) => sum + a.recentWorkouts.length, 0);

  return (
    <PageLayout
      role="trainer"
      title="Portfolio"
      userName={trainer.name}
      userPhoto={trainer.photoUrl}
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Trophy size={24} className="text-gold-primary" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Coach Portfolio</h2>
        </div>
        <p className="text-gray-500 text-sm">Your track record. Your legacy.</p>
      </div>

      {/* Coach profile card */}
      <div className="bg-black-card border border-gray-800 rounded-xl p-8 mb-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-gold-primary overflow-hidden bg-black-elevated">
            <img src={trainer.photoUrl} alt={trainer.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-white text-2xl font-black uppercase">{trainer.name}</h3>
            <p className="text-gray-500 text-sm">{trainer.email}</p>
            <div className="flex items-center gap-2 mt-2">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={16} className={i <= 4 ? 'text-gold-primary' : 'text-gray-700'} fill={i <= 4 ? 'currentColor' : 'none'} />
              ))}
              <span className="text-gold-primary text-xs font-mono font-bold ml-1">4.8</span>
            </div>
          </div>
        </div>

        {/* Coach stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black-elevated rounded-lg p-4 text-center">
            <Users size={20} className="text-gold-primary mx-auto mb-2" />
            <p className="text-white font-mono text-2xl font-bold">{athletes.length}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Athletes</p>
          </div>
          <div className="bg-black-elevated rounded-lg p-4 text-center">
            <CheckCircle2 size={20} className="text-gold-bright mx-auto mb-2" />
            <p className="text-gold-primary font-mono text-2xl font-bold">{totalVerified}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Verified</p>
          </div>
          <div className="bg-black-elevated rounded-lg p-4 text-center">
            <TrendingUp size={20} className="text-gold-bronze mx-auto mb-2" />
            <p className="text-white font-mono text-2xl font-bold">{avgScore}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Avg Score</p>
          </div>
          <div className="bg-black-elevated rounded-lg p-4 text-center">
            <Trophy size={20} className="text-gold-bright mx-auto mb-2" />
            <p className="text-white font-mono text-2xl font-bold">{Math.round((totalVerified / Math.max(1, totalWorkouts)) * 100)}%</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Verify Rate</p>
          </div>
        </div>
      </div>

      {/* Athlete showcase */}
      <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
        Athletes Trained
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {athletes.map(athlete => {
          const color = getReliabilityColor(athlete.reliabilityScore);
          return (
            <div key={athlete.id} className="bg-black-card border border-gray-800 rounded-xl p-6 text-center hover:border-gold-primary/50 transition-all">
              <div className="w-16 h-16 rounded-full border-2 overflow-hidden bg-black-elevated mx-auto mb-3" style={{ borderColor: color }}>
                <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-white font-bold">{athlete.name}</p>
              <p className="text-gray-500 text-sm">{athlete.position} · Class of {athlete.gradYear}</p>
              <div className="mt-3">
                <Badge score={athlete.reliabilityScore} size="sm" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-gray-600 text-[10px] uppercase">40-Yard</p>
                  <p className="text-white font-mono text-xs font-bold">{athlete.stats.fortyYardDash}s</p>
                </div>
                <div>
                  <p className="text-gray-600 text-[10px] uppercase">Bench</p>
                  <p className="text-white font-mono text-xs font-bold">{athlete.stats.bench}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-[10px] uppercase">Vertical</p>
                  <p className="text-white font-mono text-xs font-bold">{athlete.stats.vertical}"</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Testimonial / Social proof */}
      <div className="bg-black-card border border-gold-primary/20 rounded-xl p-6 mb-8">
        <p className="text-gray-300 text-sm italic leading-relaxed">
          "Coach Davis doesn't just train athletes — he builds champions. His verification standards are the gold standard in our program."
        </p>
        <p className="text-gold-primary text-xs font-medium mt-3">— Athletic Director, Lithonia High School</p>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
          Results speak. Legacy lasts.
        </p>
      </div>
    </PageLayout>
  );
}
