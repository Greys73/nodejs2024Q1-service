import { v4 as uuid } from 'uuid';
import { Artist } from './../types/types';
import { ArtistDto } from 'src/artist/dto/artist.dto';

class ArtistsDB {
  artists: Artist[];

  constructor() {
    this.artists = [];
  }

  getAll = () => this.artists;

  getById = (id: string) => this.artists.find((item) => item.id === id);

  delete = (id: string) => {
    const index = this.artists.findIndex((item) => item.id === id);
    this.artists.splice(index, 1);
  };

  create = (data: ArtistDto) => {
    const { name, grammy } = data;
    const id = uuid();
    const item: Artist = { id, name, grammy };
    this.artists.push(item);
    return item;
  };

  update = (id: string, data: ArtistDto) => {
    const { name, grammy } = data;
    const item = this.getById(id);
    if (item) {
      item.name = name;
      item.grammy = grammy;
    }
    return item;
  };
}

const artists = new ArtistsDB();

export default artists;
