import { useContext, useEffect, useState } from 'react';
import styles from './MainSection.module.scss';
import CardsList from '../../components/CardsList/CardsList';
import LoadingIcon from '../../assets/images/gear-spinner.svg?react';
import Pagination from '../../components/Pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import ItemsPerPage from '../../components/ItemsPerPage/ItemsPerPage';
import { SearchContext } from '../../context/SearchContext';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../../store/apiSlice';
import { setCardsList } from '../../store/cardList/cardListSlice';

function MainSection(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const searchContext = useContext(SearchContext);
  const searchText = searchContext ? searchContext.searchText : '';
  const [totalPages, setTotalPages] = useState(0);
  const [totalCountHeader, setTotalCountHeader] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const id = searchParams.get('mushroom');
  const limit = searchParams.get('limit') || '0';

  const { data, isFetching } = apiSlice.useGetCardsQuery({
    searchText,
    page: currentPage,
    itemsPerPage: parseInt(limit),
  });

  useEffect(() => {
    if (data) {
      setTotalCountHeader(data.totalCount.toString());
      const calculatedTotalPages = !isNaN(parseInt(limit))
        ? Math.ceil(data.totalCount / parseInt(limit))
        : 0;
      setTotalPages(calculatedTotalPages);
    }
  }, [data, limit, dispatch]);

  useEffect(() => {
    dispatch(
      setCardsList({
        cardsList: data?.cards || [],
      })
    );
  }, [data, dispatch, currentPage, limit, searchText, isFetching]);

  return (
    <div className={styles.mainContainer}>
      <div className={id ? styles.cardsContainer : ''}>
        <div className={styles.cardsList}>
          {id && (
            <div
              className={styles.overlay}
              onClick={() => {
                setSearchParams((searchParams) => {
                  searchParams.delete('mushroom');
                  return searchParams;
                });
              }}
            />
          )}
          <ItemsPerPage count={totalCountHeader} />
          {isFetching ? (
            <div className={styles.loadingContainer}>
              <LoadingIcon className={styles.loadingIcon} />
            </div>
          ) : (
            <>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setSearchParams={setSearchParams}
              />
              <CardsList />
            </>
          )}
        </div>
        {id ? <Outlet /> : ''}
      </div>
    </div>
  );
}

export default MainSection;
