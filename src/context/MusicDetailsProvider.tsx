import { useQueryParam, NumberParam } from 'use-query-params';
import { skipToken } from '@reduxjs/toolkit/query';
import { PropsWithChildren, useCallback, createContext, useContext } from 'react';
import { Album, AppSearchParam } from '../types';
import { useAlbumDetailsQuery } from '@/lib/redux/musicApi';

export interface MusicDetailsContext {
  unsetDetails(): void;
  albumDetails?: Album;
  isFetching: boolean;
}

export const MusicDetailsContext = createContext<MusicDetailsContext | null>(null);

const MusicDetailsProvider = (props: PropsWithChildren) => {
  const [detailsParam, setDetailsParam] = useQueryParam(AppSearchParam.DETAILS, NumberParam);
  const { data, isFetching } = useAlbumDetailsQuery(detailsParam || skipToken);

  const unsetDetails = useCallback(() => {
    setDetailsParam(undefined);
  }, []);

  return detailsParam ? (
    <MusicDetailsContext.Provider
      value={{
        albumDetails: isFetching ? undefined : data,
        unsetDetails,
        isFetching,
      }}
      {...props}
    />
  ) : null;
};

export const useMusicDetails = () => {
  const value = useContext(MusicDetailsContext);

  if (!value) {
    throw new Error('error');
  }

  return value;
};

export default MusicDetailsProvider;
