"use client";

import { useState } from "react";
import ProfileForm from "../shared/ProfileForm";

export default function AdminProfile() {
  const [editing, setEditing] = useState(false);
  const admin = { // Dummy admin data
    name: "Admin User",
    email: "admin@example.com",
    phone: "017xxxxxxxx",
    role: "admin",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      {!editing ? (
        <div className="space-y-4">
          <p><strong>Name:</strong> {admin.name}</p>
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Phone:</strong> {admin.phone}</p>
          <button
            onClick={() => setEditing(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <ProfileForm user={admin} setEditing={setEditing} />
      )}
    </div>
  );
}
