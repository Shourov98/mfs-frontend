'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cashInAction, fetchBalance } from '../../lib/transactionSlice'; // adjust paths
import { showSuccess, showError } from '../../utils/toast';

export default function CashInModal({ open, onClose }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.transaction.loading);
  const error = useSelector((state) => state.transaction.error);

  const [receiverMobileNumber, setReceiverMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (error) {
      showError(error.message || 'Cash-in failed');
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!receiverMobileNumber || !amount || !pin) {
      showError('All fields are required');
      return;
    }

    try {
      await dispatch(
        cashInAction({
          data: { receiverMobileNumber, amount: Number(amount), pin },
          token,
        })
      ).unwrap();

      showSuccess('Cash-in successful');
      dispatch(fetchBalance(token));
      onClose();
    } catch (err) {
      // error handled by useEffect
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Cash In (Agent)</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Receiver Mobile Number"
            className="w-full border p-2 rounded"
            value={receiverMobileNumber}
            onChange={(e) => setReceiverMobileNumber(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-full border p-2 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="password"
            placeholder="Agent PIN"
            className="w-full border p-2 rounded"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="text-gray-500">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-1 rounded">
              {loading ? 'Processing...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
