import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import convertToSlug from '../../utils/slugify';
import * as api from '../../services/themoviedb-api';
import styles from '../HomePage/HomePage.module.css';
import Loader from 'react-loader-spinner';

export default function MoviesPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState('null');
  const [status, setStatus] = useState('idle');
  const unmountedRef = useRef();

  useEffect(() => {
    if (
      (searchQuery && !unmountedRef.current) ||
      (searchQuery && unmountedRef.current)
    ) {
      setStatus('pending');
      getMovieByQuery();
    }

    return () => {
      unmountedRef.current = !unmountedRef.current;
    };
  }, [searchQuery]);

  async function getMovieByQuery() {
    try {
      const response = await api.fetchMovieByQuery(searchQuery);
      if (response.ok) {
        const data = await response.json();
        setMovies(data.results);
        setStatus('resolved');
      } else {
        return Promise.reject(new Error(`Movie ${searchQuery} not found`));
      }
    } catch {
      setError(error);
      setStatus('rejected');
      toast.error(error.message);
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (query.trim() !== '') {
      setSearchParams({ query });
      setQuery('');
    } else {
      toast.error('input field must not be empty');
    }
  }

  function handleInputChange(event) {
    const inputValue = event.currentTarget.value;
    setQuery(inputValue.toLowerCase());
  }

  return (
    <section>
      <form onSubmit={handleFormSubmit} className={styles.MoviesPage}>
        <input
          className={styles.MoviesPage__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="search movies"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.MoviesPage__button}>
          search
        </button>
      </form>

      {status === 'pending' && (
        <Loader type="ThreeDots" color="gray" height={80} width={80} />
      )}

      {status === 'resolved' && (
        <ul className={styles.list}>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link
                to={`/movies/${convertToSlug(`${title} ${id}`)}`}
                state={{ from: { location, label: 'go back to movies page' } }}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
