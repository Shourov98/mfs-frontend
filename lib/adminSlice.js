import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPendingAgentApprovals,
  getPendingCashRequests,
  getPendingWithdrawRequests,
  getBlockedUsers,
  respondAgentApproval,
  respondCashRequest,
  respondWithdrawRequest,
  unblockUser,
} from '../api/adminApi';

// Fetch thunks
export const fetchAgentRequests = createAsyncThunk(
  'admin/fetchAgentRequests',
  async (token, { rejectWithValue }) => {
    try {
      const response = await getPendingAgentApprovals(token);
      return response.agents;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchCashRequests = createAsyncThunk(
  'admin/fetchCashRequests',
  async (token, { rejectWithValue }) => {
    try {
      const response = await getPendingCashRequests(token);
      return response.agents;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchWithdrawRequests = createAsyncThunk(
  'admin/fetchWithdrawRequests',
  async (token, { rejectWithValue }) => {
    try {
      const response = await getPendingWithdrawRequests(token);
      return response.agents;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchBlockedUsers = createAsyncThunk(
  'admin/fetchBlockedUsers',
  async (token, { rejectWithValue }) => {
    try {
      const response = await getBlockedUsers(token);
      return response.blocked;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Action thunks for approve/reject/unblock
export const approveRejectAgentRequest = createAsyncThunk(
  'admin/approveRejectAgentRequest',
  async ({ id, actionType, token }, { rejectWithValue }) => {
    try {
      await respondAgentApproval(id, actionType, token);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const approveRejectCashRequestAction = createAsyncThunk(
  'admin/approveRejectCashRequest',
  async ({ id, actionType, token }, { rejectWithValue }) => {
    try {
      await respondCashRequest(id, actionType, token);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const approveRejectWithdrawRequestAction = createAsyncThunk(
  'admin/approveRejectWithdrawRequest',
  async ({ id, actionType, token }, { rejectWithValue }) => {
    try {
      await respondWithdrawRequest(id, actionType, token);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const unblockUserAction = createAsyncThunk(
  'admin/unblockUser',
  async ({ mobileNumber, token }, { rejectWithValue }) => {
    try {
      await unblockUser(mobileNumber, token);
      return mobileNumber;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  agentRequests: { data: [], loading: false, error: null },
  cashRequests: { data: [], loading: false, error: null },
  withdrawRequests: { data: [], loading: false, error: null },
  blockedUsers: { data: [], loading: false, error: null },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminError(state, action) {
      const key = action.payload;
      if (state[key]) {
        state[key].error = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Agent Requests
      .addCase(fetchAgentRequests.pending, (state) => {
        state.agentRequests.loading = true;
        state.agentRequests.error = null;
      })
      .addCase(fetchAgentRequests.fulfilled, (state, action) => {
        state.agentRequests.loading = false;
        state.agentRequests.data = action.payload;
      })
      .addCase(fetchAgentRequests.rejected, (state, action) => {
        state.agentRequests.loading = false;
        state.agentRequests.error = action.payload;
      })

      // Cash Requests
      .addCase(fetchCashRequests.pending, (state) => {
        state.cashRequests.loading = true;
        state.cashRequests.error = null;
      })
      .addCase(fetchCashRequests.fulfilled, (state, action) => {
        state.cashRequests.loading = false;
        state.cashRequests.data = action.payload;
      })
      .addCase(fetchCashRequests.rejected, (state, action) => {
        state.cashRequests.loading = false;
        state.cashRequests.error = action.payload;
      })

      // Withdraw Requests
      .addCase(fetchWithdrawRequests.pending, (state) => {
        state.withdrawRequests.loading = true;
        state.withdrawRequests.error = null;
      })
      .addCase(fetchWithdrawRequests.fulfilled, (state, action) => {
        state.withdrawRequests.loading = false;
        state.withdrawRequests.data = action.payload;
      })
      .addCase(fetchWithdrawRequests.rejected, (state, action) => {
        state.withdrawRequests.loading = false;
        state.withdrawRequests.error = action.payload;
      })

      // Blocked Users
      .addCase(fetchBlockedUsers.pending, (state) => {
        state.blockedUsers.loading = true;
        state.blockedUsers.error = null;
      })
      .addCase(fetchBlockedUsers.fulfilled, (state, action) => {
        state.blockedUsers.loading = false;
        state.blockedUsers.data = action.payload;
      })
      .addCase(fetchBlockedUsers.rejected, (state, action) => {
        state.blockedUsers.loading = false;
        state.blockedUsers.error = action.payload;
      })

      // Approve/Reject Agent Request
      .addCase(approveRejectAgentRequest.fulfilled, (state, action) => {
        state.agentRequests.data = state.agentRequests.data.filter(agent => agent.id !== action.payload);
      })
      .addCase(approveRejectAgentRequest.rejected, (state, action) => {
        state.agentRequests.error = action.payload;
      })

      // Approve/Reject Cash Request
      .addCase(approveRejectCashRequestAction.fulfilled, (state, action) => {
        state.cashRequests.data = state.cashRequests.data.filter(agent => agent.id !== action.payload);
      })
      .addCase(approveRejectCashRequestAction.rejected, (state, action) => {
        state.cashRequests.error = action.payload;
      })

      // Approve/Reject Withdraw Request
      .addCase(approveRejectWithdrawRequestAction.fulfilled, (state, action) => {
        state.withdrawRequests.data = state.withdrawRequests.data.filter(agent => agent.id !== action.payload);
      })
      .addCase(approveRejectWithdrawRequestAction.rejected, (state, action) => {
        state.withdrawRequests.error = action.payload;
      })

      // Unblock User
      .addCase(unblockUserAction.fulfilled, (state, action) => {
        state.blockedUsers.data = state.blockedUsers.data.filter(user => user.mobileNumber !== action.payload);
      })
      .addCase(unblockUserAction.rejected, (state, action) => {
        state.blockedUsers.error = action.payload;
      });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
