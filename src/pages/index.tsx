import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Search from "@/components/Search/Search";
import ErrorButton from "@/components/Error/ErrorButton/ErrorButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
      </main>
    </>
  );
}
