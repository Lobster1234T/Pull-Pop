'use client';

export interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export default function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
  return (
    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex border-b border-cyan-500/20 bg-slate-900/50">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="flex-1 px-6 py-4">
            <div className="h-4 bg-slate-700/50 rounded animate-pulse"></div>
          </div>
        ))}
        <div className="w-24 px-6 py-4">
          <div className="h-4 bg-slate-700/50 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex border-b border-cyan-500/10 hover:bg-slate-800/20 transition">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <div key={colIdx} className="flex-1 px-6 py-4">
              <div className="h-4 bg-slate-700/30 rounded animate-pulse"></div>
            </div>
          ))}
          <div className="w-24 px-6 py-4 flex gap-2">
            <div className="h-8 w-16 bg-slate-700/30 rounded animate-pulse"></div>
            <div className="h-8 w-16 bg-slate-700/30 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
