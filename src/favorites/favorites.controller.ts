import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  async getAll() {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remTrack(@Param('id') id: string) {
    return this.favoritesService.remTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remAlbum(@Param('id') id: string) {
    return this.favoritesService.remAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remArtist(@Param('id') id: string) {
    return this.favoritesService.remArtist(id);
  }
}
