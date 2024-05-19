import { RouteObject } from 'react-router-dom';
import { LoginPage } from './LoginPage';

export const loginRoute: RouteObject = {
  path: '/auth/login',
  Component: LoginPage,
};
