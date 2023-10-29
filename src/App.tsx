import { Component, PropsWithChildren } from 'react';
import countriesService from './services/spotifyApi';
import Header from './components/Header';
import Search from './components/Search';
import Card from './components/Card';
import Grid from './components/Grid';
import type { Album } from './interfaces';
import withPersistance from './components/withPersistance';
import ModalLoading from './components/ModalLoading';

interface AppState {
  albums: Album[];
  isLoading: boolean;
}

class App extends Component<PropsWithChildren, AppState> {
  state: AppState = {
    albums: [],
    isLoading: false,
  };

  searchCountry = async (query: string) => {
    this.setState({ isLoading: true });

    try {
      const result = await countriesService.search(query);
      this.setState({ albums: result.albums.items });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { albums, isLoading } = this.state;

    const albumsSortedByYear = albums
      .map((album): Album & { releaseYear: number } => ({
        ...album,
        releaseYear: new Date(album.release_date).getFullYear(),
      }))
      .sort((a, b) => b.releaseYear - a.releaseYear);

    return (
      <div className="container mx-auto px-4">
        {isLoading && <ModalLoading />}
        <Header />
        <Search className="mb-10" onSearch={this.searchCountry} />
        <Grid>
          {albumsSortedByYear.map((album) => (
            <Card key={album.id}>
              <Card.Image
                src={album.images[0].url}
                placeholderSrc={album.images[2]?.url ?? null}
                width={album.images[0].width}
                height={album.images[0].height}
              />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
                <Card.Description>{album.artists[0].name}</Card.Description>
                <Card.Description variant="accented">
                  {album.releaseYear.toString()}
                </Card.Description>
              </Card.Body>
            </Card>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withPersistance(App, ['albums']);
