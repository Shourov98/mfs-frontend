import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // your auth slice reducer
import transactionReducer from './transactionSlice'; // your transaction slice reducer
import adminReducer from './adminSlice'; // your admin slice reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer, 
    admin: adminReducer,
  },
});
