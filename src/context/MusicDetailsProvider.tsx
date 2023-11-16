import { useQueryParam, NumberParam } from 'use-query-params';
import { Outlet, useOutletContext } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback } from 'react';
import { Album, AppSearchParam } from '../types';
import { useAlbumDetailsQuery } from '../redux/musicApi';

export interface MusicDetailsContext {
  unsetDetails(): void;
  albumDetails?: Album;
  isFetching: boolean;
}

const MusicDetailsProvider = () => {
  const [detailsParam, setDetailsParam] = useQueryParam(AppSearchParam.DETAILS, NumberParam);
  const { data, isFetching } = useAlbumDetailsQuery(detailsParam || skipToken);

  const unsetDetails = useCallback(() => {
    setDetailsParam(undefined);
  }, []);

  return detailsParam ? (
    <Outlet
      context={
        {
          albumDetails: isFetching ? undefined : data,
          unsetDetails,
          isFetching,
        } satisfies MusicDetailsContext
      }
    />
  ) : null;
};

export const useMusicDetails = () => {
  return useOutletContext<MusicDetailsContext>();
};

export default MusicDetailsProvider;
