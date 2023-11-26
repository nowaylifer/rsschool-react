import { useEffect, useRef } from 'react';
import { useMusicDetails } from '@/context/MusicDetailsProvider';
import Backdrop from '@/components/Backdrop';
import Spinner from '@/components/Spinner';
import AlbumDetails from './AlbumDetails';
import CloseButton from './CloseButton';

const MusicDetailsScreen = () => {
  const { albumDetails, unsetDetails, isFetching } = useMusicDetails();
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleBackdropClick = (e: MouseEvent) => {
      if (e.currentTarget !== e.target) return;
      unsetDetails();
    };

    const $backdrop = backdropRef.current;
    const $closeButton = closeButtonRef.current;

    $backdrop?.addEventListener('click', handleBackdropClick);
    $closeButton?.addEventListener('click', unsetDetails);

    return () => {
      $backdrop?.removeEventListener('click', handleBackdropClick);
      $closeButton?.removeEventListener('click', unsetDetails);
    };
  }, []);

  return (
    <Backdrop ref={backdropRef} data-testid="details-screen-backdrop">
      <div
        className="fixed bottom-0 right-0 top-0 z-20 flex h-full w-[800px] items-center justify-center rounded-md bg-white bg-opacity-60 px-4 py-9 backdrop-blur-lg backdrop-filter max-[800px]:w-full sm:px-9"
        data-testid="details-screen"
      >
        <CloseButton ref={closeButtonRef} className="absolute right-2 top-2" />
        {isFetching && <Spinner />}
        {albumDetails && <AlbumDetails album={albumDetails} className="w-full" />}
      </div>
    </Backdrop>
  );
};

export default MusicDetailsScreen;
