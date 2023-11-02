import { State } from './MusicProvider.types';
import { SearchResult, MusicEntityType } from '../../types';

type Actions =
  | { type: 'START_SEARCH' }
  | { type: 'RESOLVED'; payload: SearchResult<MusicEntityType> }
  | { type: 'REJECTED'; payload: Error };

export const initialState: State = {
  albums: [],
  status: 'idle',
  error: null,
  totalItems: 0,
};

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'START_SEARCH': {
      return { ...state, status: 'pending' };
    }

    case 'RESOLVED': {
      const { data, total } = action.payload;

      return {
        ...state,
        status: total ? 'resolved' : 'rejected',
        albums: data,
        totalItems: total,
        error: total ? null : new Error('No result found.\nTry again'),
      };
    }

    case 'REJECTED': {
      return { ...state, status: 'rejected', error: action.payload };
    }
  }
};
