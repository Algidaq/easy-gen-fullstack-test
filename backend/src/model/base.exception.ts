export abstract class IBaseException {
  constructor(public readonly message: string, public readonly error?: any) {}
}
