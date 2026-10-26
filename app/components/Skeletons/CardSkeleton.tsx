'use client';

export default function CardSkeleton() {
  return (
    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-slate-700/50"></div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-6 bg-slate-700/50 rounded w-3/4"></div>

        {/* Subtitle */}
        <div className="h-4 bg-slate-700/30 rounded w-1/2"></div>

        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-4 bg-slate-700/30 rounded w-full"></div>
          <div className="h-4 bg-slate-700/30 rounded w-5/6"></div>
        </div>

        {/* Button placeholder */}
        <div className="pt-4">
          <div className="h-10 bg-slate-700/50 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}
