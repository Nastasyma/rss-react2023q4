import React, { PropsWithChildren } from 'react';
import Search from '../Search/Search';
import ErrorButton from '../Error/ErrorButton/ErrorButton';
import styles from './Layout.module.scss';

function Layout({ children }: PropsWithChildren): JSX.Element {
  return (
    <>
      <main className={styles.main} data-testid="home-page">
        <Search />
        <ErrorButton title="Click me!" />

        {children}
      </main>
    </>
  );
}

export default Layout;
