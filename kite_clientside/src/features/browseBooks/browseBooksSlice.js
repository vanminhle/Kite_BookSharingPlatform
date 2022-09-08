import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllBooksThunk } from './browseBooksThunk';
import { toast } from 'react-toastify';

const initialState = {
  search: '',
  isLoading: false,
  page: 1,
  numOfPages: 1,
  allBooks: null,
};

export const getAllBooks = createAsyncThunk(
  'browseBooks/getAllBooks',
  async (_, thunkAPI) => {
    let { page, search } = thunkAPI.getState().browseBooks;
    let limit = 20;
    if (search !== '') {
      page = 1;
      limit = 0;
    }

    return getAllBooksThunk(
      `http/api/books?page=${page}&limit={limit}`,
      thunkAPI
    );
  }
);

const browseBooksSlice = createSlice({
  name: 'browseBooks',
  initialState,
  reducers: {
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.browsePage = 1;
      state[name] = value;
    },
  },
  extraReducers: {
    //get all books
    [getAllBooks.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllBooks.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.numOfPages = payload.resultsPage;
      if (state.search !== '') {
        state.allBooks = payload.data.books.filter(
          (book) =>
            book.bookTitle.toLowerCase().includes(state.search) ||
            book.author.fullName.toLowerCase().includes(state.search)
        );
      } else {
        state.allBooks = payload.data.books;
      }
    },
    [getAllBooks.rejected]: (state) => {
      state.isLoading = false;
      toast.error(
        'Sorry, There was a problem when trying to get books. Please refresh the page!'
      );
    },
  },
});

export const { changePage, handleChange } = browseBooksSlice.actions;

export default browseBooksSlice.reducer;
