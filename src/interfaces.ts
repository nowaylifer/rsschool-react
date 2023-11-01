export interface SearchResult<T> {
  items: T[];
  offset: number;
  limit: number;
  total: number;
}

export interface AlbumRespEntity {
  id: string;
  name: string;
  artists: { name: string }[];
  release_date: string;
  images: { url: string; height: number; width: number }[];
  external_urls: {
    [key: string]: string;
  };
}

export interface Album extends AlbumRespEntity {
  releaseYear: number;
}
