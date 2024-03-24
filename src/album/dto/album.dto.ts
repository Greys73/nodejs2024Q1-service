import { IsString, IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class AlbumDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1900)
  year: number;

  @IsOptional()
  @IsUUID('4')
  artistId: string | null;
}
