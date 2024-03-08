import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { AlbumDto } from './dto/album.dto';
import albums from 'src/inMemoryDB/albums';

@Injectable()
export class AlbumService {
  getAll() {
    return albums.getAll();
  }

  getById(id: string) {
    const item = albums.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Album not found');
    return item;
  }

  create(dto: AlbumDto) {
    return albums.create(dto);
  }

  update(id: string, dto: AlbumDto) {
    const item = albums.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Album not found');
    albums.update(id, dto);
    return item;
  }

  delete(id: string) {
    const item = albums.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Album not found');
    albums.delete(id);
  }
}
