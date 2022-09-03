import customFetch from '../../utils/axios';

export const viewBookDetailThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};
