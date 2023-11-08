import axios from 'axios';
import { MusicEntityType, SearchResult } from '../types';

const axiosInstance = axios.create({
  baseURL: `https://corsproxy.io/?https://api.deezer.com/`,
});

export interface SearchOptions<T extends MusicEntityType> extends PaginationOptions {
  type: T;
}

export interface PaginationOptions {
  limit?: number;
  index?: number;
}

async function search<T extends MusicEntityType>(
  query: string,
  { type, limit, index }: SearchOptions<T>
) {
  const response = await axiosInstance.get<SearchResult<T>>(`/search/${type}`, {
    params: { q: query, limit, index },
  });

  return response.data;
}

async function fetchEditorialReleases({ limit, index }: PaginationOptions) {
  const response = await axiosInstance.get<SearchResult<'album'>>(`editorial/0/releases`, {
    params: { limit, index },
  });

  return response.data;
}

const fetchAlbumDetails = async (albumId: number) => {
  const response = await axiosInstance.get(`album/${albumId}`);
  return response.data;
};

export const apiImageSize = {
  width: 500,
  height: 500,
};

export const apiImageSizeXl = {
  widht: 1000,
  height: 1000,
};

export default { search, fetchAlbumDetails, fetchEditorialReleases };
