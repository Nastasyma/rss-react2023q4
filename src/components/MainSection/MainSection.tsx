import { useCallback, useEffect, useState } from 'react';
import styles from './MainSection.module.scss';
import CardsList from '../../components/CardsList/CardsList';
import LoadingIcon from '../../assets/images/gear-spinner.svg?react';
import { ICard } from '../../utils/types';
import NoResults from '../../components/Error/NoResults/NoResults';
import Pagination from '../../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
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
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    localStorage.getItem('itemsPerPage-mushrooms')
      ? parseInt(localStorage.getItem('itemsPerPage-mushrooms')!)
      : 4
  );
  const [totalCountHeader, setTotalCountHeader] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const createCards = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      setIsSearchError(false);

      try {
        const { data, totalCountHeader } = await fetchCards(searchText, page, itemsPerPage);

        if (data.length === 0) {
          setCards([]);
          setIsSearchError(true);
        } else {
          setCards(data);
          const totalCount = totalCountHeader ? parseInt(totalCountHeader) : 0;
          const calculatedTotalPages = Math.ceil(totalCount / itemsPerPage);
          setTotalPages(calculatedTotalPages);
          setTotalCountHeader(totalCountHeader);
        }
      } catch (error) {
        setIsSearchError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [itemsPerPage, searchText]
  );

  useEffect(() => {
    createCards(currentPage);
  }, [currentPage, createCards]);

  return (
    <div className={styles.main}>
      <ItemsPerPage
        count={totalCountHeader}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <LoadingIcon />
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
  );
}

export default MainSection;
