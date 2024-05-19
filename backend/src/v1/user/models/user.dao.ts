import { InjectModel } from '@nestjs/mongoose';
import { UserException } from '../user.exceptions';
import { ICreateUserDto } from './user.dto';
import { User } from './user.model';
import { UserDocument, UserMongo } from './user.schema';
import { Model } from 'mongoose';

type IUserUniqueQuery = {
  email?: string;
  id?: string;
};
export abstract class IUserDao {
  abstract findUnique(query: IUserUniqueQuery): Promise<User | undefined>;
  abstract createUser(user: ICreateUserDto): Promise<User>;
}

export class UserDaoMock extends IUserDao {
  private users: Array<User> = [];

  findUnique({ email, id }: IUserUniqueQuery): Promise<User | undefined> {
    if (email !== undefined) {
      const user = this.users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase(),
      );
      return Promise.resolve(user);
    }

    if (id !== undefined) {
      const user = this.users.find(
        (user) => user.id.toLowerCase() === id.toLowerCase(),
      );
      return Promise.resolve(user);
    }

    return Promise.resolve(undefined);
  }

  async createUser(dto: ICreateUserDto): Promise<User> {
    const user = new User(
      (this.users.length + 1).toString(),
      dto.name,
      dto.email,
    );
    this.users.push(user);
    return Promise.resolve(user);
  }
}

export class UserMongoDao extends IUserDao {
  constructor(
    @InjectModel(UserMongo.name) private userModel: Model<UserMongo>,
  ) {
    super();
  }
  findUnique(query: IUserUniqueQuery): Promise<User | undefined> {
    if (query.email !== undefined) {
      return this.findByEmail(query.email);
    }

    if (query.id !== undefined) {
      return this.findById(query.id);
    }
    return Promise.resolve(undefined);
  }

  async createUser(user: ICreateUserDto): Promise<User> {
    const doc = await this.userModel.create({
      email: user.email,
      name: user.name,
    });

    return this.mapUserDocumentToUser(doc);
  }

  protected async findByEmail(email: string): Promise<User | undefined> {
    const doc = await this.userModel.findOne({ email: email });
    if (!doc) return undefined;
    return this.mapUserDocumentToUser(doc);
  }

  protected async findById(id: string): Promise<User | undefined> {
    const doc = await this.userModel.findById(id);
    if (!doc) return undefined;
    return this.mapUserDocumentToUser(doc);
  }

  mapUserDocumentToUser(doc: UserDocument): User {
    const json = doc.toJSON();
    return new User(json._id.toString(), json.name, json.email);
  }
}
