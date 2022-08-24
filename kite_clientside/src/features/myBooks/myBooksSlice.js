import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getTagsThunk, submitBooksThunk } from './myBooksThunk';

const initialState = {
  isLoading: false,
  loadingForm: false,
  isForm: false,
  tags: [],
};

export const getTags = createAsyncThunk('myBooks/tags', async (thunkAPI) => {
  return getTagsThunk('http/api/tags', thunkAPI);
});

export const submitBook = createAsyncThunk(
  'myBooks/submit',
  async (formData, thunkAPI) => {
    return submitBooksThunk('http/api/books', formData, thunkAPI);
  }
);

const myBooksSlice = createSlice({
  name: 'myBooks',
  initialState,
  reducers: {
    openSubmitForm: (state) => {
      state.isForm = true;
    },
    closeSubmitForm: (state) => {
      state.isForm = false;
      state.tags = [];
      state.loadingForm = false;
    },
  },
  extraReducers: {
    [getTags.pending]: (state) => {
      state.loadingForm = true;
    },
    [getTags.fulfilled]: (state, { payload }) => {
      state.loadingForm = false;
      state.tags = payload;
    },
    [getTags.rejected]: (state, { payload }) => {
      state.loadingForm = false;
      toast.error(payload);
    },
    //submit book
    [submitBook.pending]: (state) => {
      state.isLoading = true;
    },
    [submitBook.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isForm = false;
      state.tags = [];
      toast.success(
        `Submitted Successfully. It take 3-4 days for your book being reviewed, be patient!`
      );
    },
    [submitBook.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isForm = true;
      toast.error(payload);
    },
  },
});

export const { openSubmitForm, closeSubmitForm } = myBooksSlice.actions;

export default myBooksSlice.reducer;
