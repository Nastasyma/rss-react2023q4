import { useSearchParams } from 'react-router-dom';
import styles from './DetailedCard.module.scss';
import { selectDetailsId } from '../../store/details/detailsSelector';
import { useSelector } from 'react-redux';
import { apiSlice } from '../../store/apiSlice';

function DetailedCard(): JSX.Element {
  const [, setSearchParams] = useSearchParams();
  const id = useSelector(selectDetailsId);

  const { data } = apiSlice.useGetDetailedCardQuery(id.toString() || '');

  return (
    <div className={styles.card}>
      <div className={styles.cardInfo}>
        <button
          className={styles.closeBtn}
          data-testid="close-btn"
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
          <img src={data?.image} alt={`${data?.title} image`} />
        </div>
        <h2>{data?.title}</h2>
        <div className={styles.cardDescription}>{data?.description}</div>
      </div>
    </div>
  );
}

export default DetailedCard;
