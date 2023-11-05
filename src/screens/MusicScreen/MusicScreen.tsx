import SearchForm from './SearchForm';
import { ModalLoading } from '../../components/Modal';
import { useMusicContext } from '../../components/MusicProvider';
import SearchResultView from './SearchResultView';
import SearchResultError from './SearchResultError';
import MusicPagination from './MusicPagination';
import { ComponentProps } from 'react';

const MusicScreen = () => {
  const {
    submitSearch,
    changePageSize,
    getURLForPage,
    albums,
    error,
    loading,
    queryParams,
    totalItems,
    pageSizes,
  } = useMusicContext();

  const paginationProps: ComponentProps<typeof MusicPagination> = {
    page: queryParams.page,
    pageSize: queryParams.pageSize,
    currentSize: queryParams.pageSize,
    totalItems,
    getURLForPage,
    sizes: pageSizes,
    onChange: changePageSize,
  };

  return (
    <main>
      <SearchForm onSearch={submitSearch} initialValue={queryParams.q ?? ''} className="mb-10" />
      <MusicPagination {...paginationProps} className="mb-10" />
      {error && <SearchResultError error={error} />}
      {!error && albums && <SearchResultView items={albums} />}
      <MusicPagination {...paginationProps} className="mt-10" />
      {loading && <ModalLoading />}
    </main>
  );
};

export default MusicScreen;
