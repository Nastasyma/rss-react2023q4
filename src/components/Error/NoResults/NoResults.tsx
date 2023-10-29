import { Component } from 'react';
import styles from './NoResults.module.scss';
import MushhromGif from '../../../assets/images/mushroom.gif';

class NoResults extends Component {
  render() {
    return (
      <div className={styles.noResultsContainer}>
        <h2>No results found</h2>
        <img src={MushhromGif} alt="mushroom gif" />
      </div>
    );
  }
}

export default NoResults;
