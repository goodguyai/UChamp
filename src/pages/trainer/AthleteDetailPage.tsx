import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, TrendingUp, CheckCircle2, AlertCircle, Calendar, MessageSquare, Trophy,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { ATHLETES, getReliabilityColor, getReliabilityLabel, STAT_LABELS, STAT_UNITS } from '../../lib/mockData';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import VerificationModal from '../../components/trainer/VerificationModal';

export default function AthleteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const athlete = ATHLETES.find(a => a.id === id);
  const [verifying, setVerifying] = useState(false);
  const [activeChart, setActiveChart] = useState<'fortyYardDash' | 'bench' | 'vertical'>('fortyYardDash');

  if (!athlete) {
    return (
      <div className="min-h-screen bg-black-surface flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Athlete not found.</p>
          <Button onClick={() => navigate('/trainer/athletes')}>Back to Athletes</Button>
        </div>
      </div>
    );
  }

  const color = getReliabilityColor(athlete.reliabilityScore);
  const pendingCount = athlete.recentWorkouts.filter(w => !w.verified).length;
  const verifiedCount = athlete.recentWorkouts.filter(w => w.verified).length;

  const CHART_LABELS: Record<string, string> = {
    fortyYardDash: '40-Yard',
    bench: 'Bench',
    vertical: 'Vertical',
  };

  return (
    <>
      <div className="min-h-screen bg-black-surface">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black-card/90 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </button>
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm" onClick={() => navigate('/trainer/messages')}>
                <MessageSquare size={14} />
                <span className="ml-1.5 hidden sm:inline">Message</span>
              </Button>
              {pendingCount > 0 && (
                <Button size="sm" onClick={() => setVerifying(true)}>
                  <CheckCircle2 size={14} />
                  <span className="ml-1.5">Verify ({pendingCount})</span>
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* Profile hero */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-5 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-full border-3 overflow-hidden bg-black-elevated shrink-0" style={{ borderColor: color, borderWidth: 3 }}>
                <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                  <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">{athlete.name}</h1>
                  <Badge score={athlete.reliabilityScore} size="md" />
                </div>
                <p className="text-gray-400 text-sm">{athlete.position} &middot; {athlete.school} &middot; Class of {athlete.gradYear}</p>
                {athlete.bio && <p className="text-gray-500 text-sm mt-2 max-w-2xl">{athlete.bio}</p>}
                <p className="text-gold-primary text-xs font-mono mt-2">{getReliabilityLabel(athlete.reliabilityScore)}</p>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-black-card border border-gray-800 rounded-xl p-4 text-center">
              <Trophy size={18} className="text-gold-primary mx-auto mb-2" />
              <p className="text-gold-primary font-mono text-2xl font-bold">{athlete.reliabilityScore}</p>
              <p className="text-gray-500 text-xs uppercase">Score</p>
            </div>
            <div className="bg-black-card border border-gray-800 rounded-xl p-4 text-center">
              <CheckCircle2 size={18} className="text-gold-bright mx-auto mb-2" />
              <p className="text-white font-mono text-2xl font-bold">{verifiedCount}</p>
              <p className="text-gray-500 text-xs uppercase">Verified</p>
            </div>
            <div className="bg-black-card border border-gray-800 rounded-xl p-4 text-center">
              <AlertCircle size={18} className="text-gold-bronze mx-auto mb-2" />
              <p className="text-gold-bronze font-mono text-2xl font-bold">{pendingCount}</p>
              <p className="text-gray-500 text-xs uppercase">Pending</p>
            </div>
            <div className="bg-black-card border border-gray-800 rounded-xl p-4 text-center">
              <Calendar size={18} className="text-gray-400 mx-auto mb-2" />
              <p className="text-white font-mono text-2xl font-bold">{athlete.recentWorkouts.length}</p>
              <p className="text-gray-500 text-xs uppercase">Workouts</p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-5 mb-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Performance Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(athlete.stats).map(([key, value]) => (
                <div key={key} className="bg-black-elevated rounded-lg p-3">
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{STAT_LABELS[key] || key}</p>
                  <p className="text-white font-mono text-xl font-bold">{value}<span className="text-gray-500 text-sm ml-1">{STAT_UNITS[key]}</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* Trend chart */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                <TrendingUp size={14} className="text-gold-primary" /> Trends
              </h3>
              <div className="flex gap-1">
                {(['fortyYardDash', 'bench', 'vertical'] as const).map(key => (
                  <button key={key} onClick={() => setActiveChart(key)}
                    className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-all ${
                      activeChart === key ? 'bg-gold-primary/10 text-gold-primary' : 'text-gray-500 hover:text-white'
                    }`}>
                    {CHART_LABELS[key]}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={athlete.trendData[activeChart]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" opacity={0.5} />
                <XAxis dataKey="date" stroke="#737373" style={{ fontSize: '12px', fontFamily: 'monospace' }} />
                <YAxis stroke="#737373" style={{ fontSize: '12px', fontFamily: 'monospace' }} reversed={activeChart === 'fortyYardDash'} domain={activeChart === 'fortyYardDash' ? ['dataMax + 0.1', 'dataMin - 0.1'] : undefined} />
                <Tooltip contentStyle={{ backgroundColor: '#121212', border: '1px solid #D4AF37', borderRadius: '8px' }} labelStyle={{ color: '#A3A3A3' }} itemStyle={{ color: '#FFD700' }} />
                <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2} dot={{ fill: '#FFD700', r: 4, stroke: '#0A0A0A', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Workout history */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
              <Calendar size={14} className="text-gold-primary" /> Workout History
            </h3>
            <div className="space-y-2">
              {athlete.recentWorkouts.map(w => (
                <div key={w.id} className="flex items-center justify-between py-3 px-3 bg-black-elevated rounded-lg">
                  <div className="flex items-center gap-3">
                    {w.verified
                      ? <CheckCircle2 size={16} className="text-gold-primary shrink-0" />
                      : <AlertCircle size={16} className="text-gold-bronze shrink-0" />
                    }
                    <div>
                      <p className="text-white text-sm font-medium">{w.type}</p>
                      <p className="text-gray-500 text-xs">{new Date(w.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} &middot; {w.duration} min</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${w.verified ? 'text-gold-primary bg-gold-primary/10' : 'text-gold-bronze bg-gold-bronze/10'}`}>
                    {w.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">Iron sharpens iron.</p>
          </div>
        </main>
      </div>

      {verifying && (
        <VerificationModal
          athlete={athlete}
          workout={{
            id: `pending-${athlete.id}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            type: athlete.recentWorkouts.find(w => !w.verified)?.type || 'General Training',
            duration: athlete.recentWorkouts.find(w => !w.verified)?.duration || 60,
          }}
          onClose={() => setVerifying(false)}
          onVerify={() => setVerifying(false)}
        />
      )}
    </>
  );
}
