class FavsDB {
  tracks: string[];
  albums: string[];
  artists: string[];

  constructor() {
    this.tracks = [];
    this.albums = [];
    this.artists = [];
  }

  getAll = () => ({
    tracks: this.tracks,
    albums: this.albums,
    artists: this.artists,
  });

  getTrack = (id: string) => this.tracks.find((item) => item === id);

  getAlbum = (id: string) => this.albums.find((item) => item === id);

  getArtist = (id: string) => this.artists.find((item) => item === id);

  addTrack = (id: string) => {
    if (!this.getTrack(id)) this.tracks.push(id);
  };

  addAlbum = (id: string) => {
    if (!this.getAlbum(id)) this.albums.push(id);
  };

  addArtist = (id: string) => {
    if (!this.getArtist(id)) this.artists.push(id);
  };

  remTrack = (id: string) => {
    const index = this.tracks.findIndex((item) => item === id);
    this.tracks.splice(index, 1);
  };

  remAlbum = (id: string) => {
    const index = this.albums.findIndex((item) => item === id);
    this.albums.splice(index, 1);
  };

  remArtist = (id: string) => {
    const index = this.artists.findIndex((item) => item === id);
    this.artists.splice(index, 1);
  };
}

const favorites = new FavsDB();

export default favorites;
