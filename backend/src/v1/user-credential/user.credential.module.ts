import { Module } from '@nestjs/common';
import { UserCredentialService } from './user.credential.service';
import { IUserCredentialDao, UserCredentialMongoDao } from './models';
import {
  UserCredentialMongo,
  UserCredentialSchema,
} from './models/user.credential.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCredentialMongo.name, schema: UserCredentialSchema },
    ]),
  ],
  providers: [
    { provide: IUserCredentialDao, useClass: UserCredentialMongoDao },
    UserCredentialService,
  ],
  exports: [UserCredentialService],
})
export class UserCredentialModule {}
