import { RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ErrorBoundary } from 'providers/ErrorBoundary';
import { theme } from 'config/theme';
import { appRouter } from 'config/appRoutes';

export default function App() {
  return (
    <ErrorBoundary>
      <MantineProvider theme={theme}>
        <RouterProvider router={appRouter()} />
      </MantineProvider>
    </ErrorBoundary>
  );
}
