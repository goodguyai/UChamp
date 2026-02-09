import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', size = 'md', children, className, ...props }: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      className={cn(
        variant === 'primary' && 'btn-primary',
        variant === 'secondary' && 'btn-secondary',
        variant === 'ghost' && 'bg-transparent text-gold-primary hover:bg-gold-primary/10 font-bold px-4 py-2 rounded-md transition-all duration-200 uppercase tracking-wide text-sm cursor-pointer',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
