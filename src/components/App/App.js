import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppBar from '../AppBar/AppBar';
import Container from '../Container/Container';
import Loader from 'react-loader-spinner';

const MoviePages = lazy(() =>
  import(
    '../../pages/MoviePage/MoviesPage' /* webpackChunkName: "movie-pages" */
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    '../../pages/MovieDetailsPage/MoveDetailsPage' /* webpackChunkName: "movie details-page" */
  ),
);
const NoFoundPage = lazy(() =>
  import(
    '../../pages/NoFoundPage/NoFoundPage' /* webpackChunkName: "noFound-page" */
  ),
);
const HomePage = lazy(() =>
  import('../../pages/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Container>
        <AppBar />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies">
            <MoviePages />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route path="/noFound">
            <NoFoundPage />
          </Route>
          <Redirect to="/noFound" />
        </Switch>
      </Container>
    </Suspense>
  );
}
