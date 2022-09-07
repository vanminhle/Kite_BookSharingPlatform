import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  createReviewThunk,
  deleteReviewThunk,
  getReviewsThunk,
} from './reviewsThunk';

const initialFiltersState = {
  search: '',
  searchValue: 'Customer Name',
  searchOptions: [
    'Customer Name',
    'Customer Email',
    'Book Name',
    'Book Author',
    'Book Author Email',
  ],
  sort: 'Latest',
  sortOptions: ['Latest', 'Oldest'],
};

const initialState = {
  isLoading: false,
  isReviewLoading: false,
  isCreateSuccess: false,
  isDeleteSuccess: false,
  reviews: [],
  totalReviews: 0,
  numOfPages: 1,
  page: 1,
  isDelete: false,
  deleteModal: false,
  reviewId: null,
  ...initialFiltersState,
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

export const managerDeleteReview = createAsyncThunk(
  'reviews/ManagerDeleteReview',
  async (id, thunkAPI) => {
    return deleteReviewThunk(`http/api/reviews/${id}`, thunkAPI);
  }
);

const sortFilter = (value) => {
  if (value === 'Latest') value = 'sort=-createdAt';
  if (value === 'Oldest') value = 'sort=createdAt';
  return value;
};

export const getAllReviews = createAsyncThunk(
  'reviews/getAllReviews',
  async (_, thunkAPI) => {
    const { page, sort } = thunkAPI.getState().reviews;
    const sortQuery = sortFilter(sort);

    let url = `http/api/reviews?${sortQuery}&page=${page}&limit=65`;

    return getReviewsThunk(url, thunkAPI);
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    changeReviewsPage: (state, { payload }) => {
      state.page = payload;
    },
    openDeleteModal: (state, { payload }) => {
      state.deleteModal = true;
      state.reviewId = payload;
    },
    closeDeleteModal: (state) => {
      state.deleteModal = false;
      state.reviewId = null;
    },
  },
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
    //get reviews
    [getAllReviews.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllReviews.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.numOfPages = payload.resultsPage;
      state.totalReviews = payload.results;
      if (state.search && state.searchValue === 'Customer Name') {
        state.reviews = payload.data.reviews.filter((review) =>
          review.user.fullName.toLowerCase().includes(state.search)
        );
      } else if (state.search && state.searchValue === 'Customer Email') {
        state.reviews = payload.data.reviews.filter((review) =>
          review.user.email.toLowerCase().includes(state.search)
        );
      } else if (state.search && state.searchValue === 'Book Name') {
        state.reviews = payload.data.reviews.filter((review) =>
          review.book.bookTitle.toLowerCase().includes(state.search)
        );
      } else if (state.search && state.searchValue === 'Book Author') {
        state.reviews = payload.data.reviews.filter((review) =>
          review.book.author.fullName.toLowerCase().includes(state.search)
        );
      } else if (state.search && state.searchValue === 'Book Author Email') {
        state.reviews = payload.data.reviews.filter((review) =>
          review.book.author.email.toLowerCase().includes(state.search)
        );
      } else {
        state.reviews = payload.data.reviews;
      }
    },
    [getAllReviews.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    //manager delete
    [managerDeleteReview.pending]: (state) => {
      state.isDelete = true;
    },
    [managerDeleteReview.fulfilled]: (state) => {
      state.isDelete = false;
      state.deleteModal = false;
      state.page = 1;
      toast.success(`Review deleted successfully!!`);
    },
    [managerDeleteReview.rejected]: (state, { payload }) => {
      state.isDelete = false;
      state.deleteModal = false;
      state.reviewId = null;
      toast.error(payload);
    },
  },
});

export const {
  openDeleteModal,
  closeDeleteModal,
  changeReviewsPage,
  handleChange,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
