import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserValidationPipe } from './user.pipes';
import { ICreateUserDto } from './models';
import { UserAlreadyExistsException, UserException } from './user.exceptions';
import { AuthGaurd, AuthUser } from '../common';
import { AuthService } from '../auth';
import { IJwtTokenPayload, JwtTokenService } from '../common/services';

@Controller('users')
export class UserController {
  constructor(
    protected service: UserService,
    protected tokenService: JwtTokenService,
  ) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body(CreateUserValidationPipe) dto: ICreateUserDto) {
    const result = await this.service.createUser(dto);
    if (result instanceof UserException) {
      throw this.mapUserExceptionToHttpExceptions(result);
    }
    const token = await this.tokenService.generateToken(result.id, result.id);
    return { accessToken: token, ...result };
  }

  @Get('profile')
  @UseGuards(AuthGaurd)
  async getUserProfile(@AuthUser() payload: IJwtTokenPayload | undefined) {
    console.log('payload', payload);
    if (!payload) throw new UnauthorizedException();
    const user = await this.getUserById(payload.sub);
    if (!user) {
      throw new NotFoundException(
        `User with the given id ${payload.sub} is not found`,
      );
    }
    return user;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.service.getUserById(id);
    if (!user)
      throw new NotFoundException(`User with the given id ${id} is not found`);

    return user;
  }

  mapUserExceptionToHttpExceptions(exception: UserException) {
    console.error(exception.error);
    if (exception instanceof UserAlreadyExistsException) {
      return new ConflictException(exception.message);
    }

    return new HttpException('Internal server error', 500, {
      cause: exception.error,
    });
  }
}
