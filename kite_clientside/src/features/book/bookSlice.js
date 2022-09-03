import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { viewBookDetailThunk, readBookThunk } from './bookThunk';

const initialState = {
  isLoading: false,
  book: null,
};

export const viewBookDetail = createAsyncThunk(
  'book/viewBookDetail',
  async (id, thunkAPI) => {
    return viewBookDetailThunk(`http/api/books/${id.bookId}`, thunkAPI);
  }
);

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: {
    //get
    [viewBookDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [viewBookDetail.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.book = payload.data.book;
    },
    [viewBookDetail.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.book = 'failed';
    },
  },
});

export const {} = bookSlice.actions;

export default bookSlice.reducer;
