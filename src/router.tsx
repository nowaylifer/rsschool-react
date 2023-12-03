import { RouteObject } from 'react-router-dom';
import Layout from './components/Layout';
import UncontrolledForm from './screens/UncontrolledForm';
import HookForm from './screens/HookForm';

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
      {
        path: 'hook-form',
        element: <HookForm />,
      },
    ],
  },
];

export default routerConfig;
