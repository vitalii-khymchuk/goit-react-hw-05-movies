import axios from 'axios';

const API_KEY = 'c6849c57578619bd16dafe22e211e348';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = { api_key: API_KEY };

const getPopular = ({ page = 1, controller }) =>
  axios.get('/movie/popular', { params: { page }, signal: controller.signal });

const getByQuery = ({ query, page = 1, controller }) =>
  axios.get('/search/movie', {
    params: { query, page },
    signal: controller.signal,
  });

const getDetails = ({ id, controller }) =>
  axios.get(`/movie/${id}`, {
    signal: controller.signal,
  });

const getCredits = ({ id, controller }) =>
  axios.get(`/movie/${id}/credits`, {
    signal: controller.signal,
  });

const getReviews = ({ id, controller }) =>
  axios.get(`/movie/${id}/reviews`, {
    signal: controller.signal,
  });

const theMovie = { getPopular, getByQuery, getDetails, getCredits, getReviews };
export default theMovie;
