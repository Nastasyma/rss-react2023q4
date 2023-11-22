import { useEffect, useState } from 'react';
import styles from './MainSection.module.scss';
import Pagination from '../../components/Pagination/Pagination';
import ItemsPerPage from '../../components/ItemsPerPage/ItemsPerPage';
import {  useSelector } from 'react-redux';
import { selectIsCardsLoading, selectPage } from '../../store/cardList/cardListSelector';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import CardsList from '../CardsList/CardsList';
import { IData } from '@/utils/types';

function MainSection({ data }: { data: IData }): JSX.Element {
  const isLoadingCards = useSelector(selectIsCardsLoading);
  const id = useSearchParams().get('mushroom');
  const page = useSelector(selectPage) || 1;

  return (
    <div className={styles.mainContainer}>
      <div className={id ? styles.cardsContainer : ''}>
        <div className={styles.cardsList}>
          {/* {id && (
            <div
              className={styles.overlay}
              onClick={() => {
                setSearchParams((searchParams) => {
                  searchParams.delete('mushroom');
                  return searchParams;
                });
              }}
            />
          )} */}
          <ItemsPerPage count={data.totalCount} />
          {isLoadingCards ? (
            <div className={styles.loadingContainer}>
              <Image src="/assets/images/gear-spinner.svg" alt="loading" width={100} height={100} />
            </div>
          ) : (
            <>
              <Pagination
                totalPages={Number(data.totalPages)}
                currentPage={page}
              />
              <CardsList cards={data.cards}/>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainSection;
