import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getTagsThunk,
  createTagThunk,
  deleteTagThunk,
  updateTagThunk,
  getTagThunk,
} from './tagsThunk';

const initialFiltersState = {
  search: '',
  group: 'All',
  groupOptions: ['All', 'Format', 'Genre', 'Theme'],
  sort: 'A-Z Tag Name',
  sortOptions: ['A-Z Tag Name', 'Z-A Tag Name', 'A-Z Group', 'Z-A Group'],
};

const initialState = {
  isLoading: false,
  isCreate: false,
  isForm: false,
  tags: [],
  totalTags: 0,
  ...initialFiltersState,
  numOfPages: 1,
  page: 1,
  tag: null,
  isGetTag: false,
  tagModal: false,
  isUpdate: false,
  tagId: null,
  isDelete: false,
};

export const createTag = createAsyncThunk(
  'tags/create',
  async (data, thunkAPI) => {
    return createTagThunk('http/api/tags', data, thunkAPI);
  }
);

export const deleteTag = createAsyncThunk(
  'tags/delete',
  async (id, thunkAPI) => {
    return deleteTagThunk(`http/api/tags/${id}`, thunkAPI);
  }
);

export const updateTag = createAsyncThunk(
  'tags/edit',
  async (data, thunkAPI) => {
    return updateTagThunk(`http/api/tags/${data.tagId}`, data.values, thunkAPI);
  }
);

export const getTag = createAsyncThunk('tags/get', async (id, thunkAPI) => {
  return getTagThunk(`http/api/tags/${id}`, thunkAPI);
});

const groupFilter = (value) => {
  if (value === 'All') value = 'group=format&group=genre&group=theme&';
  if (value === 'Format') value = 'group=format';
  if (value === 'Genre') value = 'group=genre';
  if (value === 'Theme') value = 'group=theme';
  return value;
};

const sortFilter = (value) => {
  if (value === 'A-Z Tag Name') value = 'sort=name';
  if (value === 'Z-A Tag Name') value = 'sort=-name';
  if (value === 'A-Z Group') value = 'sort=group';
  if (value === 'Z-A Group') value = 'sort=-group';
  return value;
};

export const getTags = createAsyncThunk(
  'myBooks/getBooks',
  async (_, thunkAPI) => {
    const { page, group, search, sort } = thunkAPI.getState().tags;
    const sortQuery = sortFilter(sort);
    const groupQuery = groupFilter(group);

    let url = `http/api/tags?name[regex]=^${search}&name[options]=i&${sortQuery}&${groupQuery}&page=${page}&limit=25`;
    return getTagsThunk(url, thunkAPI);
  }
);

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    changeTagsPage: (state, { payload }) => {
      state.page = payload;
    },
    openCreateForm: (state) => {
      state.isForm = true;
    },
    closeCreateForm: (state) => {
      state.isForm = false;
      state.loadingForm = false;
    },
    closeTagModal: (state) => {
      state.isGetTag = false;
      state.tagModal = false;
      state.tag = null;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
  },
  extraReducers: {
    [createTag.pending]: (state) => {
      state.isCreate = true;
    },
    [createTag.fulfilled]: (state, { payload }) => {
      state.isCreate = false;
      state.isForm = false;
      state.tags = [];
      toast.success(`Tag created successfully!!`);
    },
    [createTag.rejected]: (state, { payload }) => {
      state.isCreate = false;
      state.isForm = true;
      toast.error(payload);
    },
    //get tags
    [getTags.pending]: (state) => {
      state.isLoading = true;
    },
    [getTags.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.tags = payload.data.tags;
      state.numOfPages = payload.resultsPage;
      state.totalTags = payload.results;
    },
    [getTags.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    //delete tag
    [deleteTag.pending]: (state) => {
      state.isDelete = true;
    },
    [deleteTag.fulfilled]: (state) => {
      state.isDelete = false;
      state.tags = [];
      state.page = 1;
      toast.success(`Tag deleted successfully!!`);
    },
    [deleteTag.rejected]: (state, { payload }) => {
      state.isDelete = false;
      toast.error(payload);
    },
    //update tag
    [updateTag.pending]: (state) => {
      state.isUpdate = true;
    },
    [updateTag.fulfilled]: (state) => {
      state.isUpdate = false;
      state.isForm = false;
      state.tags = [];
      toast.success(`Tag updated successfully!!`);
    },
    [updateTag.rejected]: (state, { payload }) => {
      state.isUpdate = false;
      state.isForm = true;
      toast.error(payload);
    },
    //getTag
    [getTag.pending]: (state) => {
      state.isGetTag = true;
      state.tagModal = true;
    },
    [getTag.fulfilled]: (state, { payload }) => {
      state.isGetTag = false;
      state.tagModal = true;
      state.tag = payload.data.tag;
      state.tagId = payload.data.tag._id;
    },
    [getTag.rejected]: (state, { payload }) => {
      state.tagModal = false;
      state.isGetTag = false;
      toast.error(payload);
    },
  },
});

export const {
  openCreateForm,
  closeCreateForm,
  changeTagsPage,
  handleChange,
  closeTagModal,
} = tagsSlice.actions;

export default tagsSlice.reducer;
