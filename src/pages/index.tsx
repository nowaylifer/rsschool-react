import MusicDetailsScreen from '@/components/screens/MusicDetailsScreen';
import MusicSearchScreen from '@/components/screens/MusicSearchScreen';
import Header from '@/components/Header';
import ThrowError from '@/components/ThrowError';
import MusicDetailsProvider from '@/context/MusicDetailsProvider';
import MusicSearchProvider from '@/context/MusicSearchProvider';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_QUERY } from '@/lib/constants';
import { wrapper } from '@/lib/redux/store';
import musicApi from '@/lib/redux/musicApi';
import { ParsedUrlQuery } from '@/types';

export default function Home() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <Header className="my-10">
        <h1 className="text-3xl font-bold text-slate-400">Music Album Searcher</h1>
        <ThrowError />
      </Header>
      <MusicSearchProvider>
        <MusicSearchScreen />
        <MusicDetailsProvider>
          <MusicDetailsScreen />
        </MusicDetailsProvider>
      </MusicSearchProvider>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const {
    q = DEFAULT_QUERY,
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    details,
  } = context.query as ParsedUrlQuery;

  const searchParams = {
    q,
    page: Number(page),
    pageSize: Number(pageSize),
  };

  if (searchParams.q) {
    store.dispatch(musicApi.endpoints.albumSearch.initiate(searchParams));
  } else {
    store.dispatch(musicApi.endpoints.editorialReleases.initiate(searchParams));
  }

  if (details) {
    store.dispatch(musicApi.endpoints.albumDetails.initiate(Number(details)));
  }

  await Promise.all(store.dispatch(musicApi.util.getRunningQueriesThunk()));

  return {
    props: {},
  };
});
