"use client";

export default function UpdateUserInfoModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Change User Info</h3>
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full border p-2 rounded" />
          <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Phone" className="w-full border p-2 rounded" />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
