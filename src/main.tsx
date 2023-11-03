import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/global.scss';
import ErrorBoundary from './components/Error/ErrorBoundary.tsx';

const root = document.getElementById('root') as HTMLElement;

if (root)
  ReactDOM.createRoot(root).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
