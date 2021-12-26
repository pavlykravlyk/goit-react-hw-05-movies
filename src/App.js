import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './components/Container/Container';
import PageHeader from './components/PageHeader/PageHeader';

import HomePage from './pages/HomePage/HomePage';
// const HomePage = React.lazy(() => import('./pages/HomePage/HomePage.jsx'));
import MoviesPage from './pages/MoviesPage/MoviesPage';
// const MoviesPage = React.lazy(() =>
//   import('./pages/MoviesPage/MoviesPage.jsx'),
// );
import MovieDetailPage from './pages/MovieDetailsPage/MovieDetailPage';
// const MovieDetailPage = React.lazy(() =>
//   import('./pages/MovieDetailsPage/MovieDetailPage.jsx'),
// );

export default function App() {
  return (
    <div className="App">
      <Container>
        <PageHeader />
        {/* <h1>Welcome to React Router!</h1> */}
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailPage />} />
        </Routes>
      </Container>

      <ToastContainer autoClose={3000} />
    </div>
  );
}
