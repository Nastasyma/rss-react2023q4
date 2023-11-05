import { useCallback, useEffect, useState } from 'react';
import styles from './MainSection.module.scss';
import CardsList from '../../components/CardsList/CardsList';
import LoadingIcon from '../../assets/images/gear-spinner.svg?react';
import { ICard } from '../../utils/types';
import NoResults from '../../components/Error/NoResults/NoResults';
import Pagination from '../../components/Pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import ItemsPerPage from '../../components/ItemsPerPage/ItemsPerPage';
import { fetchCards } from '../../utils/api';

interface MainSectionProps {
  searchText: string | null;
}
function MainSection({ searchText }: MainSectionProps): JSX.Element {
  const [cards, setCards] = useState<ICard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCountHeader, setTotalCountHeader] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const id = searchParams.get('mushroom');
  const limit = searchParams.get('limit') || '0';

  const createCards = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      setIsSearchError(false);

      try {
        const { data, totalCountHeader } = await fetchCards(searchText, page, parseInt(limit));

        if (data.length === 0) {
          setCards([]);
          setIsSearchError(true);
        } else {
          setCards(data);
          const totalCount = totalCountHeader ? parseInt(totalCountHeader) : 0;
          const calculatedTotalPages = !isNaN(parseInt(limit))
            ? Math.ceil(totalCount / parseInt(limit))
            : 0;
          setTotalPages(calculatedTotalPages);
          setTotalCountHeader(totalCountHeader);
        }
      } catch (error) {
        setIsSearchError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [limit, searchText]
  );

  useEffect(() => {
    createCards(currentPage);
  }, [currentPage, createCards]);

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
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <LoadingIcon className={styles.loadingIcon} />
            </div>
          ) : isSearchError ? (
            <NoResults />
          ) : (
            <>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setSearchParams={setSearchParams}
              />
              <CardsList cards={cards} />
            </>
          )}
        </div>
        {id ? <Outlet /> : ''}
      </div>
    </div>
  );
}

export default MainSection;
