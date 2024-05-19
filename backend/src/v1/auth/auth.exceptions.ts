import { IBaseException } from 'src/model';

export abstract class IAuthException extends IBaseException {}

export class AuthInvalidCredentialsException extends IAuthException {
  constructor() {
    super('Invalid User Credentials');
  }
}

export class AuthUnknownException extends IAuthException {}
