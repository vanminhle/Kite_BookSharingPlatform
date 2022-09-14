import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getAllAccountsThunk,
  getUserAccountThunk,
  setAccountStatusThunk,
  setAccountRoleThunk,
} from './allAccountsThunk';

const initialFiltersState = {
  search: '',
  searchValue: 'full name',
  searchOptions: ['full name', 'email', 'city', 'country', 'phone number'],
  accountStatus: 'all',
  accountStatusOptions: ['all', 'active', 'disabled'],
  confirmedStatus: 'all',
  confirmedStatusOptions: ['all', 'confirmed', 'not confirmed'],
  role: 'all',
  roleOptions: ['all', 'manager', 'customer'],
  sort: '-createdAt',
};

const initialState = {
  isLoading: false,
  accounts: [],
  totalAccounts: 0,
  filterResults: 0,
  numOfPages: 1,
  page: 1,
  ...initialFiltersState,
  account: null,
  accountModal: false,
  ModalLoading: false,
  setAccountStatusState: false,
  setAccountStatusModal: false,
  setAccountStatusId: null,
  setAccountStatusValue: null,
  setAccountRoleState: false,
};

const accountStatusFilter = (value) => {
  if (value === 'all') value = 'active=true&active=false';
  if (value === 'active') value = 'active=true';
  if (value === 'disabled') value = 'active=false';
  return value;
};

const confirmedStatusFilter = (value) => {
  if (value === 'all') value = 'isConfirmed=true&isConfirmed=false';
  if (value === 'confirmed') value = 'isConfirmed=true';
  if (value === 'not confirmed') value = 'isConfirmed=false';
  return value;
};

const roleFilter = (value) => {
  if (value === 'all') value = 'role=manager&role=customer';
  if (value === 'manager') value = 'role=manager';
  if (value === 'customer') value = 'role=customer';
  return value;
};

const searchQueryFilter = (value) => {
  if (value === 'full name') value = 'fullName';
  if (value === 'email;') value = 'email';
  if (value === 'city') value = 'city';
  if (value === 'country') value = 'country';
  if (value === 'phone number') value = 'phoneNumber';
  return value;
};

export const getAllAccounts = createAsyncThunk(
  'allAccounts/getAllAccounts',
  async (_, thunkAPI) => {
    const {
      page,
      accountStatus,
      confirmedStatus,
      role,
      searchValue,
      search,
      sort,
    } = thunkAPI.getState().allAccounts;
    const confirmStatusQuery = confirmedStatusFilter(confirmedStatus);
    const roleQuery = roleFilter(role);
    const accountStatusQuery = accountStatusFilter(accountStatus);
    const searchQuery = searchQueryFilter(searchValue);

    let url = `http/api/users?${searchQuery}[regex]=^${search}&${searchQuery}[options]=i&${accountStatusQuery}&${confirmStatusQuery}&${roleQuery}&sort=${sort}&page=${page}&limit=30`;

    return getAllAccountsThunk(url, thunkAPI);
  }
);

export const getUserAccount = createAsyncThunk(
  'allAccounts/getUserAccount',
  async (userId, thunkAPI) => {
    return getUserAccountThunk(`http/api/users/${userId}`, thunkAPI);
  }
);

export const setAccountStatus = createAsyncThunk(
  'allAccounts/setAccountStatus',
  async (data, thunkAPI) => {
    const userId = data.userId;
    return setAccountStatusThunk(
      `http/api/users/setAccountStatus/${userId}`,
      data,
      thunkAPI
    );
  }
);

export const setAccountRole = createAsyncThunk(
  'allAccounts/setAccountRole',
  async (data, thunkAPI) => {
    const userId = data.accountId;
    return setAccountRoleThunk(
      `http/api/users/setAccountRole/${userId}`,
      data,
      thunkAPI
    );
  }
);

const allAccountsSlice = createSlice({
  name: 'allAccounts',
  initialState,
  reducers: {
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    handleSort: (state, { payload: { value } }) => {
      state.sort = value;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    clearAccount: (state) => {
      state.accountModal = false;
      state.account = null;
    },
    openModal: (state, { payload: { id, value } }) => {
      state.setAccountStatusModal = true;
      state.setAccountStatusId = id;
      state.setAccountStatusValue = value;
    },
    closeModal: (state) => {
      state.setAccountStatusModal = false;
    },
  },
  extraReducers: {
    //get all accounts
    [getAllAccounts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllAccounts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.accounts = payload.data.users;
      state.numOfPages = payload.resultsPage;
      state.totalAccounts = payload.results;
    },
    [getAllAccounts.rejected]: (state, { payload }) => {
      state.isLoading = true;
      toast.error(payload);
    },
    //get one account
    [getUserAccount.pending]: (state) => {
      state.accountModal = true;
      state.ModalLoading = true;
    },
    [getUserAccount.fulfilled]: (state, { payload }) => {
      state.ModalLoading = false;
      state.account = payload.data.user;
    },
    [getUserAccount.rejected]: (state, { payload }) => {
      state.ModalLoading = false;
      toast.error(payload);
    },
    //set account status
    [setAccountStatus.pending]: (state) => {
      state.isLoading = true;
    },
    [setAccountStatus.fulfilled]: (state, { payload }) => {
      state.setAccountStatusModal = false;
      state.setAccountStatusId = null;
      state.setAccountStatusValue = null;
      state.isLoading = false;
      state.setAccountStatusState = !state.setAccountStatusState;
      toast.success(payload);
    },
    [setAccountStatus.rejected]: (state, { payload }) => {
      state.setAccountStatusModal = false;
      state.setAccountStatusId = null;
      state.setAccountStatusValue = null;
      state.isLoading = false;
      state.setAccountStatusState = !state.setAccountStatusState;
      toast.error(payload);
    },
    //set account role
    [setAccountRole.pending]: (state) => {
      state.ModalLoading = true;
    },
    [setAccountRole.fulfilled]: (state, { payload }) => {
      state.ModalLoading = false;
      state.accountModal = false;
      state.account = null;
      state.setAccountRoleState = !state.setAccountRoleState;
      toast.success(payload);
    },
    [setAccountRole.rejected]: (state, { payload }) => {
      state.ModalLoading = false;
      state.accountModal = false;
      state.account = null;
      state.setAccountRoleState = !state.setAccountRoleState;
      toast.error(payload);
    },
  },
});

export const {
  changePage,
  handleChange,
  clearFilters,
  handleSort,
  clearAccount,
  closeModal,
  openModal,
} = allAccountsSlice.actions;

export default allAccountsSlice.reducer;
