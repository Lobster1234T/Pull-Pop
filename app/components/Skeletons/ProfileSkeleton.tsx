'use client';

export default function ProfileSkeleton() {
  return (
    <div className="max-w-2xl mx-auto animate-pulse">
      {/* Header */}
      <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-8 mb-6">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-slate-700/50 rounded-full"></div>

          {/* Info */}
          <div className="flex-1 space-y-3">
            <div className="h-8 bg-slate-700/50 rounded w-1/3"></div>
            <div className="h-4 bg-slate-700/30 rounded w-1/4"></div>
            <div className="h-4 bg-slate-700/30 rounded w-1/5"></div>
          </div>
        </div>
      </div>

      {/* Content sections */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 mb-6">
          <div className="h-6 bg-slate-700/50 rounded w-1/4 mb-4"></div>

          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j}>
                <div className="h-4 bg-slate-700/30 rounded w-1/6 mb-2"></div>
                <div className="h-8 bg-slate-700/20 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
