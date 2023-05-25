import { Flex, Pagination, createStyles } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Vacancy } from '../../types/types';
import { addFavorite, getFavorites, removeFavorite } from '../../services/FavoritesService';
import NotFound from '../404/NotFound';
import VacanciesList from '../../components/vacanciesList/VacanciesList';

const useStyles = createStyles((theme) => ({
  container: {
    paddingTop: '40px',
    paddingBottom: '44px',
    flexGrow: 1,
  },
  control: {
    border: `1px solid ${theme.colors.gray[1]}`,
    fontSize: '16px',
    [theme.fn.smallerThan('lg')]: {
      minWidth: '1rem',
    },
  },
  pagination: {
    [theme.fn.smallerThan('xs')]: {
      gap: '4px',
    },
  },
}));

export default function Favorites() {
  const { classes } = useStyles();
  const [favorites, setFavorites] = useState<Vacancy[] | null>([]);
  const [page, setPage] = useState(1);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const storageFavorites = getFavorites();
    setFavorites(storageFavorites);
  }, [isClicked, page]);

  const handleIconClick = (vacancy: Vacancy) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    if (vacancy.favorite) removeFavorite(vacancy);
    else addFavorite(vacancy);
    if (favorites && !(favorites.slice((page - 1) * 4, page * 4).length - 1)) {
      setPage(page - 1);
    }
  };

  return (
    <Flex
      className={classes.container}
      align="center"
      direction="column"
      gap={104}
      justify="space-between"
    >
      {favorites && !favorites.length ? (
        <NotFound withButton />
      ) : (
        <>
          <VacanciesList
            page={favorites && favorites.slice((page - 1) * 4, page * 4)}
            handleIconClick={handleIconClick}
          />
          <Pagination
            total={favorites ? Math.ceil(favorites.length / 4) : 0}
            radius="sm"
            value={page}
            onChange={setPage}
            spacing="sm"
            classNames={{ control: classes.control }}
            className={classes.pagination}
          />
        </>
      )}
    </Flex>
  );
}
