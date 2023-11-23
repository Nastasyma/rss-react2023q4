import MainSection from "@/components/MainSection/MainSection";
import { wrapper } from "@/store/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { IData } from "@/utils/types";
import { GetServerSideProps } from "next";
import { getCards, getRunningQueriesThunk } from "@/store/apiSlice";
import Layout from "@/components/Layout/Layout";

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { search, page, limit } = context.query;

    await store.dispatch(
      getCards.initiate({
        searchText: search?.toString() || "",
        page: Number(page) || 1,
        itemsPerPage: Number(limit) || 4,
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        cards: store.getState().cards.cardsList,
        totalCount: store.getState().cards.totalCount,
        totalPages: store.getState().cards.totalPages,
      },
    };
  });

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
