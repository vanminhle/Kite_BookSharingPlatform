import customFetch from '../../utils/axios';
import { logoutUser } from './userSlice';

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const logoutUserThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const changeInformationThunk = async (url, formData, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const changeEmailThunk = async (url, email, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, email);
    return resp.data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const passwordChangeThunk = async (url, password, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, password);
    return resp.data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const deactivateAccountThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url);
    return resp.data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
