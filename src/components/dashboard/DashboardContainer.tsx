import React from "react";
import { useRemoteCSS } from "../../hooks/useRemoteCSS";
import LocalDashboardSkeleton from "./LocalDashboardSkeleton";
import ConnectionErrorCard from "../error-ui/ConnectionErrorCard";
import dynamic from "next/dynamic";
import RemoteLoaderErrorBoundary from "../../utils/RemoteLoaderErrorBoundary";

const FederatedDashboard = dynamic(() => import("dashboard_remote/Dashboard"), {
  ssr: false,
  loading: () => <LocalDashboardSkeleton />,
});

export default function DashboardContainer() {
  const DASHBOARD_MFE_URL =
    process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3344";
  const { loaded, error } = useRemoteCSS(
    DASHBOARD_MFE_URL,
    "dashboard_remote",
    "./Dashboard",
  );

  if (error) {
    return (
      <ConnectionErrorCard
        title="Gagal memuat style dashboard"
        description="Terjadi kesalahan saat mengunduh berkas stylesheet dari MFE Dashboard. Silakan periksa koneksi Anda dan coba lagi."
        error={error}
        onRetry={() => window.location.reload()}
        retryText="Reload Page"
      />
    );
  }

  if (!loaded) {
    return <LocalDashboardSkeleton />;
  }

  return (
    <RemoteLoaderErrorBoundary
      remoteUrl={DASHBOARD_MFE_URL}
      fallback={
        <ConnectionErrorCard
          title="Gagal memuat dashboard"
          description="Terjadi kesalahan saat memuat dashboard. Silakan periksa koneksi Anda dan coba lagi."
          error={error}
          onRetry={() => window.location.reload()}
          retryText="Reload Page"
        />
      }
    >
      <FederatedDashboard />
    </RemoteLoaderErrorBoundary>
  );
}
