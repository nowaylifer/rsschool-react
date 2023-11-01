import { useOutletContext } from 'react-router-dom';
import { MusicContext } from './MusicProvider.types';

export const useMusicContext = () => {
  return useOutletContext<MusicContext>();
};
