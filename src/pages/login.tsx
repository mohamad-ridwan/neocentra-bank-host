import React from 'react';
import dynamic from 'next/dynamic';

const RemoteLogin = dynamic(() => import('auth_remote/Login'), { ssr: false });

export default function LoginPage() {
  return <RemoteLogin />;
}
