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
};

export const deleteTag = createAsyncThunk(
  'tags/delete',
  async (id, thunkAPI) => {
    return deleteTransactionThunk(`http/api/tags/${id}`, thunkAPI);
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
    [deleteTag.pending]: (state) => {
      state.isDelete = true;
    },
    [deleteTag.fulfilled]: (state) => {
      state.isDelete = false;
      state.tags = [];
      state.page = 1;
      toast.success(`Tag deleted successfully!!`);
    },
    [deleteTag.rejected]: (state, { payload }) => {
      state.isDelete = false;
      toast.error(payload);
    },
  },
});

export const { handleChange, changeTransactionsPage } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
