import React from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../components/Layout'), { ssr: false });
const FederatedDashboard = dynamic(() => import('dashboard_remote/Dashboard'), { ssr: false });

export default function Home() {
  return (
    <Layout>
      <FederatedDashboard />
    </Layout>
  );
}
