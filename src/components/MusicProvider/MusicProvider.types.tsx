import { SimplifiedAlbum } from '../../types';

export interface State {
  albums: SimplifiedAlbum[];
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  error: Error | null;
  totalItems: number;
}

export interface MusicQueryParams {
  q: string | null;
  page: number;
  pageSize: number;
}

export interface MusicContext {
  submitSearch(query: string): void;
  getURLForPage(page: number): string;
  queryParams: MusicQueryParams;
  albums: State['albums'];
  error: State['error'];
  loading: boolean;
  totalItems: number;
}
