import searchResult from '../__fixtures__/search-results/query-eminem/page-1.page-size-10.json';
import { MusicSearchContextType } from '../../src/context/MusicSearchProvider';
import { testSearchQuery } from '../test-utils';

const mockSubmitSearch = jest.fn();
const mockChangePage = jest.fn();
const mockChangePageSize = jest.fn();

export const mockMusicSearchContextValueSuccess: MusicSearchContextType = {
  submitSearch: mockSubmitSearch,
  changePage: mockChangePage,
  changePageSize: mockChangePageSize,
  pageSizes: [10, 20, 30],
  albums: searchResult.data,
  totalItems: searchResult.total,
  error: null,
  loading: false,
  queryParams: {
    q: testSearchQuery,
    pageSize: 10,
    page: 1,
  },
};

export const mockMusicSearchContextValueError: MusicSearchContextType = {
  ...mockMusicSearchContextValueSuccess,
  error: new Error('No result found'),
  totalItems: 0,
  albums: [],
};
