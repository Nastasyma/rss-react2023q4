import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./Search.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

function Search(): JSX.Element {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const searchText = router.query.search?.toString() || "";

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
    event.preventDefault();
    const query = { ...router.query };
    query.page = "1";
    query.search = inputValue;

    if (inputValue === "") {
      delete query.search;
    }

    router.push({
      pathname: router.pathname,
      query,
    });
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
            <Image
              src="/assets/images/cross.svg"
              alt="clear"
              width={16}
              height={16}
            />
          </button>
        )}
        <button
          type="submit"
          className={styles.searchBtn}
          data-testid="submit-button"
        >
          <Image
            src="/assets/images/search.svg"
            alt="search"
            width={20}
            height={20}
            className={styles.searchIcon}
          />
        </button>
      </form>
    </div>
  );
}

export default Search;
