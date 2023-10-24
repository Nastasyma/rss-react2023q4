import { Component } from 'react';
import styles from './HomePage.module.scss';
import Search from '../../components/Search/Search';
import CardsList from '../../components/CardsList/CardsList';
import axios from 'axios';
import { ICard } from '../../utils/types';

type HomePageProps = Record<string, never>;
interface HomePageState {
  cards: ICard[];
}

class HomePage extends Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      cards: [] as ICard[],
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
    axios
      .get<ICard[]>(url)
      .then((response) => {
        this.setState({ cards: response.data });
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
      });
  };
  render() {
    const { cards } = this.state;

    return (
      <main className={styles.main}>
        <Search onSearch={this.handleSearch.bind(this)} />
        <CardsList cards={cards} />
      </main>
    );
  }
}

export default HomePage;
