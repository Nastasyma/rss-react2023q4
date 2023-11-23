import MainSection from '@/components/MainSection/MainSection';
import { wrapper } from '@/store/store';
import { IData } from '@/utils/types';
import { GetServerSideProps } from 'next';
import { getCards, getDetailedCard, getRunningQueriesThunk } from '@/store/apiSlice';
import Layout from '@/components/Layout/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { search, page, limit, mushroom } = context.query;

    await store.dispatch(
      getCards.initiate({
        searchText: search?.toString() || '',
        page: Number(page) || 1,
        itemsPerPage: Number(limit) || 4,
      })
    );

    if (mushroom) {
      await store.dispatch(getDetailedCard.initiate(mushroom.toString()));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        cards: store.getState().cards.cardsList,
        totalCount: store.getState().cards.totalCount,
        totalPages: store.getState().cards.totalPages,
        detailedCard: store.getState().details.detailedCard,
      },
    };
  }
);

export default function Home(data: IData) {
  const router = useRouter();

  useEffect(() => {
    const queryParams = router.query;
    if (Object.keys(queryParams).length === 0) {
      router.push(`?page=1&limit=4`);
    }
  }, [router]);

  return (
    <>
      <Layout>
        <MainSection data={data} />
      </Layout>
    </>
  );
}
