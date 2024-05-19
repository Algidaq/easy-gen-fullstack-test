import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { IUserDao, UserDaoMock, UserMongoDao } from './models';
import { UserService } from './user.service';
import { UserCredentialModule } from '../user-credential';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongo, UserSchema } from './models/user.schema';

@Module({
  imports: [
    UserCredentialModule,
    MongooseModule.forFeature([{ name: UserMongo.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, { provide: IUserDao, useClass: UserMongoDao }],
  exports: [UserService],
})
export class UserModule {}
