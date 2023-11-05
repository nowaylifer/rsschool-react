import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useContext,
} from 'react';
import musicApi, { SearchOptions } from '../../services/musicApi';
import { reducer, initialState } from './MusicSearchProvider.reducer';
import type { MusicSearchContext } from './MusicSearchProvider.types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES } from './MusicSearchProvider.config';
import { useQueryParams, NumberParam, StringParam, withDefault } from 'use-query-params';
import { getUpdatedQueryString } from '../../utils';

const MusicSearchContext = createContext<MusicSearchContext | null>(null);

const MusicSearchProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [queryParams, setQueryParams] = useQueryParams({
    q: withDefault(StringParam, null),
    page: withDefault(NumberParam, DEFAULT_PAGE),
    pageSize: withDefault(NumberParam, DEFAULT_PAGE_SIZE),
  });

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

  const getURLForPage = useCallback((page: number) => {
    const param = { page: page === DEFAULT_PAGE ? undefined : page };
    return getUpdatedQueryString(param);
  }, []);

  return (
    <MusicSearchContext.Provider
      value={{
        submitSearch,
        getURLForPage,
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
