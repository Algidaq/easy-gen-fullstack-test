export abstract class UserException {
  constructor(public readonly message: string, public readonly error?: any) {}
}

export class UnknowUserException extends UserException {}

export class UserAlreadyExistsException extends UserException {}
