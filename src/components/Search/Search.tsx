import { ChangeEvent, Component, FormEvent } from 'react';
import styles from './Search.module.scss';
import SearchIcon from '../../assets/images/search.svg?react';
import CrossIcon from '../../assets/images/cross.svg?react';
import ErrorButton from '../Error/ErrorButton/ErrorButton';

interface SearchProps {
  onSearch: (value: string) => void;
}
interface SearchState {
  inputValue: string;
  error: Error | null;
}
class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { inputValue: '', error: null };
  }

  componentDidMount(): void {
    const searchText = localStorage.getItem('search-text-mushrooms');
    if (searchText) {
      this.setState({ inputValue: searchText });
    }
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    this.setState({ inputValue });
  };

  handleClearInput = () => {
    this.setState({ inputValue: '' });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { inputValue } = this.state;
    this.props.onSearch(inputValue);
  };

  render() {
    return (
      <div className={styles.searchWrapper}>
        <form className={styles.searchForm} onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={this.state.inputValue}
            className={styles.searchInput}
            onChange={this.handleInputChange.bind(this)}
          />
          {this.state.inputValue && (
            <button type="button" className={styles.clearInputBtn} onClick={this.handleClearInput}>
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
}

export default Search;
