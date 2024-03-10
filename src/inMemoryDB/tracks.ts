import { TrackDto } from 'src/track/dto/track.dto';
import { Track } from 'src/types/types';
import { v4 as uuid } from 'uuid';

class TrackDB {
  tracks: Track[];

  constructor() {
    this.tracks = [];
  }

  getAll = () => this.tracks;

  getById = (id: string) => this.tracks.find((item) => item.id === id);

  delete = (id: string) => {
    const index = this.tracks.findIndex((item) => item.id === id);
    this.tracks.splice(index, 1);
  };

  create = (data: TrackDto) => {
    const id = uuid();
    const item: Track = { id, ...data };
    this.tracks.push(item);
    return item;
  };

  update = (id: string, data: TrackDto) => {
    const item = this.getById(id);
    if (item) {
      item.name = data.name;
      item.albumId = data.albumId;
      item.artistId = data.artistId;
      item.duration = data.duration;
    }
    return item;
  };
}

const tracks = new TrackDB();

export default tracks;
