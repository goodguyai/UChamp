import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { Athlete } from '../../lib/mockData';
import { getReliabilityColor } from '../../lib/mockData';
import Badge from '../ui/Badge';

interface AthleteCardProps {
  athlete: Athlete;
  onVerify?: () => void;
}

export default function AthleteCard({ athlete, onVerify }: AthleteCardProps) {
  const color = getReliabilityColor(athlete.reliabilityScore);
  const pendingCount = athlete.recentWorkouts.filter(w => !w.verified).length;

  return (
    <div className="bg-black-card border border-gray-800 rounded-lg p-6 hover:border-gold-primary transition-all duration-300 hover:shadow-gold">
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 overflow-hidden bg-black-elevated" style={{ borderColor: color }}>
            <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-white font-bold">{athlete.name}</h3>
            <p className="text-gray-500 text-sm">{athlete.position} · Class of {athlete.gradYear}</p>
          </div>
        </div>
        <Badge score={athlete.reliabilityScore} size="sm" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <p className="text-gray-500 text-xs uppercase tracking-wider">40-Yard</p>
          <p className="text-white font-mono font-bold">{athlete.stats.fortyYardDash}s</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-xs uppercase tracking-wider">Bench</p>
          <p className="text-white font-mono font-bold">{athlete.stats.bench} lbs</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-xs uppercase tracking-wider">Vertical</p>
          <p className="text-white font-mono font-bold">{athlete.stats.vertical}"</p>
        </div>
      </div>

      {/* Pending verifications */}
      {pendingCount > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-gold-bronze">
            <AlertCircle size={16} />
            <span className="text-sm font-medium">{pendingCount} pending verification{pendingCount > 1 ? 's' : ''}</span>
          </div>
          <button
            onClick={onVerify}
            className="flex items-center gap-1.5 bg-gold-primary text-black-pure px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-gold-bright transition-colors cursor-pointer"
          >
            <CheckCircle2 size={14} />
            Verify
          </button>
        </div>
      )}

      {pendingCount === 0 && (
        <div className="flex items-center gap-2 pt-4 border-t border-gray-800 text-gray-600">
          <CheckCircle2 size={16} className="text-gold-primary" />
          <span className="text-sm">All verified</span>
        </div>
      )}
    </div>
  );
}
