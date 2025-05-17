'use client';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { logout } from '../../lib/authSlice'; // Adjust the import path
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { showSuccess, showError } from '../../utils/toast';
  

export default function AgentTopSection() {

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
    <header className="fixed top-0 left-0 right-0 h-[30vh] bg-green-200 shadow-md flex items-center justify-between px-6 z-50">
      <h1 className="text-xl font-bold text-green-900">👋 Hello, Agent</h1>
      <div className="space-x-2">
        <Button className="text-green-700 underline">Profile</Button>
        <Button 
          className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? 'Logging out...' : 'Logout'}
        </Button>
      </div>
    </header>
  );
}
