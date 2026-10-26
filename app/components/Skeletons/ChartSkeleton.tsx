'use client';

export default function ChartSkeleton() {
  return (
    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 animate-pulse">
      {/* Title */}
      <div className="h-6 bg-slate-700/50 rounded w-1/3 mb-6"></div>

      {/* Chart area */}
      <div className="space-y-4">
        {/* Y-axis labels and bars */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            {/* Y-axis label */}
            <div className="h-4 bg-slate-700/30 rounded w-12"></div>

            {/* Bar */}
            <div
              className="h-8 bg-slate-700/50 rounded"
              style={{ width: `${Math.random() * 60 + 20}%` }}
            ></div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-6">
        <div className="h-4 bg-slate-700/30 rounded w-24"></div>
        <div className="h-4 bg-slate-700/30 rounded w-24"></div>
      </div>
    </div>
  );
}
