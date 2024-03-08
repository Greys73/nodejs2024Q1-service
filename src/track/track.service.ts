import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import tracks from 'src/inMemoryDB/tracks';
import { validate } from 'uuid';
import { TrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  getAll() {
    return tracks.getAll();
  }

  getById(id: string) {
    const item = tracks.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Track not found');
    return item;
  }

  create(dto: TrackDto) {
    return tracks.create(dto);
  }

  update(id: string, dto: TrackDto) {
    const item = tracks.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Track not found');
    tracks.update(id, dto);
    return item;
  }

  delete(id: string) {
    const item = tracks.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Track not found');
    tracks.delete(id);
  }
}
