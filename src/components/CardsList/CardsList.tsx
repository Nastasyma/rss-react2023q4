import styles from './CardsList.module.scss';
import Card from '../Card/Card';
import NoResults from '../Error/NoResults/NoResults';
import { IData } from '@/utils/types';

function CardsList({ cards }: IData): JSX.Element {
  return (
    <div className={styles.cardsList}>
      {cards?.length ? cards.map((card) => <Card key={card.id} data={card} />) : <NoResults />}
    </div>
  );
}

export default CardsList;
