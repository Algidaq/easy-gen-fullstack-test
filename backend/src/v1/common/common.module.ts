import { Global, Module } from '@nestjs/common';
import { AuthGaurd } from './guards/auth.guard';
import { JwtTokenService } from './services';

@Global()
@Module({
  providers: [AuthGaurd, JwtTokenService],
  exports: [AuthGaurd, JwtTokenService],
})
export class CommonModule {}
