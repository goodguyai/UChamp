import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, TrendingUp, Shield, Search } from 'lucide-react';
import GoldShimmerText from '../components/ui/GoldShimmerText';
import Button from '../components/ui/Button';
import { storeUser, type AuthUser } from '../lib/mockAuth';

type Role = 'athlete' | 'trainer' | 'recruiter';

const ROLE_OPTIONS: { role: Role; label: string; desc: string; icon: typeof TrendingUp }[] = [
  { role: 'athlete', label: 'Athlete', desc: 'Track workouts, build your profile, get recruited', icon: TrendingUp },
  { role: 'trainer', label: 'Trainer', desc: 'Verify athletes, build your coaching portfolio', icon: Shield },
  { role: 'recruiter', label: 'Recruiter', desc: 'Discover verified talent, build your class', icon: Search },
];

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    if (!selectedRole) {
      setError('Please select a role.');
      return;
    }

    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      email: email.trim(),
      name: name.trim(),
      role: selectedRole,
      photoUrl: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#1a1a1a" width="100" height="100"/><text x="50" y="55" font-size="36" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="bold">${name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)}</text></svg>`)}`,
    };

    storeUser(newUser);
    navigate(`/${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-black-surface flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <div className="grain absolute inset-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] max-w-full bg-gold-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/">
            <GoldShimmerText as="h1" className="text-4xl md:text-5xl font-black tracking-tight">
              UCHAMP
            </GoldShimmerText>
          </Link>
          <p className="text-gray-500 text-sm uppercase tracking-[0.2em] mt-2">Join the Arena</p>
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <div className="bg-black-card border border-gray-800 rounded-xl p-5 md:p-8">
              <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">I am a...</h2>
              <div className="space-y-3">
                {ROLE_OPTIONS.map(opt => (
                  <button
                    key={opt.role}
                    onClick={() => { setSelectedRole(opt.role); setStep(2); }}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer text-left ${
                      selectedRole === opt.role
                        ? 'border-gold-primary bg-gold-primary/10'
                        : 'border-gray-800 bg-black-elevated hover:border-gold-primary/50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gold-primary/10 flex items-center justify-center shrink-0">
                      <opt.icon size={20} className="text-gold-primary" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm uppercase tracking-wide">{opt.label}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-gold-primary font-medium hover:underline">Sign in</Link>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-black-card border border-gray-800 rounded-xl p-5 md:p-8 space-y-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-white uppercase tracking-wide">Create Account</h2>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-gold-primary text-xs font-medium hover:underline cursor-pointer"
              >
                Change Role
              </button>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-gold-primary/10 border border-gold-primary/30 rounded-lg">
              <span className="text-gold-primary text-xs font-bold uppercase tracking-wider capitalize">{selectedRole}</span>
              <span className="text-gray-500 text-xs">account</span>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-black-elevated border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary focus:shadow-gold transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-black-elevated border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary focus:shadow-gold transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black-elevated border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary focus:shadow-gold transition-all"
              />
            </div>

            <Button type="submit" className="w-full">
              <span className="flex items-center justify-center gap-2">
                <UserPlus size={18} />
                Create Account
              </span>
            </Button>

            <p className="text-center text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-gold-primary font-medium hover:underline">Sign in</Link>
            </p>
          </form>
        )}

        <p className="text-center text-gray-600 text-xs mt-8 uppercase tracking-wider">
          Pilot Program · Lithonia, GA
        </p>
      </div>
    </div>
  );
}
