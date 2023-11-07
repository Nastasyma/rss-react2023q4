import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import styles from './Search.module.scss';
import SearchIcon from '../../assets/images/search.svg?react';
import CrossIcon from '../../assets/images/cross.svg?react';
import { useSearchParams } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';

function Search(): JSX.Element {
  const searchContext = useContext(SearchContext);
  const [inputValue, setInputValue] = useState('');
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const storedSearchText = localStorage.getItem('search-text-mushrooms');
    if (storedSearchText) {
      setInputValue(storedSearchText);
      searchContext?.setSearchText(storedSearchText);
    }
  }, [searchContext]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };

  const handleClearInput = () => {
    setInputValue('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    localStorage.setItem('search-text-mushrooms', inputValue);
    event.preventDefault();
    setSearchParams((searchParams) => {
      searchParams.set('page', '1');
      return searchParams;
    });
    searchContext?.setSearchText(inputValue);
  };

  return (
    <div className={styles.searchWrapper}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          className={styles.searchInput}
          onChange={handleInputChange}
        />
        {inputValue && (
          <button type="button" className={styles.clearInputBtn} onClick={handleClearInput}>
            <CrossIcon />
          </button>
        )}
        <button type="submit" className={styles.searchBtn}>
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}

export default Search;
