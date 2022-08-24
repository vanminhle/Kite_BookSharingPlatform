import customFetch from '../../utils/axios';

export const getTagsThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data.data.tags;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const submitBooksThunk = async (url, formData, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
