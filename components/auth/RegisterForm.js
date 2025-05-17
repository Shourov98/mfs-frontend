'use client';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../lib/authSlice';
import { registerSchema } from '../../utils/zodSchemas';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    nid: '',
    pin: '',
    role: 'User', // match backend enum casing
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading, error } = useSelector((state) => state.auth);

  // Redirect to dashboard after successful registration/login
  useEffect(() => {
    if (user) {
      toast.success('Registration successful! Redirecting...');
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data with Zod schema
    const validation = registerSchema.safeParse(form);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }
    console.log(form);

    try {
      await dispatch(register(form)).unwrap();
      toast.success('Registration successful! Redirecting...');
      // Success message and redirect handled by useEffect on user change
    } catch (err) {
      // err may be an object or string, try fallback
      toast.error(err?.message || 'Registration failed');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          className="w-full mt-1 p-2 border rounded-lg"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium" htmlFor="mobileNumber">
            Phone
          </label>
          <input
            id="mobileNumber"
            name="mobileNumber"
            className="w-full mt-1 p-2 border rounded-lg"
            value={form.mobileNumber}
            onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full mt-1 p-2 border rounded-lg"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium" htmlFor="nid">
            NID
          </label>
          <input
            id="nid"
            name="nid"
            className="w-full mt-1 p-2 border rounded-lg"
            value={form.nid}
            onChange={(e) => setForm({ ...form, nid: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="pin">
            5-digit PIN
          </label>
          <input
            id="pin"
            name="pin"
            type="password"
            className="w-full mt-1 p-2 border rounded-lg"
            value={form.pin}
            onChange={(e) => setForm({ ...form, pin: e.target.value })}
            required
            minLength={5}
            maxLength={5}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="role">
          Account Type
        </label>
        <select
          id="role"
          name="role"
          className="w-full mt-1 p-2 border rounded-lg"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          required
        >
          <option value="User">User</option>
          <option value="Agent">Agent</option>
        </select>
      </div>
      {error && (
        <p className="text-red-600 font-semibold text-center">
          {error.message || 'Error occurred'}
        </p>
      )}
      <Button type="submit" className="w-full bg-blue-900" variant="default" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
}
