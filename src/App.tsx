import { RouterProvider } from 'react-router-dom';
import router from './router';
import ErrorBoundary from './components/Error/ErrorBoundary';

function App(): JSX.Element {
  return (
    <>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </>
  );
}

export default App;
