import styles from './FallBackUIComponent.module.scss';

interface FallBackUIProps {
  errorText: string;
}

function FallBackUIComponent({ errorText }: FallBackUIProps): JSX.Element {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.fallbackContainer}>
      <div className={styles.fallback}>
        <div className={styles.fallbackText}>
          <h2>Something went wrong...</h2>
          <span className={styles.fallbackError}>{errorText}</span>
          <button className={styles.reloadBtn} onClick={handleReload}>
            Reload App
          </button>
        </div>
      </div>
    </div>
  );
}

export default FallBackUIComponent;
