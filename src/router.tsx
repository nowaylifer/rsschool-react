import { RouteObject } from 'react-router-dom';
import Layout from './components/Layout';
import UncontrolledForm from './screens/UncontrolledForm';

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
        element: <UncontrolledForm />,
      },
    ],
  },
];

export default routerConfig;
