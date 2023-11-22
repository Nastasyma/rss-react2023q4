import styles from './Card.module.scss';
import { ICard } from '../../utils/types';
// import KnifeIcon from '../../assets/images/knife-and-spoon.svg?react';
// import TreeIcon from '../../assets/images/tree.svg?react';
// import SeasonsIcon from '../../assets/images/seansons.svg?react';
// import { useSearchParams } from 'react-router-dom';
import Image from 'next/image';

interface CardProps {
  data: ICard;
}

function Card({ data }: CardProps): JSX.Element {
  const { title, edibility, image, habitat, season, description, id } = data;
  // const [, setSearchParams] = useSearchParams();

  return (
    <div
      className={styles.card}
      data-testid="card"
      // onClick={() => {
      //   setSearchParams((searchParams) => {
      //     searchParams.set('mushroom', id.toString());
      //     return searchParams;
      //   });
      // }}
    >
      <div className={styles.cardImg}>
        <Image src={image} alt={`${title} image`} width={260} height={260}/>
      </div>
      <h2>{title}</h2>
      <div className={styles.cardIcon}>
        <Image src="/assets/images/knife-and-spoon.svg" alt="Knife and spoon icon" width={20} height={20} />
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
