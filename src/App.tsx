import ErrorBoundary from './components/Error/ErrorBoundary';
import FallBackUIComponent from './components/Error/FallBackUIComponent';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <ErrorBoundary fallback={<FallBackUIComponent />}>
      <HomePage />
    </ErrorBoundary>
  );
}

export default App;
