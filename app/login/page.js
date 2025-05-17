// app/login/page.js
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-sky-50 p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl text-blue-900 font-bold text-center mb-6">Login Form</h1>
        <LoginForm />
      </div>
    </main>
  );
}
