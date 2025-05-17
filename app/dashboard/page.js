'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import AgentDashboard from '@/components/dashboard/AgentDashboard';
import UserDashboard from '@/components/dashboard/UserDashboard';

export default function DashboardPage() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.push('/'); // redirect to home if not logged in
    }
  }, [user, router]);

  if (!user) {
    return null; // or loading spinner while redirecting
  }

  switch (user.role) {
    case 'Admin':
      return <AdminDashboard />;
    case 'Agent':
      return <AgentDashboard />;
    case 'User':
    default:
      return <UserDashboard />;
  }
}
