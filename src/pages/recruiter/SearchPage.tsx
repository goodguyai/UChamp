import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Eye, Star, StarOff, ArrowUpDown, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ATHLETES, RECRUITERS } from '../../lib/mockData';
import { getReliabilityColor } from '../../lib/mockData';
import { getStoredUser } from '../../lib/mockAuth';
import Badge from '../../components/ui/Badge';
import PageLayout from '../../components/layout/PageLayout';
import { getWatchlist, saveWatchlist, hasWatchlist } from '../../lib/storage';

const POSITIONS = ['ALL', 'QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'DB'] as const;
const GRAD_YEARS = [2025, 2026, 2027, 2028] as const;
type SortKey = 'reliability' | 'fortyYardDash' | 'bench' | 'vertical' | 'name';

export default function SearchPage() {
  const user = getStoredUser();
  const recruiter = RECRUITERS.find(r => r.id === user?.id) || RECRUITERS[0];
  const [search, setSearch] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [position, setPosition] = useState<string>('ALL');
  const [gradYear, setGradYear] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>('reliability');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState<Set<string>>(() => new Set(hasWatchlist(recruiter.id) ? getWatchlist(recruiter.id) : ['ath-1', 'ath-4']));
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filtered = useMemo(() => {
    return ATHLETES.filter(a => {
      if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.school.toLowerCase().includes(search.toLowerCase()) && !a.position.toLowerCase().includes(search.toLowerCase())) return false;
      if (a.reliabilityScore < minScore) return false;
      if (position !== 'ALL' && a.position !== position) return false;
      if (gradYear && a.gradYear !== gradYear) return false;
      if (verifiedOnly && !a.verified) return false;
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'reliability': return b.reliabilityScore - a.reliabilityScore;
        case 'fortyYardDash': return a.stats.fortyYardDash - b.stats.fortyYardDash;
        case 'bench': return b.stats.bench - a.stats.bench;
        case 'vertical': return b.stats.vertical - a.stats.vertical;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
  }, [search, minScore, position, gradYear, verifiedOnly, sortBy]);

  const toggleWatchlist = (id: string) => {
    setWatchlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveWatchlist(recruiter.id, Array.from(next));
      return next;
    });
  };

  return (
    <PageLayout
      role="recruiter"
      title="Search Athletes"
      userName={recruiter.name}
      userPhoto={recruiter.photoUrl}
      notificationCount={2}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
          Advanced Search
        </h2>
        <p className="text-gray-500 text-sm">Filter, sort, and discover verified talent.</p>
      </div>

      {/* Search bar row */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search by name, school, or position..."
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
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
            className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-700 bg-black-elevated text-gray-400 hover:border-gray-500 transition-all cursor-pointer"
          >
            <Users size={18} />
            <span className="text-sm font-medium hidden sm:block">{viewMode === 'grid' ? 'Table' : 'Grid'}</span>
          </button>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="bg-black-card border border-gray-800 rounded-lg p-4 md:p-6 space-y-5">
            {/* Position */}
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Position</p>
              <div className="flex flex-wrap gap-2">
                {POSITIONS.map(pos => (
                  <button
                    key={pos}
                    onClick={() => setPosition(pos)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      position === pos ? 'bg-gold-primary text-black-pure' : 'bg-black-elevated text-gray-400 border border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            {/* Grad year */}
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Graduation Year</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setGradYear(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    gradYear === null ? 'bg-gold-primary text-black-pure' : 'bg-black-elevated text-gray-400 border border-gray-700 hover:border-gray-500'
                  }`}
                >
                  ALL
                </button>
                {GRAD_YEARS.map(yr => (
                  <button
                    key={yr}
                    onClick={() => setGradYear(yr)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      gradYear === yr ? 'bg-gold-primary text-black-pure' : 'bg-black-elevated text-gray-400 border border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Min reliability */}
            <div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-400 text-xs uppercase tracking-wider">Min Reliability</span>
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
            </div>

            {/* Sort + Verified toggle */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <ArrowUpDown size={14} className="text-gray-500" />
                <span className="text-gray-400 text-xs uppercase tracking-wider">Sort by</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as SortKey)}
                  className="bg-black-elevated border border-gray-700 rounded-md px-3 py-1.5 text-white text-xs focus:outline-none focus:border-gold-primary cursor-pointer"
                >
                  <option value="reliability">Reliability Score</option>
                  <option value="fortyYardDash">40-Yard Dash</option>
                  <option value="bench">Bench Press</option>
                  <option value="vertical">Vertical Jump</option>
                  <option value="name">Name</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={e => setVerifiedOnly(e.target.checked)}
                  className="accent-gold-primary"
                />
                <span className="text-gray-400 text-xs uppercase tracking-wider">Verified Only</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="text-gray-500 text-sm mb-4">
        {filtered.length} athlete{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Table view */}
      {viewMode === 'table' ? (
        <div className="bg-black-card border border-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-4 py-3">Athlete</th>
                  <th className="text-center text-gray-500 text-xs uppercase tracking-wider px-4 py-3">Pos</th>
                  <th className="text-center text-gray-500 text-xs uppercase tracking-wider px-4 py-3">Score</th>
                  <th className="text-center text-gray-500 text-xs uppercase tracking-wider px-4 py-3">40-Yard</th>
                  <th className="text-center text-gray-500 text-xs uppercase tracking-wider px-4 py-3">Bench</th>
                  <th className="text-center text-gray-500 text-xs uppercase tracking-wider px-4 py-3">Vertical</th>
                  <th className="text-center text-gray-500 text-xs uppercase tracking-wider px-4 py-3">Class</th>
                  <th className="text-center text-gray-500 text-xs uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(athlete => {
                  const color = getReliabilityColor(athlete.reliabilityScore);
                  const isWatched = watchlist.has(athlete.id);
                  return (
                    <tr key={athlete.id} className="border-b border-gray-800/50 hover:bg-black-elevated/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full border-2 overflow-hidden bg-black-elevated shrink-0" style={{ borderColor: color }}>
                            <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">{athlete.name}</p>
                            <p className="text-gray-600 text-xs">{athlete.school}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-gold-primary/10 text-gold-primary px-2 py-0.5 rounded-full text-xs font-bold">{athlete.position}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-mono font-bold text-sm" style={{ color }}>{athlete.reliabilityScore}</span>
                      </td>
                      <td className="px-4 py-3 text-center text-white font-mono text-sm">{athlete.stats.fortyYardDash}s</td>
                      <td className="px-4 py-3 text-center text-white font-mono text-sm">{athlete.stats.bench}</td>
                      <td className="px-4 py-3 text-center text-white font-mono text-sm">{athlete.stats.vertical}"</td>
                      <td className="px-4 py-3 text-center text-gray-400 text-sm">{athlete.gradYear}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => navigate(`/recruiter/athlete/${athlete.id}`)} className="text-gold-primary hover:text-gold-bright transition-colors cursor-pointer" title="View Profile">
                            <Eye size={16} />
                          </button>
                          <button onClick={() => toggleWatchlist(athlete.id)} className={`transition-colors cursor-pointer ${isWatched ? 'text-gold-primary' : 'text-gray-600 hover:text-gold-primary'}`} title={isWatched ? 'Remove from Watchlist' : 'Add to Watchlist'}>
                            {isWatched ? <Star size={16} fill="currentColor" /> : <Star size={16} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid view */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {filtered.map(athlete => {
            const color = getReliabilityColor(athlete.reliabilityScore);
            const isWatched = watchlist.has(athlete.id);

            return (
              <div key={athlete.id} className="bg-black-card border border-gray-800 rounded-lg p-4 md:p-6 hover:border-gold-primary transition-all duration-300 hover:shadow-gold">
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

                <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                  <button
                    onClick={() => navigate(`/recruiter/athlete/${athlete.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gold-primary text-black-pure px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-gold-bright transition-colors cursor-pointer"
                  >
                    <Eye size={14} />
                    View Profile
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
      )}

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

    </PageLayout>
  );
}
