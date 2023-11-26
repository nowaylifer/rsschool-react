import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchResult, Album, MusicSearchParams, PaginationOptions } from '@/types';
import { API_URL } from '../constants';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

const composeQueryParams = ({ q, page = 1, pageSize = 20 }: Partial<MusicSearchParams>) => ({
  q: q || undefined,
  limit: pageSize,
  index: (page - 1) * pageSize,
});

const musicApi = createApi({
  reducerPath: 'musicApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    albumSearch: builder.query<SearchResult<'album'>, MusicSearchParams>({
      queryFn: async (params, _queryApi, _extraOptions, fetchWithBQ) => {
        const response = (await fetchWithBQ({
          url: 'search/album',
          params: composeQueryParams(params),
        })) as QueryReturnValue<SearchResult<'album'>, FetchBaseQueryError, FetchBaseQueryMeta>;

        if (response.data?.data.length === 0) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: 'No result found!',
            },
          };
        }

        return response;
      },
    }),

    editorialReleases: builder.query<SearchResult<'album'>, PaginationOptions>({
      query: (params) => ({
        url: 'editorial/0/releases',
        params: composeQueryParams(params),
      }),
    }),

    albumDetails: builder.query<Album, number>({
      query: (albumId) => `album/${albumId}`,
    }),
  }),
});

export default musicApi;

export const {
  useAlbumSearchQuery,
  useAlbumDetailsQuery,
  useEditorialReleasesQuery,
} = musicApi;
