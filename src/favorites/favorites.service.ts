/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Favorites } from 'src/types/types';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private db: PrismaService) {
    this.createDefault();
  }

  async createDefault() {
    const data = { artists: [], albums: [], tracks: [] };
    const fav = await this.db.favorites.findFirst();
    if (!fav) await this.db.favorites.create({ data });
  }

  async getAll() {
    const { id, ...favs } = await this.db.favorites.findFirst();
    const result = {
      tracks: (
        await Promise.all(
          favs.tracks.map(
            async (id) => await this.db.track.findUnique({ where: { id } }),
          ),
        )
      ).filter((item) => !!item),
      albums: (
        await Promise.all(
          favs.albums.map(
            async (id) => await this.db.album.findUnique({ where: { id } }),
          ),
        )
      ).filter((item) => !!item),
      artists: (
        await Promise.all(
          favs.artists.map(
            async (id) => await this.db.artist.findUnique({ where: { id } }),
          ),
        )
      ).filter((item) => !!item),
    };
    return result;
  }

  async addTrack(id: string) {
    const item = await this.db.track.findUnique({ where: { id } });
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) this.notFound('Track');
    const favs = await this.db.favorites.findFirst();
    if (!favs.tracks.find((item) => item === id)) favs.tracks.push(id);
    await this.update(favs);
  }

  async addAlbum(id: string) {
    const item = await this.db.album.findUnique({ where: { id } });
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) this.notFound('Album');
    const favs = await this.db.favorites.findFirst();
    if (!favs.albums.find((item) => item === id)) favs.albums.push(id);
    await this.update(favs);
  }

  async addArtist(id: string) {
    const item = await this.db.artist.findUnique({ where: { id } });
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) this.notFound('Artist');
    const favs = await this.db.favorites.findFirst();
    if (!favs.artists.find((item) => item === id)) favs.artists.push(id);
    await this.update(favs);
  }

  async remTrack(id: string) {
    const item = await this.db.track.findUnique({ where: { id } });
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) this.notFound('Track');
    const favs = await this.db.favorites.findFirst();
    const index = favs.tracks.findIndex((item) => item === id);
    favs.tracks.splice(index, 1);
    await this.update(favs);
  }

  async remAlbum(id: string) {
    const item = await this.db.album.findUnique({ where: { id } });
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) this.notFound('Album');
    const favs = await this.db.favorites.findFirst();
    const index = favs.albums.findIndex((item) => item === id);
    favs.albums.splice(index, 1);
    await this.update(favs);
  }

  async remArtist(id: string) {
    const item = await this.db.artist.findUnique({ where: { id } });
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!item) this.notFound('Artist');
    const favs = await this.db.favorites.findFirst();
    const index = favs.artists.findIndex((item) => item === id);
    favs.artists.splice(index, 1);
    await this.update(favs);
  }

  async update(favs: Favorites) {
    const { id, tracks, albums, artists } = favs;
    await this.db.favorites.update({
      where: { id },
      data: { tracks, albums, artists },
    });
  }

  notFound(entity: string) {
    throw new HttpException(
      `${entity} not found`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
