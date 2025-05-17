"use client";
export default function RecordDetailModal({ open, onClose, record = {} }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>
        <div className="space-y-2">
          <p><strong>ID:</strong> {record.id || 'TXN001'}</p>
          <p><strong>Type:</strong> {record.type || 'Send Money'}</p>
          <p><strong>Amount:</strong> {record.amount || '৳500'}</p>
          <p><strong>Date:</strong> {record.date || '2025-05-07'}</p>
          <p><strong>Status:</strong> {record.status || 'Completed'}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="text-blue-600 underline">Close</button>
        </div>
      </div>
    </div>
  );
}
