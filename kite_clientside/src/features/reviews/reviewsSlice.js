import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createReviewThunk, deleteReviewThunk } from './reviewsThunk';

const initialState = {
  isReviewLoading: false,
  isCreateSuccess: false,
  isDeleteSuccess: false,
};

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (data, thunkAPI) => {
    return createReviewThunk(`http/api/reviews`, data, thunkAPI);
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/createReview',
  async (id, thunkAPI) => {
    return deleteReviewThunk(`http/api/reviews/${id}`, thunkAPI);
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: {
    [createReview.pending]: (state) => {
      state.isReviewLoading = true;
      state.isCreateSuccess = false;
    },
    [createReview.fulfilled]: (state, { payload }) => {
      state.isReviewLoading = false;
      state.isCreateSuccess = true;
      toast.success('Successfully! Thank for giving an review.');
    },
    [createReview.rejected]: (state, { payload }) => {
      state.isReviewLoading = false;
      state.isCreateSuccess = false;
      toast.error(payload);
    },
    //delete
    [deleteReview.pending]: (state) => {
      state.isReviewLoading = true;
      state.isDeleteSuccess = false;
    },
    [deleteReview.fulfilled]: (state, { payload }) => {
      state.isReviewLoading = false;
      state.isDeleteSuccess = true;
      toast.success('Successfully! You have deleted your review!');
    },
    [deleteReview.rejected]: (state, { payload }) => {
      state.isReviewLoading = false;
      state.isDeleteSuccess = false;
      toast.error(payload);
    },
  },
});

export const {} = reviewsSlice.actions;

export default reviewsSlice.reducer;
