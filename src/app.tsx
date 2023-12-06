import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'providers/ErrorBoundary';
import { theme } from 'config/theme';
import { store } from 'store/appStore';
import { PageLoader } from 'components';
import { appRouter } from 'config/appRoutes';

export default function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <RouterProvider router={appRouter()} />
          </Suspense>
        </ErrorBoundary>
      </MantineProvider>
    </Provider>
  );
}
