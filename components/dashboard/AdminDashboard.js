'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AdminTopSection from '../top/AdminTopSection';
import BalanceReveal from '../shared/BalanceReveal';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

import {
  fetchAgentRequests,
  fetchCashRequests,
  fetchWithdrawRequests,
  fetchBlockedUsers,
  approveRejectAgentRequest,
  approveRejectCashRequestAction,
  approveRejectWithdrawRequestAction,
  unblockUserAction,
} from '../../lib/adminSlice';

import { showError, showSuccess } from '../../utils/toast';
import BlockUserModal from '../modals/BlockUserModal';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [activeTab, setActiveTab] = useState('agent');
  const [showBlockUserModal, setShowBlockUserModal] = useState(false);

  const {
    agentRequests,
    cashRequests,
    withdrawRequests,
    blockedUsers,
  } = useSelector((state) => state.admin);

  // Lazy fetch data on tab change
  useEffect(() => {
    if (!token) return;

    switch (activeTab) {
      case 'agent':
        if (agentRequests.data.length === 0 && !agentRequests.loading) {
          dispatch(fetchAgentRequests(token));
        }
        break;
      case 'cash':
        if (cashRequests.data.length === 0 && !cashRequests.loading) {
          dispatch(fetchCashRequests(token));
        }
        break;
      case 'withdraw':
        if (withdrawRequests.data.length === 0 && !withdrawRequests.loading) {
          dispatch(fetchWithdrawRequests(token));
        }
        break;
      case 'blocked':
        if (blockedUsers.data.length === 0 && !blockedUsers.loading) {
          dispatch(fetchBlockedUsers(token));
        }
        break;
      default:
        break;
    }
  }, [activeTab, token, dispatch, agentRequests.data.length, agentRequests.loading, cashRequests.data.length, cashRequests.loading, withdrawRequests.data.length, withdrawRequests.loading, blockedUsers.data.length, blockedUsers.loading]);

  // Show error toast on errors
  useEffect(() => {
    [agentRequests.error, cashRequests.error, withdrawRequests.error, blockedUsers.error]
      .filter(Boolean)
      .forEach((error) => showError(error.message || error));
  }, [agentRequests.error, cashRequests.error, withdrawRequests.error, blockedUsers.error]);

  // Handlers for approve/reject/unblock
  const handleApproveAgent = (id) => {
    dispatch(approveRejectAgentRequest({ id, actionType: 'approve', token }))
      .unwrap()
      .then(() => showSuccess('Agent approved'))
      .catch((err) => showError(err.message || 'Error approving agent'));
  };
  const handleRejectAgent = (id) => {
    dispatch(approveRejectAgentRequest({ id, actionType: 'reject', token }))
      .unwrap()
      .then(() => showSuccess('Agent rejected'))
      .catch((err) => showError(err.message || 'Error rejecting agent'));
  };

  const handleApproveCash = (id) => {
    dispatch(approveRejectCashRequestAction({ id, actionType: 'approve', token }))
      .unwrap()
      .then(() => showSuccess('Cash request approved'))
      .catch((err) => showError(err.message || 'Error approving cash request'));
  };
  const handleRejectCash = (id) => {
    dispatch(approveRejectCashRequestAction({ id, actionType: 'reject', token }))
      .unwrap()
      .then(() => showSuccess('Cash request rejected'))
      .catch((err) => showError(err.message || 'Error rejecting cash request'));
  };

  const handleApproveWithdraw = (id) => {
    dispatch(approveRejectWithdrawRequestAction({ id, actionType: 'approve', token }))
      .unwrap()
      .then(() => showSuccess('Withdraw request approved'))
      .catch((err) => showError(err.message || 'Error approving withdraw request'));
  };
  const handleRejectWithdraw = (id) => {
    dispatch(approveRejectWithdrawRequestAction({ id, actionType: 'reject', token }))
      .unwrap()
      .then(() => showSuccess('Withdraw request rejected'))
      .catch((err) => showError(err.message || 'Error rejecting withdraw request'));
  };

  const handleUnblockUser = (mobileNumber) => {
    dispatch(unblockUserAction({ mobileNumber, token }))
      .unwrap()
      .then(() => showSuccess('User unblocked'))
      .catch((err) => showError(err.message || 'Error unblocking user'));
  };

  // Render table rows:

  const renderAgentRequestsRows = () =>
    agentRequests.data.map((agent) => (
      <TableRow key={agent.id} className="hover:bg-purple-50">
        <TableCell>{agent.id}</TableCell>
        <TableCell>{agent.name}</TableCell>
        <TableCell>{agent.mobileNumber}</TableCell>
        <TableCell>{agent.email}</TableCell>
        <TableCell className="space-x-2">
          <Button onClick={() => handleApproveAgent(agent.id)} className="bg-green-600 text-white">Approve</Button>
          <Button onClick={() => handleRejectAgent(agent.id)} className="bg-red-600 text-white">Reject</Button>
        </TableCell>
      </TableRow>
    ));

  const renderCashRequestsRows = () =>
    cashRequests.data.map((agent) => (
      <TableRow key={agent.mobileNumber} className="hover:bg-purple-50">
        <TableCell>{agent.name}</TableCell>
        <TableCell>{agent.mobileNumber}</TableCell>
        <TableCell>{agent.cashRequests?.[0]?.status || '-'}</TableCell>
        <TableCell>{agent.cashRequests?.[0]?.createdAt ? new Date(agent.cashRequests[0].createdAt).toLocaleString() : '-'}</TableCell>
        <TableCell className="space-x-2">
          <Button onClick={() => handleApproveCash(agent.id)} className="bg-green-600 text-white">Approve</Button>
          <Button onClick={() => handleRejectCash(agent.id)} className="bg-red-600 text-white">Reject</Button>
        </TableCell>
      </TableRow>
    ));

  const renderWithdrawRequestsRows = () =>
    withdrawRequests.data.map((agent) => (
      <TableRow key={agent.mobileNumber} className="hover:bg-purple-50">
        <TableCell>{agent.name}</TableCell>
        <TableCell>{agent.mobileNumber}</TableCell>
        <TableCell>{agent.income}</TableCell>
        <TableCell>{agent.withdrawRequests?.[0]?.status || '-'}</TableCell>
        <TableCell>{agent.withdrawRequests?.[0]?.createdAt ? new Date(agent.withdrawRequests[0].createdAt).toLocaleString() : '-'}</TableCell>
        <TableCell className="space-x-2">
          <Button onClick={() => handleApproveWithdraw(agent.id)} className="bg-green-600 text-white">Approve</Button>
          <Button onClick={() => handleRejectWithdraw(agent.id)} className="bg-red-600 text-white">Reject</Button>
        </TableCell>
      </TableRow>
    ));

  const renderBlockedUsersRows = () =>
    blockedUsers.data.map((user) => (
      <TableRow key={user.mobileNumber} className="hover:bg-purple-50">
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.mobileNumber}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <Button onClick={() => handleUnblockUser(user.mobileNumber)} className="bg-blue-600 text-white">Unblock</Button>
        </TableCell>
      </TableRow>
    ));

  return (
    <div className="bg-purple-50 min-h-screen">
      <AdminTopSection />

      <main className="mt-[30vh] px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <BalanceReveal />
          <Button onClick={() => setShowBlockUserModal(true)} className="bg-red-700 text-white">Block User</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-purple-200 mb-4 w-full">
            <TabsTrigger value="agent">Agent Requests</TabsTrigger>
            <TabsTrigger value="cash">Cash Requests</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw Requests</TabsTrigger>
            <TabsTrigger value="blocked">Blocked Users</TabsTrigger>
          </TabsList>

          <TabsContent value="agent">
            <h2 className="text-xl font-semibold mb-4">Agent Approval Requests</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Table>
                <TableHeader>
                  <TableRow className="bg-purple-100 text-purple-900">
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agentRequests.loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : agentRequests.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                        No agent requests found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    renderAgentRequestsRows()
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="cash">
            <h2 className="text-xl font-semibold mb-4">Pending Cash Requests</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Table>
                <TableHeader>
                  <TableRow className="bg-purple-100 text-purple-900">
                    <TableHead>Name</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cashRequests.loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : cashRequests.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                        No cash requests found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    renderCashRequestsRows()
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="withdraw">
            <h2 className="text-xl font-semibold mb-4">Pending Withdraw Requests</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Table>
                <TableHeader>
                  <TableRow className="bg-purple-100 text-purple-900">
                    <TableHead>Name</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Income</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawRequests.loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : withdrawRequests.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                        No withdraw requests found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    renderWithdrawRequestsRows()
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="blocked">
            <h2 className="text-xl font-semibold mb-4">Blocked Users</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Table>
                <TableHeader>
                  <TableRow className="bg-purple-100 text-purple-900">
                    <TableHead>Name</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blockedUsers.loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : blockedUsers.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                        No blocked users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    renderBlockedUsersRows()
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        <BlockUserModal
          open={showBlockUserModal}
          onClose={() => setShowBlockUserModal(false)}
          onBlock={(mobileNumber) => {
            // Handle block user logic here
            setShowBlockUserModal(false);
          }}
        />
      </main>
    </div>
  );
}
