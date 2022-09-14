import customFetch from '../../utils/axios';

export const getConversationsThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const getMessagesThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const sendMessageThunk = async (url, data, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, data);
    return resp.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const createConversationThunk = async (url, data, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, data);
    return resp.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};
