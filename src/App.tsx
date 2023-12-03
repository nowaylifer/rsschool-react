import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routerConfig from './router';
import { Provider } from 'react-redux';
import { setupStore } from './redux/store';

const router = createBrowserRouter(routerConfig);

function App() {
  return (
    <Provider store={setupStore()}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
