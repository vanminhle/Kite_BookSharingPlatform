import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

const initialState = {
  isLoading: false,
  emailSendingModal: false,
};

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (help, thunkAPI) => {
    try {
      const resp = await customFetch.post(
        'http/api/users/forgotPassword',
        help
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const verificationEmail = createAsyncThunk(
  'user/sendEmailVerification',
  async (help, thunkAPI) => {
    try {
      const resp = await customFetch.post(
        'http/api/users/sendEmailVerification',
        help
      );
      return resp.data;
    } catch (error) {
      //console.log(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const helpSlice = createSlice({
  name: 'help',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.emailSendingModal = false;
    },
  },
  extraReducers: {
    //RESET PASSWORD
    [forgotPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [forgotPassword.fulfilled]: (state) => {
      state.isLoading = false;
      state.emailSendingModal = true;
    },
    [forgotPassword.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    //EMAIL VERIFICATION
    [verificationEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [verificationEmail.fulfilled]: (state) => {
      state.isLoading = false;
      state.emailSendingModal = true;
    },
    [verificationEmail.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { closeModal } = helpSlice.actions;

export default helpSlice.reducer;
