import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '9b761b6f4cc8300b0313efea2435331b';
const MediaType = { ALL: 'all', MOVIE: 'movie', TV: 'tv', PERSON: 'person' };
const TimeWindow = { DAY: 'day', WEEK: 'week' };

export function fetchTrending() {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
  });

  return fetch(
    `${BASE_URL}/trending/${MediaType.MOVIE}/${TimeWindow.DAY}?${searchParams}`,
  );
}

export function fetchDetails(movieId) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
  });

  return fetch(`${BASE_URL}/${MediaType.MOVIE}/${movieId}?${searchParams}`);
}
fetchDetails.PropTypes = { movieId: PropTypes.number.isRequired };

export function fetchCast(movieId) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
  });

  return fetch(
    `${BASE_URL}/${MediaType.MOVIE}/${movieId}/credits?${searchParams}`,
  );
}
fetchCast.PropTypes = { movieId: PropTypes.number.isRequired };

export function fetchReviews(movieId) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
  });

  return fetch(
    `${BASE_URL}/${MediaType.MOVIE}/${movieId}/reviews?${searchParams}`,
  );
}
fetchReviews.PropTypes = { movieId: PropTypes.number.isRequired };

export function fetchMovieByQuery(searchQuery) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    query: searchQuery,
  });

  return fetch(`${BASE_URL}/search/${MediaType.MOVIE}?${searchParams}`);
}
fetchMovieByQuery.PropTypes = { searchQuery: PropTypes.string.isRequired };
