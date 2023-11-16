import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import {
  mockMusicSearchContextValueError,
  mockMusicSearchContextValueSuccess,
} from '../mocks/MusicSearchContext';
import MusicSearchScreen from '../../src/screens/MusicSearchScreen';
import { MusicSearchContext } from '../../src/context/MusicSearchProvider';

jest.mock('react', () => ({
  __esModule: true,
  ...jest.requireActual('react'),
  useId: jest.fn(() => 'id123'),
}));

const customRender = (musicSearchContextValue: MusicSearchContext) => {
  render(
    <MemoryRouter>
      <MusicSearchContext.Provider value={musicSearchContextValue}>
        <MusicSearchScreen />
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
