// import { useState } from 'react';
// import PropTypes from 'prop-types';

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

export function fetchCredits(movieId) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
  });

  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=9b761b6f4cc8300b0313efea2435331b&language=en-US`;

  return fetch(url);

  //   return fetch(
  //     `${BASE_URL}/${MediaType.MOVIE}/${movieId}/credits?${searchParams}`,
  //   );
}

// export function fetch(searchQuery, page) {
//   const searchParams = new URLSearchParams({
//     api_key: API_KEY,
//     query: searchQuery,
//     page: page,
//   });

//   return fetch(`${BASE_URL}?${searchParams}`);
// }

// fetchFilms.propTypes = {
//   searchQuery: PropTypes.string,
//   page: PropTypes.number,
// };