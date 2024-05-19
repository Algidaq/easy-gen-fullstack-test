import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';
@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const auth = req.headers.authorization;

    if (!auth) {
      throw new UnauthorizedException();
    }

    const token = auth.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      (req as any).user = payload;
      console.log('payload-1', payload);
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
