import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Layout from './routes/layout/Layout';
import routes from './routeConfig';
import { customTheme } from './themeConfig';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: routes,
  },
]);

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={customTheme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
