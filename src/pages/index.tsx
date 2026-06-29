import React from "react";
import dynamic from "next/dynamic";
import { useRemoteCSS } from "../hooks/useRemoteCSS";
import LocalLayoutSkeleton from "../components/layout/LocalLayoutSkeleton";
import RemoteLoaderErrorBoundary from "@/utils/RemoteLoaderErrorBoundary";
import LayoutErrorFallback from "@/components/layout/LayoutErrorFallback";

const Layout = dynamic(() => import("layout_remote/Layout"), {
  ssr: false,
  loading: () => <LocalLayoutSkeleton />,
});
const DashboardContainer = dynamic(
  () => import("../components/dashboard/DashboardContainer"),
  { ssr: false },
);

export default function Home() {
  const LAYOUT_MFE_URL =
    process.env.NEXT_PUBLIC_LAYOUT_URL || "http://localhost:3345";
  const { loaded, error } = useRemoteCSS(
    LAYOUT_MFE_URL,
    "layout_remote",
    "./Layout",
  );

  if (!loaded) {
    return <LocalLayoutSkeleton />;
  }

  if (error || !error) {
    return (
      <RemoteLoaderErrorBoundary
        remoteUrl={LAYOUT_MFE_URL}
        fallback={
          <LayoutErrorFallback
            error={error}
            onRetry={() => window.location.reload()}
          >
            <DashboardContainer />
          </LayoutErrorFallback>
        }
      >
        <Layout>
          <DashboardContainer />
        </Layout>
      </RemoteLoaderErrorBoundary>
    );
  }
}
