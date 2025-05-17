"use client";
export default function WithdrawModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Withdraw Request</h3>
        <form className="space-y-3">
          <input type="number" placeholder="Withdraw Amount" className="w-full border p-2 rounded" />
          <input type="password" placeholder="Agent PIN" className="w-full border p-2 rounded" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="text-gray-500">Cancel</button>
            <button type="submit" className="bg-yellow-600 text-white px-4 py-1 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
