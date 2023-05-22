import axios from 'axios';
import { AuthResponse } from '../types/types';
import { API_URL, AUTH_QUERY_PARAMS } from '../utils/constValues';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Api-App-Id':
      'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
    'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
  },
});

export const getAccessToken = async () => {
  let accessToken = localStorage.getItem('token');
  if (accessToken) return accessToken;

  const { data } = await api.get<AuthResponse>('oauth2/password/', { params: AUTH_QUERY_PARAMS });

  accessToken = data.access_token;

  localStorage.setItem('token', accessToken);

  return accessToken;
};
