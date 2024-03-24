import { v4 as uuid } from 'uuid';
import { User } from './../types/types';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

class UsersDB {
  users: User[];

  constructor() {
    this.users = [];
  }

  getAll = () => this.users;

  getById = (id: string) => this.users.find((item) => item.id === id);

  delete = (id: string) => {
    const index = this.users.findIndex((item) => item.id === id);
    this.users.splice(index, 1);
  };

  create = (data: CreateUserDto) => {
    const { login, password } = data;
    const id = uuid();
    const version = 1;
    const createdAt = Date.now();
    const updatedAt = createdAt;
    const user: User = { id, login, password, version, createdAt, updatedAt };
    this.users.push(user);
    return user;
  };

  update = (id: string, data: UpdateUserDto) => {
    const { oldPassword, newPassword } = data;
    const user = this.getById(id);
    if (user && oldPassword === user.password) {
      user.password = newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
    }
    return user;
  };
}

const users = new UsersDB();

export default users;
