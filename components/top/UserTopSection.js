'use client';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { logout } from '../../lib/authSlice'; // Adjust the import path
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { showSuccess, showError } from '../../utils/toast';

export default function UserTopSection() {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await dispatch(logout(token)).unwrap();
      showSuccess('Logged out successfully');
      router.push('/login'); // Redirect to login page after logout
    } catch (error) {
      showError(error.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="fixed top-0 align-middle left-0 right-0 h-[20vh] bg-sky-200 shadow-md flex items-center justify-between px-6 z-50">
      <h1 className="text-xl font-bold text-sky-900">👋 Hello, User</h1>
      <div className="space-x-2">
        <Button className="text-sky-100">Profile</Button>
        <Button
          className="bg-sky-600 text-white px-3 py-1 rounded-lg hover:bg-sky-700"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? 'Logging out...' : 'Logout'}
        </Button>
      </div>
    </header>
  );
}
