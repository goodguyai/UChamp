import { CheckCircle2, Circle, Clock, Flame } from 'lucide-react';
import type { Athlete } from '../../lib/mockData';
import { daysAgo, formatDuration } from '../../lib/utils';

interface WorkoutListProps {
  athlete: Athlete;
}

export default function WorkoutList({ athlete }: WorkoutListProps) {
  return (
    <div>
      <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 md:mb-4">
        Recent Grind
      </h3>

      <div className="space-y-2 md:space-y-3">
        {athlete.recentWorkouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-black-elevated border border-gray-800 rounded-lg p-3 md:p-4 flex items-center gap-3 md:gap-4 hover:border-gold-primary/50 transition-all duration-200"
          >
            {/* Verification status */}
            {workout.verified ? (
              <CheckCircle2 className="text-gold-primary shrink-0" size={18} />
            ) : (
              <Circle className="text-gray-600 shrink-0" size={18} />
            )}

            {/* Workout info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-white text-sm md:text-base font-semibold truncate">{workout.type}</p>
                {workout.verified && (
                  <span className="text-[10px] bg-gold-primary/20 text-gold-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-xs md:text-sm">{daysAgo(workout.date)}</p>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-1 text-gray-400 shrink-0">
              <Clock size={12} />
              <span className="text-xs md:text-sm font-mono">{formatDuration(workout.duration)}</span>
            </div>

            {/* Intensity indicator */}
            <Flame
              size={14}
              className={workout.duration >= 75 ? 'text-gold-bright' : workout.duration >= 60 ? 'text-gold-primary' : 'text-gray-600'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
