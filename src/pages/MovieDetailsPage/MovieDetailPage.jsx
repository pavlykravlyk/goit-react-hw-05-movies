import {
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
  //   useRoutes,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import * as api from '../../services/themoviedb-api';
import styles from './MovieDetailPage.module.css';
import Cast from '../Cast/Cast';

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const { pathname } = useLocation();
  console.log(pathname);

  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');
    getMovieDetail();
  }, [movieId]);

  async function getMovieDetail() {
    try {
      const response = await api.fetchDetails(movieId);
      if (response.ok) {
        const data = await response.json();
        setMovie(data);
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

  const {
    poster_path,
    tagline,
    title,
    release_date,
    vote_average,
    overview,
    genres,
  } = movie;

  return (
    <>
      {status === 'pending' && (
        <Loader type="ThreeDots" color="gray" height={80} width={80} />
      )}

      {status === 'resolved' && (
        <section className={styles.Section}>
          <div className={styles.MainInfo}>
            <img
              className={styles.Img}
              src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
              alt={tagline}
            />
            <div className={styles.Descr}>
              <h2>
                {title} ({new Date(release_date).getFullYear()})
              </h2>
              <p>User Score: {vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h3>Genres</h3>
              <ul className={styles.Genres}>
                {genres.map(({ id, name }) => (
                  <li className={styles.Genre} key={id}>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <NavLink to={`${pathname}/cast`}>Cast</NavLink>
              </li>
              {/* <li>
                <NavLink to="/movies/:movieId/reviews"></NavLink>
              </li> */}
            </ul>
          </div>
        </section>
      )}

      <Routes>
        <Route path=":movieId/" element={<Cast movieId={movieId} />} />
      </Routes>
    </>
  );
}
