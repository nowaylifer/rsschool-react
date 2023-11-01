import { useCallback, useEffect, useReducer } from 'react';
import spotifyApi from '../../services/spotifyApi';
import { useSearchParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { reducer, initialState } from './MusicProvider.reducer';
import { MusicContext } from './MusicProvider.types';

const MusicProvider = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    if (searchQuery === null) return;

    const searchMusic = async () => {
      dispatch({ type: 'START_SEARCH' });

      try {
        const result = await (searchQuery
          ? spotifyApi.search(searchQuery)
          : spotifyApi.fetchNewReleases());

        dispatch({ type: 'RESOLVED', payload: result });
      } catch (error) {
        dispatch({
          type: 'REJECTED',
          payload:
            error instanceof Error
              ? error
              : new Error(`Unknown error: ${error?.toString()}`),
        });
      }
    };

    searchMusic();
  }, [searchQuery]);

  const submitSearch = useCallback((query: string) => {
    setSearchParams({ search: query });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Outlet
      context={
        {
          submitSearch,
          albums: state.albums,
          error: state.error,
          loading: state.status === 'pending',
          searchQuery: searchQuery,
        } satisfies MusicContext
      }
    />
  );
};

export default MusicProvider;
