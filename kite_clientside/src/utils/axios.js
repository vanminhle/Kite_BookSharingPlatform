import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const customFetch = axios.create({
  baseURL: API_ENDPOINT,
});

export default customFetch;
