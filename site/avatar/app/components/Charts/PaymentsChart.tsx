'use client';

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PaymentsChartProps {
  data?: Array<{
    name: string;
    value: number;
  }>;
}

export default function PaymentsChart({ data }: PaymentsChartProps) {
  const defaultData = [
    { name: 'Успешные', value: 187 },
    { name: 'В ожидании', value: 23 },
    { name: 'Отклонённые', value: 8 },
    { name: 'Возврат', value: 12 },
  ];

  const COLORS = ['#00d9ff', '#ff006e', '#ffa400', '#ff4d94'];
  const chartData = data || defaultData;

  return (
    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6">
      <h3 className="text-lg font-bold text-white mb-6">💳 Платежи по статусам</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f1428',
              border: '1px solid rgba(0, 217, 255, 0.5)',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
