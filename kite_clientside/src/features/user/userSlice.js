import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';
import {
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  changeEmailThunk,
  deactivateAccountThunk,
  changeInformationThunk,
} from './userThunk';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const initialState = {
  isLoading: false,
  isError: false,
  isErrorEmail: false,
  user: getUserFromLocalStorage(),
  emailSendingModal: false,
  deactivateAccountModal: false,
  isEdit: false,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (user, thunkAPI) => {
    return loginUserThunk('http/api/users/login', user, thunkAPI);
  }
);

export const logoutUser = createAsyncThunk(
  'http/api/users/logout',
  async (thunkAPI) => {
    return logoutUserThunk('http/api/users/logout', thunkAPI);
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (user, thunkAPI) => {
    return registerUserThunk('http/api/users/register', user, thunkAPI);
  }
);

export const passwordChange = createAsyncThunk(
  'user/emailChange',
  async (password, thunkAPI) => {
    return changeEmailThunk(
      'http/api/users/updateMyPassword',
      password,
      thunkAPI
    );
  }
);

export const informationChange = createAsyncThunk(
  'user/informationChange',
  async (formData, thunkAPI) => {
    return changeInformationThunk(
      'http/api/users/updateMyInfo',
      formData,
      thunkAPI
    );
  }
);

export const emailChange = createAsyncThunk(
  'user/emailChange',
  async (email, thunkAPI) => {
    return changeEmailThunk('http/api/users/updateMyEmail', email, thunkAPI);
  }
);

export const deactivateAccount = createAsyncThunk(
  'user/deactivateAccount',
  async (thunkAPI) => {
    return deactivateAccountThunk('http/api/users/deactivateAccount', thunkAPI);
  }
);

// export const loginSocial = createAsyncThunk(
//   'user/loginSocial',
//   async (thunkAPI) => {
//     try {
//       const resp = customFetch.get('http/api/users/google/redirect/success');
//       console.log(resp);
//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.message);
//     }
//   }
// );

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    hideError: (state) => {
      state.isError = false;
    },
    hideErrorEmail: (state) => {
      state.isErrorEmail = false;
    },
    closeModal: (state) => {
      state.emailSendingModal = false;
      state.deactivateAccountModal = false;
    },
    openDeactivateModal: (state) => {
      state.deactivateAccountModal = true;
    },
  },
  extraReducers: {
    //REGISTER
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.emailSendingModal = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      toast.error(payload);
    },
    //LOGIN
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      const { user } = payload.data;
      addUserToLocalStorage(user);
      state.user = user;
      toast.success(`Welcome Back! ${user.fullName}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      toast.error(payload);
    },
    //LOGOUT USER
    [logoutUser.pending]: (state) => {
      state.isLoading = true;
    },
    [logoutUser.fulfilled]: (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
      removeUserFromLocalStorage();
      state.user = null;
      toast.success(payload);
    },
    [logoutUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      removeUserFromLocalStorage();
      state.user = null;
      toast.error(payload);
    },
    //ACCOUNT INFORMATION
    [informationChange.pending]: (state) => {
      state.isLoading = true;
    },
    [informationChange.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isEdit = false;
      const { user } = payload.data;
      addUserToLocalStorage(user);
      state.user = user;
      toast.success(`You Account Information has been successfully updated!`);
    },
    [informationChange.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    //PASSWORD CHANGE
    [passwordChange.pending]: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    [passwordChange.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      removeUserFromLocalStorage();
      state.user = null;
      toast.success(payload);
    },
    [passwordChange.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      toast.error(payload);
    },
    //EMAIL CHANGE
    [emailChange.pending]: (state) => {
      state.isLoading = true;
    },
    [emailChange.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      removeUserFromLocalStorage();
      state.user = null;
      toast.success(payload);
    },
    [emailChange.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isErrorEmail = true;
      toast.error(payload);
    },
    //DEACTIVATE ACCOUNT
    [deactivateAccount.pending]: (state) => {
      state.isLoading = true;
    },
    [deactivateAccount.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.deactivateAccountModal = false;
      removeUserFromLocalStorage();
      state.user = null;
      toast.success(payload + ' Logging out......');
    },
    [deactivateAccount.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      removeUserFromLocalStorage();
      state.user = null;
      toast.error(payload);
    },
    // //LOGIN WITH GOOGLE
    // [loginSocial.pending]: (state) => {},
    // [loginSocial.fulfilled]: (state, { payload }) => {},
    // [loginSocial.rejected]: (state, { payload }) => {
    //   toast.error(payload);
    // },
  },
});

export const { closeModal, openDeactivateModal, hideError, hideErrorEmail } =
  userSlice.actions;

export default userSlice.reducer;