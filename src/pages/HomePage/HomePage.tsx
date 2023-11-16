import styles from './HomePage.module.scss';
import Search from '../../components/Search/Search';

import MainSection from '../../components/MainSection/MainSection';
import { useEffect } from 'react';
import ErrorButton from '../../components/Error/ErrorButton/ErrorButton';
import { useLocation, useSearchParams } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setItemsPerPage, setPage } from '../../store/cardList/cardListSlice';

function HomePage(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const id = searchParams.get('mushroom');
  const limit = searchParams.get('limit') || '0';

  const location = useLocation();

  useEffect(() => {
    if (searchParams.toString() === '') {
      setSearchParams((searchParams) => {
        searchParams.set('page', '1');
        searchParams.set('limit', '4');
        return searchParams;
      });
      dispatch(setItemsPerPage({ itemsPerPage: 4 }));
      dispatch(setPage({ page: 1 }));
    }
  }, [searchParams, setSearchParams, location, dispatch]);

  if (
    (page && isNaN(Number(page))) ||
    (id && isNaN(Number(id))) ||
    (limit && isNaN(Number(limit)))
  ) {
    return <ErrorPage />;
  }

  return (
    <main className={styles.main} data-testid="home-page">
      <Search />
      <ErrorButton title="Click me!" />
      <MainSection />
    </main>
  );
}

export default HomePage;
