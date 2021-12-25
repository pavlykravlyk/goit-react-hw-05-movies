import styles from './Cast.module.css';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import * as api from '../../services/themoviedb-api';

export default function Cast({ movieId }) {
  //   const params = useParams();
  //   console.log(params);
  const [credits, setCredits] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');
    getMovieCast();
  }, []);

  async function getMovieCast() {
    try {
      const response = await api.fetchCredits(movieId);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCredits(data.cast);
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
    <ul>
      {credits.map(cast => (
        <li key={cast.id}>{cast.name}</li>
      ))}
    </ul>
  );
}
