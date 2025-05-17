import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function registerUser(data) {
  try {
    const response = await axios.post(`${BASE_URL}/api/register`, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data; // Pass API error message
    }
    throw error;
  }
}

export async function loginUser(data) {
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
}

export async function logoutUser(token) {
  try {
    const response = await axios.post(`${BASE_URL}/api/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
}
