import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./Search.module.scss";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../store/search/searchTextSlice";
import { selectSearchText } from "../../store/search/searchTextSelector";
import { setPage } from "../../store/cardList/cardListSlice";
import Image from "next/image";

function Search(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const searchText = useSelector(selectSearchText);
  const [inputValue, setInputValue] = useState("");
  // const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setInputValue(searchText);
  }, [searchText]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };

  const handleClearInput = (): void => {
    setInputValue("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    localStorage.setItem("search-text-mushrooms", inputValue);
    event.preventDefault();
    // setSearchParams((searchParams) => {
    //   searchParams.set('page', '1');
    //   return searchParams;
    // });
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
            <Image src="/assets/images/cross.svg" alt="clear" width={16} height={16} />
          </button>
        )}
        <button
          type="submit"
          className={styles.searchBtn}
          data-testid="submit-button"
        >
          <Image src="/assets/images/search.svg" alt="search" width={20} height={20} className={styles.searchIcon} />
        </button>
      </form>
    </div>
  );
}

export default Search;
