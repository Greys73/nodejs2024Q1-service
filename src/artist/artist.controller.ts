import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.artistService.getById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: ArtistDto) {
    return this.artistService.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() dto: ArtistDto) {
    return this.artistService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.artistService.delete(id);
  }
}
