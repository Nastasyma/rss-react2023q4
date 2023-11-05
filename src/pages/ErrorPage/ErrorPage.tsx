import styles from './ErrorPage.module.scss';
import MushhromGif from '../../assets/images/mushroom.gif';
import { Link } from 'react-router-dom';

function ErrorPage(): JSX.Element {
  return (
    <div className={styles.errorContainer}>
      <h2>No results found</h2>
      <img src={MushhromGif} alt="mushroom gif" />
      <Link to="/">
        <button type="button">Home</button>
      </Link>
    </div>
  );
}

export default ErrorPage;
