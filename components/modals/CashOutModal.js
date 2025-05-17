'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cashOutAction, fetchBalance } from '../../lib/transactionSlice'; // adjust paths
import { showSuccess, showError } from '../../utils/toast';
import { Button } from '../ui/button';

export default function CashOutModal({ open, onClose }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.transaction.loading);
  const error = useSelector((state) => state.transaction.error);

  const [agentMobileNumber, setAgentMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (error) {
      showError(error.message || 'Cash-out failed');
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agentMobileNumber || !amount || !pin) {
      showError('All fields are required');
      return;
    }

    try {
      await dispatch(
        cashOutAction({
          data: { agentMobileNumber, amount: Number(amount), pin },
          token,
        })
      ).unwrap();

      showSuccess('Cash-out successful');
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
        <h3 className="text-lg font-semibold mb-4">Cash Out</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Agent Mobile Number"
            className="w-full border p-2 rounded"
            value={agentMobileNumber}
            onChange={(e) => setAgentMobileNumber(e.target.value)}
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
            placeholder="PIN"
            className="w-full border p-2 rounded"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button onClick={onClose} className="text-gray-100" type="button">
              Cancel
            </Button>
            <Button className="bg-sky-600 text-white px-4 py-1 rounded-lg" 
              disabled={loading}   type="submit">
              {loading ? 'Processing...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
