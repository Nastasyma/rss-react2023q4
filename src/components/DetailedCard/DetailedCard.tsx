import styles from './DetailedCard.module.scss';
import Image from 'next/image';
import { ICard } from '@/utils/types';
import { useRouter } from 'next/router';

interface DetailedCardProps {
  data?: ICard;
}

function DetailedCard({ data }: DetailedCardProps): JSX.Element {
  const router = useRouter();
  return (
    <div className={styles.cardContainer} data-testid="detailed-card">
      <div className={styles.card}>
        <div className={styles.cardInfo}>
          <button
            className={styles.closeBtn}
            data-testid="close-btn"
            type="button"
            onClick={() => {
              delete router.query.mushroom;
              router.push({ pathname: router.pathname, query: router.query });
            }}
          >
            Close
          </button>
          <div className={styles.cardImg}>
            <Image src={data?.image || ''} alt={`${data?.title} image`} width={350} height={350} />
          </div>
          <h2>{data?.title}</h2>
          <div className={styles.cardDescription}>{data?.description}</div>
        </div>
      </div>
    </div>
  );
}

export default DetailedCard;
