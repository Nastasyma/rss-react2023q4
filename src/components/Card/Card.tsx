import styles from './Card.module.scss';
import { ICard } from '../../utils/types';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface CardProps {
  data: ICard;
}

function Card({ data }: CardProps): JSX.Element {
  const { title, edibility, image, habitat, season, description, id } = data;
  const router = useRouter();

  return (
    <div
      className={styles.card}
      data-testid="card"
      onClick={() => {
        router.push({
          pathname: router.pathname,
          query: {
            ...router.query,
            mushroom: String(id),
          },
        });
      }}
    >
      <div className={styles.cardImg}>
        <Image src={image} alt={`${title} image`} width={260} height={260} />
      </div>
      <h2>{title}</h2>
      <div className={styles.cardIcon}>
        <Image
          src="/assets/images/knife-and-spoon.svg"
          alt="Knife and spoon icon"
          width={20}
          height={20}
        />
        <span>{edibility}</span>
      </div>
      <div className={styles.cardIcon}>
        <Image src="assets/images/tree.svg" alt="Tree icon" width={20} height={20} />
        <span>{habitat}</span>
      </div>
      <div className={styles.cardIcon}>
        <Image src="assets/images/seasons.svg" alt="Seasons icon" width={20} height={20} />
        <span>{season}</span>
      </div>
      <div className={styles.cardDescription}>{description}</div>
    </div>
  );
}

export default Card;
