import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import albums from 'src/inMemoryDB/albums';
import artists from 'src/inMemoryDB/artists';
import favorites from 'src/inMemoryDB/favorites';
import tracks from 'src/inMemoryDB/tracks';

import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  getAll() {
    const favs = favorites.getAll();
    return {
      tracks: favs.tracks.map((item) => tracks.getById(item)),
      albums: favs.albums.map((item) => albums.getById(item)),
      artists: favs.artists.map((item) => artists.getById(item)),
    };
  }

  addTrack(id: string) {
    const item = tracks.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item)
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return favorites.addTrack(id);
  }

  addAlbum(id: string) {
    const item = albums.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item)
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return favorites.addAlbum(id);
  }

  addArtist(id: string) {
    const item = artists.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item)
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return favorites.addArtist(id);
  }

  remTrack(id: string) {
    const item = favorites.getTrack(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Track not found');
    favorites.remTrack(id);
  }

  remAlbum(id: string) {
    const item = favorites.getAlbum(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Album not found');
    favorites.remAlbum(id);
  }

  remArtist(id: string) {
    const item = favorites.getArtist(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Album not found');
    favorites.remArtist(id);
  }
}
