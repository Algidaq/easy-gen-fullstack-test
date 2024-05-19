import axios, { HttpStatusCode } from 'axios';
import { AppAxios } from '../../../../services';
import {
  AuthInvalidLoginCredentialError,
  AuthUnknownError,
  AuthUserAlreadyExistsError,
  IAuthError,
} from './AuthServiceError';
import { IAuthService } from './IAuthService';

export class AuthService implements IAuthService {
  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string } | IAuthError> {
    try {
      const res = await AppAxios.post('/auth/login', { email, password });

      const data = res.data;

      if (!data.accessToken) return new AuthInvalidLoginCredentialError();

      return { accessToken: data.accessToken };
    } catch (e) {
      if (axios.isAxiosError(e) && e.status === HttpStatusCode.Unauthorized) {
        return new AuthInvalidLoginCredentialError();
      }

      return new AuthUnknownError('Unknow Error', e);
    }
  }

  async signup(
    name: string,
    email: string,
    password: string
  ): Promise<IAuthError | { accessToken: string }> {
    try {
      const body = { name, email, password };

      const res = await AppAxios.post('/users/signup', body);

      const data = res.data;

      if (!data.accessToken) return new AuthUnknownError('');

      return { accessToken: data.accessToken };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.status === HttpStatusCode.Conflict)
          return new AuthUserAlreadyExistsError();
      }

      return new AuthUnknownError('');
    }
  }
}

export class AuthServiceMock implements IAuthService {
  signup(
    name: string,
    email: string,
    password: string
  ): Promise<IAuthError | { accessToken: string }> {
    return Promise.resolve({
      accessToken: `token ${name} ${email} ${password}`,
    });
  }
  login(
    _email: string,
    _password: string
  ): Promise<IAuthError | { accessToken: string }> {
    console.info(_email, _password);
    return Promise.resolve({ accessToken: 'token' });
  }
}
