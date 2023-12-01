import { RouteObject } from 'react-router-dom';
import Layout from './components/Layout';
import UncontrolledScreen from './screens/UncontrolledScreen';

const routerConfig: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: null,
      },
      {
        path: 'uncontrolled-form',
        element: <UncontrolledScreen />,
      },
    ],
  },
];

export default routerConfig;
