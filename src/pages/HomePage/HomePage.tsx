import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import Search from '../../components/Search/Search';
import CardsList from '../../components/CardsList/CardsList';
import LoadingIcon from '../../assets/images/gear-spinner.svg?react';
import { ICard } from '../../utils/types';
import NoResults from '../../components/Error/NoResults/NoResults';

function HomePage(): JSX.Element {
  const [cards, setCards] = useState<ICard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);

  useEffect(() => {
    const searchText = localStorage.getItem('search-text-mushrooms');
    fetchCards(searchText ? searchText : undefined);
  }, []);

  const handleSearch = (value: string) => {
    localStorage.setItem('search-text-mushrooms', value);
    fetchCards(value);
  };

  const fetchCards = async (searchText?: string) => {
    let url = 'https://mock-server-api-nastasyma.vercel.app/catalog';
    if (searchText && searchText.trim() !== '') {
      url += `?title_like=${searchText}`;
    }

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
      }
    } catch (error) {
      setIsSearchError(true);
    } finally {
      setIsLoading(false);
    }
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
        <CardsList cards={cards} />
      )}
    </main>
  );
}

export default HomePage;
