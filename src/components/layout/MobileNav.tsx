import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Dumbbell,
  TrendingUp,
  Bot,
  Users,
  CheckCircle2,
  Search,
  Star,
  Bell,
} from 'lucide-react';

type Role = 'athlete' | 'trainer' | 'recruiter';

interface MobileNavProps {
  role: Role;
}

const MOBILE_NAV: Record<Role, { label: string; path: string; icon: typeof LayoutDashboard }[]> = {
  athlete: [
    { label: 'Home', path: '/athlete', icon: LayoutDashboard },
    { label: 'Workouts', path: '/athlete/workouts', icon: Dumbbell },
    { label: 'Progress', path: '/athlete/progress', icon: TrendingUp },
    { label: 'AI Coach', path: '/athlete/ai-coach', icon: Bot },
  ],
  trainer: [
    { label: 'Home', path: '/trainer', icon: LayoutDashboard },
    { label: 'Athletes', path: '/trainer/athletes', icon: Users },
    { label: 'Verify', path: '/trainer/verification', icon: CheckCircle2 },
  ],
  recruiter: [
    { label: 'Home', path: '/recruiter', icon: LayoutDashboard },
    { label: 'Search', path: '/recruiter/search', icon: Search },
    { label: 'Watchlist', path: '/recruiter/watchlist', icon: Star },
    { label: 'Alerts', path: '/recruiter/alerts', icon: Bell },
  ],
};

export default function MobileNav({ role }: MobileNavProps) {
  const items = MOBILE_NAV[role];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black-card border-t border-gray-800 backdrop-blur-md">
      <div className="flex items-center justify-around py-2 px-2">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === `/${role}`}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? 'text-gold-primary'
                  : 'text-gray-500 hover:text-gray-300'
              }`
            }
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
