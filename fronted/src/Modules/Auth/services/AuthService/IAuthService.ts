import { IAuthError } from './AuthServiceError';

export abstract class IAuthService {
  abstract login(
    email: string,
    password: string
  ): Promise<{ accessToken: string } | IAuthError>;

  abstract signup(
    name: string,
    email: string,
    password: string
  ): Promise<{ accessToken: string } | IAuthError>;
}
