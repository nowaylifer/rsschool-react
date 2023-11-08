import { Album } from '../../types';
import { apiImageSize } from '../../services/musicApi';
import Card from '../../components/Card';
import { toHHMMSS, getYear, cn } from '../../utils';
import TrackTable from './TrackTable';

interface Props {
  album: Album;
  className?: string;
}

const { width, height } = apiImageSize;

const AlbumDetails = ({ album, className }: Props) => {
  return (
    <div className={cn('flex flex-col justify-center gap-3', className)}>
      <Card className="pointer-events-none flex-row items-start">
        <Card.Image
          src={album.cover_big}
          placeholderSrc={album.cover_small}
          width={width}
          height={height}
          className="w-1/3"
        ></Card.Image>
        <div>
          <Card.Title className="text-2xl max-[800px]:text-[clamp(1.125rem,0.875rem+1.25vw,1.5rem)]">
            {album.title}
          </Card.Title>
          <Card.Description className="mb-2 text-lg text-gray-700">
            {album.artist.name}
          </Card.Description>
          <Card.Description className="mb-2">
            <>
              <span className="mr-1">{album.nb_tracks} tracks</span>
              <span>({toHHMMSS(album.duration)})</span>
            </>
          </Card.Description>
          <Card.Description>{getYear(album.release_date)}</Card.Description>
        </div>
      </Card>
      <TrackTable className="max-h-[550px] overflow-y-auto" tracks={album.tracks.data} />
    </div>
  );
};
export default AlbumDetails;
