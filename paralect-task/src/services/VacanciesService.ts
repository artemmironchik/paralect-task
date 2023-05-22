import api from '../api/axios';
import { SearchParams, VacanciesResponse } from '../types/types';

export const getVacancies = async (params: SearchParams) => {
  const { data } = await api.get<VacanciesResponse>('/vacancies', { params });

  data.currentPage = params.page ? params.page : 0;
  data.total = Math.min(data.total, 500);
  data.totalPages = Math.ceil(data.total / Number(params.count));

  return data;
};
