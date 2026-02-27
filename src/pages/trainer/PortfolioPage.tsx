import { useState } from 'react';
import { Trophy, Users, CheckCircle2, TrendingUp, Star, Award, Calendar, Shield } from 'lucide-react';
import { ATHLETES, TRAINERS, getReliabilityColor } from '../../lib/mockData';
import { getStoredUser } from '../../lib/mockAuth';
import Badge from '../../components/ui/Badge';
import PageLayout from '../../components/layout/PageLayout';

export default function PortfolioPage() {
  const user = getStoredUser();
  const trainer = TRAINERS.find(t => t.id === user?.id) || TRAINERS[0];
  const athletes = ATHLETES.filter(a => trainer.athletes.includes(a.id));
  const avgScore = Math.round(athletes.reduce((sum, a) => sum + a.reliabilityScore, 0) / athletes.length);
  const totalVerified = athletes.reduce((sum, a) => sum + a.recentWorkouts.filter(w => w.verified).length, 0);
  const totalWorkouts = athletes.reduce((sum, a) => sum + a.recentWorkouts.length, 0);
  const [activeTab, setActiveTab] = useState<'overview' | 'athletes' | 'history'>('overview');

  const TABS = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'athletes' as const, label: 'Athletes' },
    { id: 'history' as const, label: 'History' },
  ];

  // Verification history (mock)
  const verificationHistory = athletes.flatMap(a =>
    a.recentWorkouts.filter(w => w.verified).map(w => ({
      athleteName: a.name,
      athletePosition: a.position,
      workoutType: w.type,
      date: w.date,
      duration: w.duration,
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const testimonials = [
    { text: 'Coach Davis doesn\'t just train athletes \u2014 he builds champions. His verification standards are the gold standard in our program.', author: 'Athletic Director, Lithonia High School' },
    { text: 'Marcus went from a 4.82 to a 4.65 forty under Coach Davis. The data-driven approach and verified workouts gave us confidence in his numbers.', author: 'John Smith, Georgia Tech Recruiting' },
    { text: 'My son\'s reliability score jumped 15 points in three months. Coach Davis holds every athlete accountable.', author: 'Parent of Jamal Williams' },
  ];

  return (
    <PageLayout role="trainer" title="Portfolio" userName={trainer.name} userPhoto={trainer.photoUrl}>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Trophy size={24} className="text-gold-primary" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Coach Portfolio</h2>
        </div>
        <p className="text-gray-500 text-sm">Your track record. Your legacy.</p>
      </div>

      {/* Coach profile card */}
      <div className="bg-black-card border border-gray-800 rounded-xl p-5 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-gold-primary overflow-hidden bg-black-elevated shrink-0">
            <img src={trainer.photoUrl} alt={trainer.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-white text-2xl font-black uppercase">{trainer.name}</h3>
            <p className="text-gray-500 text-sm">{trainer.email}</p>
            {trainer.specialty && <p className="text-gold-primary text-xs font-medium mt-1">{trainer.specialty}</p>}
            <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={16} className={i <= Math.floor(trainer.rating || 4) ? 'text-gold-primary' : 'text-gray-700'} fill={i <= Math.floor(trainer.rating || 4) ? 'currentColor' : 'none'} />
              ))}
              <span className="text-gold-primary text-xs font-mono font-bold ml-1">{trainer.rating || 4.8}</span>
            </div>
            {trainer.certifications && (
              <div className="flex flex-wrap gap-1.5 mt-3 justify-center md:justify-start">
                {trainer.certifications.map(cert => (
                  <span key={cert} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold-primary/10 text-gold-primary border border-gold-primary/20">{cert}</span>
                ))}
              </div>
            )}
            {trainer.yearsExperience && (
              <p className="text-gray-500 text-xs mt-2">{trainer.yearsExperience} years experience</p>
            )}
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

      {/* Tab bar */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
              activeTab === tab.id ? 'bg-gold-primary/10 text-gold-primary border border-gold-primary/30' : 'text-gray-400 hover:text-white hover:bg-black-elevated'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Athlete showcase */}
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Athletes Trained</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {athletes.map(athlete => {
              const color = getReliabilityColor(athlete.reliabilityScore);
              return (
                <div key={athlete.id} className="bg-black-card border border-gray-800 rounded-xl p-6 text-center hover:border-gold-primary/50 transition-all">
                  <div className="w-16 h-16 rounded-full border-2 overflow-hidden bg-black-elevated mx-auto mb-3" style={{ borderColor: color }}>
                    <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-white font-bold">{athlete.name}</p>
                  <p className="text-gray-500 text-sm">{athlete.position} &middot; Class of {athlete.gradYear}</p>
                  <div className="mt-3"><Badge score={athlete.reliabilityScore} size="sm" /></div>
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

          {/* Testimonials */}
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
            <Award size={14} className="text-gold-primary" /> Testimonials
          </h3>
          <div className="space-y-4 mb-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-black-card border border-gold-primary/20 rounded-xl p-5">
                <p className="text-gray-300 text-sm italic leading-relaxed">"{t.text}"</p>
                <p className="text-gold-primary text-xs font-medium mt-3">&mdash; {t.author}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'athletes' && (
        <div className="space-y-3">
          {athletes.map(athlete => {
            const verifiedW = athlete.recentWorkouts.filter(w => w.verified).length;
            const totalW = athlete.recentWorkouts.length;
            return (
              <div key={athlete.id} className="bg-black-card border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 overflow-hidden bg-black-elevated shrink-0" style={{ borderColor: getReliabilityColor(athlete.reliabilityScore) }}>
                  <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">{athlete.name}</p>
                  <p className="text-gray-500 text-xs">{athlete.position} &middot; {athlete.school} &middot; Class of {athlete.gradYear}</p>
                  {athlete.bio && <p className="text-gray-600 text-xs mt-1 truncate">{athlete.bio}</p>}
                </div>
                <div className="text-right shrink-0">
                  <Badge score={athlete.reliabilityScore} size="sm" />
                  <p className="text-gray-500 text-[10px] mt-1">{verifiedW}/{totalW} verified</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
            <Shield size={14} className="text-gold-primary" /> Verification History
          </h3>
          <div className="space-y-2">
            {verificationHistory.map((v, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 px-3 bg-black-elevated rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-gold-primary shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">{v.athleteName} <span className="text-gray-500 text-xs">({v.athletePosition})</span></p>
                    <p className="text-gray-500 text-xs">{v.workoutType} &middot; {v.duration} min</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Calendar size={12} className="text-gray-600" />
                  <span className="text-gray-400 text-xs">{new Date(v.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            ))}
          </div>
          {verificationHistory.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-8">No verified workouts yet.</p>
          )}
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">Results speak. Legacy lasts.</p>
      </div>
    </PageLayout>
  );
}
