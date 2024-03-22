export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number | Date;
  updatedAt: number | Date;
}

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface Favorites {
  id: string;
  artists: string[];
  albums: string[];
  tracks: string[];
}
