import customFetch from '../../utils/axios';

export const getManageBooksThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const setBookApprovingStatusThunk = async (url, data, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, data);
    return resp.data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const deleteBookThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.delete(url);
    return resp.data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const getBookThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const updateBookThunk = async (url, data, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, data);
    return resp.data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};
