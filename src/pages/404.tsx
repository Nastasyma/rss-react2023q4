import styles from '../styles/ErrorPage.module.scss';
import Image from 'next/image';
import Link from 'next/link';

function ErrorPage(): JSX.Element {
  return (
    <div className={styles.errorContainer} data-testid="error-page">
      <h2>No results found</h2>
      <Image src="/assets/images/mushroom.gif" alt="mushroom gif" width={450} height={450} />
      <Link href="/">
        <button type="button">Home</button>
      </Link>
    </div>
  );
}

export default ErrorPage;