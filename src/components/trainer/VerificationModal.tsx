import { useState } from 'react';
import { X, CheckCircle2, XCircle, Clock, FileText, Video, Sparkles } from 'lucide-react';
import type { Athlete } from '../../lib/mockData';
import Button from '../ui/Button';

interface PendingWorkout {
  id: string;
  date: string;
  type: string;
  duration: number;
}

interface VerificationModalProps {
  athlete: Athlete;
  workout: PendingWorkout;
  onClose: () => void;
  onVerify: (approved: boolean, notes: string) => void;
}

export default function VerificationModal({ athlete, workout, onClose, onVerify }: VerificationModalProps) {
  const [notes, setNotes] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black-pure/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-black-card border border-gray-800 rounded-2xl max-w-lg w-full shadow-gold-glow">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center">
              <CheckCircle2 className="text-gold-primary" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">Verify the Rep</h2>
              <p className="text-gray-500 text-xs">Confirm this workout happened</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Athlete info */}
          <div className="flex items-center gap-4 p-4 bg-black-elevated rounded-lg border border-gray-800">
            <div className="w-12 h-12 rounded-full border border-gold-primary/50 overflow-hidden bg-black-card">
              <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-white font-bold">{athlete.name}</p>
              <p className="text-gray-500 text-sm">{athlete.position} · {athlete.school}</p>
            </div>
          </div>

          {/* Workout details */}
          <div className="bg-black-elevated rounded-lg p-4 border border-gray-800 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Workout Details</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Type</p>
                <p className="text-white text-sm font-medium">{workout.type}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Date</p>
                <p className="text-white text-sm font-mono">{workout.date}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-gray-500" />
                <p className="text-white text-sm font-mono">{workout.duration} min</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Video size={12} className={workout.id === 'w1' || workout.id === 'w4' ? 'text-gold-primary' : 'text-gray-500'} />
                {workout.id === 'w1' || workout.id === 'w4' ? (
                  <p className="text-gold-primary text-sm font-medium">Video attached</p>
                ) : (
                  <p className="text-gray-500 text-sm">No video</p>
                )}
              </div>
            </div>
          </div>

          {/* AI Analysis badge (when video is present) */}
          {(workout.id === 'w1' || workout.id === 'w4') && (
            <div className="bg-gold-primary/[0.05] border border-gold-primary/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles size={14} className="text-gold-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-gold-primary text-xs font-bold uppercase tracking-wider">AI Form Analysis</p>
                    <span className="text-gold-primary/60 font-mono text-xs">Score: 87/100</span>
                  </div>
                  <p className="text-gray-500 text-[10px]">Strong acceleration, good hip drive. Minor heel braking detected on deceleration phase.</p>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium flex items-center gap-1.5">
              <FileText size={12} />
              Coach Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Feedback for the athlete..."
              rows={3}
              className="w-full bg-black-elevated border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary focus:shadow-gold transition-all resize-none text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => onVerify(false, notes)}
              className="flex-1 !border-red-500/50 !text-red-400 hover:!bg-red-500/10"
            >
              <span className="flex items-center justify-center gap-2">
                <XCircle size={16} />
                Flag Issue
              </span>
            </Button>
            <Button
              onClick={() => onVerify(true, notes)}
              className="flex-1"
            >
              <span className="flex items-center justify-center gap-2">
                <CheckCircle2 size={16} />
                Verify
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
