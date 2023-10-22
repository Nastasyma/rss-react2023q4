import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/global.scss';

const root = document.getElementById('root') as HTMLElement;

if (root) ReactDOM.createRoot(root).render(<App />);
