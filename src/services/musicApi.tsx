import axios from 'axios';
import { MusicEntityType, SearchResult } from '../types';

const axiosInstance = axios.create({
  baseURL: `https://corsproxy.io/?https://api.deezer.com/`,
});

export interface SearchOptions {
  type?: MusicEntityType;
  limit?: number;
  index?: number;
}

const search = async (query: string, { type = 'album', limit, index }: SearchOptions = {}) => {
  const response = await axiosInstance.get<SearchResult<typeof type>>(`/search/${type}`, {
    params: { q: query.trim(), limit, index },
  });

  return response.data;
};

export const apiImageSize = {
  width: 500,
  height: 500,
};

export default { search, apiImageSize };
