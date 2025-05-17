"use client";

import { useState } from "react";
import ProfileForm from "../shared/ProfileForm";

export default function AgentProfile() {
  const [editing, setEditing] = useState(false);
  const agent = { // Dummy data for agent
    name: "Agent Smith",
    email: "agent.smith@example.com",
    phone: "017xxxxxxxx",
    role: "agent",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      {!editing ? (
        <div className="space-y-4">
          <p><strong>Name:</strong> {agent.name}</p>
          <p><strong>Email:</strong> {agent.email}</p>
          <p><strong>Phone:</strong> {agent.phone}</p>
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <ProfileForm user={agent} setEditing={setEditing} />
      )}
    </div>
  );
}
