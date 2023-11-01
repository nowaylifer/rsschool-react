import { Album } from '../../interfaces';
import Grid from '../../components/Grid';
import Card from '../../components/Card';

interface Props {
  items: Album[];
}

const SearchResultView = ({ items }: Props) => {
  return (
    <Grid>
      {items.map((item) => (
        <Card key={item.id}>
          <Card.Image
            src={item.images[0].url}
            placeholderSrc={item.images[2]?.url}
            width={item.images[0].width}
            height={item.images[0].height}
          />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Description>{item.artists[0].name}</Card.Description>
            <Card.Description variant="accented">
              {item.releaseYear.toString()}
            </Card.Description>
          </Card.Body>
        </Card>
      ))}
    </Grid>
  );
};

export default SearchResultView;
