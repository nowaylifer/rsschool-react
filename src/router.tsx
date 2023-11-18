import { RouteObject } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import MusicSearchScreen from './screens/MusicSearchScreen';
import MusicSearchProvider from './context/MusicSearchProvider';
import MusicDetailsProvider from './context/MusicDetailsProvider';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import MusicDetailsScreen from './screens/MusicDetailsScreen';
import withOutlet from './components/hoc/withOutlet';
import NotFoundScreen from './screens/NotFoundScreen';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorFallBackModal from './components/ErrorFallBackModal';

const MusicSearchScreenWithOutlet = withOutlet(MusicSearchScreen);

const routerConfig: RouteObject[] = [
  {
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallBackModal}>
        <QueryParamProvider adapter={ReactRouter6Adapter} options={{ removeDefaultsFromUrl: true }}>
          <MusicSearchProvider>
            <RootLayout />
          </MusicSearchProvider>
        </QueryParamProvider>
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/',
        element: <MusicSearchScreenWithOutlet />,
        children: [
          {
            element: <MusicDetailsProvider />,
            children: [
              {
                index: true,
                element: <MusicDetailsScreen />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundScreen />,
  },
];

export default routerConfig;
