import { IsString, IsDefined, IsBoolean } from 'class-validator';

export class ArtistDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsBoolean()
  @IsDefined()
  grammy: boolean;
}
