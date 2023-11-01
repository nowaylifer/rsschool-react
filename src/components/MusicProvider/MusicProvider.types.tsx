import { Album, SearchResult } from '../../interfaces';

export interface State {
  albums: SearchResult<Album> | null;
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  error: Error | null;
}

export interface MusicContext {
  submitSearch: (query: string) => void;
  searchQuery?: string | null;
  albums: State['albums'];
  error: State['error'];
  loading: boolean;
}
