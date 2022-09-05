import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getTransactionsThunk,
  deleteTransactionThunk,
} from './transactionsThunk';

const initialFiltersState = {
  search: '',
  searchValue: 'Performer Name',
  searchOptions: ['Performer Name', 'Performer Email', 'Book Name'],
  sort: 'Latest',
  sortOptions: ['Latest', 'Oldest'],
};

const initialState = {
  isLoading: false,
  transactions: [],
  totalTransactions: 0,
  ...initialFiltersState,
  numOfPages: 1,
  page: 1,
  isDelete: false,
  deleteModal: false,
  transactionId: null,
};

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id, thunkAPI) => {
    return deleteTransactionThunk(`http/api/transactions/${id}`, thunkAPI);
  }
);

const sortFilter = (value) => {
  if (value === 'Latest') value = 'sort=-createdAt';
  if (value === 'Oldest') value = 'sort=createdAt';
  return value;
};

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async (_, thunkAPI) => {
    const { page, sort } = thunkAPI.getState().transactions;
    const sortQuery = sortFilter(sort);

    let url = `http/api/transactions?${sortQuery}&page=${page}&limit=30`;
    return getTransactionsThunk(url, thunkAPI);
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    changeTransactionsPage: (state, { payload }) => {
      state.page = payload;
    },
    openDeleteModal: (state, { payload }) => {
      state.deleteModal = true;
      state.transactionId = payload;
    },
    closeDeleteModal: (state) => {
      state.deleteModal = false;
      state.transactionId = null;
    },
  },
  extraReducers: {
    //get
    [getTransactions.pending]: (state) => {
      state.isLoading = true;
    },
    [getTransactions.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.numOfPages = payload.resultsPage;
      state.totalTransactions = payload.results;
      if (state.search && state.searchValue === 'Performer Name') {
        state.transactions = payload.data.transactions.filter((transaction) =>
          transaction.user.fullName.toLowerCase().includes(state.search)
        );
      } else if (state.search && state.searchValue === 'Performer Email') {
        state.transactions = payload.data.transactions.filter((transaction) =>
          transaction.user.email.toLowerCase().includes(state.search)
        );
      } else if (state.search && state.searchValue === 'Book Name') {
        state.transactions = payload.data.transactions.filter((transaction) =>
          transaction.book.bookTitle.toLowerCase().includes(state.search)
        );
      } else {
        state.transactions = payload.data.transactions;
      }
    },
    [getTransactions.rejected]: (state, { payload }) => {
      getTransactions.isLoading = false;
      toast.error(payload);
    },
    //delete tag
    [deleteTransaction.pending]: (state) => {
      state.isDelete = true;
    },
    [deleteTransaction.fulfilled]: (state) => {
      state.isDelete = false;
      state.deleteModal = false;
      state.page = 1;
      toast.success(`Transaction deleted successfully!!`);
    },
    [deleteTransaction.rejected]: (state, { payload }) => {
      state.isDelete = false;
      state.deleteModal = false;
      state.transactionId = null;
      toast.error(payload);
    },
  },
});

export const {
  handleChange,
  changeTransactionsPage,
  openDeleteModal,
  closeDeleteModal,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
