import React from 'react';
import dynamic from 'next/dynamic';
import { useRemoteCSS } from '../hooks/useRemoteCSS';

const Layout = dynamic(() => import('layout_remote/Layout'), { ssr: false });
const DashboardContainer = dynamic(() => import('../components/DashboardContainer'), { ssr: false });

export default function Home() {
  const LAYOUT_MFE_URL = process.env.NEXT_PUBLIC_LAYOUT_URL || "http://localhost:3345";
  const { loaded, error } = useRemoteCSS(LAYOUT_MFE_URL, "layout_remote", "./Layout");

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400">
        Failed to load Layout styling.
      </div>
    );
  }
  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
          <span className="text-sm font-medium tracking-wide">Loading Layout styling...</span>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <DashboardContainer />
    </Layout>
  );
}
