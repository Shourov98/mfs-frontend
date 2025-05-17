'use client';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { sendMoneyAction, fetchBalance } from '../../lib/transactionSlice'; // adjust paths
import { showSuccess, showError } from '../../utils/toast';

export default function SendMoneyModal({ open, onClose }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.transaction.loading);
  const error = useSelector((state) => state.transaction.error);

  const [receiverMobileNumber, setReceiverMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (error) {
      showError(error.message || 'Failed to send money');
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
        sendMoneyAction({
          data: { receiverMobileNumber, amount: Number(amount), pin },
          token,
        })
      ).unwrap();

      showSuccess('Money sent successfully');
      dispatch(fetchBalance(token)); // refresh balance
      onClose(); // close modal
      // optionally clear form fields here
    } catch (err) {
      // error handled by useEffect
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h3 className="text-lg font-bold mb-4">Send Money</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="PIN"
            className="w-full border p-2 rounded"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <div className="mt-4 flex justify-end space-x-2">
            <Button onClick={onClose} className="text-gray-100" type="button">
              Cancel
            </Button>
            <Button className="bg-sky-600 text-white px-4 py-1 rounded-lg" disabled={loading} type="submit">
              {loading ? 'Sending...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
