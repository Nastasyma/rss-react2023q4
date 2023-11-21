import ErrorBoundary from "@/components/Error/ErrorBoundary";
import Layout from "@/components/Layout/Layout";
import { store } from "@/store/store";
import "@/styles/global.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}
