import styles from './Cast.module.css';
import { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import * as api from '../../services/themoviedb-api';
import Loader from 'react-loader-spinner';
import headshotImg from '../../images/headshot.png';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');
    getMovieCast();
  }, []);

  async function getMovieCast() {
    try {
      const response = await api.fetchCast(movieId);
      if (response.ok) {
        const data = await response.json();
        setCast(data.cast);
        setStatus('resolved');
      } else {
        return Promise.reject(new Error(`Movie ${movieId} not found`));
      }
    } catch (error) {
      setError(error);
      setStatus('rejected');
      toast.error(error.message);
    }
  }

  return (
    <section>
      {status === 'pending' && (
        <Loader type="ThreeDots" color="gray" height={80} width={80} />
      )}
      {status === 'resolved' && (
        <ul className={styles.List}>
          {cast.map(({ id, profile_path, name, character }) => (
            <li key={id} className={styles.Item}>
              <img
                className={styles.ProfileImg}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w185/${profile_path}`
                    : headshotImg
                }
                alt={name}
              />
              <p>{name}</p>
              <p className={styles.Character}>character: {character}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
