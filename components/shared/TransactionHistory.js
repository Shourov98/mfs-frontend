'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionHistory } from '../../lib/transactionSlice';
import { showError } from '../../utils/toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function TransactionHistory({ role }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const { transactions, loading, error } = useSelector((state) => state.transaction);

  useEffect(() => {
    if (user && token) {
      dispatch(fetchTransactionHistory({ id: user.id, token }));
    }
  }, [dispatch, user, token]);

  useEffect(() => {
    if (error) showError(error.message || 'Failed to load transactions');
  }, [error]);

  const headerBg =
    role === 'Agent' ? 'bg-green-100 text-green-900' : 'bg-blue-100 text-blue-900';

  return (
    <section className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className={headerBg}>
            <TableRow>
              <TableHead className="p-2">Txn ID</TableHead>
              <TableHead className="p-2">Type</TableHead>
              <TableHead className="p-2">Amount</TableHead>
              <TableHead className="p-2">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                  Loading...
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((txn) => (
                <TableRow key={txn.transactionId} className="hover:bg-gray-50">
                  <TableCell className="p-2">{txn.transactionId}</TableCell>
                  <TableCell className="p-2">{txn.type}</TableCell>
                  <TableCell className="p-2">
                    ৳{txn.amount} {txn.fee > 0 ? `(+৳${txn.fee})` : ''}
                  </TableCell>
                  <TableCell className="p-2">{new Date(txn.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
