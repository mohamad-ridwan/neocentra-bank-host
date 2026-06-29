import React from 'react';

export default function LocalLayoutSkeleton() {
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      {/* Sidebar Skeleton */}
      <div className="w-64 border-r border-slate-900 bg-slate-900/40 backdrop-blur-xl animate-pulse p-4 flex flex-col gap-4">
        <div className="h-10 bg-slate-800/60 rounded-xl" />
        <div className="flex-1 space-y-3 mt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-slate-800/40 rounded-xl" />
          ))}
        </div>
        <div className="h-16 bg-slate-800/60 rounded-xl" />
      </div>

      {/* Main Content Area Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Header Skeleton */}
        <div className="h-16 border-b border-slate-900 bg-slate-950/40 backdrop-blur-xl animate-pulse px-6 flex items-center justify-between">
          <div className="w-72 h-8 bg-slate-800/40 rounded-xl" />
          <div className="w-48 h-8 bg-slate-800/40 rounded-xl" />
        </div>
        {/* Content Skeleton */}
        <div className="flex-1 p-8 bg-slate-950 animate-pulse">
          <div className="h-full bg-slate-900/10 rounded-2xl border border-slate-900/20" />
        </div>
      </div>
    </div>
  );
}
