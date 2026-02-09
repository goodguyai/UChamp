import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full bg-black-elevated border border-gray-700 rounded-md px-4 py-3',
          'text-white placeholder-gray-500',
          'focus:outline-none focus:border-gold-primary focus:shadow-gold',
          'transition-all duration-200',
          className
        )}
        {...props}
      />
    </div>
  );
}
