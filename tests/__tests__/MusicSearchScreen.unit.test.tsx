import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { mockMusicDetailsContextValue } from '../__mocks__/MusicDetailsContext';
import {
  mockMusicSearchContextValueError,
  mockMusicSearchContextValueSuccess,
} from '../__mocks__/MusicSearchContext';
import MusicSearchScreen from '../../src/screens/MusicSearchScreen';
import { MusicDetailsContext } from '../../src/context/MusicDetailsProvider';
import { MusicSearchContext, MusicSearchContextType } from '../../src/context/MusicSearchProvider';
// import { TEST_API_URL } from '../test-utils';

jest.mock('../../src/hooks/useMediaQuery.ts', () => ({
  __esModule: true,
  default: jest.fn(() => false),
}));

jest.mock('react', () => ({
  __esModule: true,
  ...jest.requireActual('react'),
  useId: jest.fn(() => 'id123'),
}));

const customRender = (musicSearchContextValue: MusicSearchContextType) => {
  render(
    <MemoryRouter>
      <MusicSearchContext.Provider value={musicSearchContextValue}>
        <MusicDetailsContext.Provider value={mockMusicDetailsContextValue}>
          <MusicSearchScreen />
        </MusicDetailsContext.Provider>
      </MusicSearchContext.Provider>
    </MemoryRouter>
  );
};

describe('MusicSearchScreen', () => {
  describe('when data is successfully loaded', () => {
    beforeEach(() => customRender(mockMusicSearchContextValueSuccess));

    it('renders cards with specified data', () => {
      expect(screen.getAllByTestId('card')).toHaveLength(
        mockMusicSearchContextValueSuccess.albums.length
      );

      mockMusicSearchContextValueSuccess.albums.forEach((item) => {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      });
    });

    it('renders search form that could be submited', async () => {
      const searchInput = screen.getByRole<HTMLInputElement>('textbox', { name: /search music/i });
      expect(searchInput).toHaveValue(mockMusicSearchContextValueSuccess.queryParams.q);

      searchInput.value = '';
      const newQuery = 'nirvana';

      await userEvent.type(searchInput, newQuery);
      await userEvent.click(screen.getByRole('button', { name: /search/i }));

      expect(mockMusicSearchContextValueSuccess.submitSearch).toHaveBeenCalledTimes(1);
      expect(mockMusicSearchContextValueSuccess.submitSearch).toHaveBeenCalledWith(newQuery);
    });

    it('matches snapshot', () => {
      expect(document.body).toMatchSnapshot();
    });
  });

  describe('when there is an error loading data', () => {
    beforeEach(() => customRender(mockMusicSearchContextValueError));

    it('renders error message', () => {
      expect(screen.getByText(mockMusicSearchContextValueError.error!.message)).toBeInTheDocument();
    });

    it('matches snapshot', () => {
      expect(document.body).toMatchSnapshot();
    });
  });
});
