import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private db: PrismaService) {}
  async getAll() {
    return await this.db.track.findMany();
  }

  async getById(id: string) {
    const item = await this.db.track.findUnique({ where: { id } });
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Track not found');
    return item;
  }

  async create(dto: TrackDto) {
    return await this.db.track.create({ data: dto });
  }

  async update(id: string, dto: TrackDto) {
    const item = await this.db.track.findUnique({ where: { id } });
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Track not found');
    const track = await this.db.track.update({
      where: { id },
      data: dto,
    });
    return track;
  }

  async delete(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    try {
      await this.db.track.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Track not found');
    }
  }
}
