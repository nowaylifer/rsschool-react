import { http, HttpResponse, delay } from 'msw';
import { TEST_API_URL, testSearchQuery, testDetailsId } from '../../test-utils';
import qEminemPage1PageSize20 from '../../fixtures/search-results/query-eminem/page-1.page-size-20.json';
import qEminemPage2PageSize20 from '../../fixtures/search-results/query-eminem/page-2.page-size-20.json';
import qEminemPage1PageSize40 from '../../fixtures/search-results/query-eminem/page-1.page-size-40.json';
import editorialReleases from '../../fixtures/search-results/editorial-releases/page-1.page-size-20.json';
import albumDetails from '../../fixtures/album-details/id103248.json';

const baseUrl = TEST_API_URL;

const responseDelay = 50;

const handlers = [
  http.get(`${baseUrl}/search/album`, async ({ request }) => {
    await delay(responseDelay);

    const url = new URL(request.url);

    const query = url.searchParams.get('q');
    const limit = Number(url.searchParams.get('limit'));
    const offset = Number(url.searchParams.get('index'));

    if (query !== testSearchQuery) {
      return new HttpResponse(null, { status: 400, statusText: 'wrong query' });
    }

    if (limit === 20) {
      if (!offset) {
        return HttpResponse.json(qEminemPage1PageSize20);
      }

      if (offset === 20) {
        return HttpResponse.json(qEminemPage2PageSize20);
      }
    }

    if (limit === 40) {
      return HttpResponse.json(qEminemPage1PageSize40);
    }

    return new HttpResponse(null, { status: 400, statusText: 'wrong limit or index' });
  }),

  http.get(`${baseUrl}/editorial/0/releases`, async () => {
    await delay(responseDelay);
    return HttpResponse.json(editorialReleases);
  }),

  http.get(`${baseUrl}/album/:albumId`, async ({ params }) => {
    await delay(responseDelay);
    const { albumId } = params;

    if (albumId !== testDetailsId) {
      return new HttpResponse(null, { status: 400, statusText: 'wrong details id' });
    }

    return HttpResponse.json(albumDetails);
  }),
];

export default handlers;
