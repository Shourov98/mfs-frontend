'use client';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBalance, clearError } from '../../lib/transactionSlice'; // adjust path
import { showError } from '../../utils/toast'; 

export default function BalanceReveal() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const balance = useSelector((state) => state.transaction.balance);
  const error = useSelector((state) => state.transaction.error);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error) {
      showError(error.message || 'Failed to fetch balance');
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const revealBalance = () => {
    dispatch(fetchBalance(token)); // fetch balance on click
    setShow(true);
    setTimeout(() => setShow(false), 5000);
  };

  return (
    <Button
      onClick={revealBalance}
      className="bg-white text-black hover:bg-gray-200 border border-lime-300 px-4 py-2 rounded-lg shadow"
    >
      {show ? `৳${balance?.toFixed(2) || '0.00'}` : 'Balance'}
    </Button>
  );
}
