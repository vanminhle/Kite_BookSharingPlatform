import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getTagsThunk,
  submitBooksThunk,
  getMyBooksThunk,
} from './myBooksThunk';

const initialFiltersState = {
  search: '',
  bookApprovingStatus: 'all',
  bookApprovingStatusOptions: ['all', 'pending', 'approved', 'rejected'],
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'A-Z', 'Z-A'],
};

const initialState = {
  isLoading: false,
  isSubmit: false,
  loadingForm: false,
  isForm: false,
  tags: [],
  myBooks: [],
  totalMyBooks: 0,
  ...initialFiltersState,
  numOfPages: 1,
  page: 1,
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

const bookApprovingStatusFilter = (value) => {
  if (value === 'all')
    value =
      'approvingStatus=pending&approvingStatus=approved&approvingStatus=rejected';
  if (value === 'pending') value = 'approvingStatus=pending';
  if (value === 'approved') value = 'approvingStatus=approved';
  if (value === 'rejected') value = 'approvingStatus=rejected';
  return value;
};

const sortFilter = (value) => {
  if (value === 'latest') value = 'sort=-createdAt';
  if (value === 'oldest') value = 'sort=createdAt';
  if (value === 'A-Z') value = 'sort=bookTitle';
  if (value === 'Z-A') value = 'sort=-bookTitle';
  return value;
};

export const getMyBooks = createAsyncThunk(
  'myBooks/getBooks',
  async (_, thunkAPI) => {
    const { page, bookApprovingStatus, search, sort } =
      thunkAPI.getState().myBooks;
    const { user } = thunkAPI.getState().user;
    const bookApprovingStatusQuery =
      bookApprovingStatusFilter(bookApprovingStatus);
    const sortQuery = sortFilter(sort);

    let url = `http/api/books?&bookTitle[regex]=^${search}&bookTitle[options]=i&${bookApprovingStatusQuery}&${sortQuery}&page=${page}&limit=20&author=${user._id}`;
    return getMyBooksThunk(url, thunkAPI);
  }
);

const myBooksSlice = createSlice({
  name: 'myBooks',
  initialState,
  reducers: {
    changeMyBooksPage: (state, { payload }) => {
      state.page = payload;
    },
    openSubmitForm: (state) => {
      state.isForm = true;
    },
    closeSubmitForm: (state) => {
      state.isForm = false;
      state.tags = [];
      state.loadingForm = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
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
      state.isSubmit = true;
    },
    [submitBook.fulfilled]: (state, { payload }) => {
      state.isSubmit = false;
      state.isForm = false;
      state.tags = [];
      toast.success(
        `Submitted Successfully. It take 3-4 days for your book being reviewed, be patient!`
      );
    },
    [submitBook.rejected]: (state, { payload }) => {
      state.isSubmit = false;
      state.isForm = true;
      toast.error(payload);
    },
    //get my books
    [getMyBooks.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyBooks.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.myBooks = payload.data.books;
      state.numOfPages = payload.resultsPage;
      state.totalMyBooks = payload.results;
    },
    [getMyBooks.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  openSubmitForm,
  closeSubmitForm,
  handleChange,
  changeMyBooksPage,
} = myBooksSlice.actions;

export default myBooksSlice.reducer;
