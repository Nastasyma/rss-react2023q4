import styles from './ErrorPage.module.scss';
import { Link } from 'react-router-dom';

function ErrorPage(): JSX.Element {
  return (
    <div className={styles.errorContainer}>
      <h2>Oops, something went wrong</h2>
      <Link to="/">
        <button type="button">Home</button>
      </Link>
    </div>
  );
}

export default ErrorPage;
