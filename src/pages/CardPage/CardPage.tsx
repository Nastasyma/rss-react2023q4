import { useEffect } from 'react';
import DetailedCard from '../../components/DetailedCard/DetailedCard';
import styles from './CardPage.module.scss';
import { useSearchParams } from 'react-router-dom';
import LoadingIcon from '../../assets/images/gear-spinner.svg?react';
import { apiSlice } from '../../store/apiSlice';
import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCardDetails, setIsDetailsLoading } from '../../store/details/detailsSlice';
import { selectDetailsId, selectIsDetailsLoading } from '../../store/details/detailsSelector';

function CardPage(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const isDetailsLoading = useSelector(selectIsDetailsLoading);
  const detailedCard = useSelector(selectDetailsId);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('mushroom');

  const { data, isLoading } = apiSlice.useGetDetailedCardQuery(id || '');

  useEffect(() => {
    dispatch(
      setCardDetails({
        cardDetailsId: data?.id,
      })
    );
    dispatch(setIsDetailsLoading({ isLoading }));
  }, [data, dispatch, isLoading]);

  return (
    <div className={styles.cardContainer} data-testid="detailed-card">
      {isDetailsLoading ? (
        <div className={styles.loadingContainer} data-testid="loading-icon">
          <LoadingIcon className={styles.loadingIcon} />
        </div>
      ) : detailedCard ? (
        <DetailedCard />
      ) : null}
    </div>
  );
}

export default CardPage;
