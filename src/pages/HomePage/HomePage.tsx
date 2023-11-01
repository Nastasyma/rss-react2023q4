import styles from './HomePage.module.scss';
import Search from '../../components/Search/Search';

import MainSection from '../../components/MainSection/MainSection';
import { useState } from 'react';
import ErrorButton from '../../components/Error/ErrorButton/ErrorButton';

function HomePage(): JSX.Element {
  const [searchText, setSearchText] = useState<string | null>(null);

  return (
    <main className={styles.main}>
      <Search onSearch={setSearchText} searchText={searchText} />
      <ErrorButton title="Click me!" />
      <MainSection searchText={searchText} />
    </main>
  );
}

export default HomePage;
