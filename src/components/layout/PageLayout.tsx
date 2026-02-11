import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';
import NotificationCenter from '../shared/NotificationCenter';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Dumbbell, TrendingUp, Bot, Film, Target, Settings, Users,
  CheckCircle2, Trophy, Search, Star, Bell, FileText, LogOut, X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GoldShimmerText from '../ui/GoldShimmerText';

type Role = 'athlete' | 'trainer' | 'recruiter';

interface PageLayoutProps {
  role: Role;
  title: string;
  userName: string;
  userPhoto: string;
  notificationCount?: number;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}

const MOBILE_MENU_ITEMS: Record<Role, { label: string; path: string; icon: typeof LayoutDashboard }[]> = {
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

export default function PageLayout({
  role,
  title,
  userName,
  userPhoto,
  notificationCount = 2,
  headerActions,
  children,
}: PageLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black-surface flex overflow-x-hidden">
      {/* Desktop sidebar */}
      <Sidebar role={role} userName={userName} userPhoto={userPhoto} />

      {/* Mobile slide-out menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black-pure/70 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-black-card border-r border-gray-800 flex flex-col">
            {/* Menu header */}
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <GoldShimmerText as="span" className="text-xl font-black tracking-tight">
                UCHAMP
              </GoldShimmerText>
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Menu items */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {MOBILE_MENU_ITEMS[role].map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === `/${role}`}
                  onClick={() => setMobileMenuOpen(false)}
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

            {/* User & logout */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center gap-3 px-3 py-2 mb-2">
                <div className="w-9 h-9 rounded-full border border-gold-primary/50 overflow-hidden bg-black-elevated shrink-0">
                  <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{userName}</p>
                  <p className="text-gray-500 text-xs capitalize">{role}</p>
                </div>
              </div>
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/'); }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-500 hover:text-white hover:bg-black-elevated w-full transition-all cursor-pointer"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          title={title}
          userName={userName}
          userPhoto={userPhoto}
          notificationCount={notificationCount}
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          onNotificationClick={() => setNotificationsOpen(true)}
          menuOpen={mobileMenuOpen}
          actions={headerActions}
        />

        {/* Page content */}
        <main className="flex-1 px-4 py-4 md:px-6 md:py-6 pb-24 lg:pb-6 overflow-y-auto overflow-x-hidden">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav role={role} />

      {/* Notification center */}
      {notificationsOpen && (
        <NotificationCenter onClose={() => setNotificationsOpen(false)} />
      )}
    </div>
  );
}
