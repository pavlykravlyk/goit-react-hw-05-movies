import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import Container from './components/Container/Container';
import PageHeader from './components/PageHeader/PageHeader';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailPage'),
);

export default function App() {
  return (
    <div className={styles.App}>
      <Container>
        <PageHeader />
        <Suspense
          fallback={
            <Loader type="ThreeDots" color="gray" height={80} width={80} />
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId/*" element={<MovieDetailPage />} />
          </Routes>
        </Suspense>
      </Container>

      <ToastContainer autoClose={3000} />
    </div>
  );
}
