import { RouteObject } from 'react-router-dom';
import { ProfilePage } from './ProfilePage';

export const profileRoute: RouteObject = {
  path: '/dashboard/profile',
  index: true,
  Component: ProfilePage,
};
