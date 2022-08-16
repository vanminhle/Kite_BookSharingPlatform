import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import helpSlice from './features/help/helpSlice';
import resetPasswordSlice from './features/help/resetPasswordSlice';
import allAccountsSlice from './features/allAccounts/allAccountsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    help: helpSlice,
    resetPassword: resetPasswordSlice,
    allAccounts: allAccountsSlice,
  },
});
