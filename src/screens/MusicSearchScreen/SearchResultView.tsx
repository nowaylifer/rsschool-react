import Grid from '../../components/Grid';
import Card from '../../components/Card';
import { SimplifiedAlbum } from '../../types';
import { MusicApiImageSize } from '../../constants';
import { Link } from 'react-router-dom';

interface Props {
  items: SimplifiedAlbum[];
  getURLForItemDetails(itemId: number): string;
}

const SearchResultView = ({ items, getURLForItemDetails }: Props) => {
  return (
    <Grid>
      {items.map((item) => (
        <Link to={getURLForItemDetails(item.id)} key={item.id} data-testid="card">
          <Card className="h-full">
            <Card.Image
              src={item.cover_big}
              placeholderSrc={item.cover_small}
              width={MusicApiImageSize.md.width}
              height={MusicApiImageSize.md.height}
            />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Description>{item.artist.name}</Card.Description>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </Grid>
  );
};

export default SearchResultView;
