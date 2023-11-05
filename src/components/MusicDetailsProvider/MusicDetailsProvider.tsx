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

export interface MusicDetailsContext {
  getURLForAlbumDetails(albumId: number): string;
  albumDetails: Album | null;
}

const MusicDetailsContext = createContext<MusicDetailsContext | null>(null);

const MusicDetailsProvider = (props: PropsWithChildren) => {
  const [detailsParam] = useQueryParam('details', NumberParam);
  const [albumDetails, setAlbumDetails] = useState<Album | null>(null);

  useEffect(() => {
    if (!detailsParam) return;

    const fetchDetails = async () => {
      const result = await musicApi.fetchAlbumDetails(detailsParam);
      setAlbumDetails(result);
      console.log(result);
    };

    fetchDetails();
  }, [detailsParam]);

  const getURLForAlbumDetails = useCallback(
    (albumId: number) => getUpdatedQueryString({ details: albumId }),
    []
  );

  return (
    <MusicDetailsContext.Provider
      value={{ getURLForAlbumDetails, albumDetails } satisfies MusicDetailsContext}
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
