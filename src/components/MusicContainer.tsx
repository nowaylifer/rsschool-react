import { Component, ReactNode } from 'react';
import { Album, AlbumRespEntity } from '../interfaces';
import spotifyApi from '../services/spotifyApi';

interface CallbackParams {
  searchMusic(query: string): void;
  albums: Album[];
  loading: boolean;
  error?: Error;
}

interface Props {
  children: (params: CallbackParams) => ReactNode;
}

interface State {
  albums: AlbumRespEntity[];
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  error?: Error;
}

class MusicContainer extends Component<Props, State> {
  state: State = {
    albums: [],
    status: 'idle',
  };

  searchMusic = async (query: string) => {
    this.setState({ status: 'pending' });

    try {
      const result = await (query ? spotifyApi.search(query) : spotifyApi.fetchNewReleases());

      if (result.albums?.items.length === 0) {
        this.setState({
          status: 'resolved',
          error: new Error('No result found.\nTry again'),
        });

        return;
      }

      this.setState({ albums: result.albums.items, status: 'resolved', error: undefined });
    } catch (error) {
      this.setState({
        status: 'rejected',
        error: error instanceof Error ? error : new Error(error?.toString()),
      });
    }
  };

  render() {
    const { albums, status, error } = this.state;

    if (status === 'rejected') throw error;

    const albumsSortedByYear = albums
      .map<Album>((album) => ({
        ...album,
        releaseYear: new Date(album.release_date).getFullYear(),
      }))
      .sort((a, b) => b.releaseYear - a.releaseYear);

    return (
      <>
        {this.props.children({
          searchMusic: this.searchMusic,
          albums: albumsSortedByYear,
          loading: status === 'pending',
          error,
        })}
      </>
    );
  }
}

export default MusicContainer;
