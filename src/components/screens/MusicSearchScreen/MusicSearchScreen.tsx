import { ComponentProps } from 'react';
import SearchForm from './SearchForm';
import { ModalLoading } from '@/components/Modal';
import { useMusicSearch } from '@/context/MusicSearchProvider';
import SearchResultView from './SearchResultView';
import SearchResultError from './SearchResultError';
import MusicPagination from './MusicPagination';

const MusicSearchScreen = () => {
  const {
    getURLForAlbumDetails,
    changePageSize,
    submitSearch,
    changePage,
    albums,
    error,
    isFetching,
    pageSizes,
    totalItems,
    queryParams,
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

  let content: JSX.Element;

  if (error) {
    content = <SearchResultError error={error} />;
  } else {
    content = (
      <>
        <MusicPagination {...paginationProps} className="mb-10" />
        <SearchResultView items={albums} getURLForItemDetails={getURLForAlbumDetails} />
        <MusicPagination {...paginationProps} className="mt-10" />
      </>
    );
  }

  return (
    <main>
      <SearchForm onSearch={submitSearch} initialValue={queryParams.q ?? ''} className="mb-10" />
      {content}
      {isFetching && <ModalLoading />}
    </main>
  );
};

export default MusicSearchScreen;
