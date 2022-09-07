import customFetch from '../../utils/axios';
import { loadStripe } from '@stripe/stripe-js';

export const viewBookDetailThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const buyBookThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);

    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    stripe.redirectToCheckout({ sessionId: resp.data.session.id });

    // return resp.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const getBookTransactionOfUserThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const getUserTransactionsInventoryThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};
