import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from '../components/Error/ErrorBoundary';
import HomePage from '../pages/HomePage/HomePage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ErrorBoundary>
            <HomePage />
          </ErrorBoundary>
        }
      ></Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRouter;
