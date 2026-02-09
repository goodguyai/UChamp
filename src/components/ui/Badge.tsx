import { getReliabilityColor, getReliabilityLabel } from '../../lib/mockData';

interface BadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function Badge({ score, size = 'md' }: BadgeProps) {
  const color = getReliabilityColor(score);
  const label = getReliabilityLabel(score);

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full font-mono font-bold ${sizeClasses[size]}`}
      style={{
        backgroundColor: `${color}20`,
        color: color,
        border: `2px solid ${color}`,
        boxShadow: `0 0 15px ${color}30`,
      }}
    >
      <span className={size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-lg' : 'text-sm'}>
        {score}
      </span>
      <span className="text-xs opacity-70 uppercase tracking-wider">{label}</span>
    </div>
  );
}
