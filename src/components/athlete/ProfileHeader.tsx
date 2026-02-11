import { MapPin, GraduationCap, Ruler, Weight } from 'lucide-react';
import type { Athlete } from '../../lib/mockData';
import Badge from '../ui/Badge';

interface ProfileHeaderProps {
  athlete: Athlete;
}

export default function ProfileHeader({ athlete }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gold-primary overflow-hidden bg-black-elevated shadow-gold">
          <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-full object-cover" />
        </div>
        {athlete.verified && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gold-primary rounded-full flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-black-pure" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight truncate">
            {athlete.name}
          </h1>
          <Badge score={athlete.reliabilityScore} size="sm" />
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-400 text-xs md:text-sm">
          <span className="inline-flex items-center gap-1.5 bg-gold-primary/10 text-gold-primary px-3 py-1 rounded-full font-bold text-xs">
            {athlete.position}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} />
            {athlete.school}
          </span>
          <span className="inline-flex items-center gap-1">
            <GraduationCap size={14} />
            Class of {athlete.gradYear}
          </span>
          <span className="inline-flex items-center gap-1">
            <Ruler size={14} />
            {athlete.height}
          </span>
          <span className="inline-flex items-center gap-1">
            <Weight size={14} />
            {athlete.weight} lbs
          </span>
        </div>
      </div>
    </div>
  );
}
