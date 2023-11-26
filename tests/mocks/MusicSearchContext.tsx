import searchResult from '../fixtures/search-results/query-eminem/page-1.page-size-10.json';
import { type MusicSearchContext } from '../../src/context/MusicSearchProvider';
import { testSearchQuery } from '../test-utils';

export const mockMusicSearchContextValueSuccess: MusicSearchContext = {
  getURLForAlbumDetails: jest.fn(),
  submitSearch: jest.fn(),
  changePage: jest.fn(),
  changePageSize: jest.fn(),
  pageSizes: [10, 20, 30],
  albums: searchResult.data,
  totalItems: searchResult.total,
  error: undefined,
  isFetching: false,
  queryParams: {
    q: testSearchQuery,
    pageSize: 10,
    page: 1,
  },
};

export const mockMusicSearchContextValueError: MusicSearchContext = {
  ...mockMusicSearchContextValueSuccess,
  error: new Error('No result found'),
  totalItems: 0,
  albums: [],
};
