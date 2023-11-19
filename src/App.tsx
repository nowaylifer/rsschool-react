import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './redux/store';
import routerConfig from './router';

const router = createBrowserRouter(routerConfig);

export const App = () => (
  <Provider store={setupStore()}>
    <RouterProvider router={router} />
  </Provider>
);

export default App;
