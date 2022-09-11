import customFetch from '../../utils/axios';

export const getTagsThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const getTagThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const createTagThunk = async (url, data, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, data);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const deleteTagThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.delete(url);
    return resp.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const updateTagThunk = async (url, data, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, data);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
