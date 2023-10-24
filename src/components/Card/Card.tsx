import { Component } from 'react';
import styles from './Card.module.scss';
import { ICard } from '../../utils/types';
import KnifeIcon from '../../assets/images/knife-and-spoon.svg?react';
import TreeIcon from '../../assets/images/tree.svg?react';
import SeasonsIcon from '../../assets/images/seansons.svg?react';

interface CardProps {
  data: ICard;
}
class Card extends Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }
  render() {
    const { title, edibility, image, habitat, season, description } = this.props.data;

    return (
      <div className={styles.card}>
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
}

export default Card;
