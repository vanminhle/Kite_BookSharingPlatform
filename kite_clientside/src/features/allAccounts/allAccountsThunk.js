import customFetch from '../../utils/axios';

export const getAllAccountsThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const getUserAccountThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const setAccountStatusThunk = async (url, data, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, data);
    return resp.data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const setAccountRoleThunk = async (url, data, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, data);
    return resp.data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};
