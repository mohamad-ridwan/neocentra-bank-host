import React from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../components/Layout'), { ssr: false });
const DashboardContainer = dynamic(() => import('../components/DashboardContainer'), { ssr: false });

export default function Home() {
  return (
    <Layout>
      <DashboardContainer />
    </Layout>
  );
}
