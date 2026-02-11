import { useState } from 'react';
import { X, Bell, Eye, Trophy, TrendingUp, AlertTriangle, MessageSquare, Film, Target } from 'lucide-react';

interface Notification {
  id: string;
  type: 'scout_alert' | 'verification' | 'plateau' | 'achievement' | 'message' | 'video' | 'combine';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationCenterProps {
  onClose: () => void;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'scout_alert',
    title: 'Scout Alert: Profile Viewed',
    message: 'A recruiter from Georgia Tech viewed your profile.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'video',
    title: 'Film Analysis Complete',
    message: 'Your Speed & Agility video scored 87/100. View the full breakdown in Film Room.',
    time: '3 hours ago',
    read: false,
  },
  {
    id: '2a',
    type: 'combine',
    title: 'Combine in 34 Days',
    message: 'Georgia Elite Combine is approaching. Your benchmark readiness is at 78%. Keep grinding.',
    time: '4 hours ago',
    read: false,
  },
  {
    id: '2b',
    type: 'achievement',
    title: 'Personal Record!',
    message: 'New PR on 40-yard dash: 4.65s',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'verification',
    title: 'Workout Verified',
    message: 'Coach Davis verified your Speed & Agility session.',
    time: '1 day ago',
    read: true,
  },
  {
    id: '4',
    type: 'plateau',
    title: 'Plateau Detected',
    message: 'Bench press plateaued at 225lbs for 3 weeks. AI Coach has suggestions.',
    time: '2 days ago',
    read: true,
  },
  {
    id: '5',
    type: 'message',
    title: 'New Message',
    message: 'Coach Davis sent you a message about next week\'s schedule.',
    time: '3 days ago',
    read: true,
  },
];

const TYPE_ICONS = {
  scout_alert: Eye,
  verification: Trophy,
  plateau: AlertTriangle,
  achievement: TrendingUp,
  message: MessageSquare,
  video: Film,
  combine: Target,
};

const TYPE_COLORS = {
  scout_alert: 'text-gold-bright bg-gold-bright/10',
  verification: 'text-gold-primary bg-gold-primary/10',
  plateau: 'text-gold-bronze bg-gold-bronze/10',
  achievement: 'text-gold-bright bg-gold-bright/10',
  message: 'text-gray-400 bg-gray-700/30',
  video: 'text-gold-primary bg-gold-primary/10',
  combine: 'text-gold-bronze bg-gold-bronze/10',
};

export default function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-20 lg:pt-4">
      <div className="absolute inset-0 bg-black-pure/50" onClick={onClose} />

      <div className="relative bg-black-card border border-gray-800 rounded-xl w-full max-w-sm shadow-gold-glow overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-gold-primary" />
            <h3 className="text-white font-bold text-sm uppercase tracking-wide">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-gold-primary text-black-pure text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-gold-primary text-xs font-medium hover:underline cursor-pointer">
                Mark all read
              </button>
            )}
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors cursor-pointer">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.map(notif => {
            const Icon = TYPE_ICONS[notif.type];
            const colorClass = TYPE_COLORS[notif.type];

            return (
              <div
                key={notif.id}
                className={`flex items-start gap-3 p-4 border-b border-gray-800/50 hover:bg-black-elevated/50 transition-colors cursor-pointer ${
                  !notif.read ? 'bg-gold-primary/[0.02]' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}>
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-medium ${!notif.read ? 'text-white' : 'text-gray-400'}`}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-gold-primary rounded-full shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{notif.message}</p>
                  <p className="text-gray-600 text-[10px] mt-1 uppercase tracking-wider">{notif.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-800 text-center">
          <button className="text-gold-primary text-xs font-medium hover:underline cursor-pointer">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
}
