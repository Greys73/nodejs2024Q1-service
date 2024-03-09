import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import artists from 'src/inMemoryDB/artists';
import { validate } from 'uuid';
import { ArtistDto } from './dto/artist.dto';
import tracks from 'src/inMemoryDB/tracks';
import albums from 'src/inMemoryDB/albums';

@Injectable()
export class ArtistService {
  getAll() {
    return artists.getAll();
  }

  getById(id: string) {
    const item = artists.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Artist not found');
    return item;
  }

  create(dto: ArtistDto) {
    return artists.create(dto);
  }

  update(id: string, dto: ArtistDto) {
    const item = artists.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Artist not found');
    artists.update(id, dto);
    return item;
  }

  delete(id: string) {
    const item = artists.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Artist not found');
    tracks
      .getAll()
      .filter((track) => track.artistId === id)
      .forEach((track) => {
        const { id, ...data } = track;
        data.artistId = null;
        tracks.update(id, data);
      });
    albums
      .getAll()
      .filter((album) => album.artistId === id)
      .forEach((album) => {
        const { id, ...data } = album;
        data.artistId = null;
        albums.update(id, data);
      });
    artists.delete(id);
  }
}
