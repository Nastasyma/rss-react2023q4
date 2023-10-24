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
    if (searchText && searchText.trim() !== '') {
      axios
        .get<ICard[]>(
          `https://mock-server-api-nastasyma.vercel.app/catalog/?title_like=${searchText}`
        )
        .then((response) => {
          this.setState({ cards: response.data });
        })
        .catch((error) => {
          console.error('Error fetching filtered cards:', error);
        });
    } else {
      axios
        .get<ICard[]>('https://mock-server-api-nastasyma.vercel.app/catalog')
        .then((response) => {
          this.setState({ cards: response.data });
        })
        .catch((error) => {
          console.error('Error fetching cards:', error);
        });
    }
  }
  render() {
    const { cards } = this.state;

    return (
      <main className={styles.main}>
        <Search />
        <CardsList cards={cards} />
      </main>
    );
  }
}

export default HomePage;
