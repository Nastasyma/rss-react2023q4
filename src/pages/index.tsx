import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Search from "@/components/Search/Search";
import ErrorButton from "@/components/Error/ErrorButton/ErrorButton";
import MainSection from "@/components/MainSection/MainSection";
import { AppDispatch, wrapper } from "@/store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setItemsPerPage, setPage } from "@/store/cardList/cardListSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { IData } from "@/utils/types";
import { GetServerSideProps } from "next";
import { getCards, getRunningQueriesThunk } from "@/store/apiSlice";

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

    const { data } = await store.dispatch(
      getCards.initiate({
        searchText: Array.isArray(search) ? search[0] : search || "",
        page: page ? parseInt(page as string) : 1,
        itemsPerPage: limit ? parseInt(limit as string) : 4,
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        cards: data?.cards || [],
        totalCount: data?.totalCount || 0,
        totalPages: data?.totalPages || 0,
      },
    };
  });

export default function Home(data: IData) {
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const queryParams = searchParams.toString();
    if (queryParams === "") {
      router.push(`?page=1&limit=4`);
      dispatch(setItemsPerPage({ itemsPerPage: 4 }));
      dispatch(setPage({ page: 1 }));
    }
  }, [searchParams, router, dispatch]);

  return (
    <>
      <Head>
        <title>React-mushrooms</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="React-mushrooms" />
      </Head>
      <main className={styles.main} data-testid="home-page">
        <Search />
        <ErrorButton title="Click me!" />
        <MainSection data={data} />
      </main>
    </>
  );
}
