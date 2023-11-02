import SearchForm from './SearchForm';
import Modal from '../../components/Modal';
import { useMusicContext } from '../../components/MusicProvider';
import SearchResultView from './SearchResultView';
import SearchResultError from './SearchResultError';
import Pagination from '../../components/Pagination/Pagination';

const MusicScreen = () => {
  const { submitSearch, albums, error, loading, queryParams, totalItems, getURLForPage } =
    useMusicContext();

  return (
    <main>
      <SearchForm onSearch={submitSearch} initialValue={queryParams.q ?? ''} className="mb-10" />
      {(() => {
        if (error) {
          return <SearchResultError error={error} />;
        }

        return albums ? <SearchResultView items={albums} /> : null;
      })()}
      <Pagination
        page={queryParams.page}
        pageSize={queryParams.pageSize}
        totalItems={totalItems}
        siblingCount={2}
        getURLForPage={getURLForPage}
        className="mt-10"
      />
      {loading && (
        <Modal>
          <Modal.Backdrop>
            <Modal.Spinner />
          </Modal.Backdrop>
        </Modal>
      )}
    </main>
  );
};

export default MusicScreen;
