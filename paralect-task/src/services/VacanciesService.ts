import api from '../api/axios';
import { SearchParams, VacanciesResponse, Vacancy } from '../types/types';
import { getFavorites } from './FavoritesService';

export const getVacancies = async (params: SearchParams) => {
  const { data } = await api.get<VacanciesResponse>('/vacancies', { params });

  const favorites = getFavorites();

  data.objects.forEach((vacancy) => {
    vacancy.favorite = favorites.some((item: Vacancy) => item.id === vacancy.id);
  });

  data.currentPage = params.page ? params.page : 0;
  data.total = Math.min(data.total, 500);
  data.totalPages = Math.ceil(data.total / Number(params.count));

  return data;
};

export const getVacancyById = async (id: number): Promise<Vacancy | null> => {
  try {
    const { data } = await api.get<Vacancy>(`/vacancies/${id}/`);
    const favorites = getFavorites();

    data.favorite = favorites.some((item: Vacancy) => item.id === data.id);
    return data;
  } catch {
    return null;
  }
};
