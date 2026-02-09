import { useNavigate } from 'react-router-dom';
import { TrendingUp, Shield, Search, Heart } from 'lucide-react';
import GoldShimmerText from '../components/ui/GoldShimmerText';

const roles = [
  {
    title: "I'M AN ATHLETE",
    desc: 'Track your grind. Build your legacy. Get recruited.',
    icon: TrendingUp,
    path: '/athlete',
    accent: 'The Grind',
  },
  {
    title: "I'M A TRAINER",
    desc: 'Build champions. Verify the work. Shape the future.',
    icon: Shield,
    path: '/trainer',
    accent: 'The Architect',
  },
  {
    title: "I'M A RECRUITER",
    desc: 'Find verified talent. Cut through the noise. Win.',
    icon: Search,
    path: '/recruiter',
    accent: 'The Scout',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black-surface relative overflow-hidden">
      {/* Grain texture */}
      <div className="grain absolute inset-0" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold-primary/5 via-transparent to-transparent" />

      {/* Radial glow behind title */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gold-primary/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Logo */}
        <div className="text-center mb-8">
          <GoldShimmerText as="h1" className="text-6xl md:text-8xl font-black tracking-tight">
            UCHAMP
          </GoldShimmerText>
          <p className="text-gray-400 text-lg md:text-xl mt-4 font-medium uppercase tracking-widest">
            The Verified Performance Platform
          </p>
          <p className="text-gray-600 text-sm mt-2 tracking-wider">
            WHERE CHAMPIONS ARE BUILT AND VERIFIED
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-12">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold-primary/50" />
          <div className="w-2 h-2 bg-gold-primary rounded-full" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold-primary/50" />
        </div>

        {/* Tagline */}
        <p className="text-center text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-16">
          Trainers verify. Athletes grind. Recruiters discover.
          <br />
          <span className="text-gold-primary font-semibold">The most trusted athletic performance data on the planet.</span>
        </p>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {roles.map((role) => (
            <button
              key={role.path}
              onClick={() => navigate(role.path)}
              className="group relative overflow-hidden bg-black-card border-2 border-gray-800 rounded-xl p-8 text-left hover:border-gold-primary hover:shadow-gold-strong transition-all duration-300 active:scale-95 cursor-pointer"
            >
              {/* Gold accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gold-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gold-primary/0 group-hover:bg-gold-primary/5 transition-colors duration-300" />

              <div className="relative z-10">
                {/* Role tag */}
                <span className="text-xs text-gold-bronze font-mono uppercase tracking-widest">
                  {role.accent}
                </span>

                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-gold-primary/10 flex items-center justify-center mt-4 mb-6 group-hover:bg-gold-primary/20 transition-colors duration-300">
                  <role.icon className="text-gold-primary" size={32} />
                </div>

                <h2 className="text-2xl font-bold mb-3 text-white">{role.title}</h2>
                <p className="text-gray-400 leading-relaxed">{role.desc}</p>

                {/* CTA */}
                <div className="mt-6 flex items-center gap-2 text-gold-primary font-bold text-sm uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Enter the Arena</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Parent portal link */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate('/parent')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-800 bg-black-card text-gray-400 hover:border-gold-primary/50 hover:text-gold-primary transition-all cursor-pointer"
          >
            <Heart size={16} />
            <span className="text-sm font-medium">Parent Portal</span>
            <span className="text-xs text-gray-600">— Track your child's progress</span>
          </button>
        </div>

        {/* Bottom section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-xs uppercase tracking-[0.3em]">
            Pilot Program — Lithonia, GA
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="w-2 h-2 bg-gold-primary rounded-full animate-pulse" />
            <span className="text-gray-500 text-sm">Live & Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
