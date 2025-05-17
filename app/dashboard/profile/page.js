"use client";

import { useState } from "react";
import UserProfile from "@/components/profile/UserProfile";   // User profile component
import AgentProfile from "@/components/profile/AgentProfile"; // Agent profile component
import AdminProfile from "@/components/profile/AdminProfile"; // Admin profile component

import ChangePasswordModal from "@/components/modals/ChangePasswordModal"; // Modal for password change
import UpdateUserInfoModal from "@/components/modals/UpdateUserInfoModal";

export default function ProfilePage() {

  const [showChangeUserInfoModal, setShowChangeUserInfoModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const userRole = 'user';

  // Dynamically render profile based on the user's role
  const renderProfileComponent = () => {
    switch (userRole) {
      case "user":
        return <UserProfile />;
      case "agent":
        return <AgentProfile />;
      case "admin":
        return <AdminProfile />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
      {renderProfileComponent()}

      {/* Modals */}
      <UpdateUserInfoModal open={showChangeUserInfoModal} onClose={() => setShowChangeUserInfoModal(false)} />
      <ChangePasswordModal open={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)} />

      {/* Buttons to trigger modals */}
      <div className="mt-6 space-x-4">
        <button
          onClick={() => setShowChangeUserInfoModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit Info
        </button>
        <button
          onClick={() => setShowChangePasswordModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Change Password
        </button>
      </div>
    </main>
  );
}
