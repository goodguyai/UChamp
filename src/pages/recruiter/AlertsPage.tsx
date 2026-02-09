import { useState } from 'react';
import { Bell, Eye, Check, Filter } from 'lucide-react';
import { RECRUITERS } from '../../lib/mockData';
import { SCOUT_ALERTS, ALERT_TYPE_CONFIG } from '../../lib/recruiterData';
import type { ScoutAlert } from '../../lib/recruiterData';
import PageLayout from '../../components/layout/PageLayout';

type FilterType = 'all' | ScoutAlert['type'];

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'score_change', label: 'Score Changes' },
  { value: 'breakout', label: 'Breakouts' },
  { value: 'new_verified', label: 'Verifications' },
  { value: 'profile_update', label: 'Profile Updates' },
  { value: 'combine_ready', label: 'Combine Ready' },
];

export default function AlertsPage() {
  const recruiter = RECRUITERS[0];
  const [alerts, setAlerts] = useState(SCOUT_ALERTS);
  const [filter, setFilter] = useState<FilterType>('all');
  const [showFilterBar, setShowFilterBar] = useState(false);

  const unreadCount = alerts.filter(a => !a.read).length;

  const filteredAlerts = filter === 'all'
    ? alerts
    : alerts.filter(a => a.type === filter);

  const markRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const markAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const getPriorityBorder = (priority: ScoutAlert['priority']) => {
    switch (priority) {
      case 'high': return 'border-l-gold-bright';
      case 'medium': return 'border-l-gold-primary';
      case 'low': return 'border-l-gray-600';
    }
  };

  return (
    <PageLayout
      role="recruiter"
      title="Scout Alerts"
      userName={recruiter.name}
      userPhoto={recruiter.photoUrl}
      notificationCount={unreadCount}
    >
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Bell size={24} className="text-gold-primary" />
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                Scout Alerts
              </h2>
              {unreadCount > 0 && (
                <span className="bg-gold-primary text-black-pure text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm">Real-time updates on your tracked athletes.</p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 text-gold-primary text-xs font-medium hover:underline cursor-pointer"
              >
                <Check size={14} />
                Mark all read
              </button>
            )}
            <button
              onClick={() => setShowFilterBar(!showFilterBar)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all cursor-pointer text-xs ${
                showFilterBar ? 'bg-gold-primary/10 border-gold-primary text-gold-primary' : 'bg-black-elevated border-gray-700 text-gray-400'
              }`}
            >
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      {showFilterBar && (
        <div className="mb-6 flex flex-wrap gap-2">
          {FILTER_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                filter === opt.value
                  ? 'bg-gold-primary text-black-pure font-bold'
                  : 'bg-black-elevated text-gray-400 border border-gray-700 hover:border-gray-500'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Alert list */}
      <div className="space-y-3">
        {filteredAlerts.map(alert => {
          const config = ALERT_TYPE_CONFIG[alert.type];
          const priorityBorder = getPriorityBorder(alert.priority);

          return (
            <div
              key={alert.id}
              onClick={() => markRead(alert.id)}
              className={`bg-black-card border border-gray-800 border-l-4 ${priorityBorder} rounded-lg p-5 hover:bg-black-elevated/50 transition-all cursor-pointer ${
                !alert.read ? 'bg-gold-primary/[0.02]' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${config.color}`}>
                      {config.label}
                    </span>
                    {alert.priority === 'high' && (
                      <span className="text-gold-bright text-[10px] font-bold uppercase tracking-wider">
                        HIGH PRIORITY
                      </span>
                    )}
                    {!alert.read && (
                      <div className="w-2 h-2 bg-gold-primary rounded-full" />
                    )}
                  </div>
                  <h3 className={`text-sm font-bold ${!alert.read ? 'text-white' : 'text-gray-300'}`}>
                    {alert.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{alert.message}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-gray-600 text-[10px] uppercase tracking-wider">{alert.time}</span>
                    <span className="text-gray-700">·</span>
                    <span className="text-gold-primary/70 text-[10px] font-medium">{alert.athleteName}</span>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-gold-primary transition-colors shrink-0 mt-1 cursor-pointer" title="View athlete">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-20 bg-black-card border border-gray-800 rounded-xl">
          <Bell size={48} className="text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No alerts match this filter</p>
          <p className="text-gray-600 text-sm mt-2">Try selecting a different filter or check back later.</p>
        </div>
      )}

      {/* Alert preferences */}
      <div className="mt-8 bg-black-card border border-gray-800 rounded-xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Alert Preferences</h3>
        <div className="space-y-3">
          {[
            { label: 'Reliability score changes', desc: 'When a watched athlete\'s score changes by 3+ points', enabled: true },
            { label: 'Breakout performances', desc: 'When an athlete posts a new personal record', enabled: true },
            { label: 'Workout verifications', desc: 'When watched athletes get workouts verified', enabled: false },
            { label: 'Profile updates', desc: 'When athletes update their stats or add footage', enabled: true },
            { label: 'Combine readiness', desc: 'AI assessment that an athlete is combine-ready', enabled: true },
          ].map(pref => (
            <div key={pref.label} className="flex items-center justify-between py-2">
              <div>
                <p className="text-gray-300 text-sm">{pref.label}</p>
                <p className="text-gray-600 text-xs">{pref.desc}</p>
              </div>
              <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${pref.enabled ? 'bg-gold-primary' : 'bg-gray-700'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${pref.enabled ? 'left-5' : 'left-1'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
          Stay ahead. Never miss a prospect.
        </p>
      </div>
    </PageLayout>
  );
}
