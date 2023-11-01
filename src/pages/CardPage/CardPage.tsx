import { useCallback, useEffect, useState } from 'react';
import DetailedCard from '../../components/DetailedCard/DetailedCard';
import styles from './CardPage.module.scss';
import { ICard } from '../../utils/types';
import { useSearchParams } from 'react-router-dom';
import { fetchDetailedCard } from '../../utils/api';
import LoadingIcon from '../../assets/images/gear-spinner.svg?react';

function CardPage(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [card, setCard] = useState<ICard | null>(null);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('mushroom');

  const createCard = useCallback(async () => {
    if (id) {
      setIsLoading(true);
      const data = await fetchDetailedCard(id);
      setCard(data);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    createCard();
  }, [createCard]);

  return (
    <div className={styles.cardContainer}>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <LoadingIcon className={styles.loadingIcon} />
        </div>
      ) : card ? (
        <DetailedCard card={card} />
      ) : null}
    </div>
  );
}

export default CardPage;
