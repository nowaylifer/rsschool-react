import { useQueryParam, NumberParam } from 'use-query-params';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useContext,
  useState,
} from 'react';
import musicApi from '../../services/musicApi';
import { getUpdatedQueryString } from '../../utils';
import { Album } from '../../types';

type DetailsStatus = 'idle' | 'loading' | 'resolved' | 'rejected';

export interface MusicDetailsContext {
  getURLForAlbumDetails(albumId: number): string;
  unsetDetails(): void;
  albumDetails: Album | null;
  status: DetailsStatus;
}

const MusicDetailsContext = createContext<MusicDetailsContext | null>(null);

const MusicDetailsProvider = (props: PropsWithChildren) => {
  const [detailsParam, setDetailsParam] = useQueryParam('details', NumberParam);
  const [albumDetails, setAlbumDetails] = useState<Album | null>(null);
  const [status, setStatus] = useState<DetailsStatus>('idle');

  useEffect(() => {
    if (!detailsParam) return;

    const fetchDetails = async () => {
      setStatus('loading');
      const result = await musicApi.fetchAlbumDetails(detailsParam);
      setStatus('resolved');
      setAlbumDetails(result);
      console.log(result);
    };

    fetchDetails();
  }, [detailsParam]);

  const getURLForAlbumDetails = useCallback(
    (albumId: number) => getUpdatedQueryString({ details: albumId }),
    []
  );

  const unsetDetails = useCallback(() => {
    setStatus('idle');
    setAlbumDetails(null);
    setDetailsParam(undefined);
  }, []);

  return (
    <MusicDetailsContext.Provider
      value={{ getURLForAlbumDetails, albumDetails, unsetDetails, status }}
      {...props}
    />
  );
};

export const useMusicDetails = () => {
  const contextValue = useContext(MusicDetailsContext);
  if (!contextValue) throw new Error('useMusicDetails must be used inside MusicDetailsContext');
  return contextValue;
};

export default MusicDetailsProvider;
