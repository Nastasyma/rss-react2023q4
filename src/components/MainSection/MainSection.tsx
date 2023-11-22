import { useEffect, useState } from 'react';
import styles from './MainSection.module.scss';
import Pagination from '../../components/Pagination/Pagination';
// import { Outlet, useSearchParams } from 'react-router-dom';
import ItemsPerPage from '../../components/ItemsPerPage/ItemsPerPage';
import { AppDispatch, wrapper } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCardsQuery } from '../../store/apiSlice';
import {
  setCardsList,
  setIsMainLoading,
  setItemsPerPage,
  setPage,
} from '../../store/cardList/cardListSlice';
import { selectIsCardsLoading } from '../../store/cardList/cardListSelector';
import { selectSearchText } from '../../store/search/searchTextSelector';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import CardsList from '../CardsList/CardsList';
import { IData } from '@/utils/types';

function MainSection({ data }: { data: IData }): JSX.Element {
  const isLoadingCards = useSelector(selectIsCardsLoading);
  const id = useSearchParams().get('mushroom');
  console.log(data)

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
          <ItemsPerPage count={'10'} />
          {isLoadingCards ? (
            <div className={styles.loadingContainer}>
              <Image src="/assets/images/gear-spinner.svg" alt="loading" width={100} height={100} />
            </div>
          ) : (
            <>
              {/* <Pagination
                totalPages={4}
                currentPage={1}
              /> */}
              <CardsList cards={data.cards}/>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainSection;
