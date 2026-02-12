import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, BarChart3, Users, Eye, Star, Download, Calendar, Target, Filter } from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { ATHLETES, RECRUITERS } from '../../lib/mockData';
import { REPORT_METRICS, PIPELINE_DATA, POSITION_BREAKDOWN, WEEKLY_ACTIVITY } from '../../lib/recruiterData';
import { exportSearchResults } from '../../lib/exportUtils';
import PageLayout from '../../components/layout/PageLayout';
import Button from '../../components/ui/Button';

type TabType = 'overview' | 'pipeline' | 'class';

export default function ReportsPage() {
  const recruiter = RECRUITERS[0];
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp size={14} className="text-gold-bright" />;
    if (change < 0) return <TrendingDown size={14} className="text-red-400" />;
    return <Minus size={14} className="text-gray-500" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-gold-bright';
    if (change < 0) return 'text-red-400';
    return 'text-gray-500';
  };

  const METRIC_ICONS = [Eye, Star, BarChart3, Users];

  // Monthly scouting trends
  const monthlyTrends = [
    { month: 'Sep', views: 18, saves: 3, messages: 1 },
    { month: 'Oct', views: 24, saves: 5, messages: 2 },
    { month: 'Nov', views: 31, saves: 7, messages: 4 },
    { month: 'Dec', views: 22, saves: 4, messages: 2 },
    { month: 'Jan', views: 38, saves: 9, messages: 6 },
    { month: 'Feb', views: 42, saves: 10, messages: 5 },
  ];

  // Class builder - top prospects by position
  const classBuilder = ATHLETES
    .filter(a => a.gradYear === 2026)
    .sort((a, b) => b.reliabilityScore - a.reliabilityScore)
    .slice(0, 6);

  const TABS = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'pipeline' as const, label: 'Pipeline' },
    { id: 'class' as const, label: 'Class Builder' },
  ];

  return (
    <PageLayout
      role="recruiter"
      title="Reports"
      userName={recruiter.name}
      userPhoto={recruiter.photoUrl}
      notificationCount={2}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
            Scouting Reports
          </h2>
          <p className="text-gray-500 text-sm">Analytics and insights on your recruiting activity.</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => exportSearchResults(ATHLETES)}>
          <Download size={14} />
          <span className="ml-1.5">Export All Data</span>
        </Button>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
              activeTab === tab.id ? 'bg-gold-primary/10 text-gold-primary border border-gold-primary/30' : 'text-gray-400 hover:text-white hover:bg-black-elevated'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Top metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {REPORT_METRICS.map((metric, i) => {
              const Icon = METRIC_ICONS[i];
              return (
                <div key={metric.label} className="bg-black-card border border-gray-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center">
                      <Icon size={18} className="text-gold-primary" />
                    </div>
                    <div className={`flex items-center gap-1 ${getChangeColor(metric.change)}`}>
                      {getChangeIcon(metric.change)}
                      <span className="text-xs font-mono font-bold">
                        {metric.change > 0 ? '+' : ''}{metric.change}
                      </span>
                    </div>
                  </div>
                  <p className="text-white font-mono text-3xl font-black">{metric.value}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">{metric.label}</p>
                  <p className="text-gray-600 text-[10px] mt-0.5">{metric.changeLabel}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Weekly activity chart */}
            <div className="bg-black-card border border-gray-800 rounded-xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={WEEKLY_ACTIVITY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" opacity={0.5} />
                  <XAxis dataKey="day" stroke="#737373" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                  <YAxis stroke="#737373" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#121212', border: '1px solid #D4AF37', borderRadius: '8px', fontSize: '12px' }} labelStyle={{ color: '#A3A3A3' }} />
                  <Bar dataKey="views" fill="#D4AF37" radius={[4, 4, 0, 0]} name="Profile Views" />
                  <Bar dataKey="saves" fill="#FFD700" radius={[4, 4, 0, 0]} name="Saves" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Trends */}
            <div className="bg-black-card border border-gray-800 rounded-xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                <TrendingUp size={14} className="text-gold-primary inline mr-2" />
                Monthly Scouting Trends
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" opacity={0.5} />
                  <XAxis dataKey="month" stroke="#737373" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                  <YAxis stroke="#737373" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#121212', border: '1px solid #D4AF37', borderRadius: '8px', fontSize: '12px' }} labelStyle={{ color: '#A3A3A3' }} />
                  <Line type="monotone" dataKey="views" stroke="#D4AF37" strokeWidth={2} dot={{ fill: '#D4AF37', r: 3 }} name="Views" />
                  <Line type="monotone" dataKey="saves" stroke="#FFD700" strokeWidth={2} dot={{ fill: '#FFD700', r: 3 }} name="Saves" />
                  <Line type="monotone" dataKey="messages" stroke="#CD7F32" strokeWidth={2} dot={{ fill: '#CD7F32', r: 3 }} name="Messages" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Position breakdown */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-6 mb-8">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Position Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {POSITION_BREAKDOWN.map(pos => (
                <div key={pos.position} className="bg-black-elevated rounded-lg p-4 text-center">
                  <p className="text-gold-primary text-lg font-black">{pos.position}</p>
                  <p className="text-white font-mono text-2xl font-bold mt-1">{pos.count}</p>
                  <p className="text-gray-500 text-xs mt-1">athlete{pos.count !== 1 ? 's' : ''}</p>
                  <div className="mt-2 pt-2 border-t border-gray-800">
                    <p className="text-gray-600 text-[10px] uppercase tracking-wider">Avg Score</p>
                    <p className="text-gold-primary font-mono font-bold text-sm">{pos.avgScore}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Scouting Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gold-primary/[0.03] border border-gold-primary/10 rounded-lg">
                <p className="text-gold-primary text-xs font-bold uppercase tracking-wider mb-1">Top Prospect</p>
                <p className="text-gray-300 text-sm">Marcus Johnson (QB) has the highest reliability score at 92. His consistency rate of 95% puts him in elite territory for QB prospects.</p>
              </div>
              <div className="p-4 bg-black-elevated border border-gray-800 rounded-lg">
                <p className="text-gold-bronze text-xs font-bold uppercase tracking-wider mb-1">Speed Alert</p>
                <p className="text-gray-300 text-sm">Terrell Green (WR) ran a 4.42s 40-yard dash — top 5% nationally for his class. Route running improvement would make him a top-tier prospect.</p>
              </div>
              <div className="p-4 bg-black-elevated border border-gray-800 rounded-lg">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Rising Stock</p>
                <p className="text-gray-300 text-sm">DeAndre Thomas (OL) added 40 lbs to his bench press in 5 months. At 6'5" 285 lbs, his physical development trajectory is ahead of schedule for Class of 2027.</p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'pipeline' && (
        <>
          {/* Pipeline funnel */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-6 mb-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Recruiting Pipeline</h3>
            <div className="space-y-4">
              {PIPELINE_DATA.map((stage, i) => {
                const maxCount = PIPELINE_DATA[0].count;
                const pct = (stage.count / maxCount) * 100;
                return (
                  <div key={stage.stage}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 text-sm font-medium">{stage.stage}</span>
                      <span className="text-white font-mono text-sm font-bold">{stage.count}</span>
                    </div>
                    <div className="h-8 bg-gray-800 rounded-lg overflow-hidden">
                      <div
                        className="h-full rounded-lg flex items-center justify-end pr-3 transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: stage.color }}
                      >
                        <span className="text-black-pure text-[10px] font-bold">{Math.round(pct)}%</span>
                      </div>
                    </div>
                    {i < PIPELINE_DATA.length - 1 && (
                      <div className="flex items-center justify-center my-1">
                        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-700" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 p-4 bg-gold-primary/[0.03] border border-gold-primary/10 rounded-lg">
              <p className="text-gray-400 text-xs leading-relaxed">
                <span className="text-gold-primary font-medium">Conversion:</span>{' '}
                {Math.round((PIPELINE_DATA[3].count / PIPELINE_DATA[0].count) * 100)}% of identified athletes make it to Priority status.
                Your pipeline is healthy with strong conversion at each stage.
              </p>
            </div>
          </div>

          {/* Pipeline donut + breakdown side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black-card border border-gray-800 rounded-xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Pipeline Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={PIPELINE_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="count">
                    {PIPELINE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#121212', border: '1px solid #D4AF37', borderRadius: '8px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {PIPELINE_DATA.map(stage => (
                  <div key={stage.stage} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="text-gray-400 text-xs">{stage.stage}</span>
                    <span className="text-white font-mono text-xs font-bold ml-auto">{stage.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black-card border border-gray-800 rounded-xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Pipeline Actions</h3>
              <div className="space-y-3">
                <div className="p-3 bg-black-elevated rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Target size={14} className="text-gold-primary" />
                    <p className="text-white text-sm font-medium">Priority Follow-ups</p>
                  </div>
                  <p className="text-gray-500 text-xs">3 priority athletes need evaluation updates</p>
                </div>
                <div className="p-3 bg-black-elevated rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={14} className="text-gold-bronze" />
                    <p className="text-white text-sm font-medium">Upcoming Evaluations</p>
                  </div>
                  <p className="text-gray-500 text-xs">Georgia Elite Combine in 34 days - 4 watched athletes attending</p>
                </div>
                <div className="p-3 bg-black-elevated rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Filter size={14} className="text-gold-bright" />
                    <p className="text-white text-sm font-medium">Score Changes</p>
                  </div>
                  <p className="text-gray-500 text-xs">2 athletes moved up in reliability score this week</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'class' && (
        <>
          {/* Class builder */}
          <div className="bg-black-card border border-gray-800 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
                Class of 2026 - Top Prospects
              </h3>
              <Button variant="secondary" size="sm" onClick={() => exportSearchResults(classBuilder)}>
                <Download size={14} />
                <span className="ml-1.5">Export Class</span>
              </Button>
            </div>
            <div className="space-y-3">
              {classBuilder.map((athlete, rank) => (
                <div key={athlete.id} className="flex items-center gap-4 p-4 bg-black-elevated rounded-lg">
                  <div className="text-center w-8">
                    <span className={`font-mono text-lg font-black ${rank === 0 ? 'text-gold-bright' : rank === 1 ? 'text-gray-300' : rank === 2 ? 'text-gold-bronze' : 'text-gray-500'}`}>
                      #{rank + 1}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 overflow-hidden bg-black-card shrink-0" style={{ borderColor: rank < 3 ? '#D4AF37' : '#525252' }}>
                    <img src={athlete.photoUrl} alt={athlete.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm">{athlete.name}</p>
                    <p className="text-gray-500 text-xs">{athlete.position} · {athlete.school}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center shrink-0 hidden md:grid">
                    <div>
                      <p className="text-gray-600 text-[10px] uppercase">40-Yard</p>
                      <p className="text-white font-mono text-xs font-bold">{athlete.stats.fortyYardDash}s</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-[10px] uppercase">Bench</p>
                      <p className="text-white font-mono text-xs font-bold">{athlete.stats.bench}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-[10px] uppercase">Vertical</p>
                      <p className="text-white font-mono text-xs font-bold">{athlete.stats.vertical}"</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-gold-primary font-mono text-lg font-black">{athlete.reliabilityScore}</p>
                    <p className="text-gray-600 text-[10px] uppercase">Score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Class composition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black-card border border-gray-800 rounded-xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Class Composition</h3>
              <div className="space-y-3">
                {['QB', 'WR', 'RB', 'DB', 'LB'].map(pos => {
                  const count = classBuilder.filter(a => a.position === pos).length;
                  return (
                    <div key={pos} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="bg-gold-primary/10 text-gold-primary px-2 py-0.5 rounded text-xs font-bold w-10 text-center">{pos}</span>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden w-32">
                          <div className="h-full bg-gold-primary rounded-full" style={{ width: `${(count / Math.max(1, classBuilder.length)) * 100}%` }} />
                        </div>
                      </div>
                      <span className="text-white font-mono text-sm font-bold">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-black-card border border-gray-800 rounded-xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Class Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-800/50">
                  <span className="text-gray-400 text-sm">Total Prospects</span>
                  <span className="text-white font-mono font-bold">{classBuilder.length}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-800/50">
                  <span className="text-gray-400 text-sm">Avg Reliability</span>
                  <span className="text-gold-primary font-mono font-bold">
                    {Math.round(classBuilder.reduce((s, a) => s + a.reliabilityScore, 0) / Math.max(1, classBuilder.length))}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-800/50">
                  <span className="text-gray-400 text-sm">Avg 40-Yard</span>
                  <span className="text-white font-mono font-bold">
                    {(classBuilder.reduce((s, a) => s + a.stats.fortyYardDash, 0) / Math.max(1, classBuilder.length)).toFixed(2)}s
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-400 text-sm">Positions Covered</span>
                  <span className="text-white font-mono font-bold">{new Set(classBuilder.map(a => a.position)).size}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mt-12 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
          Data-driven decisions. Championship recruiting.
        </p>
      </div>
    </PageLayout>
  );
}
