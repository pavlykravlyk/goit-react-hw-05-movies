import {
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import * as api from '../../services/themoviedb-api';
import styles from './MovieDetailPage.module.css';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

export default function MovieDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const unmountedRef = useRef();

  const { slug } = useParams();
  const movieId = slug.match(/[0-9]+$/)[0];

  useEffect(() => {
    async function getMovieDetail() {
      try {
        const response = await api.fetchDetails(movieId);
        if (response.ok) {
          const data = await response.json();
          setMovie(data);
          setStatus('resolved');
        } else {
          return Promise.reject(new Error(`Movie not found`));
        }
      } catch (error) {
        setError(error);
        setStatus('rejected');
        toast.error(error.message);
      }
    }

    if (!unmountedRef.current) {
      setStatus('pending');
      getMovieDetail();
    }

    return () => {
      unmountedRef.current = true;
    };
  }, [movieId]);

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
          <button
            type="button"
            className={styles.Button}
            onClick={() => {
              navigate(location?.state?.from?.location ?? '/');
            }}
          >
            {location?.state?.from?.label ?? 'go back'}
          </button>
          <div className={styles.MainInfo}>
            <img
              className={styles.Img}
              src={
                poster_path && `https://image.tmdb.org/t/p/w342/${poster_path}`
              }
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
          <div className={styles.AddInfo}>
            <p>Additional information</p>
            <ul className={styles.AddInfoList}>
              <li>
                <Link to={`./cast`} state={{ from: location?.state?.from }}>
                  Cast
                </Link>
              </li>
              <li>
                <Link to={`./reviews`} state={{ from: location?.state?.from }}>
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
        </section>
      )}

      <Suspense
        fallback={
          <Loader type="ThreeDots" color="gray" height={80} width={80} />
        }
      >
        <Routes>
          <Route path="cast" element={<Cast movieId={movieId} />} />
          <Route path="reviews" element={<Reviews movieId={movieId} />} />
        </Routes>
      </Suspense>
    </>
  );
}
