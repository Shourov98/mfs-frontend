'use client';

import AgentTopSection from '../top/AgentTopSection';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import CashInModal from '../modals/CashInModal';
import BalanceReveal from '../shared/BalanceReveal';
import { useDispatch, useSelector } from 'react-redux';
import { submitCashRequest, submitWithdrawRequest } from '../../api/agentApi';
import { showSuccess, showError } from '../../utils/toast';
import TransactionHistory from '../shared/TransactionHistory';

export default function AgentDashboard() {
  const [showCashIn, setShowCashIn] = useState(false);
  const [loadingCashRequest, setLoadingCashRequest] = useState(false);
  const [loadingWithdrawRequest, setLoadingWithdrawRequest] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  // Cash Request button handler
  const handleCashRequest = async () => {
    setLoadingCashRequest(true);
    try {
      await submitCashRequest(token);
      showSuccess('Cash request submitted.');
    } catch (error) {
      showError(error.message || 'Failed to submit cash request.');
    } finally {
      setLoadingCashRequest(false);
    }
  };

  // Withdraw Request button handler
  const handleWithdrawRequest = async () => {
    setLoadingWithdrawRequest(true);
    try {
      await submitWithdrawRequest(token);
      showSuccess('Withdraw request submitted.');
    } catch (error) {
      showError(error.message || 'Failed to submit withdraw request.');
    } finally {
      setLoadingWithdrawRequest(false);
    }
  };

  return (
    <div className="bg-green-50 min-h-screen">
      <AgentTopSection />

      <main className="mt-[30vh] px-6 py-4">
        <div className="grid space-x-2 grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <Button onClick={() => setShowCashIn(true)}>User Cash In</Button>
          <BalanceReveal />
          <Button onClick={handleCashRequest} disabled={loadingCashRequest}>
            {loadingCashRequest ? 'Submitting...' : 'Cash Request'}
          </Button>
          <Button onClick={handleWithdrawRequest} disabled={loadingWithdrawRequest}>
            {loadingWithdrawRequest ? 'Submitting...' : 'Withdraw Request'}
          </Button>
        </div>

        <TransactionHistory role="Agent" />

        <CashInModal open={showCashIn} onClose={() => setShowCashIn(false)} />
      </main>
    </div>
  );
}
