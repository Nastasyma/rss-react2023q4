import { Component } from 'react';
import styles from './CardsList.module.scss';
import Card from '../Card/Card';

class CardsList extends Component {
  render() {
    return (
      <div className={styles.cardsList}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}

export default CardsList;
