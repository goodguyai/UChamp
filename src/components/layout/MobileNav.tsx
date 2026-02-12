import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Dumbbell,
  TrendingUp,
  Film,
  Users,
  CheckCircle2,
  Search,
  Star,
  Bell,
  MessageSquare,
} from 'lucide-react';

type Role = 'athlete' | 'trainer' | 'recruiter';

interface MobileNavProps {
  role: Role;
}

const MOBILE_NAV: Record<Role, { label: string; path: string; icon: typeof LayoutDashboard }[]> = {
  athlete: [
    { label: 'Home', path: '/athlete', icon: LayoutDashboard },
    { label: 'Workouts', path: '/athlete/workouts', icon: Dumbbell },
    { label: 'Film', path: '/athlete/film-room', icon: Film },
    { label: 'Progress', path: '/athlete/progress', icon: TrendingUp },
    { label: 'Messages', path: '/athlete/messages', icon: MessageSquare },
  ],
  trainer: [
    { label: 'Home', path: '/trainer', icon: LayoutDashboard },
    { label: 'Athletes', path: '/trainer/athletes', icon: Users },
    { label: 'Verify', path: '/trainer/verification', icon: CheckCircle2 },
    { label: 'Messages', path: '/trainer/messages', icon: MessageSquare },
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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black-card/95 border-t border-gray-800 backdrop-blur-md" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex items-center justify-around py-1.5 px-1">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === `/${role}`}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] px-2 py-1.5 rounded-lg transition-all ${
                isActive
                  ? 'text-gold-primary'
                  : 'text-gray-500 active:text-gray-300'
              }`
            }
          >
            <item.icon size={20} />
            <span className="text-[9px] font-medium uppercase tracking-wider leading-none">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
