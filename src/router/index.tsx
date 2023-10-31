import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { RoutesName } from '../utils/types';
import Root from '../components/Root';
import ErrorBoundary from '../components/Error/ErrorBoundary';
import HomePage from '../pages/HomePage/HomePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RoutesName.home} element={<Root />}>
      <Route
        index
        element={
          <ErrorBoundary>
            <HomePage />
          </ErrorBoundary>
        }
      />
    </Route>
  )
);

export default router;
