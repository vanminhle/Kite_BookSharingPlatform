import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getAccountsStatisticsThunk,
  getBooksStatisticsThunk,
  getAccountYearlyStatsThunk,
  getBooksUploadedMonthlyThunk,
  getBooksSoldMonthlyThunk,
  getTopFiveBooksSalesThunk,
  getTopFiveBooksRevenueThunk,
  getTotalRevenueMonthlyThunk,
} from './statisticsThunk';

const initialState = {
  accountsStats: null,
  booksStats: null,
  accountCreatedYearly: null,
  booksUploadedMonthly: null,
  booksSoldMonthly: null,
  topBooksSales: null,
  topBooksRevenue: null,
  totalRevenueMonthly: null,
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

export const getTopFiveBooksSales = createAsyncThunk(
  'statistics/getTopFiveBooksSales',
  async (_, thunkAPI) => {
    return getTopFiveBooksSalesThunk(
      `http/api/statistics/topFiveBooksSales`,
      thunkAPI
    );
  }
);

export const getTopFiveBooksRevenue = createAsyncThunk(
  'statistics/getTopFiveBooksRevenue',
  async (_, thunkAPI) => {
    return getTopFiveBooksRevenueThunk(
      `http/api/statistics/topFiveBooksRevenue`,
      thunkAPI
    );
  }
);

export const getTotalRevenueMonthly = createAsyncThunk(
  'statistics/getTotalRevenueMonthly',
  async (_, thunkAPI) => {
    return getTotalRevenueMonthlyThunk(
      `http/api/statistics/totalRevenueMonthly`,
      thunkAPI
    );
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
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

    //
    [getTopFiveBooksSales.fulfilled]: (state, { payload }) => {
      state.topBooksSales = payload.data;
    },
    [getTopFiveBooksSales.rejected]: (state, { payload }) => {
      toast.error(`Can't get the statistics data right now. Please try again!`);
    },
    //
    [getTopFiveBooksRevenue.fulfilled]: (state, { payload }) => {
      state.topBooksRevenue = payload.data;
    },
    [getTopFiveBooksRevenue.rejected]: (state, { payload }) => {
      toast.error(`Can't get the statistics data right now. Please try again!`);
    },
    //
    [getTotalRevenueMonthly.fulfilled]: (state, { payload }) => {
      state.totalRevenueMonthly = payload.data;
    },
    [getTotalRevenueMonthly.rejected]: (state, { payload }) => {
      toast.error(`Can't get the statistics data right now. Please try again!`);
    },
    //
  },
});

export default reviewsSlice.reducer;
