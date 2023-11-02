import { useCallback, useEffect, useReducer } from 'react';
import { Outlet } from 'react-router-dom';
import musicApi, { SearchOptions } from '../../services/musicApi';
import { reducer, initialState } from './MusicProvider.reducer';
import { MusicContext } from './MusicProvider.types';
import { useQueryParams, NumberParam, StringParam, withDefault } from 'use-query-params';
import qs from 'qs';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE = 1;

const MusicProvider = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [queryParams, setQueryParams] = useQueryParams(
    {
      q: withDefault(StringParam, null),
      page: withDefault(NumberParam, DEFAULT_PAGE),
      pageSize: withDefault(NumberParam, DEFAULT_PAGE_SIZE),
    },
    { removeDefaultsFromUrl: true }
  );

  useEffect(() => {
    if (queryParams.q === null) return;

    const searchMusic = async () => {
      dispatch({ type: 'START_SEARCH' });

      const { pageSize, page } = queryParams;

      const options: SearchOptions = {
        limit: pageSize,
        index: (page - 1) * pageSize,
      };

      try {
        const result = await musicApi.search(queryParams.q!, options);
        dispatch({ type: 'RESOLVED', payload: result });
      } catch (error) {
        dispatch({
          type: 'REJECTED',
          payload:
            error instanceof Error ? error : new Error(`Unknown error: ${error?.toString()}`),
        });
      }
    };

    searchMusic();
  }, [queryParams.page, queryParams.pageSize, queryParams.q]);

  const submitSearch = (query: string) => {
    setQueryParams({
      q: query,
      page: DEFAULT_PAGE,
    });
  };

  const getURLForPage = useCallback((page: number) => {
    const currentQueryParams = qs.parse(location.search.slice(1));
    const updatedQueryParams = {
      ...currentQueryParams,
      page: page === DEFAULT_PAGE ? undefined : page,
    };
    return `?${qs.stringify(updatedQueryParams)}`;
  }, []);

  return (
    <Outlet
      context={
        {
          submitSearch,
          getURLForPage,
          queryParams,
          albums: state.albums,
          error: state.error,
          loading: state.status === 'pending',
          totalItems: state.totalItems,
        } satisfies MusicContext
      }
    />
  );
};

export default MusicProvider;
