import { useQueryParams, NumberParam, StringParam, withDefault } from 'use-query-params';
import { useAlbumSearchQuery, useEditorialReleasesQuery } from '../redux/musicApi';
import { PropsWithChildren, createContext, useCallback, useContext } from 'react';
import { SimplifiedAlbum, MusicSearchParams, AppSearchParam } from '../types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_QUERY, PAGE_SIZES } from '../constants';
import { getUpdatedQueryString, toPlainError } from '../utils';
import { skipToken } from '@reduxjs/toolkit/query';

export interface MusicSearchContext {
  getURLForAlbumDetails(albumId: number): string;
  submitSearch(query: string): void;
  changePageSize(size: number): void;
  changePage(page: number): void;
  queryParams: MusicSearchParams;
  albums: SimplifiedAlbum[];
  error?: { message: string };
  isFetching: boolean;
  totalItems: number;
  pageSizes: number[];
}

export const MusicSearchContext = createContext<MusicSearchContext | null>(null);

const useMusicSearchQuery = (params: MusicSearchParams) => {
  const albumResult = useAlbumSearchQuery(params.q ? params : skipToken);
  const editorialResult = useEditorialReleasesQuery(params.q ? skipToken : params);
  return params.q ? albumResult : editorialResult;
};

const MusicSearchProvider = (props: PropsWithChildren) => {
  const [queryParams, setQueryParams] = useQueryParams({
    [AppSearchParam.QUERY]: withDefault(StringParam, DEFAULT_QUERY),
    [AppSearchParam.PAGE]: withDefault(NumberParam, DEFAULT_PAGE),
    [AppSearchParam.PAGE_SIZE]: withDefault(NumberParam, DEFAULT_PAGE_SIZE),
  });

  const { data: searchResult, isFetching, error } = useMusicSearchQuery(queryParams);

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

  const getURLForAlbumDetails = useCallback(
    (albumId: number) => getUpdatedQueryString({ [AppSearchParam.DETAILS]: albumId }),
    []
  );

  return (
    <MusicSearchContext.Provider
      value={{
        getURLForAlbumDetails,
        changePageSize,
        submitSearch,
        queryParams,
        changePage,
        isFetching,
        pageSizes: PAGE_SIZES,
        error: toPlainError(error),
        albums: searchResult?.data ?? [],
        totalItems: searchResult?.total ?? 0,
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
