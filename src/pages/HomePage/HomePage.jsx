import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import * as api from '../../services/themoviedb-api';
import styles from './HomePage.module.css';

export default function HomePage() {
  // const location = useLocation();
  // console.log(location);
  // const navigate = useNavigate();
  // console.log(to, options);

  const [trendsFilms, setTrendsFilms] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');
    getFilmsTrending();
  }, []);

  async function getFilmsTrending() {
    try {
      const response = await api.fetchTrending();
      if (response.ok) {
        const data = await response.json();
        setTrendsFilms(data.results);
        setStatus('resolved');
      } else {
        return Promise.reject(new Error('No trends found'));
      }
    } catch (error) {
      setError(error);
      setStatus('rejected');
      toast.error(error.message);
    }
  }

  return (
    <section>
      <h2 className={styles.title}>Trending today</h2>

      {status === 'pending' && (
        <Loader type="ThreeDots" color="gray" height={80} width={80} />
      )}

      {status === 'resolved' && (
        <ul className={styles.list}>
          {trendsFilms.map(({ id, title }) => (
            <li key={id} className={styles.item}>
              <Link
                to={
                  // {
                  // pathname:
                  `/movies/${id}`
                  // ,
                  // state: { from: location, label: 'Back to Home Page' },
                  // }
                }
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
