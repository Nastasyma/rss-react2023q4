import { Component } from 'react';
import styles from './CardsList.module.scss';
import Card from '../Card/Card';
import { ICard } from '../../utils/types';

type CardsListProps = {
  cards: ICard[];
};
class CardsList extends Component<CardsListProps> {
  constructor(props: CardsListProps) {
    super(props);
  }
  render() {
    return (
      <div className={styles.cardsList}>
        {this.props.cards.map((card) => (
          <Card key={card.id} data={card} />
        ))}
      </div>
    );
  }
}

export default CardsList;
