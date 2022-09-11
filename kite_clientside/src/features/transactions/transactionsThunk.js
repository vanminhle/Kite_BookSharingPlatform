import customFetch from '../../utils/axios';

export const getTransactionsThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const deleteTransactionThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.delete(url);
    return resp.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
