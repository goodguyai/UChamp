import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import GoldShimmerText from '../components/ui/GoldShimmerText';
import Button from '../components/ui/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black-surface flex items-center justify-center p-6 relative overflow-hidden">
      <div className="grain absolute inset-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-md">
        <GoldShimmerText as="h1" className="text-8xl font-black tracking-tight mb-4">
          404
        </GoldShimmerText>

        <h2 className="text-white text-2xl font-bold uppercase tracking-tight mb-2">
          Off the Field
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          This page doesn't exist. Even champions take a wrong turn sometimes.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <span className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Go Back
            </span>
          </Button>
          <Button onClick={() => navigate('/')}>
            <span className="flex items-center gap-2">
              <Home size={16} />
              Home
            </span>
          </Button>
        </div>

        <p className="text-gray-700 text-xs uppercase tracking-[0.3em] mt-12">
          The grind never stops.
        </p>
      </div>
    </div>
  );
}
