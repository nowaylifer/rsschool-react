import editorialReleases from '../fixtures/search-results/editorial-releases/page-1.page-size-20.json';
import qEminemPage1PageSize20 from '../fixtures/search-results/query-eminem/page-1.page-size-20.json';
import qEminemPage2PageSize20 from '../fixtures/search-results/query-eminem/page-2.page-size-20.json';
import qEminemPage1PageSize40 from '../fixtures/search-results/query-eminem/page-1.page-size-40.json';
import { screen, waitFor, within, waitForElementToBeRemoved } from '@testing-library/react';
import { testSearchQuery, testDetailsId, renderApp } from '../test-utils';
import albumDetails from '../fixtures/album-details/id103248.json';
import userEvent from '@testing-library/user-event';
import { SearchResult } from '../../src/types';
import { server } from '../mocks/api/server';
import mockRouter from 'next-router-mock';

const waitForLoader = async () => {
  await waitFor(() => {
    expect(screen.getByTestId('modal-loading')).toBeInTheDocument();
  });

  await waitForElementToBeRemoved(screen.getByTestId('modal-loading'));
};

const doSearchQuery = async (query: string) => {
  await userEvent.type(
    screen.getByRole<HTMLInputElement>('textbox', { name: /search music/i }),
    query
  );

  await userEvent.click(screen.getByRole('button', { name: /search/i }));
};

const expectCardsInTheDocument = async (searchResult: SearchResult<'album'>) => {
  const cards = await screen.findAllByTestId('card');
  expect(cards).toHaveLength(searchResult.data.length);
  searchResult.data.forEach((item, index) => {
    expect(within(cards[index]).getByText(item.title)).toBeInTheDocument();
  });
};

const expectSearchParamsToMatch = async (queryParams: Record<string, string>) => {
  const searchParams = new URLSearchParams(mockRouter.query as Record<string, string>);
  Object.entries(queryParams).forEach(([key, value]) => {
    expect(searchParams.get(key)).toBe(value);
  });
};

const expectSearchParamsNotToMatch = async (queryParams: Record<string, string>) => {
  const searchParams = new URLSearchParams(mockRouter.query as Record<string, string>);
  Object.entries(queryParams).forEach(([key, value]) => {
    expect(searchParams.get(key)).not.toBe(value);
  });
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  it('initially renders editorial releases', async () => {
    renderApp();
    await waitForLoader();
    await expectCardsInTheDocument(editorialReleases as unknown as SearchResult<'album'>);
  });

  it('renders new cards upon submitting new query', async () => {
    renderApp();
    await waitForLoader();
    await doSearchQuery(testSearchQuery);
    await waitForLoader();
    await expectCardsInTheDocument(qEminemPage1PageSize20);
    expectSearchParamsToMatch({ q: testSearchQuery });
  });

  it('renders working pagination', async () => {
    renderApp(`/?q=${testSearchQuery}`);
    await waitForLoader();

    const [topPagination] = await screen.findAllByTestId('pagination');
    const withinPagination = within(topPagination);

    expect(withinPagination.getByRole('button', { name: /page 1$/i })).toBeInTheDocument();
    expect(withinPagination.getByRole('button', { name: /page 14$/i })).toBeInTheDocument();
    expect(withinPagination.getByRole('button', { name: /previous page/i })).toBeInTheDocument();
    expect(withinPagination.getByRole('button', { name: /next page/i })).toBeInTheDocument();

    await userEvent.click(withinPagination.getByRole('button', { name: /page 2$/i }));
    await waitForLoader();
    await expectCardsInTheDocument(qEminemPage2PageSize20);
    expectSearchParamsToMatch({ page: '2' });

    await userEvent.click(withinPagination.getByRole('button', { name: /previous page/i }));
    await expectCardsInTheDocument(qEminemPage1PageSize20);
    expectSearchParamsNotToMatch({ page: '2' });

    await userEvent.click(withinPagination.getByRole('button', { name: /next page/i }));
    await expectCardsInTheDocument(qEminemPage2PageSize20);
    expectSearchParamsToMatch({ page: '2' });
  });

  it.only('renders working page size select', async () => {
    renderApp(`/?q=${testSearchQuery}`);
    await waitForLoader();
    const [topSelect] = await screen.findAllByRole('combobox', { name: /select page size/i });
    await userEvent.selectOptions(topSelect, '40');
    await waitForLoader();
    await expectCardsInTheDocument(qEminemPage1PageSize40);
    expectSearchParamsToMatch({ pageSize: '40' });
  });

  it('renders album details upon clicking corresponding album card', async () => {
    renderApp(`/?q=${testSearchQuery}`);
    await waitForLoader();
    const [testCard] = screen.getAllByTestId('card');
    await userEvent.click(testCard);
    const detailsScreen = await screen.findByTestId('details-screen');

    await waitFor(() => {
      expect(within(detailsScreen).getByTestId('spinner')).toBeInTheDocument();
    });

    await waitForElementToBeRemoved(within(detailsScreen).getByTestId('spinner'));
    expect(within(detailsScreen).getByText(albumDetails.title)).toBeInTheDocument();
    expect(within(detailsScreen).getByText(albumDetails.artist.name)).toBeInTheDocument();

    albumDetails.tracks.data.forEach((track) => {
      expect(within(detailsScreen).getByText(track.title_short)).toBeInTheDocument();
    });

    expectSearchParamsToMatch({ details: testDetailsId });
  });

  describe('details screen can be closed', () => {
    it('by clicking on close button', async () => {
      renderApp(`/?q=${testSearchQuery}&details=${testDetailsId}`);

      await waitForLoader();
      const detailsScreen = await screen.findByTestId('details-screen');
      await userEvent.click(screen.getByRole('button', { name: /close/i }));

      await waitFor(() => {
        expect(detailsScreen).not.toBeInTheDocument();
      });

      expectSearchParamsNotToMatch({ details: testDetailsId });
    });

    it('by clicking outside the details screen', async () => {
      renderApp(`/?q=${testSearchQuery}&details=${testDetailsId}`);

      await waitForLoader();
      const detailsScreen = await screen.findByTestId('details-screen');
      await screen.findByTestId('details-screen-backdrop');
      await userEvent.click(await screen.findByTestId('details-screen-backdrop'));

      await waitFor(() => {
        expect(detailsScreen).not.toBeInTheDocument();
      });

      expectSearchParamsNotToMatch({ details: testDetailsId });
    });
  });

  it('renders not found screen when there is no matching route', () => {
    renderApp('/abracadabra');
    expect(screen.getByText(/page not found/i));
  });
});
