import axios from 'axios';
import token from './spotifyAuth';

const axiosSpotify = axios.create({
  baseURL: `https://api.spotify.com/v1/`,
});

axiosSpotify.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const search = async (query: string) => {
  const response = await axiosSpotify.get('/search', {
    params: { q: query, type: ['album', 'artist', 'track'], limit: 20 },
  });

  return response.data;
};

export default { search };
