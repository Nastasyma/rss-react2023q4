import styles from './CardsList.module.scss';
import Card from '../Card/Card';
import { useContext } from 'react';
import { CardsContext } from '../../context/CardsContext';
import NoResults from '../Error/NoResults/NoResults';

function CardsList(): JSX.Element {
  const { cards } = useContext(CardsContext);

  return (
    <div className={styles.cardsList}>
      {cards.length ? cards.map((card) => <Card key={card.id} data={card} />) : <NoResults />}
    </div>
  );
}

export default CardsList;
