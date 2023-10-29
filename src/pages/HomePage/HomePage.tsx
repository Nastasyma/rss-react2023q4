import { Component } from 'react';
import styles from './HomePage.module.scss';
import Search from '../../components/Search/Search';
import CardsList from '../../components/CardsList/CardsList';
import LoadingIcon from '../../assets/images/gear-spinner.svg?react';
import { ICard } from '../../utils/types';
import NoResults from '../../components/Error/NoResults/NoResults';

type HomePageProps = Record<string, never>;
interface HomePageState {
  cards: ICard[];
  isLoading: boolean;
  isSearchError: boolean;
}

class HomePage extends Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      cards: [],
      isLoading: false,
      isSearchError: false,
    };
  }

  componentDidMount() {
    const searchText = localStorage.getItem('search-text-mushrooms');
    this.fetchCards(searchText ? searchText : undefined);
  }

  handleSearch = (value: string) => {
    localStorage.setItem('search-text-mushrooms', value);
    this.fetchCards(value);
  };

  fetchCards = (searchText?: string) => {
    let url = 'https://mock-server-api-nastasyma.vercel.app/catalog';
    if (searchText && searchText.trim() !== '') {
      url += `?title_like=${searchText}`;
    }

    this.setState({ isLoading: true, isSearchError: false });

    fetch(url)
      .then((response) => response.json())
      .then((data: ICard[]) => {
        if (data.length === 0) {
          this.setState({ cards: [], isLoading: false, isSearchError: true });
        } else {
          this.setState({ cards: data, isLoading: false, isSearchError: false });
        }
      })
      .catch(() => {
        this.setState({ isLoading: false, isSearchError: true });
      });
  };
  render() {
    const { cards, isLoading, isSearchError } = this.state;

    return (
      <main className={styles.main}>
        <Search onSearch={this.handleSearch.bind(this)} />
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
}

export default HomePage;
