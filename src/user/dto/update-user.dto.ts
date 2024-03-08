import { IsString, IsDefined } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsDefined()
  oldPassword: string;

  @IsString()
  @IsDefined()
  newPassword: string;
}
