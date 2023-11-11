import Grid from '../../components/Grid';
import Card from '../../components/Card';
import { SimplifiedAlbum } from '../../types';
import { apiImageSize } from '../../services/musicApi';
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
          <Card>
            <Card.Image
              src={item.cover_big}
              placeholderSrc={item.cover_small}
              width={apiImageSize.width}
              height={apiImageSize.height}
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
