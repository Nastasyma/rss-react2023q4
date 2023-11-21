import styles from './NoResults.module.scss';
import MushhromGif from '../../../assets/images/mushroom.gif';

function NoResults(): JSX.Element {
  return (
    <div className={styles.noResultsContainer} data-testid="no-results">
      <h2>No results found</h2>
      <img src={MushhromGif} alt="mushroom gif" />
    </div>
  );
}

export default NoResults;
