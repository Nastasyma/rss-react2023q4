import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/Error/ErrorBoundary';
import router from './router';

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
