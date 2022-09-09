import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getAccountsStatisticsThunk,
  getBooksStatisticsThunk,
  getAccountYearlyStatsThunk,
  getBooksUploadedMonthlyThunk,
  getBooksSoldMonthlyThunk,
} from './statisticsThunk';

const initialState = {
  accountsStats: null,
  booksStats: null,
  accountCreatedYearly: null,
  booksUploadedMonthly: null,
  booksSoldMonthly: null,
};

export const getAccountsStatistics = createAsyncThunk(
  'statistics/getAccountsStatistics',
  async (_, thunkAPI) => {
    return getAccountsStatisticsThunk(`http/api/statistics/accounts`, thunkAPI);
  }
);

export const getAccountYearlyStats = createAsyncThunk(
  'statistics/getAccountYearlyStats',
  async (_, thunkAPI) => {
    return getAccountYearlyStatsThunk(
      `http/api/statistics/accountsCreatedYearly`,
      thunkAPI
    );
  }
);

export const getBooksStatistics = createAsyncThunk(
  'statistics/getBooksStatistics',
  async (_, thunkAPI) => {
    return getBooksStatisticsThunk(`http/api/statistics/books`, thunkAPI);
  }
);

export const getBooksUploadedMonthly = createAsyncThunk(
  'statistics/getBooksUploadedMonthly',
  async (_, thunkAPI) => {
    return getBooksUploadedMonthlyThunk(
      `http/api/statistics/booksUploadedMonthly`,
      thunkAPI
    );
  }
);

export const getBooksSoldMonthly = createAsyncThunk(
  'statistics/getBooksSoldMonthly',
  async (_, thunkAPI) => {
    return getBooksSoldMonthlyThunk(
      `http/api/statistics/booksSoldMonthly`,
      thunkAPI
    );
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: {
    [getAccountsStatistics.fulfilled]: (state, { payload }) => {
      state.accountsStats = payload.data;
    },
    [getAccountsStatistics.rejected]: (state, { payload }) => {
      toast.error(`Can't get the statistics data right now. Please try again!`);
    },
    //
    [getBooksStatistics.fulfilled]: (state, { payload }) => {
      state.booksStats = payload.data;
    },
    [getBooksStatistics.rejected]: (state, { payload }) => {
      toast.error(`Can't get the statistics data right now. Please try again!`);
    },
    //
    [getAccountYearlyStats.fulfilled]: (state, { payload }) => {
      state.accountCreatedYearly = payload.data;
    },
    [getAccountYearlyStats.rejected]: (state, { payload }) => {
      toast.error(`Can't get the statistics data right now. Please try again!`);
    },
    //
    [getBooksUploadedMonthly.fulfilled]: (state, { payload }) => {
      state.booksUploadedMonthly = payload.data;
    },
    [getBooksUploadedMonthly.rejected]: (state, { payload }) => {
      toast.error(`Can't get the statistics data right now. Please try again!`);
    },
    //
    [getBooksSoldMonthly.fulfilled]: (state, { payload }) => {
      state.booksSoldMonthly = payload.data;
    },
    [getBooksSoldMonthly.rejected]: (state, { payload }) => {
      toast.error(`Can't get the statistics data right now. Please try again!`);
    },
  },
});

export const {} = reviewsSlice.actions;

export default reviewsSlice.reducer;
