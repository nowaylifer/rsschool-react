import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import MusicScreen from './screens/MusicScreen';
import MusicProvider from './components/MusicProvider';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

const router = createBrowserRouter([
  {
    element: (
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <RootLayout />
      </QueryParamProvider>
    ),
    children: [
      {
        path: '/',
        element: <MusicProvider />,
        children: [
          {
            index: true,
            element: <MusicScreen />,
          },
        ],
      },
    ],
  },
]);

export default router;
