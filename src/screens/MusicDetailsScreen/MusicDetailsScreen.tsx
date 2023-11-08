import { useEffect, useRef } from 'react';
import { useMusicDetails } from '../../components/context/MusicDetailsProvider';
import Backdrop from '../../components/Backdrop';
import Spinner from '../../components/Spinner';
import AlbumDetails from './AlbumDetails';
import Cross from '../../assets/icons/cross.svg?react';

const MusicDetailsScreen = () => {
  const { albumDetails, unsetDetails, status } = useMusicDetails();
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status !== 'resolved') return;

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
      <div className="fixed bottom-0 right-0 top-0 z-20 flex h-full w-[800px] items-center justify-center rounded-md bg-white bg-opacity-60 backdrop-blur-lg backdrop-filter">
        <button
          ref={closeButtonRef}
          className="absolute right-2 top-2 rounded-full border-white ring-gray-100 transition"
        >
          <Cross width="30px" height="30px" className="fill-white/70 transition hover:fill-white" />
        </button>
        {status === 'loading' && <Spinner />}
        {status === 'resolved' && albumDetails && (
          <AlbumDetails album={albumDetails} className="min-w-[722px]" />
        )}
      </div>
    </Backdrop>
  );
};

export default MusicDetailsScreen;
