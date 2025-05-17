import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendMoney, getTransactionHistory, cashIn, cashOut, getBalance } from '../api/transactionApi';

const initialState = {
  transactions: [],
  total: 0,
  page: 1,
  pages: 1,
  balance: 0,
  income: 0,
  loading: false,
  error: null,
};

// Thunks

export const fetchBalance = createAsyncThunk('transaction/fetchBalance', async (token, { rejectWithValue }) => {
  try {
    return await getBalance(token);
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const fetchTransactionHistory = createAsyncThunk(
  'transaction/fetchTransactionHistory',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await getTransactionHistory(id, token);
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const sendMoneyAction = createAsyncThunk(
  'transaction/sendMoney',
  async ({ data, token }, { rejectWithValue }) => {
    try {
      return await sendMoney(data, token);
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const cashInAction = createAsyncThunk(
  'transaction/cashIn',
  async ({ data, token }, { rejectWithValue }) => {
    try {
      return await cashIn(data, token);
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const cashOutAction = createAsyncThunk(
  'transaction/cashOut',
  async ({ data, token }, { rejectWithValue }) => {
    try {
      return await cashOut(data, token);
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchBalance
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.balance;
        state.income = action.payload.income || 0;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchTransactionHistory
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // sendMoneyAction
      .addCase(sendMoneyAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMoneyAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendMoneyAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // cashInAction
      .addCase(cashInAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cashInAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(cashInAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // cashOutAction
      .addCase(cashOutAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cashOutAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(cashOutAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = transactionSlice.actions;

export default transactionSlice.reducer;
