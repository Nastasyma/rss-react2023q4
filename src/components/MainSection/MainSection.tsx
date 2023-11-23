import { useRouter } from 'next/router';
import styles from './MainSection.module.scss';
import Pagination from '../../components/Pagination/Pagination';
import ItemsPerPage from '../../components/ItemsPerPage/ItemsPerPage';
import CardsList from '../CardsList/CardsList';
import { IData } from '@/utils/types';
import DetailedCard from '../DetailedCard/DetailedCard';
import Image from 'next/image';

function MainSection({ data }: { data: IData }): JSX.Element {
  const router = useRouter();
  const page = router.query.page || '1';
  const id = router.query.mushroom;
  const isLoadingCards = false;

  return (
    <div className={styles.mainContainer}>
      <div className={id ? styles.cardsContainer : ''}>
        <div className={styles.cardsList}>
          {id && (
            <div
              className={styles.overlay}
              onClick={() => {
                delete router.query.mushroom;
                router.push({ pathname: router.pathname, query: router.query });
              }}
            />
          )}
          <ItemsPerPage count={data.totalCount} />
          {isLoadingCards ? (
            <div className={styles.loadingContainer}>
              <Image
                src="/assets/images/gear-spinner.svg"
                alt="Loading icon"
                width={100}
                height={100}
              />
            </div>
          ) : (
            <>
              <Pagination totalPages={Number(data.totalPages)} currentPage={Number(page)} />
              <CardsList cards={data.cards} />
            </>
          )}
        </div>
        {id ? <DetailedCard data={data.detailedCard} /> : null}
      </div>
    </div>
  );
}

export default MainSection;
