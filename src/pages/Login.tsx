import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Zap } from 'lucide-react';
import GoldShimmerText from '../components/ui/GoldShimmerText';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { DEMO_ACCOUNTS } from '../lib/mockAuth';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = login(email, password);
    if (user) {
      navigate(`/${user.role}`);
    } else {
      setError('Invalid credentials. Try a demo account below.');
    }
  };

  const handleDemo = (demoEmail: string, demoPassword: string) => {
    const user = login(demoEmail, demoPassword);
    if (user) navigate(`/${user.role}`);
  };

  return (
    <div className="min-h-screen bg-black-surface flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Background */}
      <div className="grain absolute inset-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] max-w-full bg-gold-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/">
            <GoldShimmerText as="h1" className="text-4xl md:text-5xl font-black tracking-tight">
              UCHAMP
            </GoldShimmerText>
          </Link>
          <p className="text-gray-500 text-sm uppercase tracking-[0.2em] mt-2">Enter the Arena</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="bg-black-card border border-gray-800 rounded-xl p-5 md:p-8 space-y-5">
          <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-2">Sign In</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

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
              <LogIn size={18} />
              Sign In
            </span>
          </Button>
        </form>

        {/* Demo accounts */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gray-800" />
            <span className="text-gray-500 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={12} className="text-gold-primary" />
              Quick Demo Login
            </span>
            <div className="h-px flex-1 bg-gray-800" />
          </div>

          <div className="space-y-2">
            {DEMO_ACCOUNTS.map(account => (
              <button
                key={account.email}
                onClick={() => handleDemo(account.email, account.password)}
                className="w-full bg-black-card border border-gray-800 rounded-lg px-4 py-3 text-left hover:border-gold-primary/50 hover:bg-gold-primary/5 transition-all cursor-pointer group"
              >
                <p className="text-white text-sm font-medium group-hover:text-gold-primary transition-colors">
                  {account.label}
                </p>
                <p className="text-gray-600 text-xs">{account.email}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p className="text-center text-gray-600 text-xs mt-8 uppercase tracking-wider">
          Pilot Program · Lithonia, GA
        </p>
      </div>
    </div>
  );
}
