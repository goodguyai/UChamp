import { useState } from 'react';
import { X, Dumbbell, Clock, FileText, Moon, Activity } from 'lucide-react';
import Button from '../ui/Button';

interface WorkoutLogModalProps {
  onClose: () => void;
  onSubmit: (workout: WorkoutFormData) => void;
}

export interface WorkoutFormData {
  type: string;
  duration: number;
  notes: string;
  soreness: number;
  sleep: number;
  metrics: Record<string, string>;
}

const WORKOUT_TYPES = [
  'Speed & Agility',
  'Upper Body Strength',
  'Lower Body Strength',
  'Plyometrics',
  'Position Drills',
  'Conditioning',
  'Route Running',
  'Hands & Catching',
  'Film Study',
  'Recovery / Mobility',
];

export default function WorkoutLogModal({ onClose, onSubmit }: WorkoutLogModalProps) {
  const [type, setType] = useState('');
  const [duration, setDuration] = useState(60);
  const [notes, setNotes] = useState('');
  const [soreness, setSoreness] = useState(3);
  const [sleep, setSleep] = useState(7);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) return;
    onSubmit({ type, duration, notes, soreness, sleep, metrics: {} });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black-pure/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-black-card border border-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-gold-glow">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center">
              <Dumbbell className="text-gold-primary" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">Log the Grind</h2>
              <p className="text-gray-500 text-xs">Every rep builds your legacy</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Workout type */}
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">
              Workout Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {WORKOUT_TYPES.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all cursor-pointer ${
                    type === t
                      ? 'bg-gold-primary/10 border border-gold-primary text-gold-primary'
                      : 'bg-black-elevated border border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-400 text-xs uppercase tracking-wider font-medium flex items-center gap-1.5">
                <Clock size={12} />
                Duration
              </label>
              <span className="text-gold-primary font-mono font-bold text-sm">{duration} min</span>
            </div>
            <input
              type="range"
              min={15}
              max={180}
              step={5}
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              className="w-full accent-gold-primary"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>15 min</span>
              <span>3 hours</span>
            </div>
          </div>

          {/* Sleep */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-400 text-xs uppercase tracking-wider font-medium flex items-center gap-1.5">
                <Moon size={12} />
                Sleep Last Night
              </label>
              <span className="text-gold-primary font-mono font-bold text-sm">{sleep} hrs</span>
            </div>
            <input
              type="range"
              min={3}
              max={12}
              step={0.5}
              value={sleep}
              onChange={e => setSleep(Number(e.target.value))}
              className="w-full accent-gold-primary"
            />
          </div>

          {/* Soreness */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-400 text-xs uppercase tracking-wider font-medium flex items-center gap-1.5">
                <Activity size={12} />
                Soreness Level
              </label>
              <span className="text-gold-primary font-mono font-bold text-sm">{soreness}/10</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={soreness}
              onChange={e => setSoreness(Number(e.target.value))}
              className="w-full accent-gold-primary"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Fresh</span>
              <span>Destroyed</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium flex items-center gap-1.5">
              <FileText size={12} />
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="How did it go? Any PRs? What to work on next?"
              rows={3}
              className="w-full bg-black-elevated border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary focus:shadow-gold transition-all resize-none text-sm"
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={!type}>
              Log Workout
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
