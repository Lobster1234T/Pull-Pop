'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BookingsChartProps {
  data?: Array<{
    zone: string;
    bookings: number;
  }>;
}

export default function BookingsChart({ data }: BookingsChartProps) {
  const defaultData = [
    { zone: 'Standard', bookings: 24 },
    { zone: 'VIP', bookings: 18 },
    { zone: 'PS5', bookings: 31 },
  ];

  const chartData = data || defaultData;

  return (
    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6">
      <h3 className="text-lg font-bold text-white mb-6">📅 Бронирования по зонам</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
          <XAxis dataKey="zone" stroke="rgba(255, 255, 255, 0.5)" />
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
          <Bar
            dataKey="bookings"
            fill="#19e3ff"
            name="Бронирования"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
