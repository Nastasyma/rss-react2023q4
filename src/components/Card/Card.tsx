import { Component } from 'react';
import styles from './Card.module.scss';
import Img from '../../assets/images/cep.jpg';
import KnifeIcon from '../../assets/images/knife-and-spoon.svg?react';
import TreeIcon from '../../assets/images/tree.svg?react';
import SeasonsIcon from '../../assets/images/seansons.svg?react';

class Card extends Component {
  render() {
    return (
      <div className={styles.cardWrapper}>
        <div className={styles.cardImg}>
          <img src={Img} alt="Mushroom Image" />
        </div>
        <h2>Cep</h2>
        <div className={styles.cardIcon}>
          <KnifeIcon width="20" height="20" />
          <span>Edible</span>
        </div>
        <div className={styles.cardIcon}>
          <TreeIcon width="20" height="20" />
          <span>Coniferous and mixed forests</span>
        </div>
        <div className={styles.cardIcon}>
          <SeasonsIcon width="20" height="20" />
          <span>June - September</span>
        </div>
        <div className={styles.cardDescription}>
          The most colorful representative of the mushroom kingdom. According to some sources, it
          earned its name because its flesh remains marbled white even after cooking.
        </div>
      </div>
    );
  }
}

export default Card;
