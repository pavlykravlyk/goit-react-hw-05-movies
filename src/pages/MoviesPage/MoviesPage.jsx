import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as api from '../../services/themoviedb-api';
import styles from '../HomePage/HomePage.module.css';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('null');
  const [status, setStatus] = useState('idle');

  function handleFormSubmit(event) {
    event.preventDefault();
    searchQuery.trim() !== ''
      ? getMovieByQuery(searchQuery)
      : toast.error('input field must not be empty');
    setSearchQuery('');
  }

  function handleInputChange(event) {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  }

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

  return (
    <section>
      <form onSubmit={handleFormSubmit} className={styles.MoviesPage}>
        <input
          className={styles.MoviesPage__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="search movies"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.MoviesPage__button}>
          search
        </button>
      </form>

      {status === 'resolved' && (
        <ul className={styles.list}>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
