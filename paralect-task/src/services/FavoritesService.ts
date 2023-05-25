import { Vacancy } from '../types/types';

export const getFavorites = () => {
  const favorites = localStorage.getItem('favorites');

  return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = (vacancy: Vacancy) => {
  const favorites = getFavorites();
  favorites.push(vacancy);
  vacancy.favorite = true;
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const removeFavorite = (vacancy: Vacancy) => {
  const favorites = getFavorites();
  const filteredFavorites = favorites.filter((item: Vacancy) => item.id !== vacancy.id);
  vacancy.favorite = false;
  localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
};
