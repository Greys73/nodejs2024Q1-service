/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const allUsers = users.getAll().map((_user) => {
      const { password, ...user } = _user;
      return user;
    });
    return allUsers;
  }

  getById(id: string) {
    const { password, ...user } = users.getById(id) || { password: null };
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!('id' in user)) throw new NotFoundException('User not found');
    return user;
  }

  create(dto: CreateUserDto) {
    const { password, ...user } = users.create(dto);
    return user;
  }

  update(id: string, dto: UpdateUserDto) {
    const _user = users.getById(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!_user) throw new NotFoundException('User not found');
    if (_user.password !== dto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }
    const { password, ...user } = users.update(id, dto);
    return user;
  }

  delete(id: string) {
    const { password, ...user } = users.getById(id) || { password: null };
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!('id' in user)) throw new NotFoundException('User not found');
    users.delete(id);
  }
}
