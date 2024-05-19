import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export type IJwtTokenPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class JwtTokenService {
  constructor(protected jwtService: JwtService) {}

  async generateToken(id: string, email: string): Promise<string> {
    const payload: IJwtTokenPayload = { sub: id, email: email };
    return this.jwtService.signAsync(payload);
  }
}
