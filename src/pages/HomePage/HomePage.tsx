import { Component } from 'react';
import styles from './HomePage.module.scss';
import Search from '../../components/Search/Search';
import CardsList from '../../components/CardsList/CardsList';
import LoadingIcon from '../../assets/images/gear-spinner.svg?react';
import axios from 'axios';
import { ICard } from '../../utils/types';

type HomePageProps = Record<string, never>;
interface HomePageState {
  cards: ICard[];
  isLoading: boolean;
}

class HomePage extends Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      cards: [],
      isLoading: false,
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

    this.setState({ isLoading: true });

    axios
      .get<ICard[]>(url)
      .then((response) => {
        this.setState({ cards: response.data, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };
  render() {
    const { cards, isLoading } = this.state;

    return (
      <main className={styles.main}>
        <Search onSearch={this.handleSearch.bind(this)} />
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <LoadingIcon />
          </div>
        ) : (
          <CardsList cards={cards} />
        )}
      </main>
    );
  }
}

export default HomePage;
