import React from 'react';
import Image from 'next/image';
import styles from './Loading.module.scss';

function Loading() {
  return (
    <div className={styles.loadingContainer} data-testid="loading-indicator">
      <div className={styles.loadingIcon}>
        <Image src="/assets/images/gear-spinner.svg" alt="loading" width={120} height={120} />
      </div>
    </div>
  );
}

export default Loading;
