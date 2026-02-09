import { X, MapPin, GraduationCap, Ruler, Weight } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { Athlete } from '../../lib/mockData';
import { getReliabilityColor, STAT_LABELS, STAT_UNITS, getTrainerById } from '../../lib/mockData';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface AthleteModalProps {
  athlete: Athlete;
  onClose: () => void;
  onWatchlist: boolean;
  onToggleWatchlist: () => void;
}

export default function AthleteModal({ athlete, onClose, onWatchlist, onToggleWatchlist }: AthleteModalProps) {
  const trainer = getTrainerById(athlete.trainerId);
  const color = getReliabilityColor(athlete.reliabilityScore);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black-pure/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-black-card border border-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-gold-glow">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10 cursor-pointer"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="p-8 pb-6 border-b border-gray-800">
          <div className="flex items-start gap-6">
            <div
              className="w-20 h-20 rounded-full border-2 overflow-hidden bg-black-elevated shrink-0"
              style={{ borderColor: color }}
            >
              <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">{athlete.name}</h2>
                <Badge score={athlete.reliabilityScore} size="sm" />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-gray-400 text-sm">
                <span className="bg-gold-primary/10 text-gold-primary px-2 py-0.5 rounded-full font-bold text-xs">
                  {athlete.position}
                </span>
                <span className="flex items-center gap-1"><MapPin size={12} />{athlete.school}</span>
                <span className="flex items-center gap-1"><GraduationCap size={12} />Class of {athlete.gradYear}</span>
                <span className="flex items-center gap-1"><Ruler size={12} />{athlete.height}</span>
                <span className="flex items-center gap-1"><Weight size={12} />{athlete.weight} lbs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reliability breakdown */}
        <div className="p-8 pb-6 border-b border-gray-800">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
            Reliability Breakdown
          </h3>
          <div className="grid grid-cols-3 gap-6">
            {Object.entries(athlete.reliabilityBreakdown).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400 capitalize">{key}</span>
                  <span className="text-gold-primary font-bold font-mono">{value}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-primary to-gold-bright rounded-full"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="p-8 pb-6 border-b border-gray-800">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
            Performance Stats
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(athlete.stats).map(([key, value]) => (
              <div key={key} className="bg-black-elevated rounded-lg p-3">
                <p className="text-gray-500 text-xs uppercase tracking-wider">{STAT_LABELS[key] || key}</p>
                <p className="text-white font-mono text-xl font-bold">
                  {value}<span className="text-gray-500 text-sm ml-1">{STAT_UNITS[key]}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trend */}
        <div className="p-8 pb-6 border-b border-gray-800">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
            40-Yard Dash Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={athlete.trendData.fortyYardDash}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" opacity={0.5} />
              <XAxis dataKey="date" stroke="#737373" style={{ fontSize: '12px', fontFamily: 'monospace' }} />
              <YAxis stroke="#737373" style={{ fontSize: '12px', fontFamily: 'monospace' }} reversed domain={['dataMax + 0.1', 'dataMin - 0.1']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#121212', border: '1px solid #D4AF37', borderRadius: '8px' }}
                labelStyle={{ color: '#A3A3A3' }}
                itemStyle={{ color: '#FFD700' }}
              />
              <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2} dot={{ fill: '#FFD700', r: 4, stroke: '#0A0A0A', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div className="p-8 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Trainer</p>
            <p className="text-white text-sm font-medium">{trainer?.name || 'Unknown'}</p>
            {trainer?.email && <p className="text-gray-500 text-xs">{trainer.email}</p>}
          </div>
          <div className="flex gap-3">
            <Button
              variant={onWatchlist ? 'ghost' : 'secondary'}
              size="sm"
              onClick={onToggleWatchlist}
            >
              {onWatchlist ? 'On Watchlist' : 'Add to Watchlist'}
            </Button>
            <Button size="sm">Contact Trainer</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
