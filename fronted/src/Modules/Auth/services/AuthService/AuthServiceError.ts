export abstract class IAuthError {
  constructor(public message: string, public error?: unknown) {}
}

export class AuthInvalidLoginCredentialError extends IAuthError {
  constructor() {
    super('Invalid email or password');
  }
}
export class AuthUnknownError extends IAuthError {}

export class AuthUserAlreadyExistsError extends IAuthError {
  constructor() {
    super('User with the given email already exists');
  }
}
