import { RouteObject } from 'react-router-dom';
import { AuthLayoutPage, loginRoute, signupRoute } from './pages';

export const authRoutes: RouteObject[] = [
  {
    path: '/auth',
    Component: AuthLayoutPage,
    children: [loginRoute, signupRoute],
  },
];
