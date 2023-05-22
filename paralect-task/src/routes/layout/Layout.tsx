import { createStyles } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { HeaderResponsive as Header } from '../../components/header/Header';

const useStyles = createStyles((theme) => ({
  root: {
    background: theme.colors.gray[0],
    minHeight: '100vh',
  },
}));

export default function Layout() {
  const { classes } = useStyles();

  const links = [
    { link: '/vacancies', label: 'Поиск Вакансий' },
    { link: '/favorites', label: 'Избранное' },
  ];
  return (
    <div className="m-auto max-w-6xl px-10 min-h-screen flex flex-col py-8">
      <Header links={links} />
      <main className={classes.root}>
        <Outlet />
      </main>
    </div>
  );
}
