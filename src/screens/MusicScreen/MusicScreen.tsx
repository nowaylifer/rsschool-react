import SearchForm from './SearchForm';
import Modal from '../../components/Modal';
import { useMusicContext } from '../../components/MusicProvider';
import SearchResultView from './SearchResultView';
import SearchResultError from './SearchResultError';

const MusicScreen = () => {
  const { submitSearch, albums, error, loading, searchQuery } =
    useMusicContext();

  return (
    <main>
      <SearchForm
        onSearch={submitSearch}
        initialValue={searchQuery ?? ''}
        className="mb-10"
      />
      {(() => {
        if (error) {
          return <SearchResultError error={error} />;
        }

        return albums ? <SearchResultView items={albums.items} /> : null;
      })()}
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
