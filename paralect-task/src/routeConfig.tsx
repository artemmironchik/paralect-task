import { RouteObject, Navigate } from 'react-router-dom';
import Main from './routes/main/Main';
import Vacancy from './routes/vacancy/Vacancy';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/vacancies" />,
  },
  {
    path: '/vacancies',
    element: <Main />,
  },
  {
    path: '/vacancies/:id',
    element: <Vacancy />,
  },
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
