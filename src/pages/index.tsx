import React from 'react';
import dynamic from 'next/dynamic';
import { useRemoteCSS } from '../hooks/useRemoteCSS';
import LocalLayoutSkeleton from '../components/layout/LocalLayoutSkeleton';

const Layout = dynamic(() => import('layout_remote/Layout'), { 
  ssr: false,
  loading: () => <LocalLayoutSkeleton />
});
const DashboardContainer = dynamic(() => import('../components/DashboardContainer'), { ssr: false });

export default function Home() {
  const LAYOUT_MFE_URL = process.env.NEXT_PUBLIC_LAYOUT_URL || "http://localhost:3345";
  const { loaded, error } = useRemoteCSS(LAYOUT_MFE_URL, "layout_remote", "./Layout");

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400 font-sans">
        Failed to load Layout styling.
      </div>
    );
  }
  if (!loaded) {
    return <LocalLayoutSkeleton />;
  }

  return (
    <Layout>
      <DashboardContainer />
    </Layout>
  );
}
