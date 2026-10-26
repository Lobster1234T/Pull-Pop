'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface RevenueChartProps {
  data?: Array<{
    date: string;
    revenue: number;
  }>;
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const defaultData = [
    { date: '1 окт', revenue: 45000 },
    { date: '2 окт', revenue: 52000 },
    { date: '3 окт', revenue: 48000 },
    { date: '4 окт', revenue: 61000 },
    { date: '5 окт', revenue: 55000 },
    { date: '6 окт', revenue: 67000 },
    { date: '7 окт', revenue: 72000 },
  ];

  const chartData = data || defaultData;

  return (
    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6">
      <h3 className="text-lg font-bold text-white mb-6">💰 Выручка по дням</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
          <XAxis dataKey="date" stroke="rgba(255, 255, 255, 0.5)" />
          <YAxis stroke="rgba(255, 255, 255, 0.5)" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f1428',
              border: '1px solid rgba(0, 217, 255, 0.5)',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#00d9ff"
            strokeWidth={2}
            dot={{ fill: '#00d9ff', r: 4 }}
            activeDot={{ r: 6 }}
            name="Выручка (сом)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
