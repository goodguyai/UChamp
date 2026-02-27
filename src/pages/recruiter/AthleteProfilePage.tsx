import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, GraduationCap, Ruler, Weight, Film, CheckCircle2,
  Target, Star, StarOff, TrendingUp, Calendar, Download, MessageSquare, Trophy,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { ATHLETES, RECRUITERS, getReliabilityColor, getReliabilityLabel, getTrainerById, STAT_LABELS, STAT_UNITS } from '../../lib/mockData';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { exportAthleteReport } from '../../lib/exportUtils';
import { getWatchlist, saveWatchlist } from '../../lib/storage';

export default function AthleteProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recruiter = RECRUITERS[0];
  const athlete = ATHLETES.find(a => a.id === id);
  const [watchlist, setWatchlist] = useState<Set<string>>(() => new Set(getWatchlist('rec-1').length ? getWatchlist('rec-1') : recruiter.watchlist));
  const [activeChart, setActiveChart] = useState<'fortyYardDash' | 'bench' | 'vertical'>('fortyYardDash');

  if (!athlete) {
    return (
      <div className="min-h-screen bg-black-surface flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Athlete not found.</p>
          <Button onClick={() => navigate('/recruiter/search')}>Back to Search</Button>
        </div>
      </div>
    );
  }

  const trainer = getTrainerById(athlete.trainerId);
  const color = getReliabilityColor(athlete.reliabilityScore);
  const isWatched = watchlist.has(athlete.id);
  const verifiedCount = athlete.recentWorkouts.filter(w => w.verified).length;
  const totalWorkouts = athlete.recentWorkouts.length;

  const toggleWatchlist = () => {
    setWatchlist(prev => {
      const next = new Set(prev);
      if (next.has(athlete.id)) next.delete(athlete.id);
      else next.add(athlete.id);
      saveWatchlist('rec-1', Array.from(next));
      return next;
    });
  };

  const CHART_LABELS: Record<string, string> = {
    fortyYardDash: '40-Yard Dash',
    bench: 'Bench Press',
    vertical: 'Vertical Jump',
  };

  return (
    <div className="min-h-screen bg-black-surface">
      {/* Sticky header */}
      <header className="border-b border-gray-800 bg-black-card/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium hidden sm:inline">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <Button variant={isWatched ? 'ghost' : 'secondary'} size="sm" onClick={toggleWatchlist}>
              {isWatched ? <StarOff size={14} /> : <Star size={14} />}
              <span className="ml-1.5">{isWatched ? 'Watching' : 'Watch'}</span>
            </Button>
            <Button size="sm" onClick={() => exportAthleteReport({
              name: athlete.name,
              position: athlete.position,
              school: athlete.school,
              gradYear: athlete.gradYear,
              height: athlete.height,
              weight: athlete.weight,
              reliabilityScore: athlete.reliabilityScore,
              stats: athlete.stats,
              recentWorkouts: athlete.recentWorkouts.map(w => ({ date: w.date, type: w.type, duration: w.duration, verified: w.verified })),
            })}>
              <Download size={14} />
              <span className="ml-1.5 hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Hero section */}
        <div className="bg-black-card border border-gray-800 rounded-xl p-5 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-3 overflow-hidden bg-black-elevated shrink-0" style={{ borderColor: color, borderWidth: 3 }}>
              <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">{athlete.name}</h1>
                <Badge score={athlete.reliabilityScore} size="md" />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-gray-400 text-sm justify-center md:justify-start">
                <span className="bg-gold-primary/10 text-gold-primary px-3 py-1 rounded-full font-bold text-xs">{athlete.position}</span>
                <span className="flex items-center gap-1"><MapPin size={12} />{athlete.school}</span>
                <span className="flex items-center gap-1"><GraduationCap size={12} />Class of {athlete.gradYear}</span>
                <span className="flex items-center gap-1"><Ruler size={12} />{athlete.height}</span>
                <span className="flex items-center gap-1"><Weight size={12} />{athlete.weight} lbs</span>
              </div>
              {athlete.bio && (
                <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-2xl">{athlete.bio}</p>
              )}
              {athlete.highlights && athlete.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  {athlete.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-gold-primary/5 text-gold-primary/80 border border-gold-primary/10">
                      {h}
                    </span>
                  ))}
                </div>
              )}
              {athlete.gpa && (
                <p className="text-gray-500 text-xs mt-2">GPA: <span className="text-white font-mono font-bold">{athlete.gpa}</span></p>
              )}
            </div>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-black-card border border-gray-800 rounded-xl p-4 text-center">
            <Trophy size={18} className="text-gold-primary mx-auto mb-2" />
            <p className="text-gold-primary font-mono text-2xl font-bold">{athlete.reliabilityScore}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Reliability</p>
            <p className="text-gold-bright text-[10px] font-bold mt-0.5">{getReliabilityLabel(athlete.reliabilityScore)}</p>
          </div>
          <div className="bg-black-card border border-gray-800 rounded-xl p-4 text-center">
            <CheckCircle2 size={18} className="text-gold-bright mx-auto mb-2" />
            <p className="text-white font-mono text-2xl font-bold">{verifiedCount}/{totalWorkouts}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Verified</p>
          </div>
          <div className="bg-black-card border border-gray-800 rounded-xl p-4 text-center">
            <Calendar size={18} className="text-gold-bronze mx-auto mb-2" />
            <p className="text-white font-mono text-2xl font-bold">{totalWorkouts}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Workouts</p>
          </div>
          <div className="bg-black-card border border-gray-800 rounded-xl p-4 text-center">
            <TrendingUp size={18} className="text-gold-primary mx-auto mb-2" />
            <p className="text-white font-mono text-2xl font-bold">{Math.round((verifiedCount / Math.max(1, totalWorkouts)) * 100)}%</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Verify Rate</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Reliability breakdown */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Reliability Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(athlete.reliabilityBreakdown).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400 capitalize">{key}</span>
                    <span className="text-gold-primary font-bold font-mono">{value}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gold-primary to-gold-bright rounded-full" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Stats */}
          <div className="lg:col-span-2 bg-black-card border border-gray-800 rounded-xl p-5">
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
        </div>

        {/* Trend chart */}
        <div className="bg-black-card border border-gray-800 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">Performance Trends</h3>
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
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={athlete.trendData[activeChart]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" opacity={0.5} />
              <XAxis dataKey="date" stroke="#737373" style={{ fontSize: '12px', fontFamily: 'monospace' }} />
              <YAxis stroke="#737373" style={{ fontSize: '12px', fontFamily: 'monospace' }} reversed={activeChart === 'fortyYardDash'} domain={activeChart === 'fortyYardDash' ? ['dataMax + 0.1', 'dataMin - 0.1'] : undefined} />
              <Tooltip contentStyle={{ backgroundColor: '#121212', border: '1px solid #D4AF37', borderRadius: '8px' }} labelStyle={{ color: '#A3A3A3' }} itemStyle={{ color: '#FFD700' }} />
              <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2} dot={{ fill: '#FFD700', r: 4, stroke: '#0A0A0A', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Video Analysis + Workout History side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* AI Video Analysis */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Film size={14} className="text-gold-primary" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">AI Video Analysis</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-black-elevated rounded-lg p-3 text-center">
                <Target size={14} className="text-gold-primary mx-auto mb-1.5" />
                <p className="text-gold-primary font-mono text-xl font-bold">87</p>
                <p className="text-gray-500 text-[10px] uppercase">Form Score</p>
              </div>
              <div className="bg-black-elevated rounded-lg p-3 text-center">
                <Film size={14} className="text-gold-bright mx-auto mb-1.5" />
                <p className="text-white font-mono text-xl font-bold">3</p>
                <p className="text-gray-500 text-[10px] uppercase">Videos</p>
              </div>
              <div className="bg-black-elevated rounded-lg p-3 text-center">
                <CheckCircle2 size={14} className="text-gold-bronze mx-auto mb-1.5" />
                <p className="text-white font-mono text-xl font-bold">7</p>
                <p className="text-gray-500 text-[10px] uppercase">Highlights</p>
              </div>
            </div>
            <div className="bg-gold-primary/[0.03] border border-gold-primary/10 rounded-lg p-3">
              <p className="text-gray-400 text-xs leading-relaxed">
                <span className="text-gold-primary font-medium">AI Summary:</span>{' '}
                Strong acceleration and first-step explosion. Position drills show elite-level pocket movement.
                Deceleration mechanics flagged for improvement. Form trending upward over last 3 uploads.
              </p>
            </div>
          </div>

          {/* Recent Workouts */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={14} className="text-gold-primary" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">Recent Workouts</h3>
            </div>
            <div className="space-y-2">
              {athlete.recentWorkouts.map(w => (
                <div key={w.id} className="flex items-center justify-between py-2.5 px-3 bg-black-elevated rounded-lg">
                  <div>
                    <p className="text-white text-sm font-medium">{w.type}</p>
                    <p className="text-gray-500 text-xs">{new Date(w.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} &middot; {w.duration} min</p>
                  </div>
                  <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${w.verified ? 'text-gold-primary bg-gold-primary/10' : 'text-gray-500 bg-gray-700/30'}`}>
                    {w.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trainer info + actions */}
        <div className="bg-black-card border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Trained By</p>
              <p className="text-white text-sm font-bold">{trainer?.name || 'Unknown'}</p>
              {trainer?.specialty && <p className="text-gold-primary text-xs">{trainer.specialty}</p>}
              {trainer?.email && <p className="text-gray-500 text-xs mt-0.5">{trainer.email}</p>}
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm" onClick={toggleWatchlist}>
                {isWatched ? <StarOff size={14} /> : <Star size={14} />}
                <span className="ml-1.5">{isWatched ? 'On Watchlist' : 'Add to Watchlist'}</span>
              </Button>
              <Button size="sm" onClick={() => navigate('/recruiter/compare')}>
                <MessageSquare size={14} />
                <span className="ml-1.5">Compare</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">Verified data. No guesswork.</p>
        </div>
      </main>
    </div>
  );
}
