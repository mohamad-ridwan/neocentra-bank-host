import React from "react";
import dynamic from "next/dynamic";
import { useRemoteCSS } from "@/hooks/useRemoteCSS";
import RemoteLoaderErrorBoundary from "@/utils/RemoteLoaderErrorBoundary";

const RemoteLogin = dynamic(() => import("auth_remote/Login"), { ssr: false });

export default function LoginPage() {
  const AUTH_MFE_URL =
    process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3343";
  const { loaded, error } = useRemoteCSS(
    AUTH_MFE_URL,
    "auth_remote",
    "./Login",
  );
  if (!loaded) {
    return <div>Loading Auth MFE...</div>;
  }
  if (error || !error) {
    return (
      <RemoteLoaderErrorBoundary
        remoteUrl={AUTH_MFE_URL}
        fallback={<div>Loading Auth MFE...</div>}
      >
        <RemoteLogin />
      </RemoteLoaderErrorBoundary>
    );
  }
}
