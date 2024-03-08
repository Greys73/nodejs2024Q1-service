import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import artists from 'src/inMemoryDB/artists';
import { Artist } from 'src/types/types';
import { validate } from 'uuid';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  getAll() {
    return artists.getAll() as unknown as Artist[];
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
    if (!item) throw new NotFoundException('User not found');
    artists.delete(id);
  }
}
