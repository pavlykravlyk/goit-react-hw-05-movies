import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleFormSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() !== '') {
      //   onSubmit(searchQuery);
      setSearchQuery('');
    } else toast.error('input field must not be empty');
  };

  return (
    <section>
      <h2>сторінка пошуку кінофільмів за ключовим словом</h2>
      <form onSubmit={handleFormSubmit} className={styles.MoviesPage}>
        <input
          className={styles.MoviesPage__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="search movies"
          value={searchQuery}
          onChange={event =>
            setSearchQuery(event.currentTarget.value.toLowerCase())
          }
        />

        <button type="submit" className={styles.MoviesPage__button}>
          search
        </button>
      </form>
    </section>
  );
}
