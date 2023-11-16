import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './redux/store';
import routerConfig from './router';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorFallBackModal from './components/ErrorFallBackModal';

const router = createBrowserRouter(routerConfig);

export const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallBackModal}>
      <Provider store={setupStore()}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
