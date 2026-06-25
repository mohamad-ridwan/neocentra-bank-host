import React from 'react';
import dynamic from 'next/dynamic';

const RemoteVerifyOtp = dynamic(() => import('auth_remote/VerifyOtp'), { ssr: false });

export default function OtpPage() {
  return <RemoteVerifyOtp />;
}
