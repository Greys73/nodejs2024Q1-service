import { IsString, IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class TrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID('4')
  artistId: string | null;

  @IsOptional()
  @IsUUID('4')
  albumId: string | null;

  @IsInt()
  @Min(0)
  duration: number;
}
