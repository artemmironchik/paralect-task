import axios, { InternalAxiosRequestConfig } from 'axios';
import { getAccessToken } from '../services/AuthService';
import { API_URL } from '../utils/constValues';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Api-App-Id':
      'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
    'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
  },
});

api.interceptors.request.use(async (config): Promise<InternalAxiosRequestConfig> => {
  const accessToken = await getAccessToken();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default api;
