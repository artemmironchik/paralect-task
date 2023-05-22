import { RouteObject, Navigate } from 'react-router-dom';
import Main from './routes/main/Main';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/vacancies" />,
  },
  {
    path: '/vacancies',
    element: <Main />,
  },
  // {
  //   path: '/vacancy/:id',
  //   element: <Vacancy />,
  // },
  // {
  //   path: '/favorites',
  //   element: <Favorites />,
  // },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
];

export default routes;
