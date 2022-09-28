import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  viewBookDetailThunk,
  buyBookThunk,
  getBookTransactionOfUserThunk,
  getUserTransactionsInventoryThunk,
} from './bookThunk';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: false,
  book: null,
  bookTransactionOfUser: false,
  userInventory: null,
  page: 1,
  numOfPages: 1,
  totalBooks: null,
};

export const viewBookDetail = createAsyncThunk(
  'book/viewBookDetail',
  async (id, thunkAPI) => {
    return viewBookDetailThunk(`http/api/books/${id.bookId}`, thunkAPI);
  }
);

export const buyBook = createAsyncThunk(
  'book/buyBook',
  async (id, thunkAPI) => {
    return buyBookThunk(
      `http/api/transactions/checkoutSession/${id}`,
      thunkAPI
    );
  }
);

export const getBookTransactionOfUser = createAsyncThunk(
  'book/getBookTransaction',
  async (data, thunkAPI) => {
    return getBookTransactionOfUserThunk(
      `http/api/transactions/isOwnBook/${data.bookId}`,
      thunkAPI
    );
  }
);

export const getUserTransactionsInventory = createAsyncThunk(
  'book/getUserTransactionsInventory',
  async (_, thunkAPI) => {
    const { page } = thunkAPI.getState().book;

    return getUserTransactionsInventoryThunk(
      `http/api/transactions/myInventory?page=${page}&limit=10&sort=-createdAt`,
      thunkAPI
    );
  }
);

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    changePage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: {
    //get
    [viewBookDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [viewBookDetail.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.book = payload.data.book;
    },
    [viewBookDetail.rejected]: (state) => {
      state.isLoading = false;
      state.book = 'failed';
    },
    //buy
    [buyBook.rejected]: () => {
      toast.error(
        'Sorry, There was a problem when trying to buy the book. Please try again later!'
      );
    },
    //get book transaction
    [getBookTransactionOfUser.fulfilled]: (state, { payload }) => {
      if (payload.data.transaction.length === 0) {
        state.bookTransactionOfUser = false;
      } else {
        state.bookTransactionOfUser = true;
      }
    },
    [getBookTransactionOfUser.rejected]: (state) => {
      state.book = 'failed';
      state.bookTransactionOfUser = false;
    },
    //user inventory
    [getUserTransactionsInventory.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserTransactionsInventory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.userInventory = payload.data.transaction;
      state.totalBooks = payload.transactionTotal;
      state.numOfPages = payload.totalPage;
    },
    [getUserTransactionsInventory.rejected]: (state) => {
      state.isLoading = false;
      toast.error(
        'There was an error when trying to load the user inventory. Please try again later!'
      );
    },
  },
});

export const { changePage } = bookSlice.actions;

export default bookSlice.reducer;
