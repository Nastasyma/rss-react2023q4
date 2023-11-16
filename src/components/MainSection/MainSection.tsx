import { useEffect, useState } from 'react';
import styles from './MainSection.module.scss';
import CardsList from '../../components/CardsList/CardsList';
import LoadingIcon from '../../assets/images/gear-spinner.svg?react';
import Pagination from '../../components/Pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import ItemsPerPage from '../../components/ItemsPerPage/ItemsPerPage';
import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { apiSlice } from '../../store/apiSlice';
import {
  setCardsList,
  setIsCardsLoading,
  setItemsPerPage,
  setPage,
} from '../../store/cardList/cardListSlice';
import { selectIsCardsLoading } from '../../store/cardList/cardListSelector';
import { selectSearchText } from '../../store/search/searchTextSelector';

function MainSection(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const isLoadingCards = useSelector(selectIsCardsLoading);
  const searchText = useSelector(selectSearchText);
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

    dispatch(setIsCardsLoading({ isLoading: isFetching }));
  }, [data, dispatch, currentPage, limit, searchText, isFetching]);

  useEffect(() => {
    dispatch(setItemsPerPage({ itemsPerPage: parseInt(searchParams.get('limit') || '0') }));
    dispatch(setPage({ page: parseInt(searchParams.get('page') || '0') }));
  }, [searchParams, dispatch]);

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
          {isLoadingCards ? (
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
