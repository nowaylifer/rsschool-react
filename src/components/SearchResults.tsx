/// <reference types="vite-plugin-svgr/client" />

import { Component } from 'react';
import { Album } from '../interfaces';
import Grid from './Grid';
import Card from './Card';
import MagnifyingGlass from '../../public/magnifying-glass.svg?react';

interface Props {
  albums: Album[];
  error?: Error;
}

export class SearchResults extends Component<Props> {
  render() {
    const { error, albums } = this.props;

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <MagnifyingGlass className="h-14 fill-slate-500" />
          <p className="text-xl font-semibold text-slate-600">{error.message}</p>
        </div>
      );
    }

    return (
      <Grid>
        {albums.map((album) => (
          <Card key={album.id}>
            <Card.Image
              src={album.images[0].url}
              placeholderSrc={album.images[2]?.url}
              width={album.images[0].width}
              height={album.images[0].height}
            />
            <Card.Body>
              <Card.Title>{album.name}</Card.Title>
              <Card.Description>{album.artists[0].name}</Card.Description>
              <Card.Description variant="accented">{album.releaseYear.toString()}</Card.Description>
            </Card.Body>
          </Card>
        ))}
      </Grid>
    );
  }
}

export default SearchResults;
