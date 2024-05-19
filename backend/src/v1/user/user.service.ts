import { Injectable } from '@nestjs/common';

import {
  UnknowUserException,
  UserAlreadyExistsException,
  UserException,
} from './user.exceptions';
import { ICreateUserDto, IUserDao, User } from './models';
import { UserCredentialService } from '../user-credential';

@Injectable()
export class UserService {
  constructor(
    protected userDao: IUserDao,
    protected userCredsService: UserCredentialService,
  ) {}

  async createUser(dto: ICreateUserDto): Promise<User | UserException> {
    try {
      const user = await this.userDao.findUnique({ email: dto.email });
      if (user !== undefined) {
        return new UserAlreadyExistsException('user already exists');
      }
      const newUser = await this.userDao.createUser(dto);

      const creds = await this.userCredsService.upsertPassword(
        newUser.id,
        dto.password,
      );

      return newUser;
    } catch (e) {
      return new UnknowUserException('Unknown Exception', e);
    }
  }

  async getUserById(id: string): Promise<User | undefined> {
    return await this.userDao.findUnique({ id: id });
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.userDao.findUnique({ email: email });
  }
}
