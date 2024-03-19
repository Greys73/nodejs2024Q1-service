import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { ArtistDto } from './dto/artist.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private db: PrismaService) {}
  async getAll() {
    return await this.db.artist.findMany();
  }

  async getById(id: string) {
    const item = await this.db.artist.findUnique({ where: { id } });
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Artist not found');
    return item;
  }

  async create(dto: ArtistDto) {
    return await this.db.artist.create({ data: dto });
  }

  async update(id: string, dto: ArtistDto) {
    const item = await this.db.artist.findUnique({ where: { id } });
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) throw new NotFoundException('Artist not found');
    const artist = await this.db.artist.update({
      where: { id },
      data: dto,
    });
    return artist;
  }

  async delete(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    try {
      await this.db.artist.delete({ where: { id } });
      const tracks = await this.db.track.findMany();
      tracks
        .filter((track) => track.artistId === id)
        .forEach(async (track) => {
          const { id, ...data } = track;
          data.artistId = null;
          await this.db.track.update({ where: { id }, data });
        });
      const albums = await this.db.album.findMany();
      albums
        .filter((track) => track.artistId === id)
        .forEach(async (track) => {
          const { id, ...data } = track;
          data.artistId = null;
          await this.db.album.update({ where: { id }, data });
        });
    } catch {
      throw new NotFoundException('Artist not found');
    }
    // tracks
    //   .getAll()
    //   .filter((track) => track.artistId === id)
    //   .forEach((track) => {
    //     const { id, ...data } = track;
    //     data.artistId = null;
    //     tracks.update(id, data);
    //   });
    // albums
    //   .getAll()
    //   .filter((album) => album.artistId === id)
    //   .forEach((album) => {
    //     const { id, ...data } = album;
    //     data.artistId = null;
    //     albums.update(id, data);
    //   });
    // favorites.remArtist(id);
  }
}
