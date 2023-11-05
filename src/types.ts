export interface SimplifiedArtist {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
}

export interface SimplifiedTrack {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number; // in seconds
  rank: number;
  explicit_lyrics: boolean;
  preview: string;
  artist: Pick<SimplifiedArtist, 'id' | 'name'>;
  album: Pick<
    SimplifiedAlbum,
    'id' | 'title' | 'cover' | 'cover_small' | 'cover_medium' | 'cover_big' | 'cover_xl'
  >;
}

export interface SimplifiedAlbum {
  id: number;
  title: string;
  link: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  genre_id: number;
  nb_tracks: number;
  record_type: string;
  explicit_lyrics: boolean;
  artist: SimplifiedArtist;
}

export interface Album extends SimplifiedAlbum {
  ups: string;
  share: string;
  md5_image: string;
  genres: string[];
  label: string;
  duration: number; // in seconds
  fans: number;
  release_date: string;
  available: boolean;
  alternative?: Album;
  tracklist: string;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  contributors: string[];
  tracks: SimplifiedTrack[];
}

type SearchResultsMap = {
  album: SimplifiedAlbum;
};

export type MusicEntityType = keyof SearchResultsMap;

export interface ResponsePage<T> {
  data: T[];
  total: number;
  next?: string;
  prev?: string;
}

type ResponsePageMap = {
  [K in keyof SearchResultsMap]: ResponsePage<
    K extends keyof SearchResultsMap ? SearchResultsMap[K] : never
  >;
};

export type SearchResult<T extends MusicEntityType> = Pick<ResponsePageMap, T>[T];
