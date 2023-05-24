import { RouteObject, Navigate } from 'react-router-dom';
import Main from './routes/main/Main';
import Vacancy from './routes/vacancy/Vacancy';
import NotFound from './routes/404/NotFound';

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
  {
    path: '/404',
    element: <NotFound withButton />,
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

export default routes;
