import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routerConfig from './router';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorFallBackModal from './components/ErrorFallBackModal';

const router = createBrowserRouter(routerConfig);

export const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallBackModal}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
