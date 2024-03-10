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
import { TrackService } from './track.service';
import { TrackDto } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Get()
  async getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.trackService.getById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: TrackDto) {
    return this.trackService.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() dto: TrackDto) {
    return this.trackService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    this.trackService.delete(id);
  }
}
