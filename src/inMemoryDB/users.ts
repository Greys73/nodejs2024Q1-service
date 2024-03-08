import { v4 as uuid } from 'uuid';
import { User } from './../types/types';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

class UsersDB {
  users: User[];

  constructor() {
    this.users = [];
  }

  getUsers = () => this.users;

  getUser = (id: string) => this.users.find((user) => user.id === id);

  deleteUser = (id: string) => {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  };

  addUser = (_user: CreateUserDto) => {
    const { login, password } = _user;
    const id = uuid();
    const version = 0;
    const createdAt = Date.now();
    const updatedAt = createdAt;
    const user: User = { id, login, password, version, createdAt, updatedAt };
    this.users.push(user);
    return user;
  };

  updateUser = (id: string, _user: UpdateUserDto) => {
    const { oldPassword, newPassword } = _user;
    const user = this.getUser(id);
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
