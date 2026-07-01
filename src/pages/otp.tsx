import React from "react";
import dynamic from "next/dynamic";
import { useRemoteCSS } from "@/hooks/useRemoteCSS";
import RemoteLoaderErrorBoundary from "@/utils/RemoteLoaderErrorBoundary";

const RemoteVerifyOtp = dynamic(() => import("auth_remote/VerifyOtp"), { ssr: false });

export default function OtpPage() {
  const AUTH_MFE_URL =
    process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3343";
  const { loaded, error } = useRemoteCSS(
    AUTH_MFE_URL,
    "auth_remote",
    "./VerifyOtp",
  );

  if (!loaded) {
    return <div>Loading OTP MFE...</div>;
  }

  if (error || !error) {
    return (
      <RemoteLoaderErrorBoundary
        remoteUrl={AUTH_MFE_URL}
        fallback={<div>Loading OTP MFE...</div>}
      >
        <RemoteVerifyOtp />
      </RemoteLoaderErrorBoundary>
    );
  }
}

