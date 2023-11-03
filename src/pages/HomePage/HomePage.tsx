import styles from './HomePage.module.scss';
import Search from '../../components/Search/Search';

import MainSection from '../../components/MainSection/MainSection';
import { useState } from 'react';
import ErrorButton from '../../components/Error/ErrorButton/ErrorButton';
import { useSearchParams } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';

function HomePage(): JSX.Element {
  const [searchText, setSearchText] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const id = searchParams.get('mushroom');

  if ((page && isNaN(Number(page))) || (id && isNaN(Number(id)))) {
    return <ErrorPage />;
  }

  return (
    <main className={styles.main}>
      <Search onSearch={setSearchText} searchText={searchText} />
      <ErrorButton title="Click me!" />
      <MainSection searchText={searchText} />
    </main>
  );
}

export default HomePage;
