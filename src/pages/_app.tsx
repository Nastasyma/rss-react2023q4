import ErrorBoundary from '@/components/Error/ErrorBoundary';

import Head from 'next/head';
import '@/styles/global.scss';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/store';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading/Loading';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });

    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>React-mushrooms</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="React-mushrooms" />
      </Head>

      <ErrorBoundary>
        {isLoading && <Loading />}
        <Provider store={store}>
          <Component {...props.pageProps} />
        </Provider>
      </ErrorBoundary>
    </>
  );
}
