import { useSearchParams } from 'react-router-dom';
import styles from './DetailedCard.module.scss';
import { useContext } from 'react';
import { DetailedCardContext } from '../../context/DetailedCardContext';

function DetailedCard(): JSX.Element {
  const [, setSearchParams] = useSearchParams();
  const { card } = useContext(DetailedCardContext) || {};

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
          <img src={card?.image} alt={`${card?.title} image`} />
        </div>
        <h2>{card?.title}</h2>
        <div className={styles.cardDescription}>{card?.description}</div>
      </div>
    </div>
  );
}

export default DetailedCard;
