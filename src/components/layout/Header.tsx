import { useNavigate } from 'react-router-dom';
import { Bell, Menu, X } from 'lucide-react';
import GoldShimmerText from '../ui/GoldShimmerText';

interface HeaderProps {
  title: string;
  userName: string;
  userPhoto: string;
  notificationCount?: number;
  onMenuToggle?: () => void;
  onNotificationClick?: () => void;
  menuOpen?: boolean;
  actions?: React.ReactNode;
}

export default function Header({
  title,
  userName,
  userPhoto,
  notificationCount = 0,
  onMenuToggle,
  onNotificationClick,
  menuOpen,
  actions,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="border-b border-gray-800 bg-black-card/80 backdrop-blur-md sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden text-gray-400 hover:text-gold-primary transition-colors cursor-pointer"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Mobile logo */}
          <button onClick={() => navigate('/')} className="lg:hidden cursor-pointer">
            <GoldShimmerText as="span" className="text-lg font-black tracking-tight">
              UCHAMP
            </GoldShimmerText>
          </button>

          {/* Page title - desktop only */}
          <h1 className="hidden lg:block text-xl font-bold text-white uppercase tracking-tight">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Action buttons */}
          {actions}

          {/* Notifications */}
          <button onClick={onNotificationClick} className="relative text-gray-400 hover:text-gold-primary transition-colors cursor-pointer">
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-primary text-black-pure text-[10px] font-bold rounded-full flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>

          {/* User avatar - desktop */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-gold-primary/50 overflow-hidden bg-black-elevated">
              <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
            </div>
            <span className="text-gray-300 text-sm font-medium">{userName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
