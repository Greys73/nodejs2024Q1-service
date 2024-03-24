import { IsArray, IsOptional } from 'class-validator';

export class FavoritesDto {
  @IsOptional()
  @IsArray()
  artists: string[];

  @IsOptional()
  @IsArray()
  albums: string[];

  @IsOptional()
  @IsArray()
  tracks: string[];
}
