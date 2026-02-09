import { TrendingUp, TrendingDown, Minus, BarChart3, Users, Eye, Star } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { RECRUITERS } from '../../lib/mockData';
import { REPORT_METRICS, PIPELINE_DATA, POSITION_BREAKDOWN, WEEKLY_ACTIVITY } from '../../lib/recruiterData';
import PageLayout from '../../components/layout/PageLayout';

export default function ReportsPage() {
  const recruiter = RECRUITERS[0];

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

  return (
    <PageLayout
      role="recruiter"
      title="Reports"
      userName={recruiter.name}
      userPhoto={recruiter.photoUrl}
      notificationCount={2}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
          Scouting Reports
        </h2>
        <p className="text-gray-500 text-sm">Analytics and insights on your recruiting activity.</p>
      </div>

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
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
            Weekly Activity
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WEEKLY_ACTIVITY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" opacity={0.5} />
              <XAxis
                dataKey="day"
                stroke="#737373"
                style={{ fontSize: '11px', fontFamily: 'monospace' }}
              />
              <YAxis
                stroke="#737373"
                style={{ fontSize: '11px', fontFamily: 'monospace' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#121212',
                  border: '1px solid #D4AF37',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#A3A3A3' }}
              />
              <Bar dataKey="views" fill="#D4AF37" radius={[4, 4, 0, 0]} name="Profile Views" />
              <Bar dataKey="saves" fill="#FFD700" radius={[4, 4, 0, 0]} name="Saves" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recruiting pipeline */}
        <div className="bg-black-card border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
            Recruiting Pipeline
          </h3>
          <div className="flex items-center justify-center mb-4">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={PIPELINE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="count"
                >
                  {PIPELINE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#121212',
                    border: '1px solid #D4AF37',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {PIPELINE_DATA.map(stage => (
              <div key={stage.stage} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                <span className="text-gray-400 text-xs">{stage.stage}</span>
                <span className="text-white font-mono text-xs font-bold ml-auto">{stage.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Position breakdown */}
      <div className="bg-black-card border border-gray-800 rounded-xl p-6 mb-8">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
          Position Breakdown
        </h3>
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
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
          Scouting Insights
        </h3>
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

      <div className="mt-12 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">
          Data-driven decisions. Championship recruiting.
        </p>
      </div>
    </PageLayout>
  );
}
