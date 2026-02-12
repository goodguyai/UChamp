import { useState, useEffect, useCallback } from 'react';
import { Settings, User, Bell, Shield, Palette, LogOut, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import Button from '../../components/ui/Button';
import { getSettings, saveSettings, type UserSettings } from '../../lib/storage';

type Role = 'athlete' | 'trainer' | 'recruiter';

interface SettingsPageProps {
  role: Role;
  userName: string;
  userPhoto: string;
  userEmail?: string;
}

export default function SettingsPage({ role, userName, userPhoto, userEmail = 'user@uchamp.com' }: SettingsPageProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'appearance'>('profile');
  const [saved, setSaved] = useState(false);

  // Load from localStorage
  const stored = getSettings(role);
  const [settings, setSettings] = useState<UserSettings>({
    ...stored,
    name: stored.name || userName,
    email: stored.email || userEmail,
  });

  const handleSave = useCallback(() => {
    saveSettings(role, settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [role, settings]);

  // Auto-save on notification/privacy toggle
  useEffect(() => {
    const timer = setTimeout(() => saveSettings(role, settings), 500);
    return () => clearTimeout(timer);
  }, [settings.notifications, settings.privacy, settings.theme, settings.accentColor, role, settings]);

  const NOTIFICATION_DEFS = [
    { id: 'email_alerts', label: 'Email Alerts', description: 'Receive important updates via email', roles: ['athlete', 'trainer', 'recruiter'] },
    { id: 'push_notifications', label: 'Push Notifications', description: 'Browser push notifications for real-time alerts', roles: ['athlete', 'trainer', 'recruiter'] },
    { id: 'workout_reminders', label: 'Workout Reminders', description: 'Daily reminders to log your workouts', roles: ['athlete'] },
    { id: 'score_updates', label: 'Score Updates', description: 'Notifications when reliability score changes', roles: ['athlete', 'trainer', 'recruiter'] },
    { id: 'scout_alerts', label: 'Scout Activity', description: 'Know when recruiters view your profile', roles: ['athlete'] },
    { id: 'verification_alerts', label: 'Verification Alerts', description: 'Notifications for pending verifications', roles: ['trainer'] },
    { id: 'message_notifications', label: 'Message Notifications', description: 'Get notified when you receive a new message', roles: ['athlete', 'trainer'] },
  ].filter(s => s.roles.includes(role));

  const PRIVACY_DEFS = [
    { id: 'profile_visible', label: 'Profile Visible to Recruiters', description: 'Allow recruiters to find and view your profile' },
    { id: 'show_stats', label: 'Show Performance Stats', description: 'Display your stats on your public profile' },
    { id: 'show_workouts', label: 'Show Workout History', description: 'Allow others to see your workout log' },
    { id: 'show_score', label: 'Show Reliability Score', description: 'Display your reliability score publicly' },
  ];

  const toggleNotification = (id: string) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [id]: !prev.notifications[id] },
    }));
  };

  const togglePrivacy = (id: string) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [id]: !prev.privacy[id] },
    }));
  };

  const TABS = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'privacy' as const, label: 'Privacy', icon: Shield },
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
  ];

  const themes = [
    { id: 'dark-gold' as const, label: 'Dark Gold', active: settings.theme === 'dark-gold', bgClass: 'bg-black-pure border-gold-primary', available: true },
    { id: 'midnight' as const, label: 'Midnight', active: settings.theme === 'midnight', bgClass: 'bg-gray-900 border-gray-600', available: false },
    { id: 'light' as const, label: 'Light', active: settings.theme === 'light', bgClass: 'bg-white border-gray-300', available: false },
  ];

  const accentColors = [
    { color: '#D4AF37', label: 'Gold' },
    { color: '#60a5fa', label: 'Blue' },
    { color: '#a78bfa', label: 'Purple' },
    { color: '#34d399', label: 'Green' },
  ];

  return (
    <PageLayout role={role} title="Settings" userName={userName} userPhoto={userPhoto}>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Settings size={24} className="text-gold-primary" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Settings</h2>
        </div>
        <p className="text-gray-500 text-sm">Manage your account, notifications, and preferences.</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-6 md:mb-8 overflow-x-auto pb-1 -mx-1 px-1">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? 'bg-gold-primary/10 text-gold-primary border border-gold-primary/30'
                  : 'text-gray-400 hover:text-white hover:bg-black-elevated'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Profile tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-black-card border border-gray-800 rounded-xl p-4 md:p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Profile Information</h3>
            <div className="flex items-center gap-4 md:gap-6 mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gold-primary/50 overflow-hidden bg-black-elevated shrink-0">
                <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">{settings.name || userName}</p>
                <p className="text-gray-500 text-sm capitalize">{role}</p>
                <button className="text-gold-primary text-xs font-medium hover:underline mt-1 cursor-pointer">Change photo</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">Full Name</label>
                <input type="text" value={settings.name} onChange={e => setSettings(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-black-elevated border border-gray-700 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-primary transition-all" />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">Email</label>
                <input type="email" value={settings.email} onChange={e => setSettings(p => ({ ...p, email: e.target.value }))}
                  className="w-full bg-black-elevated border border-gray-700 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-primary transition-all" />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">Phone</label>
                <input type="tel" value={settings.phone} onChange={e => setSettings(p => ({ ...p, phone: e.target.value }))}
                  className="w-full bg-black-elevated border border-gray-700 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-primary transition-all" />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">Location</label>
                <input type="text" value={settings.location} onChange={e => setSettings(p => ({ ...p, location: e.target.value }))}
                  className="w-full bg-black-elevated border border-gray-700 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-primary transition-all" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              {saved && <span className="flex items-center gap-1 text-green-400 text-xs font-medium"><Check size={14} /> Saved</span>}
              <Button size="sm" onClick={handleSave}>Save Changes</Button>
            </div>
          </div>

          {/* Danger zone */}
          <div className="bg-black-card border border-red-500/20 rounded-xl p-4 md:p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-red-400 mb-2">Danger Zone</h3>
            <p className="text-gray-500 text-xs mb-4">These actions are irreversible. Proceed with caution.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => { localStorage.removeItem('uchamp_user'); navigate('/'); }}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider bg-black-elevated text-gray-400 border border-gray-700 hover:border-red-500/50 hover:text-red-400 transition-all cursor-pointer">
                <LogOut size={14} /> Sign Out
              </button>
              <button className="px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider bg-black-elevated text-gray-500 border border-gray-700 hover:border-red-500/50 hover:text-red-400 transition-all cursor-pointer">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications tab */}
      {activeTab === 'notifications' && (
        <div className="bg-black-card border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {NOTIFICATION_DEFS.map(def => (
              <div key={def.id} className="flex items-center justify-between py-3 border-b border-gray-800/50 last:border-0">
                <div>
                  <p className="text-gray-200 text-sm font-medium">{def.label}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{def.description}</p>
                </div>
                <button onClick={() => toggleNotification(def.id)}
                  className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${settings.notifications[def.id] ? 'bg-gold-primary' : 'bg-gray-700'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.notifications[def.id] ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy tab */}
      {activeTab === 'privacy' && (
        <div className="bg-black-card border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Privacy Settings</h3>
          <div className="space-y-4">
            {PRIVACY_DEFS.map(def => (
              <div key={def.id} className="flex items-center justify-between py-3 border-b border-gray-800/50 last:border-0">
                <div>
                  <p className="text-gray-200 text-sm font-medium">{def.label}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{def.description}</p>
                </div>
                <button onClick={() => togglePrivacy(def.id)}
                  className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${settings.privacy[def.id] ? 'bg-gold-primary' : 'bg-gray-700'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.privacy[def.id] ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Appearance tab */}
      {activeTab === 'appearance' && (
        <div className="bg-black-card border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Appearance</h3>
          <div className="space-y-6">
            <div>
              <p className="text-gray-300 text-sm font-medium mb-3">Theme</p>
              <div className="flex gap-3">
                {themes.map(t => (
                  <button key={t.id}
                    onClick={() => t.available && setSettings(p => ({ ...p, theme: t.id }))}
                    className={`flex-1 rounded-lg p-4 text-center cursor-pointer transition-all ${
                      t.active ? 'bg-gold-primary/10 border border-gold-primary text-gold-primary' : 'bg-black-elevated border border-gray-700 text-gray-500 hover:border-gray-600'
                    }`}>
                    <div className={`w-8 h-8 rounded-full border mx-auto mb-2 ${t.bgClass}`} />
                    <p className="text-xs font-bold uppercase">{t.label}</p>
                    <p className="text-[10px] mt-0.5">{t.active ? 'Active' : t.available ? 'Select' : 'Coming Soon'}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-300 text-sm font-medium mb-3">Accent Color</p>
              <div className="flex gap-3">
                {accentColors.map(opt => (
                  <button key={opt.label}
                    onClick={() => setSettings(p => ({ ...p, accentColor: opt.color }))}
                    className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                      settings.accentColor === opt.color ? 'border-white scale-110' : 'border-gray-700 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: opt.color }}
                    title={opt.label} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">Your platform. Your rules.</p>
      </div>
    </PageLayout>
  );
}
