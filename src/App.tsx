import ErrorBoundary from './components/ErrorBoundary';
import ErrorFallBackModal from './components/ErrorFallBackModal';
import { RouterProvider } from 'react-router-dom';

import router from './router';

export const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallBackModal}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
