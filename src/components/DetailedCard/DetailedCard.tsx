import { useSearchParams } from 'react-router-dom';
import { ICard } from '../../utils/types';
import styles from './DetailedCard.module.scss';

interface DetailedCardProps {
  card: ICard;
}

function DetailedCard({ card }: DetailedCardProps): JSX.Element {
  const { title, image, description } = card;
  const [, setSearchParams] = useSearchParams();

  return (
    <div className={styles.card}>
      <div className={styles.cardInfo}>
        <button
          className={styles.closeBtn}
          type="button"
          onClick={() => {
            setSearchParams((searchParams) => {
              searchParams.delete('mushroom');
              return searchParams;
            });
          }}
        >
          Close
        </button>
        <div className={styles.cardImg}>
          <img src={image} alt={`${title} image`} />
        </div>
        <h2>{title}</h2>
        <div className={styles.cardDescription}>{description}</div>
      </div>
    </div>
  );
}

export default DetailedCard;
