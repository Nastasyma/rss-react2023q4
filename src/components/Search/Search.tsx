import { Component } from 'react';
import styles from './Search.module.scss';
import SearchIcon from '../../assets/images/search.svg?react';

class Search extends Component {
  render() {
    return (
      <form className={styles.searchForm}>
        <input
          type="search"
          placeholder="Search"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchBtn}>
          <SearchIcon width="20" height="20" />
        </button>
      </form>
    );
  }
}

export default Search;
