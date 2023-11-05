import styles from './Card.module.scss';
import { ICard } from '../../utils/types';
import KnifeIcon from '../../assets/images/knife-and-spoon.svg?react';
import TreeIcon from '../../assets/images/tree.svg?react';
import SeasonsIcon from '../../assets/images/seansons.svg?react';
import { useSearchParams } from 'react-router-dom';

interface CardProps {
  data: ICard;
}

function Card({ data }: CardProps): JSX.Element {
  const { title, edibility, image, habitat, season, description, id } = data;
  const [, setSearchParams] = useSearchParams();

  return (
    <div
      className={styles.card}
      onClick={() => {
        setSearchParams((searchParams) => {
          searchParams.set('mushroom', id.toString());
          return searchParams;
        });
      }}
    >
      <div className={styles.cardImg}>
        <img src={image} alt={`${title} image`} />
      </div>
      <h2>{title}</h2>
      <div className={styles.cardIcon}>
        <KnifeIcon />
        <span>{edibility}</span>
      </div>
      <div className={styles.cardIcon}>
        <TreeIcon />
        <span>{habitat}</span>
      </div>
      <div className={styles.cardIcon}>
        <SeasonsIcon />
        <span>{season}</span>
      </div>
      <div className={styles.cardDescription}>{description}</div>
    </div>
  );
}

export default Card;
