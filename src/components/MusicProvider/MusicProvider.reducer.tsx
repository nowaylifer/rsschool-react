import { State } from './MusicProvider.types';
import { Album, SearchResult, AlbumRespEntity } from '../../interfaces';

type Actions =
  | { type: 'START_SEARCH' }
  | { type: 'RESOLVED'; payload: { albums: SearchResult<AlbumRespEntity> } }
  | { type: 'REJECTED'; payload: Error };

export const initialState: State = {
  albums: null,
  status: 'idle',
  error: null,
};

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'START_SEARCH': {
      return { ...state, status: 'pending' };
    }

    case 'RESOLVED': {
      const { albums } = action.payload;

      if (!albums?.total) {
        return {
          ...state,
          status: 'rejected',
          error: new Error('No result found.\nTry again'),
        };
      }

      const albumsSortedByYear = albums.items
        .map<Album>((album) => ({
          ...album,
          releaseYear: new Date(album.release_date).getFullYear(),
        }))
        .sort((a, b) => b.releaseYear - a.releaseYear);

      return {
        ...state,
        status: 'resolved',
        albums: { ...albums, items: albumsSortedByYear },
      };
    }

    case 'REJECTED': {
      return { ...state, status: 'rejected', error: action.payload };
    }
  }
};
