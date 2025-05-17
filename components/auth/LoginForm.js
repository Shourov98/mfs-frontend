'use client';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../lib/authSlice'; // adjust path if needed
import { showSuccess, showError } from '../../utils/toast'; // your sonner wrapper
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [form, setForm] = useState({ identifier: '', pin: '' });
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      showSuccess('Login successful! Redirecting...');
      router.push('/dashboard');
    }
  }, [user, router]);

  useEffect(() => {
    if (error) {
      showError(error.message || 'Login failed');
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.identifier.trim() || !form.pin.trim()) {
      showError('Please fill in both fields.');
      return;
    }

    if (form.pin.length !== 5) {
      showError('PIN must be exactly 5 digits.');
      return;
    }

    try {
      await dispatch(login(form)).unwrap();
    } catch {
      // error handled in useEffect
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
          Mobile or Email
        </label>
        <input
          id="identifier"
          type="text"
          className="w-full mt-1 p-2 border rounded-lg"
          placeholder="Enter mobile or email"
          value={form.identifier}
          onChange={(e) => setForm({ ...form, identifier: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
          PIN
        </label>
        <input
          id="pin"
          type="password"
          className="w-full mt-1 p-2 border rounded-lg"
          placeholder="5-digit PIN"
          value={form.pin}
          onChange={(e) => setForm({ ...form, pin: e.target.value })}
          required
          minLength={5}
          maxLength={5}
        />
      </div>
      <Button type="submit" className="w-full bg-blue-900" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
