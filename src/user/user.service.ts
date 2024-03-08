import { validate } from 'uuid';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import users from 'src/inMemoryDB/users';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/types/types';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  getAll() {
    return users as unknown as User[];
  }

  getById(id: string) {
    const user = users.getUser(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(dto: CreateUserDto) {
    return users.addUser(dto);
  }

  update(id: string, dto: UpdateUserDto) {
    const user = users.getUser(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }
    users.updateUser(id, dto);
    return user;
  }

  delete(id: string) {
    const user = users.getUser(id);
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!user) throw new NotFoundException('User not found');
    users.deleteUser(id);
  }
}
