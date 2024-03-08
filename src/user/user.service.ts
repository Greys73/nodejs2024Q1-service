import { validate } from 'uuid';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import users from 'src/inMemoryDB/users';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  getAll() {
    return users.getAll();
  }

  getById(id: string) {
    const user = users.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(dto: CreateUserDto) {
    return users.create(dto);
  }

  update(id: string, dto: UpdateUserDto) {
    const user = users.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }
    users.update(id, dto);
    return user;
  }

  delete(id: string) {
    const user = users.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!user) throw new NotFoundException('User not found');
    users.delete(id);
  }
}
