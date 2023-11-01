import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import MusicScreen from './screens/MusicScreen';
import MusicProvider from './components/MusicProvider';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
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
