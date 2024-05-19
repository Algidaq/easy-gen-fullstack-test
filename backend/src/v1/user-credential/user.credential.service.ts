import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserCredentialDao, UserCredential } from './models';

const saltRounds = 10;

@Injectable()
export class UserCredentialService {
  constructor(protected dao: IUserCredentialDao) {
    console.info('mydao', dao);
  }

  async upsertPassword(
    userId: string,
    password: string,
  ): Promise<UserCredential> {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const creds = await this.dao.create({ userId, salt, hash });
    return creds;
  }

  async comparePassword(userId: string, password: string): Promise<boolean> {
    const creds = await this.dao.findUnique(userId);
    if (!creds) return false;
    const hash = await bcrypt.hash(password, creds.salt);
    const isMatch = creds.hash === hash;
    return isMatch;
  }
}
