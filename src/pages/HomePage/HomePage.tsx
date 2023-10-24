import { Component } from 'react';
import styles from './HomePage.module.scss';
import Search from '../../components/Search/Search';
import CardsList from '../../components/CardsList/CardsList';

class HomePage extends Component {
  render() {
    return (
      <main className={styles.main}>
        <Search />
        <CardsList />
      </main>
    );
  }
}

export default HomePage;
