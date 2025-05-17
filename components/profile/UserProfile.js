"use client";

import { useState } from "react";
import ProfileForm from "../shared/ProfileForm";

export default function UserProfile() {
  const [editing, setEditing] = useState(false);
  const user = { // Dummy data, this would be fetched via API
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "017xxxxxxxx",
    role: "user",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      {!editing ? (
        <div className="space-y-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <ProfileForm user={user} setEditing={setEditing} />
      )}
    </div>
  );
}
