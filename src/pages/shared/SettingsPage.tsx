import { useState } from 'react';
import { Settings, User, Bell, Shield, Palette, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import Button from '../../components/ui/Button';

type Role = 'athlete' | 'trainer' | 'recruiter';

interface SettingsPageProps {
  role: Role;
  userName: string;
  userPhoto: string;
  userEmail?: string;
}

interface SettingToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function SettingsPage({ role, userName, userPhoto, userEmail = 'user@uchamp.com' }: SettingsPageProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'appearance'>('profile');

  const [notificationSettings, setNotificationSettings] = useState<SettingToggle[]>([
    { id: 'email_alerts', label: 'Email Alerts', description: 'Receive important updates via email', enabled: true },
    { id: 'push_notifications', label: 'Push Notifications', description: 'Browser push notifications for real-time alerts', enabled: true },
    { id: 'workout_reminders', label: 'Workout Reminders', description: 'Daily reminders to log your workouts', enabled: role === 'athlete' },
    { id: 'score_updates', label: 'Score Updates', description: 'Notifications when reliability score changes', enabled: true },
    { id: 'scout_alerts', label: 'Scout Activity', description: 'Know when recruiters view your profile', enabled: role === 'athlete' },
    { id: 'verification_alerts', label: 'Verification Alerts', description: 'Notifications for pending verifications', enabled: role === 'trainer' },
  ].filter(s => {
    if (s.id === 'workout_reminders' && role !== 'athlete') return false;
    if (s.id === 'scout_alerts' && role !== 'athlete') return false;
    if (s.id === 'verification_alerts' && role !== 'trainer') return false;
    return true;
  }));

  const [privacySettings, setPrivacySettings] = useState<SettingToggle[]>([
    { id: 'profile_visible', label: 'Profile Visible to Recruiters', description: 'Allow recruiters to find and view your profile', enabled: true },
    { id: 'show_stats', label: 'Show Performance Stats', description: 'Display your stats on your public profile', enabled: true },
    { id: 'show_workouts', label: 'Show Workout History', description: 'Allow others to see your workout log', enabled: false },
    { id: 'show_score', label: 'Show Reliability Score', description: 'Display your reliability score publicly', enabled: true },
  ]);

  const toggleNotification = (id: string) => {
    setNotificationSettings(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const togglePrivacy = (id: string) => {
    setPrivacySettings(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const TABS = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'privacy' as const, label: 'Privacy', icon: Shield },
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
  ];

  return (
    <PageLayout
      role={role}
      title="Settings"
      userName={userName}
      userPhoto={userPhoto}
    >
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
                <p className="text-white font-bold text-lg">{userName}</p>
                <p className="text-gray-500 text-sm capitalize">{role}</p>
                <button className="text-gold-primary text-xs font-medium hover:underline mt-1 cursor-pointer">
                  Change photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  defaultValue={userName}
                  className="w-full bg-black-elevated border border-gray-700 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-primary transition-all"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">Email</label>
                <input
                  type="email"
                  defaultValue={userEmail}
                  className="w-full bg-black-elevated border border-gray-700 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-primary transition-all"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">Phone</label>
                <input
                  type="tel"
                  defaultValue="(404) 555-0100"
                  className="w-full bg-black-elevated border border-gray-700 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-primary transition-all"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">Location</label>
                <input
                  type="text"
                  defaultValue="Lithonia, GA"
                  className="w-full bg-black-elevated border border-gray-700 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-primary transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button size="sm">Save Changes</Button>
            </div>
          </div>

          {/* Danger zone */}
          <div className="bg-black-card border border-red-500/20 rounded-xl p-4 md:p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-red-400 mb-2">Danger Zone</h3>
            <p className="text-gray-500 text-xs mb-4">These actions are irreversible. Proceed with caution.</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider bg-black-elevated text-gray-400 border border-gray-700 hover:border-red-500/50 hover:text-red-400 transition-all cursor-pointer"
              >
                <LogOut size={14} />
                Sign Out
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
            {notificationSettings.map(setting => (
              <div key={setting.id} className="flex items-center justify-between py-3 border-b border-gray-800/50 last:border-0">
                <div>
                  <p className="text-gray-200 text-sm font-medium">{setting.label}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{setting.description}</p>
                </div>
                <button
                  onClick={() => toggleNotification(setting.id)}
                  className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${setting.enabled ? 'bg-gold-primary' : 'bg-gray-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${setting.enabled ? 'left-6' : 'left-1'}`} />
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
            {privacySettings.map(setting => (
              <div key={setting.id} className="flex items-center justify-between py-3 border-b border-gray-800/50 last:border-0">
                <div>
                  <p className="text-gray-200 text-sm font-medium">{setting.label}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{setting.description}</p>
                </div>
                <button
                  onClick={() => togglePrivacy(setting.id)}
                  className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${setting.enabled ? 'bg-gold-primary' : 'bg-gray-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${setting.enabled ? 'left-6' : 'left-1'}`} />
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
                <button className="flex-1 bg-gold-primary/10 border border-gold-primary text-gold-primary rounded-lg p-4 text-center cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-black-pure border border-gold-primary mx-auto mb-2" />
                  <p className="text-xs font-bold uppercase">Dark Gold</p>
                  <p className="text-[10px] text-gold-primary/70 mt-0.5">Active</p>
                </button>
                <button className="flex-1 bg-black-elevated border border-gray-700 text-gray-500 rounded-lg p-4 text-center cursor-pointer hover:border-gray-600 transition-all">
                  <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-600 mx-auto mb-2" />
                  <p className="text-xs font-bold uppercase">Midnight</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">Coming Soon</p>
                </button>
                <button className="flex-1 bg-black-elevated border border-gray-700 text-gray-500 rounded-lg p-4 text-center cursor-pointer hover:border-gray-600 transition-all">
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-300 mx-auto mb-2" />
                  <p className="text-xs font-bold uppercase">Light</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">Coming Soon</p>
                </button>
              </div>
            </div>

            <div>
              <p className="text-gray-300 text-sm font-medium mb-3">Accent Color</p>
              <div className="flex gap-3">
                {[
                  { color: '#D4AF37', label: 'Gold', active: true },
                  { color: '#60a5fa', label: 'Blue', active: false },
                  { color: '#a78bfa', label: 'Purple', active: false },
                  { color: '#34d399', label: 'Green', active: false },
                ].map(opt => (
                  <button
                    key={opt.label}
                    className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                      opt.active ? 'border-white scale-110' : 'border-gray-700 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: opt.color }}
                    title={opt.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
          Your platform. Your rules.
        </p>
      </div>
    </PageLayout>
  );
}
