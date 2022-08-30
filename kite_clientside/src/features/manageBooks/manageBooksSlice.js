import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getManageBooksThunk,
  setBookApprovingStatusThunk,
  deleteBookThunk,
  updateBookThunk,
  getBookThunk,
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
  //delete
  setBookDeleteModal: false,
  setBookDeleteId: null,
  setBookDeletingState: false,
  //update
  setOldBookData: null,
  setBookUpdateId: null,
  setBookUpdatingModal: false,
  setBookUpdatingState: false,
  setBookLoading: false,
  setFinishUpdate: false,
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

export const deleteBook = createAsyncThunk(
  'manageBooks/deleteBook',
  async (id, thunkAPI) => {
    return deleteBookThunk(`http/api/books/${id.bookId}`, thunkAPI);
  }
);

export const getBook = createAsyncThunk(
  'manageBooks/getBook',
  async (id, thunkAPI) => {
    return getBookThunk(`http/api/books/${id.id}`, thunkAPI);
  }
);

export const updateBook = createAsyncThunk(
  'manageBooks/updateBook',
  async (formData, thunkAPI) => {
    const { setBookUpdateId } = thunkAPI.getState().manageBooks;
    return updateBookThunk(
      `http/api/books/${setBookUpdateId}`,
      formData,
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
    openDeleteModal: (state, { payload: { id } }) => {
      state.setBookDeleteModal = true;
      state.setBookDeleteId = id;
    },
    closeDeleteModal: (state) => {
      state.setBookDeleteModal = false;
      state.setBookDeleteId = null;
    },
    changeValue: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    closeBookModal: (state) => {
      state.setOldBookData = null;
      state.setBookUpdateId = null;
      state.setBookUpdatingModal = false;
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
    //delete
    [deleteBook.pending]: (state) => {
      state.setBookDeletingState = !state.setBookDeletingState;
    },
    [deleteBook.fulfilled]: (state, { payload }) => {
      state.setBookDeleteModal = false;
      state.setBookDeleteId = null;
      state.setBookDeletingState = !state.setBookDeletingState;
      state.setFinishUpdate = false;
      state.setBookDeletingState = !state.setBookDeletingState;
      toast.success(payload, { autoClose: 3000 });
    },
    [deleteBook.rejected]: (state, { payload }) => {
      state.setBookDeleteModal = false;
      state.setBookDeleteId = null;
      state.isLoading = false;
      state.setFinishUpdate = false;
      state.setBookDeletingState = !state.setBookDeletingState;
      toast.error(payload);
    },
    //get
    [getBook.pending]: (state) => {
      state.setBookUpdatingModal = true;
      state.setBookLoading = true;
    },
    [getBook.fulfilled]: (state, { payload }) => {
      state.setBookUpdatingModal = true;
      state.setBookLoading = false;
      state.setBookUpdateId = payload.data.book.id;
      state.setOldBookData = payload.data.book;
    },
    [getBook.rejected]: (state, { payload }) => {
      state.setBookUpdatingModal = false;
      state.setBookUpdateId = null;
      state.setOldBookData = null;
      state.setBookLoading = false;
      toast.error(payload);
    },
    //update
    [updateBook.pending]: (state) => {
      state.setBookUpdatingState = !state.setBookUpdatingState;
    },
    [updateBook.fulfilled]: (state, { payload }) => {
      state.setBookUpdatingModal = false;
      state.setBookUpdateId = null;
      state.setOldBookData = null;
      state.setBookUpdatingState = !state.setBookUpdatingState;
      state.setFinishUpdate = true;
      toast.success(payload, { autoClose: 3000 });
    },
    [updateBook.rejected]: (state, { payload }) => {
      state.setBookUpdatingState = !state.setBookUpdatingState;
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
  openDeleteModal,
  closeDeleteModal,
  closeBookModal,
} = manageBooksSlice.actions;

export default manageBooksSlice.reducer;
