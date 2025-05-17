import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-sky-50 p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl text-blue-900 font-bold text-center mb-6">Registration Form</h1>
        <RegisterForm />
      </div>
    </main>
  );
}
