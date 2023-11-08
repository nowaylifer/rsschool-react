import { ComponentProps } from 'react';
import SearchForm from './SearchForm';
import { ModalLoading } from '../../components/Modal';
import { useMusicSearch } from '../../components/context/MusicSearchProvider';
import SearchResultView from './SearchResultView';
import SearchResultError from './SearchResultError';
import MusicPagination from './MusicPagination';
import { useMusicDetails } from '../../components/context/MusicDetailsProvider';

const MusicScreen = () => {
  const { getURLForAlbumDetails } = useMusicDetails();
  const {
    submitSearch,
    changePageSize,
    changePage,
    albums,
    error,
    loading,
    queryParams,
    totalItems,
    pageSizes,
  } = useMusicSearch();

  const paginationProps: ComponentProps<typeof MusicPagination> = {
    page: queryParams.page,
    pageSize: queryParams.pageSize,
    currentSize: queryParams.pageSize,
    totalItems,
    onPageChange: changePage,
    sizes: pageSizes,
    onChange: changePageSize,
  };

  return (
    <main>
      <SearchForm onSearch={submitSearch} initialValue={queryParams.q ?? ''} className="mb-10" />
      <MusicPagination {...paginationProps} className="mb-10" />
      {error && <SearchResultError error={error} />}
      {!error && albums && (
        <SearchResultView items={albums} getURLForItemDetails={getURLForAlbumDetails} />
      )}
      <MusicPagination {...paginationProps} className="mt-10" />
      {loading && <ModalLoading />}
    </main>
  );
};

export default MusicScreen;
