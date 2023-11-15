import styles from './CardsList.module.scss';
import Card from '../Card/Card';
import NoResults from '../Error/NoResults/NoResults';
import { useSelector } from 'react-redux';
import { selectCards } from '../../store/cardList/cardListSelector';

function CardsList(): JSX.Element {
  const cards = useSelector(selectCards);

  return (
    <div className={styles.cardsList}>
      {cards.length ? cards.map((card) => <Card key={card.id} data={card} />) : <NoResults />}
    </div>
  );
}

export default CardsList;
