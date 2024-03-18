import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { AlbumDto } from './dto/album.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private db: PrismaService) {}
  async getAll() {
    return await this.db.album.findMany();
  }

  async getById(id: string) {
    const item = await this.db.album.findUnique({ where: { id } });
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Album not found');
    return item;
  }

  async create(dto: AlbumDto) {
    return await this.db.album.create({ data: dto });
  }

  async update(id: string, dto: AlbumDto) {
    const item = await this.db.album.findUnique({ where: { id } });
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Album not found');
    const album = await this.db.album.update({
      where: { id },
      data: dto,
    });
    return album;
  }

  async delete(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    try {
      await this.db.album.delete({ where: { id } });
      const tracks = await this.db.track.findMany();
      tracks
        .filter((track) => track.albumId === id)
        .forEach(async (track) => {
          const { id, ...data } = track;
          data.albumId = null;
          await this.db.track.update({ where: { id }, data });
        });
    } catch {
      throw new NotFoundException('Album not found');
    }
    // favorites.remAlbum(id);
    // albums.delete(id);
  }
}
