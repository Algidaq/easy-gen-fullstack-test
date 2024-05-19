import { RouteObject } from 'react-router-dom';
import { SignupPage } from './SignupPage';

export const signupRoute: RouteObject = {
  path: '/auth/signup',
  Component: SignupPage,
};
