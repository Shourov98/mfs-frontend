import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function sendMoney(data, token) {
  const res = await axios.post(`${BASE_URL}/api/send-money`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getTransactionHistory(id, token) {
  const res = await axios.get(`${BASE_URL}/api/transaction/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function cashIn(data, token) {
  const res = await axios.post(`${BASE_URL}/api/cash-in`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function cashOut(data, token) {
  const res = await axios.post(`${BASE_URL}/api/cash-out`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getBalance(token) {
  const res = await axios.get(`${BASE_URL}/api/balance`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
