import React from 'react';
import dynamic from 'next/dynamic';

const RemoteLogout = dynamic(() => import('auth_remote/Logout'), { ssr: false });

export default function LogoutPage() {
  return <RemoteLogout />;
}
