import React from 'react';
import { useRemoteCSS } from '../hooks/useRemoteCSS';
import dynamic from 'next/dynamic';

const FederatedDashboard = dynamic(() => import('dashboard_remote/Dashboard'), { ssr: false });

export default function DashboardContainer() {
  const DASHBOARD_MFE_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:3344';
  const { loaded, error } = useRemoteCSS(DASHBOARD_MFE_URL, 'dashboard_remote', './Dashboard');

  if (error) {
    return (
      <div className="p-4 mb-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
        Gagal memuat style dashboard: {error.message}
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="flex flex-col items-center justify-center p-12 gap-3 text-slate-400 font-sans">
        <div className="w-8 h-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
        <span className="text-sm font-medium tracking-wide">Memuat komponen dan stylesheet dashboard...</span>
      </div>
    );
  }

  return <FederatedDashboard />;
}
