import styles from './NoResults.module.scss';
import Image from 'next/image';

function NoResults(): JSX.Element {
  return (
    <div className={styles.noResultsContainer} data-testid="no-results">
      <h2>No results found</h2>
      <Image
        src="/assets/images/mushroom.gif"
        alt="mushroom gif"
        width={450}
        height={450}
        priority={true}
      />
    </div>
  );
}

export default NoResults;
