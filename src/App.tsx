import { Component, PropsWithChildren } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import MusicContainer from './components/MusicContainer';
import Modal from './components/Modal';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorFallBackModal from './components/ErrorFallBackModal';

class App extends Component<PropsWithChildren> {
  render() {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallBackModal}>
        <div className="container mx-auto px-4 pb-20">
          <Header />
          <MusicContainer>
            {({ loading, albums, searchMusic, error }) => (
              <>
                <SearchForm className="mb-10" onSearch={searchMusic} />
                <SearchResults albums={albums} error={error} />
                {loading && (
                  <Modal>
                    <Modal.Backdrop>
                      <Modal.Spinner />
                    </Modal.Backdrop>
                  </Modal>
                )}
              </>
            )}
          </MusicContainer>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
