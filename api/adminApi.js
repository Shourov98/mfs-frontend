import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// Get pending agent approvals
export async function getPendingAgentApprovals(token) {
  const res = await axios.get(`${BASE_URL}/api/admin/agent-approval`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Approve or reject an agent by ID
export async function respondAgentApproval(id, action, token) {
  const res = await axios.post(
    `${BASE_URL}/api/admin/agent-approval/${id}`,
    { action }, // action: 'approve' or 'reject'
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

// Get pending cash requests
export async function getPendingCashRequests(token) {
  const res = await axios.get(`${BASE_URL}/api/admin/cash-approval`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Approve or reject cash request by ID
export async function respondCashRequest(id, action, token) {
  const res = await axios.post(
    `${BASE_URL}/api/admin/cash-approval/${id}`,
    { action },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

// Get pending withdraw requests
export async function getPendingWithdrawRequests(token) {
  const res = await axios.get(`${BASE_URL}/api/admin/withdraw-request`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Approve or reject withdraw request by ID
export async function respondWithdrawRequest(id, action, token) {
  const res = await axios.post(
    `${BASE_URL}/api/admin/withdraw-request/${id}`,
    { action },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

// Get blocked users
export async function getBlockedUsers(token) {
  const res = await axios.get(`${BASE_URL}/api/admin/blocked-users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Block a user by mobile number
export async function blockUser(mobileNumber, token) {
  const res = await axios.post(
    `${BASE_URL}/api/admin/block-user`,
    { mobileNumber },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

// Unblock a user by mobile number
export async function unblockUser(mobileNumber, token) {
  const res = await axios.post(
    `${BASE_URL}/api/admin/unblock-user`,
    { mobileNumber },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}
