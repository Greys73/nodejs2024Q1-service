import { IsString, IsDefined } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  login: string;

  @IsString()
  @IsDefined()
  password: string;
}
