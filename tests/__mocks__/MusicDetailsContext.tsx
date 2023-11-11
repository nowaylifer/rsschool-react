import { MusicDetailsContextType } from '../../src/context/MusicDetailsProvider';

export const mockMusicDetailsContextValue: MusicDetailsContextType = {
  getURLForAlbumDetails: jest.fn(),
  albumDetails: null,
  unsetDetails: jest.fn(),
  status: 'idle',
};
