import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ErrorBoundary from '../components/Error/ErrorBoundary';
import HomePage from '../pages/HomePage/HomePage';
import CardPage from '../pages/CardPage/CardPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <ErrorBoundary>
          <HomePage />
        </ErrorBoundary>
      }
      errorElement={<ErrorPage />}
    >
      <Route path="" element={<CardPage />} />
    </Route>
  )
);

export default router;
