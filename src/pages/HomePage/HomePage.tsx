import { Component } from 'react';
import styles from './HomePage.module.scss';
import Search from '../../components/Search/Search';

class HomePage extends Component {
  render() {
    return (
      <>
        <main className={styles.main}>
          <Search />
        </main>
      </>
    );
  }
}

export default HomePage;
