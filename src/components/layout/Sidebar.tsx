import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Dumbbell,
  TrendingUp,
  Bot,
  Film,
  Target,
  Settings,
  Users,
  CheckCircle2,
  Trophy,
  Search,
  Star,
  Bell,
  FileText,
  LogOut,
} from 'lucide-react';
import GoldShimmerText from '../ui/GoldShimmerText';

type Role = 'athlete' | 'trainer' | 'recruiter';

interface SidebarProps {
  role: Role;
  userName: string;
  userPhoto: string;
}

const NAV_ITEMS: Record<Role, { label: string; path: string; icon: typeof LayoutDashboard }[]> = {
  athlete: [
    { label: 'Dashboard', path: '/athlete', icon: LayoutDashboard },
    { label: 'Workouts', path: '/athlete/workouts', icon: Dumbbell },
    { label: 'Film Room', path: '/athlete/film-room', icon: Film },
    { label: 'Combine Prep', path: '/athlete/combine-prep', icon: Target },
    { label: 'Progress', path: '/athlete/progress', icon: TrendingUp },
    { label: 'AI Coach', path: '/athlete/ai-coach', icon: Bot },
    { label: 'Settings', path: '/athlete/settings', icon: Settings },
  ],
  trainer: [
    { label: 'Dashboard', path: '/trainer', icon: LayoutDashboard },
    { label: 'Athletes', path: '/trainer/athletes', icon: Users },
    { label: 'Verification', path: '/trainer/verification', icon: CheckCircle2 },
    { label: 'Portfolio', path: '/trainer/portfolio', icon: Trophy },
    { label: 'Settings', path: '/trainer/settings', icon: Settings },
  ],
  recruiter: [
    { label: 'Dashboard', path: '/recruiter', icon: LayoutDashboard },
    { label: 'Search', path: '/recruiter/search', icon: Search },
    { label: 'Watchlist', path: '/recruiter/watchlist', icon: Star },
    { label: 'Alerts', path: '/recruiter/alerts', icon: Bell },
    { label: 'Reports', path: '/recruiter/reports', icon: FileText },
    { label: 'Settings', path: '/recruiter/settings', icon: Settings },
  ],
};

const ROLE_LABELS: Record<Role, string> = {
  athlete: 'The Grind',
  trainer: 'The Architect',
  recruiter: 'The Scout',
};

export default function Sidebar({ role, userName, userPhoto }: SidebarProps) {
  const navigate = useNavigate();
  const items = NAV_ITEMS[role];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-black-card border-r border-gray-800 h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <button onClick={() => navigate('/')} className="cursor-pointer">
          <GoldShimmerText as="h1" className="text-2xl font-black tracking-tight">
            UCHAMP
          </GoldShimmerText>
        </button>
        <p className="text-gray-600 text-xs uppercase tracking-[0.2em] mt-1">{ROLE_LABELS[role]}</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === `/${role}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gold-primary/10 text-gold-primary border border-gold-primary/30'
                  : 'text-gray-400 hover:text-white hover:bg-black-elevated'
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 rounded-full border border-gold-primary/50 overflow-hidden bg-black-elevated shrink-0">
            <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{userName}</p>
            <p className="text-gray-500 text-xs capitalize">{role}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gold-primary transition-colors cursor-pointer"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
