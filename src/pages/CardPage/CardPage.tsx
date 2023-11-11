import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import DetailedCard from '../../components/DetailedCard/DetailedCard';
import styles from './CardPage.module.scss';
import { useSearchParams } from 'react-router-dom';
import { fetchDetailedCard } from '../../utils/api';
import LoadingIcon from '../../assets/images/gear-spinner.svg?react';
import { DetailedCardContext } from '../../context/DetailedCardContext';

function CardPage(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const detailedCard = useContext(DetailedCardContext);
  const detailedCardRef = useRef(detailedCard);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('mushroom');

  useEffect(() => {
    detailedCardRef.current = detailedCard;
  }, [detailedCard]);

  const createCard = useCallback(async () => {
    if (detailedCardRef.current && id) {
      setIsLoading(true);
      const data = await fetchDetailedCard(id);
      detailedCardRef.current.setCard(data);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    createCard();
  }, [createCard]);

  return (
    <div className={styles.cardContainer} data-testid="detailed-card">
      {isLoading ? (
        <div className={styles.loadingContainer} data-testid="loading-icon">
          <LoadingIcon className={styles.loadingIcon} />
        </div>
      ) : detailedCard && detailedCard.card ? (
        <DetailedCard />
      ) : null}
    </div>
  );
}

export default CardPage;
