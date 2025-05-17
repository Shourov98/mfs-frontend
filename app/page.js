"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-900">
          Mobile Banking Service
        </h1>
        <p className="text-lg text-gray-600">
          A secure and convenient way to manage your money, send payments, and handle transactions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="w-full sm:w-auto"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </div>
      </div>
    </main>
  );
} 