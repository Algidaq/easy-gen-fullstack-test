import { InjectModel } from '@nestjs/mongoose';
import { UserCredential } from './user.credential';
import { ICreateUserCredentialDto } from './user.credential.dto';
import { Model } from 'mongoose';
import {
  UserCredentialDocument,
  UserCredentialMongo,
} from './user.credential.schema';

export abstract class IUserCredentialDao {
  abstract findUnique(userId: string): Promise<UserCredential | undefined>;
  abstract create(dto: ICreateUserCredentialDto): Promise<UserCredential>;
}

export class UserCredentialsMockDao extends IUserCredentialDao {
  private userCredentials: Map<string, UserCredential> = new Map();
  findUnique(userId: string): Promise<UserCredential | undefined> {
    return Promise.resolve(this.userCredentials.get(userId));
  }
  create(dto: ICreateUserCredentialDto): Promise<UserCredential> {
    const cred = new UserCredential(dto.userId, dto.salt, dto.hash);
    this.userCredentials.set(dto.userId, cred);

    return Promise.resolve(cred);
  }
}

export class UserCredentialMongoDao extends IUserCredentialDao {
  constructor(
    @InjectModel(UserCredentialMongo.name)
    private credModel: Model<UserCredentialMongo>,
  ) {
    super();
  }

  async findUnique(userId: string): Promise<UserCredential | undefined> {
    const doc = await this.credModel.findOne({ userId: userId });
    if (!doc) return undefined;
    return this.mapCredDocToCred(doc);
  }

  async create(dto: ICreateUserCredentialDto): Promise<UserCredential> {
    const doc = await this.credModel.create({
      userId: dto.userId,
      hash: dto.hash,
      salt: dto.salt,
    });
    return this.mapCredDocToCred(doc);
  }
  mapCredDocToCred(doc: UserCredentialDocument): UserCredential {
    const json = doc.toJSON();
    return new UserCredential(json.userId, json.salt, json.hash);
  }
}
