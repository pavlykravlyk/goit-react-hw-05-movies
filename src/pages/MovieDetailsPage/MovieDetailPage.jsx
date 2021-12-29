import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import * as api from '../../services/themoviedb-api';
import styles from './MovieDetailPage.module.css';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

export default function MovieDetailPage() {
  let navigate = useNavigate();
  const { movieId } = useParams();

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
          <button className={styles.Button} onClick={() => navigate(-1)}>
            go back
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
                <Link to={`./cast`}>Cast</Link>
              </li>
              <li>
                <Link to={`./reviews`}>Reviews</Link>
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
