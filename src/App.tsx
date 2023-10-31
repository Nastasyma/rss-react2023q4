import ErrorBoundary from './components/Error/ErrorBoundary';
import HomePage from './pages/HomePage/HomePage';

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}

export default App;
