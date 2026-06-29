import React from "react";
import { useRemoteCSS } from "../hooks/useRemoteCSS";
import dynamic from "next/dynamic";
import LocalDashboardSkeleton from "./dashboard/LocalDashboardSkeleton";

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
      <div className="p-4 mb-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-sans">
        Gagal memuat style dashboard: {error.message}
      </div>
    );
  }

  if (!loaded) {
    return <LocalDashboardSkeleton />;
  }

  return <FederatedDashboard />;
}
