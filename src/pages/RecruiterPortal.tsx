import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Eye, Star, StarOff } from 'lucide-react';
import { ATHLETES, RECRUITERS } from '../lib/mockData';
import { getReliabilityColor, getReliabilityLabel } from '../lib/mockData';
import Badge from '../components/ui/Badge';
import PageLayout from '../components/layout/PageLayout';
import AthleteModal from '../components/recruiter/AthleteModal';
import type { Athlete } from '../lib/mockData';

const POSITIONS = ['ALL', 'QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'DB'] as const;

export default function RecruiterPortal() {
  const recruiter = RECRUITERS[0];
  const [search, setSearch] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [position, setPosition] = useState<string>('ALL');
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set(['ath-1', 'ath-4']));
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return ATHLETES.filter(a => {
      if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.school.toLowerCase().includes(search.toLowerCase())) return false;
      if (a.reliabilityScore < minScore) return false;
      if (position !== 'ALL' && a.position !== position) return false;
      return true;
    }).sort((a, b) => b.reliabilityScore - a.reliabilityScore);
  }, [search, minScore, position]);

  const toggleWatchlist = (id: string) => {
    setWatchlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <PageLayout
      role="recruiter"
      title="Search Athletes"
      userName={recruiter.name}
      userPhoto={recruiter.photoUrl}
      notificationCount={1}
    >
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
          Scout the Best
        </h2>
        <p className="text-gray-500">Verified talent. Trusted data. Elite athletes only.</p>
      </div>

      {/* Search & Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search athletes by name or school..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-black-elevated border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary focus:shadow-gold transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all cursor-pointer ${
              showFilters ? 'bg-gold-primary/10 border-gold-primary text-gold-primary' : 'bg-black-elevated border-gray-700 text-gray-400 hover:border-gray-500'
            }`}
          >
            <SlidersHorizontal size={18} />
            <span className="text-sm font-medium hidden sm:block">Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="bg-black-card border border-gray-800 rounded-lg p-4 md:p-6 space-y-5">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Position</p>
              <div className="flex flex-wrap gap-2">
                {POSITIONS.map(pos => (
                  <button
                    key={pos}
                    onClick={() => setPosition(pos)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      position === pos
                        ? 'bg-gold-primary text-black-pure'
                        : 'bg-black-elevated text-gray-400 border border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-400 text-xs uppercase tracking-wider">Min Reliability Score</span>
                <span className="text-gold-primary font-mono font-bold">{minScore}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={minScore}
                onChange={e => setMinScore(Number(e.target.value))}
                className="w-full accent-gold-primary"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>0</span>
                <span>100</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="text-gray-500 text-sm mb-4">
        {filtered.length} athlete{filtered.length !== 1 ? 's' : ''} found
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {filtered.map(athlete => {
          const color = getReliabilityColor(athlete.reliabilityScore);
          const isWatched = watchlist.has(athlete.id);

          return (
            <div
              key={athlete.id}
              className="bg-black-card border border-gray-800 rounded-lg p-4 md:p-6 hover:border-gold-primary transition-all duration-300 hover:shadow-gold"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 overflow-hidden bg-black-elevated" style={{ borderColor: color }}>
                    <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{athlete.name}</h3>
                    <p className="text-gray-500 text-sm">{athlete.position} · {athlete.school}</p>
                    <p className="text-gray-600 text-xs">Class of {athlete.gradYear}</p>
                  </div>
                </div>
                <Badge score={athlete.reliabilityScore} size="md" />
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
                <div className="bg-black-elevated rounded-lg p-3 text-center">
                  <p className="text-gray-500 text-xs uppercase">40-Yard</p>
                  <p className="text-white font-mono font-bold">{athlete.stats.fortyYardDash}s</p>
                </div>
                <div className="bg-black-elevated rounded-lg p-3 text-center">
                  <p className="text-gray-500 text-xs uppercase">Bench</p>
                  <p className="text-white font-mono font-bold">{athlete.stats.bench} lbs</p>
                </div>
                <div className="bg-black-elevated rounded-lg p-3 text-center">
                  <p className="text-gray-500 text-xs uppercase">Vertical</p>
                  <p className="text-white font-mono font-bold">{athlete.stats.vertical}"</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-500 text-xs mb-4 flex-wrap">
                <span>{athlete.height}</span>
                <span>{athlete.weight} lbs</span>
                <span>{athlete.city}, {athlete.state}</span>
                <span className="ml-auto text-gold-primary text-xs font-mono">
                  {getReliabilityLabel(athlete.reliabilityScore)}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                <button
                  onClick={() => setSelectedAthlete(athlete)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gold-primary text-black-pure px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-gold-bright transition-colors cursor-pointer"
                >
                  <Eye size={14} />
                  View Full Profile
                </button>
                <button
                  onClick={() => toggleWatchlist(athlete.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isWatched
                      ? 'bg-gold-primary/10 text-gold-primary border border-gold-primary'
                      : 'bg-black-elevated text-gray-400 border border-gray-700 hover:border-gold-primary hover:text-gold-primary'
                  }`}
                >
                  {isWatched ? <StarOff size={14} /> : <Star size={14} />}
                  {isWatched ? 'Remove' : 'Watch'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No athletes match your criteria.</p>
          <p className="text-gray-600 text-sm mt-2">Try adjusting your filters.</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
          Verified data. No guesswork.
        </p>
      </div>

      {selectedAthlete && (
        <AthleteModal
          athlete={selectedAthlete}
          onClose={() => setSelectedAthlete(null)}
          onWatchlist={watchlist.has(selectedAthlete.id)}
          onToggleWatchlist={() => toggleWatchlist(selectedAthlete.id)}
        />
      )}
    </PageLayout>
  );
}
