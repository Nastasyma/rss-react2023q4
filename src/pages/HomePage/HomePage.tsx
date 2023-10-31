import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import Search from '../../components/Search/Search';
import CardsList from '../../components/CardsList/CardsList';
import LoadingIcon from '../../assets/images/gear-spinner.svg?react';
import { ICard } from '../../utils/types';
import NoResults from '../../components/Error/NoResults/NoResults';
import Pagination from '../../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

function HomePage(): JSX.Element {
  const [cards, setCards] = useState<ICard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchText = localStorage.getItem('search-text-mushrooms');
    fetchCards(searchText ? searchText : undefined, currentPage);
  }, [currentPage]);

  const handleSearch = (value: string) => {
    localStorage.setItem('search-text-mushrooms', value);
    setCurrentPage(1);
    fetchCards(value);
  };

  const fetchCards = async (searchText?: string, page = 1) => {
    let url = `https://mock-server-api-nastasyma.vercel.app/catalog?_limit=4&_page=${page}`;
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
        const calculatedTotalPages = Math.ceil(totalCount / 4);
        setTotalPages(calculatedTotalPages);
      }
    } catch (error) {
      setIsSearchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className={styles.main}>
      <Search onSearch={handleSearch} />
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
