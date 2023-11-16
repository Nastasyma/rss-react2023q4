import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './Search.module.scss';
import SearchIcon from '../../assets/images/search.svg?react';
import CrossIcon from '../../assets/images/cross.svg?react';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from '../../store/search/searchTextSlice';
import { selectSearchText } from '../../store/search/searchTextSelector';
import { setPage } from '../../store/cardList/cardListSlice';

function Search(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const searchText = useSelector(selectSearchText);
  const [inputValue, setInputValue] = useState('');
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setInputValue(searchText);
  }, [searchText]);

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
    dispatch(setPage({ page: 1 }));
    dispatch(setSearchText({ searchText: inputValue }));
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
          <button
            type="button"
            className={styles.clearInputBtn}
            onClick={handleClearInput}
            data-testid="clear-button"
          >
            <CrossIcon />
          </button>
        )}
        <button type="submit" className={styles.searchBtn} data-testid="submit-button">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}

export default Search;
