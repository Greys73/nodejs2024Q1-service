import { IsString, IsDefined, IsNumber } from 'class-validator';

export class TrackDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  artistId: string | null;

  @IsString()
  albumId: string | null;

  @IsNumber()
  @IsDefined()
  duration: number;
}
