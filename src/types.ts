export interface SimplifiedAlbum {
  id: string;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  artist: {
    id: string;
    name: string;
  };
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
