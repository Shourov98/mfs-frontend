import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser } from '../api/auth'; // API helper functions

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    return await registerUser(data);
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    return await loginUser(data);
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const logout = createAsyncThunk('auth/logout', async (token, { rejectWithValue }) => {
  try {
    return await logoutUser(token);
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError, clearUser } = authSlice.actions;

export default authSlice.reducer;
