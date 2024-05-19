export interface ICreateUserCredentialDto {
  userId: string;
  salt: string;
  hash: string;
}
