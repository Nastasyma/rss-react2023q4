import styles from './CardsList.module.scss';
import Card from '../Card/Card';
import { ICard } from '../../utils/types';

type CardsListProps = {
  cards: ICard[];
};
function CardsList({ cards }: CardsListProps): JSX.Element {
  return (
    <div className={styles.cardsList}>
      {cards.map((card) => (
        <Card key={card.id} data={card} />
      ))}
    </div>
  );
}

export default CardsList;
