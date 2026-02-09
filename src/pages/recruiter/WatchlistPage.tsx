import { useState } from 'react';
import { Star, Eye, Trash2, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { ATHLETES, RECRUITERS, getReliabilityColor, getReliabilityLabel } from '../../lib/mockData';
import { WATCHLIST_NOTES } from '../../lib/recruiterData';
import type { Athlete } from '../../lib/mockData';
import PageLayout from '../../components/layout/PageLayout';
import Badge from '../../components/ui/Badge';
import AthleteModal from '../../components/recruiter/AthleteModal';

export default function WatchlistPage() {
  const recruiter = RECRUITERS[0];
  const [watchlistIds, setWatchlistIds] = useState<Set<string>>(new Set(['ath-1', 'ath-4']));
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>(
    Object.fromEntries(WATCHLIST_NOTES.map(n => [n.athleteId, n.note]))
  );
  const [editingNote, setEditingNote] = useState<string | null>(null);

  const watchedAthletes = ATHLETES.filter(a => watchlistIds.has(a.id));

  const removeFromWatchlist = (id: string) => {
    setWatchlistIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const updateNote = (athleteId: string, note: string) => {
    setNotes(prev => ({ ...prev, [athleteId]: note }));
    setEditingNote(null);
  };

  return (
    <PageLayout
      role="recruiter"
      title="Watchlist"
      userName={recruiter.name}
      userPhoto={recruiter.photoUrl}
      notificationCount={2}
    >
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Star size={24} className="text-gold-primary" fill="currentColor" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            My Watchlist
          </h2>
        </div>
        <p className="text-gray-500 text-sm">
          {watchedAthletes.length} athlete{watchedAthletes.length !== 1 ? 's' : ''} being tracked
        </p>
      </div>

      {watchedAthletes.length === 0 ? (
        <div className="text-center py-20 bg-black-card border border-gray-800 rounded-xl">
          <Star size={48} className="text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Your watchlist is empty</p>
          <p className="text-gray-600 text-sm mt-2">Search for athletes and add them to track their progress.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {watchedAthletes.map(athlete => {
            const color = getReliabilityColor(athlete.reliabilityScore);
            const note = notes[athlete.id] || '';
            const isEditing = editingNote === athlete.id;
            const verifiedCount = athlete.recentWorkouts.filter(w => w.verified).length;
            const totalWorkouts = athlete.recentWorkouts.length;

            return (
              <div key={athlete.id} className="bg-black-card border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all">
                {/* Top section */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full border-2 overflow-hidden bg-black-elevated" style={{ borderColor: color }}>
                        <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{athlete.name}</h3>
                        <p className="text-gray-500 text-sm">{athlete.position} · {athlete.school} · Class of {athlete.gradYear}</p>
                        <p className="text-gold-primary text-xs font-mono mt-0.5">{getReliabilityLabel(athlete.reliabilityScore)}</p>
                      </div>
                    </div>
                    <Badge score={athlete.reliabilityScore} size="md" />
                  </div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-5 gap-3 mb-4">
                    <div className="bg-black-elevated rounded-lg p-3 text-center">
                      <p className="text-gray-600 text-[10px] uppercase tracking-wider">40-Yard</p>
                      <p className="text-white font-mono font-bold text-sm">{athlete.stats.fortyYardDash}s</p>
                    </div>
                    <div className="bg-black-elevated rounded-lg p-3 text-center">
                      <p className="text-gray-600 text-[10px] uppercase tracking-wider">Bench</p>
                      <p className="text-white font-mono font-bold text-sm">{athlete.stats.bench}</p>
                    </div>
                    <div className="bg-black-elevated rounded-lg p-3 text-center">
                      <p className="text-gray-600 text-[10px] uppercase tracking-wider">Vertical</p>
                      <p className="text-white font-mono font-bold text-sm">{athlete.stats.vertical}"</p>
                    </div>
                    <div className="bg-black-elevated rounded-lg p-3 text-center">
                      <p className="text-gray-600 text-[10px] uppercase tracking-wider">Verified</p>
                      <p className="text-gold-primary font-mono font-bold text-sm">{verifiedCount}/{totalWorkouts}</p>
                    </div>
                    <div className="bg-black-elevated rounded-lg p-3 text-center">
                      <p className="text-gray-600 text-[10px] uppercase tracking-wider">Height</p>
                      <p className="text-white font-mono font-bold text-sm">{athlete.height}</p>
                    </div>
                  </div>

                  {/* Recent activity */}
                  <div className="flex items-center gap-4 text-xs mb-4">
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <TrendingUp size={12} />
                      {totalWorkouts} workouts this month
                    </span>
                    {athlete.recentWorkouts.some(w => !w.verified) && (
                      <span className="flex items-center gap-1.5 text-gold-bronze">
                        <AlertCircle size={12} />
                        {totalWorkouts - verifiedCount} pending verification
                      </span>
                    )}
                  </div>

                  {/* Scout notes */}
                  <div className="bg-black-elevated border border-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <FileText size={12} />
                        Scout Notes
                      </span>
                      {!isEditing && (
                        <button
                          onClick={() => setEditingNote(athlete.id)}
                          className="text-gold-primary text-xs hover:underline cursor-pointer"
                        >
                          {note ? 'Edit' : 'Add Note'}
                        </button>
                      )}
                    </div>
                    {isEditing ? (
                      <div>
                        <textarea
                          defaultValue={note}
                          rows={3}
                          className="w-full bg-black-card border border-gray-700 rounded-md px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-primary resize-none"
                          placeholder="Add scouting notes..."
                          autoFocus
                          onBlur={e => updateNote(athlete.id, e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              updateNote(athlete.id, (e.target as HTMLTextAreaElement).value);
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {note || 'No notes yet. Click "Add Note" to start tracking observations.'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action bar */}
                <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-800 bg-black-elevated/30">
                  <button
                    onClick={() => setSelectedAthlete(athlete)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gold-primary text-black-pure px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-gold-bright transition-colors cursor-pointer"
                  >
                    <Eye size={14} />
                    Full Profile
                  </button>
                  <button
                    onClick={() => removeFromWatchlist(athlete.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider bg-black-elevated text-gray-500 border border-gray-700 hover:border-red-500/50 hover:text-red-400 transition-all cursor-pointer"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
          Track the talent. Trust the data.
        </p>
      </div>

      {selectedAthlete && (
        <AthleteModal
          athlete={selectedAthlete}
          onClose={() => setSelectedAthlete(null)}
          onWatchlist={watchlistIds.has(selectedAthlete.id)}
          onToggleWatchlist={() => {
            const id = selectedAthlete.id;
            setWatchlistIds(prev => {
              const next = new Set(prev);
              if (next.has(id)) next.delete(id);
              else next.add(id);
              return next;
            });
          }}
        />
      )}
    </PageLayout>
  );
}
