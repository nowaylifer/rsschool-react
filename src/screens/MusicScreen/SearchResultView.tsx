import Grid from '../../components/Grid';
import Card from '../../components/Card';
import { SimplifiedAlbum } from '../../types';
import { apiImageSize } from '../../services/musicApi';

interface Props {
  items: SimplifiedAlbum[];
}

const SearchResultView = ({ items }: Props) => {
  return (
    <Grid>
      {items.map((item) => (
        <Card key={item.id}>
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
      ))}
    </Grid>
  );
};

export default SearchResultView;
