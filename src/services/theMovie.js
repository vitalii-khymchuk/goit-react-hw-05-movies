import axios from 'axios';
import {
  normalizeResults,
  normalizeCast,
  normalizeReviews,
} from 'utils/normalizeResponse';

const API_KEY = 'c6849c57578619bd16dafe22e211e348';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = { api_key: API_KEY };

const getPopular = async ({ page = 1, controller }) => {
  try {
    const { data } = await axios.get('/movie/popular', {
      params: { page },
      signal: controller.signal,
    });
    return normalizeResults(data.results);
  } catch (error) {
    const isCanceled = axios.isCancel(error);
    if (isCanceled) return [];

    throw new Error(error);
  }
};

const getByQuery = async ({ query, page = 1, controller }) => {
  try {
    const { data } = await axios.get('/search/movie', {
      params: { query, page },
      signal: controller.signal,
    });
    return normalizeResults(data.results);
  } catch (error) {
    const isCanceled = axios.isCancel(error);
    if (isCanceled) return [];

    throw new Error(error);
  }
};

const getDetails = async ({ id, controller }) => {
  try {
    const { data } = await axios.get(`/movie/${id}`, {
      signal: controller.signal,
    });
    return data;
  } catch (error) {
    const isCanceled = axios.isCancel(error);
    if (isCanceled) return null;

    throw new Error(error);
  }
};

const getCredits = async ({ id, controller }) => {
  try {
    const { data } = await axios.get(`/movie/${id}/credits`, {
      signal: controller.signal,
    });
    return normalizeCast(data.cast);
  } catch (error) {
    const isCanceled = axios.isCancel(error);
    if (isCanceled) return [];

    throw new Error(error);
  }
};

const getReviews = async ({ id, controller }) => {
  try {
    const { data } = await axios.get(`/movie/${id}/reviews`, {
      signal: controller.signal,
    });
    return normalizeReviews(data.results);
  } catch (error) {
    const isCanceled = axios.isCancel(error);
    if (isCanceled) return [];

    throw new Error(error);
  }
};

const theMovie = { getPopular, getByQuery, getDetails, getCredits, getReviews };
export default theMovie;
