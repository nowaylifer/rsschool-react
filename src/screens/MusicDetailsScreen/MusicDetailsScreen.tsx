import { useEffect, useRef } from 'react';
import { useMusicDetails } from '../../components/context/MusicDetailsProvider';
import Backdrop from '../../components/Backdrop';
import Spinner from '../../components/Spinner';
import AlbumDetails from './AlbumDetails';
import CloseButton from './CloseButton';

const MusicDetailsScreen = () => {
  const { albumDetails, unsetDetails, status } = useMusicDetails();
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status === 'idle') return;

    const handleBackdropClick = (e: MouseEvent) => {
      if (e.currentTarget !== e.target) return;
      unsetDetails();
    };

    backdropRef.current?.addEventListener('click', handleBackdropClick);
    closeButtonRef.current?.addEventListener('click', unsetDetails);

    return () => {
      backdropRef.current?.removeEventListener('click', handleBackdropClick);
      closeButtonRef.current?.removeEventListener('click', unsetDetails);
    };
  }, [status]);

  if (status === 'idle') return null;

  return (
    <Backdrop ref={backdropRef}>
      <div className="fixed bottom-0 right-0 top-0 z-20 flex h-full w-[800px] items-center justify-center rounded-md bg-white bg-opacity-60 px-4 py-9 backdrop-blur-lg backdrop-filter max-[800px]:w-full sm:px-9">
        <CloseButton ref={closeButtonRef} className="absolute right-2 top-2" />
        {status === 'loading' && <Spinner />}
        {status === 'resolved' && albumDetails && (
          <AlbumDetails album={albumDetails} className="w-full" />
        )}
      </div>
    </Backdrop>
  );
};

export default MusicDetailsScreen;
