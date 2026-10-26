'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface UsersChartProps {
  data?: Array<{
    week: string;
    newUsers: number;
    totalUsers: number;
  }>;
}

export default function UsersChart({ data }: UsersChartProps) {
  const defaultData = [
    { week: 'Неделя 1', newUsers: 12, totalUsers: 156 },
    { week: 'Неделя 2', newUsers: 18, totalUsers: 174 },
    { week: 'Неделя 3', newUsers: 15, totalUsers: 189 },
    { week: 'Неделя 4', newUsers: 24, totalUsers: 213 },
  ];

  const chartData = data || defaultData;

  return (
    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6">
      <h3 className="text-lg font-bold text-white mb-6">👥 Новые пользователи</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00d9ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTotalUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#19e3ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#19e3ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
          <XAxis dataKey="week" stroke="rgba(255, 255, 255, 0.5)" />
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
          <Area
            type="monotone"
            dataKey="newUsers"
            stroke="#00d9ff"
            fillOpacity={1}
            fill="url(#colorNewUsers)"
            name="Новые пользователи"
          />
          <Area
            type="monotone"
            dataKey="totalUsers"
            stroke="#19e3ff"
            fillOpacity={1}
            fill="url(#colorTotalUsers)"
            name="Всего пользователей"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
