import searchResult from '../__fixtures__/search-result-of-10-total.json';
import { MusicSearchContextType } from '../../src/context/MusicSearchProvider';

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
    q: 'eminem',
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
