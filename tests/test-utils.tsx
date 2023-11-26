import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/redux/store';
import Home from '@/pages';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { QueryParamProvider } from 'use-query-params';
import NextAdapterPages from 'next-query-params/pages';

export const TEST_API_URL = 'https://api.deezer.com';
export const testSearchQuery = 'eminem';
export const testDetailsId = '103248';

export function renderApp(initialURL = '', options?: RenderOptions) {
  const store = makeStore();

  const App = () => (
    <MemoryRouterProvider url={initialURL}>
      <Provider store={store}>
        <QueryParamProvider adapter={NextAdapterPages} options={{ removeDefaultsFromUrl: true }}>
          <Home />
        </QueryParamProvider>
      </Provider>
    </MemoryRouterProvider>
  );

  return { store, ...render(<App />, options) };
}
