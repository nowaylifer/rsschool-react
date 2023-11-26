import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '@/lib/redux/store';
import NextAdapterPages from 'next-query-params/pages';
import { QueryParamProvider } from 'use-query-params';

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryParamProvider adapter={NextAdapterPages} options={{ removeDefaultsFromUrl: true }}>
      <Component {...pageProps} />
    </QueryParamProvider>
  );
}

export default wrapper.withRedux(App);
