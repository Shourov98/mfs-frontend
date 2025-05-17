import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function submitCashRequest(token) {
  const response = await axios.post(
    `${BASE_URL}/api/agent/cash-request`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function submitWithdrawRequest(token) {
  const response = await axios.post(
    `${BASE_URL}/api/agent/withdraw-request`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
