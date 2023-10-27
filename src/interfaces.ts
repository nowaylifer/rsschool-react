export interface Album {
  id: string;
  name: string;
  artists: { name: string }[];
  release_date: string;
  images: { url: string; height: number; width: number }[];
  external_urls: {
    [key: string]: string;
  };
}
