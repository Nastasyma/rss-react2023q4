import { useCallback, useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import Search from '../../components/Search/Search';
import CardsList from '../../components/CardsList/CardsList';
import LoadingIcon from '../../assets/images/gear-spinner.svg?react';
import { ICard } from '../../utils/types';
import NoResults from '../../components/Error/NoResults/NoResults';
import Pagination from '../../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import ItemsPerPage from '../../components/ItemsPerPage/ItemsPerPage';

function HomePage(): JSX.Element {
  const [cards, setCards] = useState<ICard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalCountHeader, setTotalCountHeader] = useState<string | null>(null);

  const [, setSearchParams] = useSearchParams();

  const fetchCards = useCallback(
    async (searchText?: string, page = 1) => {
      let url = `https://mock-server-api-nastasyma.vercel.app/catalog?_limit=${itemsPerPage}&_page=${page}`;
      if (searchText && searchText.trim() !== '') {
        url += `&title_like=${searchText}`;
      }

      setSearchParams((searchParams) => {
        searchParams.set('page', `${page}`);
        return searchParams;
      });

      setIsLoading(true);
      setIsSearchError(false);

      try {
        const response = await fetch(url);
        const data: ICard[] = await response.json();

        if (data.length === 0) {
          setCards([]);
          setIsSearchError(true);
        } else {
          setCards(data);
          const totalCountHeader = response.headers.get('X-Total-Count');
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
    [setSearchParams, itemsPerPage]
  );

  useEffect(() => {
    const searchText = localStorage.getItem('search-text-mushrooms');
    fetchCards(searchText ? searchText : undefined, currentPage);
  }, [currentPage, fetchCards]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    localStorage.setItem('search-text-mushrooms', value);
    setCurrentPage(1);
    fetchCards(value);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value !== itemsPerPage) {
      setItemsPerPage(value);
      setCurrentPage(1);
      const calculatedTotalPages = Math.ceil(cards.length / value);
      setTotalPages(calculatedTotalPages);
    }
  };

  return (
    <main className={styles.main}>
      <Search onSearch={handleSearch} />
      <ItemsPerPage
        value={itemsPerPage}
        max={totalCountHeader !== null ? totalCountHeader : undefined}
        onChange={handleItemsPerPageChange}
      />
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <LoadingIcon />
        </div>
      ) : isSearchError ? (
        <NoResults />
      ) : (
        <>
          <CardsList cards={cards} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}

export default HomePage;
