import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

const initialState = {
  isLoading: false,
  passwordSuccessModal: false,
};

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (resetPassword, thunkAPI) => {
    const resetPasswordToken = resetPassword.token;
    const resetPasswordValue = {
      password: resetPassword.password,
      passwordConfirm: resetPassword.passwordConfirm,
    };

    console.log(resetPasswordValue);
    try {
      const resp = await customFetch.patch(
        `http/api/users/resetPassword/${resetPasswordToken}`,
        resetPasswordValue
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.passwordSuccessModal = false;
    },
  },
  extraReducers: {
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [resetPassword.fulfilled]: (state) => {
      state.isLoading = false;
      state.passwordSuccessModal = true;
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { closeModal } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
