import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

const initialState = {
  isLoading: false,
  user: null,
  emailSendingModal: false,
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('http/api/users/register', user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('http/api/users/login', user);
      return resp.data;
    } catch (error) {
      //console.log(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.emailSendingModal = false;
    },
  },
  extraReducers: {
    //REGISTER
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state) => {
      state.isLoading = false;
      state.emailSendingModal = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    //LOGIN
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log(payload.data.user);
      const { user } = payload.data;
      state.isLoading = false;
      state.user = user;
      toast.success(`Welcome Back! ${user.fullName}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { closeModal } = userSlice.actions;

export default userSlice.reducer;
