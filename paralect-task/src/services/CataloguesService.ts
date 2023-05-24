import api from '../api/axios';
import { CataloguesResponse } from '../types/types';

export const getCatalogues = async (): Promise<CataloguesResponse[]> => {
  const { data } = await api.get<CataloguesResponse[]>('catalogues/');
  return data;
};
