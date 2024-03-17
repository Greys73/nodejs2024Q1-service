import { validate } from 'uuid';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'src/types/types';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}
  async getAll() {
    const allUsers = await this.db.user.findMany();
    return allUsers.map((_user) => this.format(_user));
  }

  async getById(id: string) {
    const user = await this.db.user.findUnique({ where: { id } });
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!user) throw new NotFoundException('User not found');
    return this.format(user);
  }

  async create(dto: CreateUserDto) {
    const user = await this.db.user.create({ data: dto });
    return this.format(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    const _user = await this.db.user.findUnique({ where: { id } });
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    if (!_user) throw new NotFoundException('User not found');
    if (_user.password !== dto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }
    const user = await this.db.user.update({
      where: { id },
      data: { password: dto.newPassword, version: _user.version + 1 },
    });
    return this.format(user);
  }

  async delete(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid ID format');
    try {
      await this.db.user.delete({ where: { id } });
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  format(user: User) {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }
}
