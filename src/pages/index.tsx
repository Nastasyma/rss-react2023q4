import Head from "next/head";
import MainSection from "@/components/MainSection/MainSection";
import { wrapper } from "@/store/store";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IData } from "@/utils/types";
import { GetServerSideProps } from "next";
import { getCards, getRunningQueriesThunk } from "@/store/apiSlice";
import Layout from "@/components/Layout/Layout";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { searchText, page, limit } = context.query;

//   const res = await fetch(
//     `https://mock-server-api-nastasyma.vercel.app/catalog?_limit=${
//       limit || 4
//     }&_page=${page || 1}&title_like=${searchText || ""}`
//   );
//   const cards = await res.json();

//   return {
//     props: {
//       cards,
//     },
//   };
// };

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
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const queryParams = searchParams.toString();
    if (queryParams === "") {
      router.push(`?page=1&limit=4`);
    }
  }, [searchParams, router]);

  return (
    <>
      <Head>
        <title>React-mushrooms</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="React-mushrooms" />
      </Head>
      <Layout>
        <MainSection data={data} />
      </Layout>
    </>
  );
}
