import Grid from '@/components/Grid';
import Card from '@/components/Card';
import { SimplifiedAlbum } from '@/types';
import { MusicApiImageSize } from '@/lib/constants';
import Link from 'next/link';

interface Props {
  items: SimplifiedAlbum[];
  getURLForItemDetails(itemId: number): string;
}

const SearchResultView = ({ items, getURLForItemDetails }: Props) => {
  return (
    <Grid>
      {items.map((item) => (
        <Link
          shallow
          scroll={false}
          href={getURLForItemDetails(item.id)}
          key={item.id}
          data-testid="card"
        >
          <Card className="h-full">
            <Card.Image
              src={item.cover_big}
              alt={item.title}
              width={MusicApiImageSize.md.width}
              height={MusicApiImageSize.md.height}
              placeholderSrc={item.cover_small}
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
