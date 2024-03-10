import { v4 as uuid } from 'uuid';
import { Album } from './../types/types';
import { AlbumDto } from 'src/album/dto/album.dto';

class AlbumsDB {
  albums: Album[];

  constructor() {
    this.albums = [];
  }

  getAll = () => this.albums;

  getById = (id: string) => this.albums.find((item) => item.id === id);

  delete = (id: string) => {
    const index = this.albums.findIndex((item) => item.id === id);
    this.albums.splice(index, 1);
  };

  create = (data: AlbumDto) => {
    const { name, year, artistId } = data;
    const id = uuid();
    const item: Album = { id, name, year, artistId };
    this.albums.push(item);
    return item;
  };

  update = (id: string, data: AlbumDto) => {
    const { name, year, artistId } = data;
    const item = this.getById(id);
    if (item) {
      item.name = name;
      item.year = year;
      item.artistId = artistId;
    }
    return item;
  };
}

const albums = new AlbumsDB();

export default albums;
