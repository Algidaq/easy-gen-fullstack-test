export class UserCredential {
  constructor(
    public readonly userId: string,
    public readonly salt: string,
    public readonly hash: string,
  ) {}
}
