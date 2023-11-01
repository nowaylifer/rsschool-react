import axios from 'axios';
import lscache from 'lscache';
import fetchToken, { TokenResponse } from './spotifyAuth';

lscache.setBucket('nowaylifer-');

const tokenStorageKey = 'auth';

let token: string;

const axiosSpotify = axios.create({
  baseURL: `https://api.spotify.com/v1/`,
});

axiosSpotify.interceptors.request.use(async (config) => {
  if (!token) {
    const tokenStore: TokenResponse | null = lscache.get(tokenStorageKey);

    if (tokenStore) {
      token = tokenStore.access_token;
    } else {
      const response = await fetchToken();
      lscache.set(tokenStorageKey, response, response.expires_in / 60);
      token = response.access_token;
    }
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

type QueryType = 'album' | 'artist' | 'track';

const search = async (
  query: string,
  type: QueryType | QueryType[] = 'album'
) => {
  const response = await axiosSpotify.get('/search', {
    params: { q: query.trim(), type, limit: 20 },
  });

  return response.data;
};

const fetchNewReleases = async () => {
  const response = await axiosSpotify.get('/browse/new-releases', {
    params: { country: 'US', limit: 20 },
  });

  return response.data;
};

export default { search, fetchNewReleases };
