import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routerConfig from './router';

const router = createBrowserRouter(routerConfig);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
