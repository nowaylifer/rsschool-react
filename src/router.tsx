import { RouteObject } from 'react-router-dom';
import Layout from './components/Layout';
import UncontrolledForm from './screens/UncontrolledForm';
import HookForm from './screens/HookForm';
import Main from './screens/Main';

const routerConfig: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
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
