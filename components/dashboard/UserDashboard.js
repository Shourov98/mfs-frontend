"use client";

import UserTopSection from '@/components/top/UserTopSection';
import { Button } from '@/components/ui/button';
import SendMoneyModal from '../modals/SendMoneyModal';
import CashOutModal from '../modals/CashOutModal';
import BalanceReveal from '../shared/BalanceReveal';
import { useState } from 'react';
import TransactionHistory from '../shared/TransactionHistory';

export default function UserDashboard() {
  const [showSendModal, setShowSendModal] = useState(false);
  const [showCashOutModal, setShowCashOutModal] = useState(false);

  return (
    <div className="bg-sky-50 min-h-screen">
      <UserTopSection />

      <main className="mt-[30vh] px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Button onClick={() => setShowSendModal(true)}>Send Money</Button>
          <Button onClick={() => setShowCashOutModal(true)}>Cash Out</Button>
          <BalanceReveal />
        </div>

        <TransactionHistory role="User" />


        <SendMoneyModal open={showSendModal} onClose={() => setShowSendModal(false)} />
        <CashOutModal open={showCashOutModal} onClose={() => setShowCashOutModal(false)} />
      </main>
    </div>
  );
}
