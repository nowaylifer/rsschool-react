import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import MusicSearchScreen from './screens/MusicSearchScreen';
import MusicSearchProvider from './components/MusicSearchProvider';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import MusicDetailsScreen from './screens/MusicDetailsScreen';
import MusicDetailsProvider from './components/MusicDetailsProvider';
import withOutlet from './components/hoc/withOutlet';

const MusicSearchScreenWithOutlet = withOutlet(MusicSearchScreen);

const router = createBrowserRouter([
  {
    element: (
      <QueryParamProvider adapter={ReactRouter6Adapter} options={{ removeDefaultsFromUrl: true }}>
        <MusicSearchProvider>
          <MusicDetailsProvider>
            <RootLayout />
          </MusicDetailsProvider>
        </MusicSearchProvider>
      </QueryParamProvider>
    ),
    children: [
      {
        path: '/',
        element: <MusicSearchScreenWithOutlet />,
        children: [
          {
            index: true,
            element: <MusicDetailsScreen />,
          },
        ],
      },
    ],
  },
]);

export default router;
