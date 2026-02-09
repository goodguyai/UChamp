interface GoldShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
}

export default function GoldShimmerText({ children, className = '', as: Tag = 'span' }: GoldShimmerTextProps) {
  return (
    <Tag className={`gold-shimmer ${className}`}>
      {children}
    </Tag>
  );
}
