import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getManageBooksThunk,
  setBookApprovingStatusThunk,
} from './manageBooksThunk';

const initialFiltersState = {
  search: '',
  searchValue: 'bookTitle',
  searchOptions: ['Book Title', 'Author'],
  bookApprovingStatus: 'all',
  bookApprovingStatusOptions: ['All', 'Pending', 'Approved', 'Rejected'],
  sort: 'Latest Submit',
  sortOptions: [
    'Latest Submit',
    'Oldest Submit',
    'A-Z Book Title',
    'Z-A Book Title',
    'A-Z Author Name',
    'Z-A Author Name',
    'Price Highest',
    'Price Lowest',
    // 'Sales Highest',
    // 'Sales Lowest',
    // 'Rating Avg. Highest',
    // 'Rating Avg. Lowest',
    // 'Rating Qty. Highest',
    // 'Rating Qty. Lowest',
  ],
};

const initialState = {
  isLoading: false,
  manageBooks: [],
  totalManageBooks: 0,
  numOfPages: 1,
  page: 1,
  ...initialFiltersState,
  setBookApprovingStatusState: false,
  setBookApprovingStatusModal: false,
  setBookApprovingStatusId: null,
  approvingValue: 'approved',
  approvingReason: null,
};

const bookApprovingStatusFilter = (value) => {
  if (value === 'All')
    value =
      'approvingStatus=pending&approvingStatus=approved&approvingStatus=rejected';
  if (value === 'Pending') value = 'approvingStatus=pending';
  if (value === 'Approved') value = 'approvingStatus=approved';
  if (value === 'Rejected') value = 'approvingStatus=rejected';
  return value;
};

const searchQueryFilter = (value) => {
  if (value === 'Book Title') value = 'bookTitle';
  if (value === 'Author') value = 'fullName';
  return value;
};

const sortFilter = (value) => {
  if (value === 'Latest Submit') value = 'sort=-createdAt';
  if (value === 'Oldest Submit') value = 'sort=createdAt';
  if (value === 'A-Z Book Title') value = 'sort=bookTitle';
  if (value === 'Z-A Book Title') value = 'sort=-bookTitle';
  if (value === 'A-Z Author Name') value = 'sort=author.fullName';
  if (value === 'Z-A Author Name') value = 'sort=-author.fullName';
  if (value === 'Price Highest') value = 'sort=-price';
  if (value === 'Price Lowest') value = 'sort=price';
  return value;
};

export const getManageBooks = createAsyncThunk(
  'manageBooks/getBooks',
  async (_, thunkAPI) => {
    const { page, bookApprovingStatus, search, sort, searchValue } =
      thunkAPI.getState().manageBooks;
    const bookApprovingStatusQuery =
      bookApprovingStatusFilter(bookApprovingStatus);
    const searchQuery = searchQueryFilter(searchValue);
    const sortQuery = sortFilter(sort);

    let url = `http/api/books?${searchQuery}[regex]=^${search}&${searchQuery}[options]=i&${bookApprovingStatusQuery}&${sortQuery}&page=${page}&limit=30`;
    return getManageBooksThunk(url, thunkAPI);
  }
);

export const setBookApprovingStatus = createAsyncThunk(
  'manageBooks/setBookApprovingStatus',
  async (data, thunkAPI) => {
    const bookId = data.bookId;
    return setBookApprovingStatusThunk(
      `http/api/books/setBookStatus/${bookId}`,
      data.value,
      thunkAPI
    );
  }
);

const manageBooksSlice = createSlice({
  name: 'manageBooks',
  initialState,
  reducers: {
    changeManageBooksPage: (state, { payload }) => {
      state.page = payload;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    handleSort: (state, { payload: { value } }) => {
      state.sort = value;
    },
    openModal: (state, { payload: { id, value } }) => {
      state.setBookApprovingStatusModal = true;
      state.setBookApprovingStatusId = id;
    },
    closeModal: (state) => {
      state.setBookApprovingStatusModal = false;
      state.setBookApprovingStatusId = null;
      state.approvingValue = null;
      state.approvingReason = null;
    },
    changeValue: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
  },
  extraReducers: {
    [getManageBooks.pending]: (state) => {
      state.isLoading = true;
    },
    [getManageBooks.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.manageBooks = payload.data.books;
      state.numOfPages = payload.resultsPage;
      state.totalManageBooks = payload.results;
    },
    [getManageBooks.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    //status
    [setBookApprovingStatus.pending]: (state) => {
      state.isLoading = true;
    },
    [setBookApprovingStatus.fulfilled]: (state, { payload }) => {
      state.setBookApprovingStatusModal = false;
      state.setBookApprovingStatusId = null;
      state.isLoading = false;
      state.setBookApprovingStatusState = !state.setBookApprovingStatusState;
      state.approvingValue = 'approved';
      state.approvingReason = null;
      toast.success(payload, { autoClose: 3000 });
    },
    [setBookApprovingStatus.rejected]: (state, { payload }) => {
      state.setAccountStatusModal = false;
      state.setAccountStatusId = null;
      state.setAccountStatusValue = null;
      state.isLoading = false;
      state.setBookApprovingStatusState = !state.setBookApprovingStatusState;
      toast.error(payload);
    },
  },
});

export const {
  handleChange,
  changeManageBooksPage,
  handleSort,
  changePage,
  openModal,
  closeModal,
  changeValue,
  clearFilters,
} = manageBooksSlice.actions;

export default manageBooksSlice.reducer;
