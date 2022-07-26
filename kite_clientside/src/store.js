import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import helpSlice from './features/help/helpSlice';
import resetPasswordSlice from './features/help/resetPasswordSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    help: helpSlice,
    resetPassword: resetPasswordSlice,
  },
});
