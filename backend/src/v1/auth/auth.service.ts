import { Injectable } from '@nestjs/common';
import { User, UserService } from '../user';
import { UserCredentialService } from '../user-credential';
import {
  AuthInvalidCredentialsException,
  IAuthException,
} from './auth.exceptions';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenService } from '../common/services';

@Injectable()
export class AuthService {
  constructor(
    protected userService: UserService,
    protected credService: UserCredentialService,
    protected jwtTokenService: JwtTokenService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string } | IAuthException> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) return new AuthInvalidCredentialsException();

    const isCorrectPass = await this.credService.comparePassword(
      user.id,
      password,
    );

    if (!isCorrectPass) return new AuthInvalidCredentialsException();
    const token = await this.jwtTokenService.generateToken(user.id, user.email);
    return { accessToken: token };
  }
}
