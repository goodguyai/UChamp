import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { Athlete } from '../../lib/mockData';

interface TrendChartProps {
  athlete: Athlete;
}

const METRICS = [
  { key: 'fortyYardDash', label: '40-Yard Dash', unit: 's', invert: true },
  { key: 'bench', label: 'Bench Press', unit: 'lbs', invert: false },
  { key: 'vertical', label: 'Vertical Jump', unit: '"', invert: false },
] as const;

export default function TrendChart({ athlete }: TrendChartProps) {
  const [activeMetric, setActiveMetric] = useState<string>('fortyYardDash');

  const metric = METRICS.find(m => m.key === activeMetric)!;
  const data = athlete.trendData[activeMetric as keyof typeof athlete.trendData];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
          Progress Trend
        </h3>

        <div className="flex gap-2">
          {METRICS.map((m) => (
            <button
              key={m.key}
              onClick={() => setActiveMetric(m.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeMetric === m.key
                  ? 'bg-gold-primary text-black-pure'
                  : 'bg-black-elevated text-gray-400 hover:text-gold-primary border border-gray-700'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-black-elevated border border-gray-800 rounded-lg p-4">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#262626"
              opacity={0.5}
            />
            <XAxis
              dataKey="date"
              stroke="#737373"
              style={{ fontSize: '12px', fontFamily: 'monospace' }}
              tickLine={false}
            />
            <YAxis
              stroke="#737373"
              style={{ fontSize: '12px', fontFamily: 'monospace' }}
              tickLine={false}
              domain={metric.invert ? ['dataMax + 0.1', 'dataMin - 0.1'] : ['dataMin - 5', 'dataMax + 5']}
              reversed={metric.invert}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#121212',
                border: '1px solid #D4AF37',
                borderRadius: '8px',
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
                fontSize: '14px',
                fontFamily: 'monospace',
              }}
              labelStyle={{ color: '#A3A3A3' }}
              itemStyle={{ color: '#FFD700' }}
              formatter={(val: number | undefined) => [`${val ?? ''}${metric.unit}`, metric.label]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#D4AF37"
              strokeWidth={3}
              dot={{
                fill: '#FFD700',
                r: 5,
                strokeWidth: 2,
                stroke: '#0A0A0A',
              }}
              activeDot={{
                r: 7,
                fill: '#FFD700',
                stroke: '#0A0A0A',
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
