import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginValidationPipe } from './auth.pipes';
import { IAuthLoginDto } from './auth.dto';
import {
  AuthInvalidCredentialsException,
  IAuthException,
} from './auth.exceptions';

@Controller('auth')
export class AuthController {
  constructor(protected authService: AuthService) {}

  @Post('login')
  async login(@Body(AuthLoginValidationPipe) dto: IAuthLoginDto) {
    const data = await this.authService.login(dto.email, dto.password);
    if (data instanceof IAuthException) {
      throw this.mapAuthExceptionToHttpExceptions(data);
    }
    return data;
  }

  mapAuthExceptionToHttpExceptions(ex: IAuthException) {
    if (ex instanceof AuthInvalidCredentialsException) {
      return new UnauthorizedException(ex.message);
    }
    return new InternalServerErrorException(ex.error);
  }
}
