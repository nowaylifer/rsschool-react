import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PreloadedState } from '@reduxjs/toolkit';
import { RootState, AppStore, setupStore } from '../src/redux/store';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { InitialEntry } from '@remix-run/router';
import routerConfig from '../src/router';

export const TEST_API_URL = 'https://api.deezer.com';
export const testSearchQuery = 'eminem';
export const testDetailsId = '103248';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  routerEntries?: InitialEntry[];
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderApp({
  routerEntries,
  preloadedState = {},
  store = setupStore(preloadedState),
  ...renderOptions
}: ExtendedRenderOptions = {}) {
  const router = createMemoryRouter(routerConfig, { initialEntries: routerEntries });

  const App = () => (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );

  return { store, router, ...render(<App />, renderOptions) };
}
