import { createStyles } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { HeaderResponsive as Header } from '../../components/header/Header';

const useStyles = createStyles((theme) => ({
  root: {
    background: theme.colors.gray[0],
    minHeight: '100vh',
    width: '100%',
  },
  container: {
    padding: '0 1rem',
    maxWidth: '70rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default function Layout() {
  const { classes } = useStyles();

  const links = [
    { link: '/vacancies', label: 'Поиск Вакансий' },
    { link: '/favorites', label: 'Избранное' },
  ];
  return (
    <div className={classes.root}>
      <Header links={links} />
      <main className={classes.container}>
        <Outlet />
      </main>
    </div>
  );
}
