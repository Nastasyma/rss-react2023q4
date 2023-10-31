import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './Search.module.scss';
import SearchIcon from '../../assets/images/search.svg?react';
import CrossIcon from '../../assets/images/cross.svg?react';
import ErrorButton from '../Error/ErrorButton/ErrorButton';

interface SearchProps {
  onSearch: (value: string) => void;
}
function Search({ onSearch }: SearchProps): JSX.Element {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const searchText = localStorage.getItem('search-text-mushrooms');
    if (searchText) {
      setInputValue(searchText);
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };

  const handleClearInput = () => {
    setInputValue('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(inputValue);
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
      <ErrorButton title="Click me!" />
    </div>
  );
}

export default Search;
