import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useContext,
} from 'react';
import musicApi, { SearchOptions } from '../../../services/musicApi';
import { reducer, initialState } from './MusicSearchProvider.reducer';
import type { MusicSearchContext } from './MusicSearchProvider.types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES } from './MusicSearchProvider.config';
import { useQueryParams, NumberParam, StringParam, withDefault } from 'use-query-params';

const MusicSearchContext = createContext<MusicSearchContext | null>(null);

const MusicSearchProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [queryParams, setQueryParams] = useQueryParams({
    q: withDefault(StringParam, ''),
    page: withDefault(NumberParam, DEFAULT_PAGE),
    pageSize: withDefault(NumberParam, DEFAULT_PAGE_SIZE),
  });

  useEffect(() => {
    const searchMusic = async () => {
      dispatch({ type: 'START_SEARCH' });

      const { pageSize, page, q } = queryParams;

      const options: SearchOptions<'album'> = {
        type: 'album',
        limit: pageSize,
        index: (page - 1) * pageSize,
      };

      try {
        const query = q.trim();
        let result;

        if (query) {
          result = await musicApi.search(query, options);
        } else {
          result = await musicApi.fetchEditorialReleases(options);
        }

        dispatch({ type: 'SEARCH_RESOLVED', payload: result });
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

  const submitSearch = useCallback((query: string) => {
    setQueryParams({
      q: query,
      page: DEFAULT_PAGE,
    });
  }, []);

  const changePageSize = useCallback((size: number) => {
    setQueryParams({ page: DEFAULT_PAGE, pageSize: size });
  }, []);

  const changePage = useCallback((page: number) => {
    setQueryParams({ page });
  }, []);

  return (
    <MusicSearchContext.Provider
      value={{
        submitSearch,
        changePage,
        changePageSize,
        queryParams,
        albums: state.albums,
        error: state.error,
        loading: state.status === 'pending',
        totalItems: state.totalItems,
        pageSizes: PAGE_SIZES,
      }}
      {...props}
    />
  );
};

export const useMusicSearch = () => {
  const contextValue = useContext(MusicSearchContext);
  if (!contextValue) throw new Error('useMusicSearch must be used inside MusicSearchContext');
  return contextValue;
};

export default MusicSearchProvider;
