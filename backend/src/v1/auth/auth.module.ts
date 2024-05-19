import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user';
import { UserCredentialModule } from '../user-credential';

@Module({
  imports: [UserModule, UserCredentialModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
