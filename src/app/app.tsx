import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import { store } from 'store/appStore';
import { PageLoader } from 'components';
import { ErrorBoundary } from './providers/ErrorBoundary';
import { theme } from './theme';
import { appRouter } from './appRoutes';

export default function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <Notifications position='top-right' />
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <RouterProvider router={appRouter()} />
          </Suspense>
        </ErrorBoundary>
      </MantineProvider>
    </Provider>
  );
}
